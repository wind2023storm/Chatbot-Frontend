import axios from "axios";
import notification from "../../utils/notifications";

import { ADD_CHAT } from "../type";
import { GET_CHAT } from "../type";
import { SET_CHATBOT } from "../type";
import { GET_CHATBOT } from "../type";

export const addchat = (dispatch, data) => {
  axios
    .post("/api/addchat", data)
    .then((res) => {
      if (res.status === 200)
        dispatch({ type: ADD_CHAT, payload: res.data.data });
      else notification("error", "Error Add Chat!");
    })
    .catch((err) => console.log(err));
};

export const getchat = (dispatch, data) => {
  dispatch({ type: GET_CHAT, payload: JSON.stringify(data) });
};

export const setchatbot = (dispatch, data) => {
  dispatch({ type: SET_CHATBOT, payload: data });
};

export const getchatbot = (dispatch, data) => {
  axios
    .post("/api/get_message", data)
    .then((res) => {
      if (res.status === 200)
        dispatch({ type: GET_CHATBOT, payload: res.data.data });
      else notification("error", "Error Get ChatBot!");
    })
    .catch((err) => console.log(err));
};
