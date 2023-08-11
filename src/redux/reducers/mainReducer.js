import { combineReducers } from "@reduxjs/toolkit";

import dashboardReducer from "./dashboardReducer";
import chatReducer from "./chatReducer";

const mainReducer = combineReducers({
  dashboard: dashboardReducer,
  chat: chatReducer,
});

export default mainReducer;
