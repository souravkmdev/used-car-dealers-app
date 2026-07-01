import Toast from 'react-native-toast-message';

export const ShowSuccess = (message: string) => {
  Toast.show({
    type: 'success',
    text1: message || 'Confirmed',
    position: 'top',
    visibilityTime: 2000,
  });
};

export const ShowWarning = (message: string) => {
  Toast.show({
    type: 'info',
    text1: message || "Something's wrong!",
    position: 'top',
    visibilityTime: 2000,
  });
};

export const ShowError = (message: string) => {
  Toast.show({
    type: 'error',
    text1: message || 'Error Occurred',
    position: 'top',
    visibilityTime: 3000,
  });
};