import { Notyf } from "notyf";
import 'notyf/notyf.min.css';

export const notification = new Notyf({
  duration: 2000,
  ripple: true,
  position: {x: 'right', y: 'top'},
  dismissible: true,
})
