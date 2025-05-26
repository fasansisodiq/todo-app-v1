// FAQ data grouped by section for better rendering
const faqSections = [
  {
    header: "General Usage & Management",
    faqs: [
      {
        id: 1,
        question: "How do I create a new task/list?",
        answer:
          "To create a new task or list, click on the '➕' button and fill in the details.",
      },
      {
        id: 2,
        question: "How do I delete a task or list?",
        answer:
          "To delete a task or list, select it and click on the ' ••• ', then click on 'Delete' button.",
      },
      {
        id: 3,
        question: "How do I move or reorder tasks?",
        answer:
          "To move or reorder tasks, click and drag the task to the desired position.",
      },
      {
        id: 4,
        question: "Can I set due dates or reminders?",
        answer:
          "Yes, you can set due dates and reminders for tasks in the task details.",
      },
      {
        id: 5,
        question: "How do I mark a task as complete?",
        answer:
          "To mark a task as complete, select it and click on the ' ••• ', then click on 'mark as completed' button.",
      },
      {
        id: 6,
        question: "Can I prioritize tasks?",
        answer:
          "Yes, you can prioritize tasks by checking the priority box while adding it as new task.",
      },
    ],
  },
  {
    header: "Sharing and Collaboration",
    faqs: [
      {
        id: 7,
        question: "How do I share a list with someone else?",
        answer:
          "To share a list, click on the 'Share' button and enter the email address of the person you want to share it with.",
      },
      {
        id: 8,
        question: "Can multiple people edit a shared list?",
        answer: "Yes, multiple people can edit a shared list simultaneously.",
      },
      {
        id: 9,
        question: "How can I delegate tasks to others?",
        answer:
          "To delegate tasks, assign them to specific users in the task details while adding it as new task.",
      },
      {
        id: 10,
        question: "How do I invite team members to my workspace?",
        answer:
          "Go to your workspace settings and use the 'Invite' option to send an invitation via email.",
      },
      {
        id: 11,
        question: "Can I assign tasks to other users?",
        answer:
          "Yes, when creating or editing a task, you can assign it to any member of your workspace.",
      },
      {
        id: 12,
        question: "How do I manage permissions for collaborators?",
        answer:
          "You can manage permissions in the workspace or list settings, choosing who can view, edit, or manage tasks.",
      },
      {
        id: 13,
        question: "Can I see who completed or edited a task?",
        answer:
          "Yes, each task shows an activity log with details about who created, edited, or completed it.",
      },
      {
        id: 14,
        question: "How do I stop sharing a list or remove a collaborator?",
        answer:
          "Go to the list's sharing settings and remove the user you no longer want to collaborate with.",
      },
    ],
  },
  {
    header: "Features and Customization",
    faqs: [
      {
        id: 15,
        question: "What are the different list types?",
        answer:
          "The app supports various list types, including planned lists, social lists, and project lists e.t.c.",
      },
      {
        id: 16,
        question: "Can I create sublists?",
        answer:
          "Yes, you can create sublists within a main list for better organization.",
      },
      {
        id: 17,
        question: "How do I set up recurring tasks?",
        answer:
          "To set up recurring tasks, select the task and choose the recurrence option in the task details.",
      },
      {
        id: 18,
        question: "Can I filter my lists?",
        answer:
          "Yes, you can filter your lists based on due dates, priority levels, and other criteria.",
      },
      {
        id: 19,
        question: "How do I manage notifications?",
        answer:
          "You can manage notifications in the app settings under 'Notifications'.",
      },
      {
        id: 20,
        question: "Can I import or export my data?",
        answer:
          "Yes, you can import and export your data in various formats from the settings menu.",
      },
    ],
  },
  {
    header: "Troubleshooting",
    faqs: [
      {
        id: 21,
        question: "What if I can't find a task?",
        answer:
          "If you can't find a task, try using the search function or check your trashed tasks.",
      },
      {
        id: 22,
        question: "What if a task disappears?",
        answer:
          "If a task disappears, check your trash or archived tasks to see if it was accidentally deleted.",
      },
      {
        id: 23,
        question: "How do I fix a problem with syncing my list?",
        answer:
          "To fix syncing issues, try refreshing the app or checking your internet connection.",
      },
      {
        id: 24,
        question: "Why can't I log in?",
        answer:
          "Check your email and password for typos. If you forgot your password, use the 'Forgot password?' link on the login page.",
      },
      {
        id: 25,
        question: "Why are my tasks not syncing across devices?",
        answer:
          "Ensure you have an active internet connection. Try refreshing the app or logging out and back in.",
      },
      {
        id: 26,
        question: "How do I report a bug or request a feature?",
        answer:
          "Contact our support team via email or WhatsApp with details about the issue or your feature request.",
      },
      {
        id: 27,
        question: "What should I do if the app is slow or unresponsive?",
        answer:
          "Try closing and reopening the app. Make sure you are using the latest version. If the problem persists, contact support.",
      },
      {
        id: 28,
        question: "I can't find a task I created. What should I do?",
        answer:
          "Use the search function or check your trashed and archived tasks. If you still can't find it, contact support.",
      },
    ],
  },
  {
    header: "Account & Security",
    faqs: [
      {
        id: 29,
        question: "How do I reset my password?",
        answer:
          "Go to the login page and click on 'Forgot password?'. Follow the instructions sent to your email to reset your password.",
      },
      {
        id: 30,
        question: "How do I change my email address?",
        answer:
          "Navigate to your account settings, then update your email address and save the changes.",
      },
      {
        id: 31,
        question: "How do I delete my account?",
        answer:
          "To delete your account, go to account settings and select 'Delete Account'. Please note this action is irreversible.",
      },
      {
        id: 32,
        question: "Is my data secure and private?",
        answer:
          "Yes, your data is encrypted and stored securely. We do not share your information with third parties.",
      },
    ],
  },
  {
    header: "Notifications & Reminders",
    faqs: [
      {
        id: 33,
        question: "Why am I not receiving notifications?",
        answer:
          "Make sure notifications are enabled in your device settings and in the app's notification settings.",
      },
      {
        id: 34,
        question: "How do I customize notification settings?",
        answer:
          "Go to the app settings and select 'Notifications' to customize which notifications you receive and how.",
      },
      {
        id: 35,
        question: "Can I get reminders via email or SMS?",
        answer:
          "Currently, reminders are sent as push notifications. Email or SMS reminders may be added in future updates.",
      },
      {
        id: 36,
        question: "How do I set a reminder for a task?",
        answer:
          "When creating or editing a task, look for the reminder option and set your preferred date and time.",
      },
    ],
  },
  {
    header: "List & Organization",
    faqs: [
      {
        id: 37,
        question: "How do I create a new list or project?",
        answer:
          "Click the 'New List' or 'New Project' button in the sidebar, enter a name, and start adding tasks.",
      },
      {
        id: 38,
        question: "How do I color-code or label my lists?",
        answer:
          "Open the list settings and choose a color or label to help visually organize your lists.",
      },
      {
        id: 39,
        question: "Can I merge two lists?",
        answer:
          "Currently, merging lists is not supported directly. You can move tasks from one list to another manually.",
      },
      {
        id: 40,
        question: "How do I sort tasks within a list?",
        answer:
          "You can drag and drop tasks to reorder them, or use the sort options to arrange by due date, priority, or creation date.",
      },
      {
        id: 41,
        question: "Can I archive or hide old lists?",
        answer:
          "Yes, you can archive lists from the list options menu. Archived lists are hidden from your main view but can be restored anytime.",
      },
    ],
  },
  {
    header: "Billing & Subscription",
    faqs: [
      {
        id: 42,
        question: "How do I upgrade or downgrade my subscription plan?",
        answer:
          "Go to your account settings and select 'Subscription'. From there, you can choose a new plan and follow the prompts to upgrade or downgrade.",
      },
      {
        id: 43,
        question: "Where can I view my invoices or payment history?",
        answer:
          "You can view your invoices and payment history in the 'Billing' section of your account settings.",
      },
      {
        id: 44,
        question: "How do I update my payment method?",
        answer:
          "Navigate to the 'Billing' section in your account settings and click on 'Update Payment Method' to add or change your payment details.",
      },
      {
        id: 45,
        question: "How do I cancel my subscription?",
        answer:
          "To cancel your subscription, go to the 'Subscription' section in your account settings and select 'Cancel Subscription'. Your access will continue until the end of your current billing period.",
      },
      {
        id: 46,
        question: "Will I lose my data if I cancel my subscription?",
        answer:
          "No, your data will be retained, but you may lose access to premium features. You can reactivate your subscription at any time.",
      },
    ],
  },
  {
    header: "Mobile & Integration",
    faqs: [
      {
        id: 47,
        question: "Is there a mobile app available?",
        answer:
          "Yes, our app is available for both iOS and Android. Download it from the App Store or Google Play Store.",
      },
      {
        id: 48,
        question: "Can I sync my tasks with Google Calendar or Outlook?",
        answer:
          "Yes, you can connect your account to Google Calendar or Outlook from the integrations section in your settings.",
      },
      {
        id: 49,
        question: "Does the app integrate with Slack, Zapier, or other tools?",
        answer:
          "We support integrations with Slack and Zapier. Visit the integrations section in your settings to connect more tools.",
      },
      {
        id: 50,
        question: "Can I access my tasks offline?",
        answer:
          "Yes, the mobile app supports offline access. Your changes will sync automatically when you're back online.",
      },
      {
        id: 51,
        question: "How do I enable push notifications on mobile?",
        answer:
          "Enable push notifications in your device settings and allow notifications for our app.",
      },
    ],
  },
];

export default faqSections;
