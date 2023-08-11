import { stringConstant, webAPI } from "../../utils/constants";
import {
  SET_FEATURED_PROPERTIES,
  SET_HOMEPAGE_SECTION,
  SET_RECENT_PROPERTIES,
} from "../type";
import notification from "../../utils/notification";
import axios from "axios";

export const getFeatureData = (dispatch) => {
  axios
    .get(webAPI.getFeatureData)
    .then((res) => {
      if (res.data.code === 200)
        dispatch({ type: SET_FEATURED_PROPERTIES, payload: res.data.data });
      else notification("error", stringConstant.FAILED_GET_DATA);
    })
    .catch((err) => console.log(err));
};

export const getRecentData = (dispatch) => {
  axios
    .get(webAPI.getRecentData)
    .then((res) => {
      if (res.data.code === 200)
        dispatch({ type: SET_RECENT_PROPERTIES, payload: res.data.data });
      else notification("error", stringConstant.FAILED_GET_DATA);
    })
    .catch((err) => console.log(err));
};

export const getHomepageContentSection = (dispatch) => {
  axios
    .get(webAPI.getHomepageContentSection)
    .then((res) => {
      if (res.data.code === 200)
        dispatch({ type: SET_HOMEPAGE_SECTION, payload: res.data.data });
      else notification("error", stringConstant.FAILED_GET_DATA);
    })
    .catch((err) => console.log(err));
};
