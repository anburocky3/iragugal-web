export const fbErrorHandlingMessage = (errCode) => {
  switch (errCode) {
    case "auth/wrong-password":
      return "Wrong Password";
    case "auth/email-already-in-use":
      return "Email already in use";

    default:
      return "Unknown error";
      break;
  }
};

export const shareWhatsApp = () => {
  const message =
    "Hey, change the world by joining Iragugal organisation. Join here: https://iragugal.com";
  return `https://api.whatsapp.com/send?text=${message}`;
};
