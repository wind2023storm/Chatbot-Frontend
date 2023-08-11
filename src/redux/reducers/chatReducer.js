import { ADD_CHAT } from "../type";
import { GET_CHAT } from "../type";
import { SET_CHATBOT } from "../type";
import { GET_CHATBOT } from "../type";

const initialState = {
  chat: localStorage.getItem("chat"),
  chatbot: localStorage.getItem("chatbot"),
  chatmessage: localStorage.getItem("chatmessage"),
};

const chatReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_CHAT:
      localStorage.setItem("chat", payload);
      return {
        ...state,
        chat: localStorage.getItem("chat"),
      };
    case GET_CHAT:
      localStorage.setItem("chat", payload);
      return {
        ...state,
        chat: localStorage.getItem("chat"),
      };
    case SET_CHATBOT:
      localStorage.setItem("chatbot", payload);
      return {
        ...state,
        chatbot: localStorage.getItem("chatbot"),
      };
    case GET_CHATBOT:
      localStorage.setItem("chatmessage", payload);
      return {
        ...state,
        chatmessage: localStorage.getItem("chatmessage"),
      };
    default:
      return state;
  }
};

export default chatReducer;
