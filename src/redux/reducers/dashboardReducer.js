import {
  SET_THEME,
  SET_HOMEPAGE_SECTION,
  SET_RECENT_PROPERTIES,
} from "../type";

const initialState = {
  theme: localStorage.getItem("theme") !== "dark" ? "light" : "dark",
};

const dashboardReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_THEME:
      localStorage.setItem("theme", payload);
      return {
        ...state,
        theme: localStorage.getItem("theme"),
      };
    case SET_HOMEPAGE_SECTION:
      return {
        ...state,
        homepage_section: payload,
      };
    case SET_RECENT_PROPERTIES:
      return {
        ...state,
        recent_properties: payload,
      };
    default:
      return state;
  }
};

export default dashboardReducer;
