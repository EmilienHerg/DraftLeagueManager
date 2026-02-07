import { notifications } from "@mantine/notifications";
import '@mantine/notifications/styles.css';

export const showSuccessNotification = (message: string, title: string = "Succès") => {
  notifications.show({
    title,
    message,
    color: "blue",
    withCloseButton: true,
  });
};

export const showErrorNotification = (message: string, title: string = "Erreur") => {
  notifications.show({
    title,
    message,
    color: "red",
    withCloseButton: true,
  });
};

export default showSuccessNotification;