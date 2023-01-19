import {showMessage} from 'react-native-flash-message';

export const ErrorShowMessage = (message, type) => {
  showMessage({
    message: message,
    type: type,
    position: 'top',
    style: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};
