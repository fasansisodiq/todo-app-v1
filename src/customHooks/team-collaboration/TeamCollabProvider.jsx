import { useState, useEffect, useCallback } from "react";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
  query,
  where,
  getDocs,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";

import { db } from "../../firebase";
import { useAuth } from "../../authentication/useAuth";
import { TeamCollabContext } from "./TeamCollabContext";
import { useNotifications } from "../notification/useNotifications";

export function TeamCollabProvider({ children }) {
  const { currentUser, username } = useAuth();
  const [teams, setTeams] = useState([]);
  const [activeTeamId, setActiveTeamId] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamTasks, setTeamTasks] = useState([]);
  const [teamInvites, setTeamInvites] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [invitee, setInvitee] = useState({});
  const [team, setTeam] = useState(null);
  const { addTeamNotifications } = useNotifications();

  function useTeam(teamId) {
    useEffect(() => {
      if (!teamId) return;
      const docRef = doc(db, "teams", teamId);
      const unsub = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          setTeam({ id: docSnap.id, ...docSnap.data() });
        } else {
          setTeam(null);
          console.log(team);
        }
      });
      return unsub;
    }, [teamId]);

    return team;
  }
  useTeam(activeTeamId);

  // Fetch teams for current user (as creator or as a member by UID)
  useEffect(() => {
    if (!currentUser) return;
    const teamsRef = collection(db, "teams");

    // Query 1: Teams where user is a member
    const q1 = query(
      teamsRef,
      where("members", "array-contains", currentUser.uid)
    );
    // Query 2: Teams where user is the creator
    const q2 = query(teamsRef, where("createdBy", "==", currentUser.uid));

    // Listen to both queries and merge results
    const unsub1 = onSnapshot(q1, (snap1) => {
      const memberTeams = snap1.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const unsub2 = onSnapshot(q2, (snap2) => {
        const creatorTeams = snap2.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Merge and deduplicate by id
        const allTeams = [
          ...memberTeams,
          ...creatorTeams.filter(
            (ct) => !memberTeams.some((mt) => mt.id === ct.id)
          ),
        ];
        setTeams(allTeams);
      });

      // Clean up both listeners
      return () => {
        unsub1();
        unsub2();
      };
    });

    return unsub1;
  }, [currentUser]);

  // Fetch members for active team
  useEffect(() => {
    if (!activeTeamId || !currentUser) {
      setTeamMembers([]);
      setTeamInvites([]);
      return;
    }
    const teamDocRef = doc(db, "teams", activeTeamId);
    const unsub = onSnapshot(teamDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        // Check if current user is the creator or a team member
        const isCreator = data.createdBy === currentUser.uid;
        const isMember = Array.isArray(data.members)
          ? data.members.some((m) =>
              typeof m === "string"
                ? m === currentUser.uid
                : m.userId === currentUser.uid
            )
          : false;
        if (isCreator || isMember) {
          setTeamMembers(data.members || []);
          setTeamInvites(data.invites || []);
        } else {
          setTeamMembers([]);
          setTeamInvites([]);
        }
      } else {
        setTeamMembers([]);
        setTeamInvites([]);
      }
    });
    return unsub;
  }, [activeTeamId, currentUser]);

  // Fetch tasks for active team
  useEffect(() => {
    if (!activeTeamId) {
      setTeamTasks([]);
      return;
    }
    const q = collection(db, "teams", activeTeamId, "tasks");
    const unsub = onSnapshot(q, (snap) => {
      setTeamTasks(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return unsub;
  }, [activeTeamId]);

  // Create a new team
  const createTeam = useCallback(
    async (newTeamName, currentUser) => {
      if (!currentUser) return;
      if (!newTeamName || !newTeamName.trim()) {
        alert("Team name is required.");
        return;
      }
      const docRef = await addDoc(collection(db, "teams"), {
        name: newTeamName,
        createdBy: currentUser.uid,
        createdAt: serverTimestamp(),
        members: [
          // currentUser.uid,
          {
            userId: currentUser.uid,
            email: currentUser.email,
            role: "team leader",
          },
        ],
        invites: [],
      });
      setActiveTeamId(docRef.id);
      console.log(activeTeamId);
      return docRef.id;
    },
    [activeTeamId]
  );

  // Invite a member by email
  const inviteTeamMember = useCallback(
    async (teamId, inviteeEmail) => {
      const inviter = currentUser;
      try {
        //  Query users collection to get invitee userId by email
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", inviteeEmail));
        const userSnap = await getDocs(q);

        if (userSnap.empty) {
          alert("please enter your registered email address");
          throw new Error("Invitee not found.");
        }

        const inviteeDoc = userSnap.docs[0];
        const inviteeUserId = inviteeDoc.id;

        // Use only name and email fields
        // const { email } = inviteeDoc.data() || "";
        const inviteeName = inviteeDoc.data().username || "";

        // Get team data
        const teamRef = doc(db, "teams", teamId);
        const teamSnap = await getDoc(teamRef);

        if (!teamSnap.exists()) {
          throw new Error("Team not found.");
        }

        const teamData = teamSnap.data();
        const teamName = teamData.name || "";

        if (!inviteeEmail) {
          alert("Email is required.");
          setLoading(false);
          return;
        }
        // Check if already invited
        if (
          (teamData.invites || []).some((inv) => inv.email === inviteeEmail)
        ) {
          alert("This email has already been invited.");
          setLoading(false);
          return;
        }
        //  Add invite to team's invites array
        await updateDoc(teamRef, {
          invites: arrayUnion({
            inviteeEmail,
            inviteeUserId,
            inviteeName,
            invitedBy: inviter.email,
            invitedAt: new Date().toISOString(),
            status: "pending",
          }),
        });
        //  Send notification to invitee
        await addTeamNotifications({
          type: "team-invite",
          invitationData: {
            to: inviteeEmail,
            type: "team-invite",
            teamId: activeTeamId,
            teamName,
            inviterName: username,
            inviteeName,
            inviterEmail: inviter.email,
            inviteeEmail,
            createdAt: serverTimestamp(),
            status: "pending",
          },
        });
        //  Send notification to inviter (optional)
        // await addTeamNotifications({
        //   to: inviter.email,
        //   type: "invite-sent",
        //   teamId,
        //   inviteeEmail,
        //   createdAt: serverTimestamp(),
        //   status: "sent",
        // });

        alert("Invitation sent!");
      } catch (err) {
        console.error("Failed to invite:", err);
        alert(
          "Failed to send invitation. Please check your permissions and try again."
        );
      }
    },
    [currentUser, addTeamNotifications, activeTeamId, username]
  );
  console.log(invitee);
  //Accept team invite by invitee
  const acceptTeamInvite = async (teamId, invitee) => {
    try {
      const teamRef = doc(db, "teams", teamId);
      const teamSnap = await getDoc(teamRef);
      if (!teamSnap.exists()) {
        alert("Team not found.");
        setLoading(false);
        return;
      }

      const team = teamSnap.data();

      // Only allow creator to invite
      if (team.createdBy !== currentUser.uid) {
        alert("Only the team creator can invite members.");
        setLoading(false);
        return;
      }

      // Check if already a member
      if ((team.members || []).some((m) => m.userId === invitee.usserId)) {
        alert("This user is already a member.");
        setLoading(false);
        return;
      }

      // Add invitee as a member with role "member"
      //  Query users collection to get invitee userId by email
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", invitee.email));
      const userSnap = await getDocs(q);

      if (userSnap.empty) {
        throw new Error("Invitee not found.");
      }

      const inviteeDoc = userSnap.docs[0];
      const inviteeUserId = inviteeDoc.id;

      // Use only name and email fields
      const { username = "", email } = inviteeDoc.data() || "";

      await updateDoc(teamRef, {
        members: arrayUnion({
          userId: inviteeUserId,
          email,
          // username,
          role: "member",
        }),
      });

      //  Update invite status in invites array (fetch, modify, set)
      if (teamSnap.exists()) {
        const data = teamSnap.data();
        const updatedInvites = (data.invites || []).map((inv) =>
          inv.email === invitee.inviteeEmail
            ? { ...inv, status: "accepted" }
            : inv
        );
        await updateDoc(teamRef, { invites: updatedInvites });
      }

      alert("you have been added as member of the team successfully!");
      // 3. Update notification status (optional)
      // Find the invite notification for this user and team, then update its status
      // (You may want to use a query to find and update the notification document)
    } catch (error) {
      console.error("Failed to accept team invitation:", error);
    }
  };

  //Remove team member only by the creator
  const removeTeamMember = useCallback(async (teamId, memberObj) => {
    const teamRef = doc(db, "teams", teamId);
    await updateDoc(teamRef, {
      members: arrayRemove(memberObj),
    });
  }, []);

  // Change member role
  const changeMemberRole = useCallback(async (teamId, memberObj, newRole) => {
    const teamRef = doc(db, "teams", teamId);
    // Remove old member object, add new with updated role
    await updateDoc(teamRef, {
      members: arrayRemove(memberObj),
    });
    await updateDoc(teamRef, {
      members: arrayUnion({ ...memberObj, role: newRole }),
    });
  }, []);

  // Add a task to the team
  const addTeamTask = useCallback(async (teamId, task) => {
    const tasksRef = collection(db, "teams", teamId, "tasks");
    await addDoc(tasksRef, {
      ...task,
      createdAt: serverTimestamp(),
    });
  }, []);

  // Assign a task to a member
  const assignTask = useCallback(async (teamId, taskId, assigneeId) => {
    const taskRef = doc(db, "teams", teamId, "tasks", taskId);
    await updateDoc(taskRef, { assigneeId });
  }, []);

  // Add a comment to a task
  const addTaskComment = useCallback(async (teamId, taskId, comment) => {
    const commentsRef = collection(
      db,
      "teams",
      teamId,
      "tasks",
      taskId,
      "comments"
    );
    await addDoc(commentsRef, {
      ...comment,
      createdAt: serverTimestamp(),
    });
  }, []);

  // Fetch comments for a task (returns a hook)
  const useTaskComments = (teamId, taskId) => {
    const [comments, setComments] = useState([]);
    useEffect(() => {
      if (!teamId || !taskId) return;
      const q = query(
        collection(db, "teams", teamId, "tasks", taskId, "comments")
      );
      const unsub = onSnapshot(q, (snap) => {
        setComments(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
      return unsub;
    }, [teamId, taskId]);
    return comments;
  };

  return (
    <TeamCollabContext.Provider
      value={{
        teams,
        activeTeamId,
        setActiveTeamId,
        teamMembers,
        teamInvites,
        teamTasks,
        createTeam,
        onInvite: inviteTeamMember,
        onRemove: removeTeamMember,
        onRoleChange: changeMemberRole,
        addTeamTask,
        onAssign: assignTask,
        addTaskComment,
        useTaskComments,
        acceptTeamInvite,
        teamName,
        setTeamName,
        email,
        setEmail,
        loading,
        setLoading,
        useTeam,
        team,
      }}
    >
      {children}
    </TeamCollabContext.Provider>
  );
}
// const inviteTeamMember = useCallback(
//   async (teamId, inviteeEmail, inviter) => {
//     const teamRef = doc(db, "teams", teamId);
//     if (!inviteeEmail) {
//       alert("Email is required.");
//       return;
//     }

//     // 1. Add invite to team's invites array
//     await updateDoc(teamRef, {
//       invites: arrayUnion({
//         inviteeEmail,
//         invitedBy: currentUser.email,
//         invitedAt: new Date().toISOString(),
//         status: "pending",
//       }),
//     });
//     // 2. Send notification to invitee
//     if (!inviter || !inviter.userId || !inviter.email) {
//       throw new Error("Inviter information is missing or incomplete.");
//     }
//     await addDoc(collection(db, "notifications"), {
//       to: inviteeEmail,
//       type: "team-invite",
//       teamId,
//       inviterId: inviter.userId,
//       inviterEmail: inviter.email,
//       createdAt: serverTimestamp(),
//       status: "pending",
//     });
//     // 3. Send notification to inviter (optional)
//     await addDoc(collection(db, "notifications"), {
//       to: inviter.email,
//       type: "invite-sent",
//       teamId,
//       inviteeEmail,
//       createdAt: serverTimestamp(),
//       status: "sent",
//     });
//   },
//   [currentUser]
// );

// const inviteTeamMember = async (teamId, inviteeEmail, teamName) => {
//   const teamRef = doc(db, "teams", teamId);
//   const teamSnap = await getDocs(teamRef);

//   if (!teamSnap.exists()) {
//     alert("Team not found.");
//     setLoading(false);
//     return;
//   }

//   const teamData = teamSnap.data();
//   // 2. Only allow creator to invite (if that's your rule)
//   if (teamData.createdBy !== currentUser.uid) {
//     alert("Only the team creator can invite members.");
//     setLoading(false);
//     return;
//   }
//   // 3. Check if already invited
//   if ((teamData.invites || []).some((inv) => inv.email === email)) {
//     alert("This email has already been invited.");
//     setLoading(false);
//     return;
//   }
//   const inviter = {
//     userId: teamData.createdBy,
//     email:
//       teamData.members.find((m) => m.userId === teamData.createdBy)?.email ||
//       "",
//   };

//   // 1. Add invite to team's invites array
//   await updateDoc(teamRef, {
//     invites: arrayUnion({
//       email: inviteeEmail,
//       invitedAt: new Date().toISOString(),
//       status: "pending",
//     }),
//   });
//   alert("Invitation sent!");
//   // 2. Send notification to invitee
//   if (!inviter || !inviter.userId || !inviter.email) {
//     throw new Error("Inviter information is missing or incomplete.");
//   }
//   await addDoc(collection(db, "notifications"), {
//     to: inviteeEmail,
//     type: "team-invite",
//     teamId,
//     inviterId: inviter.userId,
//     inviterEmail: inviter.email,
//     createdAt: serverTimestamp(),
//     status: "pending",
//   });
//   // 3. Send notification to inviter (optional)
//   await addDoc(collection(db, "notifications"), {
//     to: inviter.email,
//     type: "invite-sent",
//     teamId,
//     inviteeEmail,
//     createdAt: serverTimestamp(),
//     status: "sent",
//   });
//   setLoading(false);
// };
// const acceptTeamInvites = useCallback(
//   async (id, invitee) => {
//     if (!currentUser) return;
//     try {
//       const teamDoc = doc(db, "users", currentUser.uid, "teams", id);
//       await updateDoc(teamDoc, { status: "accepted" });
//       setTeams((prev) =>
//         prev.map((notif) =>
//           notif.id === id ? { ...notif, status: "accepted" } : notif
//         )
//       );
//       //  Update invite status in invites array (fetch, modify, set)
//       const teamSnap = await getDoc(teamDoc);
//       if (teamSnap.exists()) {
//         const data = teamSnap.data();
//         const updatedInvites = (data.invites || []).map((inv) =>
//           inv.email === invitee.email ? { ...inv, status: "accepted" } : inv
//         );
//         await updateDoc(teamRef, { invites: updatedInvites });
//       }
//       //  Add invitee to members array
//       await updateDoc(teamDoc, {
//         members: arrayUnion({
//           userId: invitee.userId,
//           email: invitee.email,
//           role: "member",
//         }),
//       });
//     } catch (error) {
//       console.error("Failed to accept team invitation:", error);
//     }
//   },
//   [currentUser]
// );
