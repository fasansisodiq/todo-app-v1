import { useEffect, useState } from "react";
import { useNotifications } from "../../customHooks/notification/useNotifications";
import NotificationCard from "./NotificationCard";
import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import { useTeamCollab } from "../../customHooks/team-collaboration/useTeamCollab";
import { useAuth } from "../../authentication/useAuth";

function NotificationPage() {
  const { acceptTeamInvite } = useTeamCollab();
  const { currentUser } = useAuth();
  const { notifications, loading, markAsRead, changeInviteStatus } =
    useNotifications();
  const navigate = useNavigate();

  // State for toggling notifications view
  const [showAll, setShowAll] = useState(false);

  // Auto-delete read notifications older than 7 days
  useEffect(() => {
    const now = new Date();
    notifications.forEach((notif) => {
      if (
        notif.read &&
        notif.createdAt &&
        new Date(notif.createdAt).getTime() <
          now.getTime() - 7 * 24 * 60 * 60 * 1000
      ) {
        deleteDoc(doc(db, "notifications", notif.id));
      }
    });
  }, [notifications]);

  if (loading) return <div>Loading notifications...</div>;
  if (!notifications.length) return <div>No notifications.</div>;

  // Sort: unread first, then by createdAt desc
  const sortedNotifications = [...notifications].sort((a, b) => {
    if (a.read === b.read) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return a.read ? 1 : -1; // unread first
  });

  // Limit to 5 notifications unless showAll is true
  const visibleNotifications = showAll
    ? sortedNotifications
    : sortedNotifications.slice(0, 5);

  return (
    <div className="max-w-2xl mx-auto py-8 px-2">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-4 px-4 py-2 rounded-lg bg-emerald-600 text-white dark:text-yellow-200 font-semibold shadow hover:bg-emerald-700 dark:hover:text-yellow-500 dark:hover:bg-emerald-900 transition-all duration-200"
      >
        <FaArrowLeft className="text-lg" />
        Back
      </button>
      <h1 className="text-2xl font-bold mb-6 text-emerald-700 dark:text-yellow-300 text-center">
        Notifications
      </h1>

      {visibleNotifications.map(
        (notif) =>
          notif && (
            <NotificationCard
              key={notif.id}
              notifications={notif}
              onMarkAsRead={markAsRead}
              onChangeInviteStatus={changeInviteStatus}
              onAcceptTeamInvite={acceptTeamInvite}
              currentUser={currentUser}
            />
          )
      )}

      <div className="flex justify-center mt-4">
        {sortedNotifications.length > 5 && (
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="px-4 py-2 rounded bg-emerald-100 dark:bg-yellow-900 text-emerald-700 dark:text-yellow-200 font-semibold hover:bg-emerald-200 dark:hover:bg-yellow-800 transition-all duration-200"
          >
            {showAll ? "See less" : "See more"}
          </button>
        )}
      </div>
    </div>
  );
}

export default NotificationPage;
