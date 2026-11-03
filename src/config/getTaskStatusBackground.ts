interface StatusStyle {
  class: string;
  bg: string;
  img: string;
}

const getStatusClass = (statusId: string | number): StatusStyle => {
  switch (String(statusId)) {
    case "1790072831425": // in progress
      return {
        class: "btn-sts-progress",
        bg: "#DBEAFE",
        img: "/progress.png"
      };

    case "1790072865066": // completed
      return {
        class: "btn-sts-completed",
        bg: "#DCFCE7",
        img: "/completed.png"
      };

    case "1790072901800": //cancelled
      return {
        class: "btn-sts-cancel",
        bg: "#FEE2E2",
        img: "/cancelled.png"
      };

    case "1790072930021": //overdue ហួសកំណត់
      return {
        class: "btn-sts-overdue",
        bg: "#FEF3C7",
        img: "/overdue.png"
      };

    case "1790072790734": //default
    default:
      return {
        class: "btn-sts-default",
        bg: "#F1F5F9",
        img: "/default.png"
      };
  }
};

export default getStatusClass;