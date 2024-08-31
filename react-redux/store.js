import { createStore } from "./core.js";
import reducer from "./reducer.js";

// Create store and get methods to use
const { attach, connect, dispatch } = createStore(reducer);

window.dispatch = dispatch;

export { attach, connect };
