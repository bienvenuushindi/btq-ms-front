import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function toastShow(target, message = 'This is an info notification') {
  const options = {
    position: 'top-right',
    autoClose: 3000, // Auto close after 3 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
  }

  switch (target) {
    case 'success':
      toast.success(message, options);
      break;
    case 'warning':
      toast.warning(message, options);
      break;
    case 'error':
      toast.error(message, options);
      break;
    case 'info':
      toast.info(message, options);
      break;
    default:
      toast(message, options);
  }

}