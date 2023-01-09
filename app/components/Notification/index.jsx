import { notification } from "antd";

const NotificationStatus = (type, message, description) => {
  notification[type]({
    placement: "topRight",
    style: {
      marginTop: 50,
    },
    description: description || "",
    message: message || "Fixture Care",
  });
};

export default NotificationStatus;
