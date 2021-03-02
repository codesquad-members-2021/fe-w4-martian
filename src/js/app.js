import '../scss/style.scss';
// import variables from '../scss/_export.scss'; -> not working..
import { getTransceiver } from './transceiver.js';

const SERVER = 'http://localhost:3000/';

export const COMMUNICATION_INTERVAL = 1000;
export const PIE_CNT = 16;

getTransceiver()(16);