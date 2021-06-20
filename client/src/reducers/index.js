import modalReducers from "./modal"

import { combineReducers } from "redux";

const allReducers = combineReducers({
  modal: modalReducers
});

export default allReducers;
