import { legacy_createStore as createStore, compose } from "redux";

import mainReducer from "./reducers/mainReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const middlewares = [thunk];

export const store = createStore(mainReducer, composeEnhancers());
