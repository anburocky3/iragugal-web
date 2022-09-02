export const fbErrorHandlingMessage = (errCode) => {
  switch (errCode) {
    case 'auth/wrong-password':
      return 'Wrong Password';
    case 'auth/email-already-in-use':
      return 'Email already in use';

    default:
      return 'Unknown error';
      break;
  }
};

export const shareWhatsApp = () => {
  const message =
    'Hey, change the world by joining Iragugal organisation. Join here: https://iragugal.com';
  return `https://api.whatsapp.com/send?text=${message}`;
};

export const calculateAge = (dob: string) => {
  var today = new Date();
  var birthDate = new Date(dob);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const getMembershipType = (membership: string) => {
  return membership.replace(' Member', '');
};
