import { $alert } from './index.js';
import { handleWheel, translateCharToHex } from './transmitter.js';

let message = '';

const receiver = (val) => {
  setTimeout(() => {
    $alert.style.setProperty('display', 'block');
    message = val;
  }, 1000);
};

const execReception = () => {
  $alert.style.setProperty('display', 'none');
  handleWheel(translateCharToHex(message));
};

export { receiver, execReception };
