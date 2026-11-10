
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

const CHANNEL_ID = "daily-reminders";

// Define how notifications appear while TinyWins is open.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Configure the Android notification channel.
export async function configureNotifications(): Promise<void> {
  if (Platform.OS !== "android") return;

  try {
    const existingChannel =
      await Notifications.getNotificationChannelAsync(
        CHANNEL_ID
      );

    if (existingChannel) {
      console.log(
        "[TinyWins] Notification channel already exists."
      );
      return;
    }

    await Notifications.setNotificationChannelAsync(
      CHANNEL_ID,
      {
        name: "Daily Reminders",
        importance: Notifications.AndroidImportance.DEFAULT,
        sound: "default",
      }
    );

    console.log(
      "[TinyWins] Notification channel created."
    );
  } catch (error) {
    console.error(
      "[TinyWins] Channel configuration failed:",
      error
    );

    throw error;
  }
}

// Request permission only when the user enables reminders.
export async function requestNotificationPermission(): Promise<boolean> {
  await configureNotifications();

  const existing = await Notifications.getPermissionsAsync();

  if (existing.granted) {
    return true;
  }

  if (!existing.canAskAgain) {
    return false;
  }

  const requested = await Notifications.requestPermissionsAsync();

  return requested.granted;
}

// Check the current notification permission.
export async function hasNotificationPermission(): Promise<boolean> {
  const permission = await Notifications.getPermissionsAsync();

  return permission.granted;
}

// Validate HH:MM in 24-hour format.
export function isValidReminderTime(time: string): boolean {
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(time);
}

// Convert a time to a readable 12-hour format.
export function formatReminderTime(time: string): string {
  if (!isValidReminderTime(time)) return time;

  const [hour, minute] = time.split(":").map(Number);

  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;

  return `${displayHour}:${String(minute).padStart(2, "0")} ${period}`;
}

// Cancel only the reminder identified by its saved ID.
export async function cancelDailyReminder(
  notificationId: string | null
): Promise<void> {
  if (!notificationId) return;

  await Notifications.cancelScheduledNotificationAsync(
    notificationId
  );
}

// Schedule one repeating daily reminder.
export async function scheduleDailyReminder(
  time: string
): Promise<string> {
  if (!isValidReminderTime(time)) {
    throw new Error("Invalid reminder time.");
  }

  await configureNotifications();

  const permitted = await hasNotificationPermission();

  if (!permitted) {
    throw new Error("Notification permission not granted.");
  }

  const [hour, minute] = time.split(":").map(Number);

  const notificationId =
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Your three TinyWins await!",
        body: "A few small steps today can make a big difference.",
        data: {
          type: "daily-reminder",
        },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
        ...(Platform.OS === "android"
          ? { channelId: CHANNEL_ID }
          : {}),
      },
    });

  return notificationId;
}
