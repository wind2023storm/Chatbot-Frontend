import { useEffect, useState } from "react";
import AOS from "aos";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  getchat,
  getchatbot,
  setchatbot,
} from "../../redux/actions/chatAction";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Markdown from "react-markdown";

import calImg from "../../assets/images/calImg.svg";
import prevArrow from "../../assets/images/prevArrow.svg";
import nextArrow from "../../assets/images/nextArrow.svg";
import calImg_1 from "../../assets/images/calImg_1.svg";
import editImg from "../../assets/images/editImg.svg";
import { Button } from "@mui/material";
import {
  BsPlus,
  BsChatLeft,
  BsBookmark,
  BsTrash3,
  BsMarkdown,
} from "react-icons/bs";
import { FiSettings, FiUpload } from "react-icons/fi";
import { RiSendPlaneLine } from "react-icons/ri";
import { GoSearch } from "react-icons/go";
import { VscSend } from "react-icons/vsc";
import SModal from "../../components/modals";
import { CheckIcon } from "../../components/icons";
import { data } from "autoprefixer";

const API_URL = 'http://3.142.171.244:5000';

const PersonalAI = () => {
  const dispatch = useDispatch();
  const notification = (type, message) => {
    if (type === "error") {
      toast.error(message);
    } else if (type == "success") {
      toast.success(message);
    }
  };
  const [uploadS, setUploadS] = useState(false);
  const [open, setOpen] = useState(false);
  const [flag, setFlag] = useState(false);
  const [openUpload, setUploadOpen] = useState(false);
  const [chat, setChat] = useState({
    level: "",
    age: "",
    gender: "",
    location: "",
  });
  const [chatbot, setChatbot] = useState([]);
  const [message, setMessage] = useState("");
  const [chathistory, setChathistory] = useState([]);
  const chatbotID = JSON.parse(useSelector((state) => state.chat.chat));
  const messageID = useSelector((state) => state.chat.chatbot);
  const [fileData, setFiledata] = useState([]);
  const [Up, setUp] = useState("");
  const [searchValue, setSearchValue] = useState();
  const [selectedItem, setSelectedItem] = useState();
  const [gpxfile, setGpxfile] = useState(null);
  const [gpxImgurl, setgpxImgurl] = useState(null);
  const [selectFlag, setselectFlag] = useState(false);

  const uploadAction = (event) => {
    setSearchValue(event.target.files[0].name);
    setUp(event.target.files[0].name);
    setGpxfile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (gpxfile) {
      const formData = new FormData();
      formData.append("file", gpxfile);
      axios
        .post(`${API_URL}/api/upload`, formData)
        .then((res) => {
          console.log(res.data.data);
          setgpxImgurl(`${API_URL}/static/` + res.data.data);
          setUploadOpen(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickUploadOpen = () => {
    setUploadOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUploadClose = () => {
    setUploadOpen(false);
  };
  const setValue = (e) => {
    setChat({ ...chat, location: e.target.value });
  };
  const onDelete = (id) => {
    console.log(id);
    const formData = new FormData();
    formData.append("id", id);
    axios
      .post(`${API_URL}/api/deletechat`, formData)
      .then((res) => {
        console.log(res);
        getChatBot();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onEdit = (id) => {
    console.log(id);
    const formData = new FormData();
    formData.append("id", id);
    axios
      .post(`${API_URL}/api/editchat`, formData)
      .then((res) => {
        console.log(res);
        // getchat();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addChat = () => {
    let formData = new FormData();
    formData.append("data", JSON.stringify(chat));
    axios
      .post(`${API_URL}/api/addchat`, formData)
      .then((res) => {
        if (!res.data.success) {
          notification("error", res.data.message);
        } else {
          notification("success", res.data.message);
          setChat({
            level: "",
            age: "",
            gender: "",
            location: "",
          });
          getChatBot();
        }
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getChatBot();
  }, []);
  useEffect(() => {
    if (chathistory.length == 2) {
      const formData = new FormData();
      formData.append("chat_name", chathistory[1].content);
      formData.append("uuid", selectedItem);
      console.log(selectedItem);
      axios
        .post(`${API_URL}/api/editchat`, formData)
        .then((res) => {
          getchatbot();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [chathistory]);
  useEffect(() => {
    if (flag == true) {
      axios
        .post(`${API_URL}/api/getchat`, chatbotID)
        .then(async (res) => {
          if (res.data.code === 200) {
            getchat(dispatch, res.data.data);
            await axios
              .post(`${API_URL}/api/createmessage`, res.data.data)
              .then((res1) => {
                if (res1.status === 200) {
                  setchatbot(dispatch, res1.data.data);
                  setFlag(false);
                  axios
                    .post(
                      `${API_URL}/api/getmessages`,
                      res.data.data
                    )
                    .then((res2) => {
                      let temps = res2.data.data;
                      let chathistoryTemp = [];
                      for (let temp in temps) {
                        let messageTemps = temps[temp];
                        for (let messageTemp in messageTemps) {
                          let lastTemps = messageTemps[messageTemp];
                          for (let lastTemp in lastTemps) {
                            chathistoryTemp.push(lastTemps[lastTemp]);
                          }
                        }
                      }
                      setChathistory(chathistoryTemp);
                    });
                }
              })
              .catch((err) => console.log(err));
            // window.location.reload();
          }
        });
    }
  }, [flag]);

  const getChatBot = () => {
    axios.post(`${API_URL}/api/getchatbot`).then((res) => {
      setChatbot(res.data.data);
    });
  };

  const getCurrentChat = (data) => {
    setFlag(true);
    getchat(dispatch, data);
    setSelectedItem(data["uuid"]); //current seleted chatbot
    setselectFlag(true);
    //
  };

  const handleSubmit = (event) => {
    if (event.keyCode === 13) {
      let id = messageID;
      let _message = message;
      if (_message === "") reutrn;
      setChathistory([...chathistory, { role: "human", content: _message }]);
      sendMessage(id, _message);
      event.preventDefault();
      setMessage("");
    }
  };
  const handleSubmitMessage = () => {
    let id = messageID;
    let _message = message;
    if (_message === "") {
      return;
    }
    setChathistory([...chathistory, { role: "human", content: _message }]);
    sendMessage(id, _message);

    setMessage("");
  };
  const sendMessage = (id, _message) => {
    if (!id || !_message) reutrn;
    axios
      .post(`${API_URL}/api/sendchat`, { id, _message })
      .then((res) => {
        if (!res.data.success) {
          notification("error", res.data.message);
        } else {
          receiveMessage(res.data.data);
        }
      });
  };
  const receiveMessage = (message) => {
    setChathistory((preventHistory) => [
      ...preventHistory,
      { role: "ai", content: message },
    ]);
  };

  var upload = <div></div>;

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="flex w-full h-[calc(100vh-80px)] pt-[30px] display:px-[104px] tablet:px-[52px] phone:px-[27px] px-[52px] pb-[50px] flex-col items-start gap-[20px] bg-[#dbdbdb]">
      <Toaster />
      <div className="flex justify-between items-start self-stretch">
        <div className="flex items-start gap-[20px]">
          <div className=" flex items-start gap-3">
            <img className=" w-6 h-6" src={calImg}></img>
            <p className="text-black font-[Inter] text-lg font-semibold leading-normal">
              Today
            </p>
          </div>
          <p className=" text-[#8E8E8E] font-[Inter] text-lg font-light leading-normal">
            /
          </p>
          <p className=" text-black font-[Inter] text-lg font-light leading-normal">
            Friday, Sept 1, 2023
          </p>
        </div>
        <div className=" flex items-start gap-[26px]">
          <Button className=" !w-6 !h-6 !p-0 !min-w-0">
            <img className="w-full h-full" src={prevArrow}></img>
          </Button>
          <Button className=" !w-6 !h-6 !p-0 !min-w-0">
            <img className="w-full h-full" src={nextArrow}></img>
          </Button>
          <Button className=" !w-6 !h-6 !p-0 !min-w-0">
            <img className="w-full h-full" src={calImg_1}></img>
          </Button>
        </div>
      </div>
      <div className=" flex flex-1 w-full items-start shrink-0 self-stretch rounded-[7px] shadow-white/75 shadow-xl bg-white overflow-auto">
        <div className="flex w-[293px] px-4 py-5 flex-col justify-between items-start self-stretch border-r-[#8E8E8E] border-r-solid border-r-[0.5px]">
          <div className=" flex flex-col items-start gap-5 self-stretch">
            <p className="text-black font-[Inter] text-lg font-semibold leading-normal">
              Conversations
            </p>
            {chatbot.map((data) => {
              return (
                <div
                  className=" felx felx-col items-start self-stretch"
                  key={data["uuid"]}
                >
                  <div
                    className={`cursor-pointer flex p-4 justify-between items-start self-stretch rounded-5 ${
                      data["uuid"] === selectedItem
                        ? "bg-[#d5d5d5]"
                        : "bg-[#efefef]"
                    }`}
                  >
                    <div
                      className="flex items-start gap-2.5"
                      onClick={() => getCurrentChat(data)}
                    >
                      <BsChatLeft className="w-5 h-5" />
                      <p className="text-black font-[Inter] text-[16px] font-normal !leading-none">
                        {data["label"]}
                      </p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Button
                        className="!p-0 !min-w-0 w-5 h-5 !text-black"
                        onClick={() => onEdit(data["id"])}
                      >
                        <img className="w-full h-full" src={editImg}></img>
                      </Button>
                      <Button className="!p-0 !min-w-0 w-5 h-5 !text-black">
                        <BsBookmark className="w-full h-full" />
                      </Button>
                      <Button
                        className="!p-0 !min-w-0 w-5 h-5 !text-black"
                        onClick={() => onDelete(data["id"])}
                      >
                        <BsTrash3 className="w-full h-full" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Button
            className="!normal-case flex !h-[50px] !px-4 !py-5 !justify-center !text-white !items-center !gap-0.5 !self-stretch !rounded-[99px] !bg-[#1e1e1e]"
            onClick={handleClickOpen}
          >
            <BsPlus className="w-6 h-6" />
            <p className=" font-[Inter] text-base font-semibold leading-normal">
              New Chat
            </p>
          </Button>
        </div>
        <div className="flex flex-1 flex-col justify-between items-start self-stretch bg-white w-full">
          <div className="flex pt-[23px] flex-col justify-start items-start gap-10 flex-1 self-stretch p-2.5 overflow-x-auto">
            <img src={gpxImgurl} className="w-1/4" />
            {chathistory.map((data, index) => {
              if (data.role == "ai") {
                return (
                  <div
                    key={index}
                    className="flex p-25px items-start gap-20 self-stretch rounded-md	bg-[#F5F5F5]"
                  >
                    <div className="flex p-[25px] items-start gap-20 self-stretch">
                      <img src="/src/assets/images/Ellipse_3.svg"></img>

                      <div className="flex flex-col items-start gap-5 flex-1">
                        <div className="flex-1 text-black-900 font-sans text-sm font-normal leading-6 w-full">
                          <Markdown
                            components={{
                              code({
                                node,
                                inline,
                                className,
                                children,
                                ...props
                              }) {
                                const match = /language-(\w+)/.exec(
                                  className || ""
                                );

                                return !inline && match ? (
                                  <SyntaxHighlighter
                                    style={materialLight}
                                    PreTag="div"
                                    language={match[1]}
                                    children={String(children).replace(
                                      /\n$/,
                                      ""
                                    )}
                                    {...props}
                                  />
                                ) : (
                                  <code
                                    className={className ? className : ""}
                                    {...props}
                                  >
                                    {children}
                                  </code>
                                );
                              },
                            }}
                          >
                            {data.content}
                          </Markdown>
                        </div>
                        <div className="flex gap-5 w-10 h-10 border-red-100"></div>
                        <div className="flex gird grid-flow-row items-start gap-[13.913px]"></div>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    key={index}
                    className="flex items-start gap-20 self-stretch rounded-md	bg-[#FFF] pl-[35px] pr-[35px]"
                  >
                    <div className="flex items-start gap-6 self-stretch">
                      <img src="/src/assets/images/Ellipse_4.svg"></img>

                      <div className="flex flex-col items-start gap-5 flex-1">
                        <div className="flex-1 text-black-900 font-sans text-sm font-normal leading-6 w-full">
                          {data.content}
                        </div>
                        <div className="flex gap-5 w-10 h-10 border-red-100"></div>
                        <div className="flex gird grid-flow-row items-start gap-[13.913px]"></div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div
            className={`flex p-5 items-center gap-4 self-stretch w-full ${
              selectFlag == false ? "pointer-events-none" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <Button className=" !min-w-0 flex !p-2 !justify-center !items-center !gap-2.5 !rounded-full !border-[0.5px] !border-solid !border-[#8E8E8E] !text-[#8E8E8E]">
                <FiSettings className=" w-6 h-6" />
              </Button>
              <Button
                className=" !min-w-0 flex !p-2 !justify-center !items-center !gap-2.5 !rounded-full !border-[0.5px] !border-solid !border-[#8E8E8E] !text-[#8E8E8E]"
                onClick={handleClickUploadOpen}
              >
                <FiUpload className=" w-6 h-6" />
              </Button>
            </div>
            <div className="flex h-[50px] p-4 justify-between items-center w-full border-[0.5px] border-solid border-[#8E8E8E] rounded-[5px] disabled:true">
              <input
                className=" flex-1 !outline-none focus:!outline-none h-full text-[14px] text-black font-normal leading-normal font-[Inter]"
                placeholder="Send a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleSubmit}
              ></input>
              <Button
                className=" !min-w-0 flex !p-2 !justify-center !items-center !gap-2.5 !rounded-full !border-none !text-[#8E8E8E]"
                onClick={() => handleSubmitMessage()}
              >
                <VscSend className=" w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <SModal headerTitle="New Chat" onClose={handleClose} open={open}>
        <div className=" w-full p-5 flex flex-col gap-5 justify-between">
          <p className="text-black text-center font-[Inter] text-[12px] font-normal leading-normal">
            Before we start, we need some information from you! This ensures our
            assistant
            <br /> provides the best possible personalized guidance for your
            fitness level.
          </p>
          <div className=" flex flex-col items-center gap-3">
            <p className="text-black text-center font-[Inter] text-[14px] font-semibold leading-6">
              Rider Level:
            </p>
            <div className={`flex justify-center items-center gap-3`}>
              <Button
                className={`!flex !px-3.5 !py-2.5 !justify-center !items-center !gap-2.5 !rounded-[99px] !border-[0.5px] !border-solid !font-[Inter] !text-[12px] !font-medium !leading-normal !border-[#8E8E8E] ${
                  chat.level === "Beginner"
                    ? " !bg-black !text-white"
                    : " !bg-transparent !text-black"
                }`}
                onClick={() => {
                  setChat({ ...chat, level: "Beginner" });
                }}
              >
                Beginner
              </Button>
              <Button
                className={`!flex !px-3.5 !py-2.5 !justify-center !items-center !gap-2.5 !rounded-[99px] !border-[0.5px] !border-solid !font-[Inter] !text-[12px] !font-medium !leading-normal !border-[#8E8E8E] ${
                  chat.level === "Intermediate"
                    ? " !bg-black !text-white"
                    : " !bg-transparent !text-black"
                }`}
                onClick={() => {
                  setChat({ ...chat, level: "Intermediate" });
                }}
              >
                Intermediate
              </Button>
              <Button
                className={`!flex !px-3.5 !py-2.5 !justify-center !items-center !gap-2.5 !rounded-[99px] !border-[0.5px] !border-solid !font-[Inter] !text-[12px] !font-medium !leading-normal !border-[#8E8E8E] ${
                  chat.level === "Advanced"
                    ? " !bg-black !text-white"
                    : " !bg-transparent !text-black"
                }`}
                onClick={() => {
                  setChat({ ...chat, level: "Advanced" });
                }}
              >
                Advanced
              </Button>
            </div>
          </div>
          <div className=" flex flex-col items-center gap-3">
            <p className="text-black text-center font-[Inter] text-[14px] font-semibold leading-6">
              Your Age:
            </p>
            <div className={`flex justify-center items-center gap-3`}>
              <Button
                className={`!flex !px-3.5 !py-2.5 !justify-center !items-center !gap-2.5 !rounded-[99px] !border-[0.5px] !border-solid !font-[Inter] !text-[12px] !font-medium !leading-normal !border-[#8E8E8E] ${
                  chat.age === "10"
                    ? " !bg-black !text-white"
                    : " !bg-transparent !text-black"
                }`}
                onClick={() => {
                  setChat({ ...chat, age: "10" });
                }}
              >
                Under 18
              </Button>
              <Button
                className={`!flex !px-3.5 !py-2.5 !justify-center !items-center !gap-2.5 !rounded-[99px] !border-[0.5px] !border-solid !font-[Inter] !text-[12px] !font-medium !leading-normal !border-[#8E8E8E] ${
                  chat.age === "20"
                    ? " !bg-black !text-white"
                    : " !bg-transparent !text-black"
                }`}
                onClick={() => {
                  setChat({ ...chat, age: "20" });
                }}
              >
                18 – 30
              </Button>
              <Button
                className={`!flex !px-3.5 !py-2.5 !justify-center !items-center !gap-2.5 !rounded-[99px] !border-[0.5px] !border-solid !font-[Inter] !text-[12px] !font-medium !leading-normal !border-[#8E8E8E] ${
                  chat.age === "30"
                    ? " !bg-black !text-white"
                    : " !bg-transparent !text-black"
                }`}
                onClick={() => {
                  setChat({ ...chat, age: "30" });
                }}
              >
                31 – 40
              </Button>
              <Button
                className={`!flex !px-3.5 !py-2.5 !justify-center !items-center !gap-2.5 !rounded-[99px] !border-[0.5px] !border-solid !font-[Inter] !text-[12px] !font-medium !leading-normal !border-[#8E8E8E] ${
                  chat.age === "40"
                    ? " !bg-black !text-white"
                    : " !bg-transparent !text-black"
                }`}
                onClick={() => {
                  setChat({ ...chat, age: "40" });
                }}
              >
                41 – 50
              </Button>
              <Button
                className={`!flex !px-3.5 !py-2.5 !justify-center !items-center !gap-2.5 !rounded-[99px] !border-[0.5px] !border-solid !font-[Inter] !text-[12px] !font-medium !leading-normal !border-[#8E8E8E] ${
                  chat.age === "50"
                    ? " !bg-black !text-white"
                    : " !bg-transparent !text-black"
                }`}
                onClick={() => {
                  setChat({ ...chat, age: "50" });
                }}
              >
                Over 50
              </Button>
            </div>
          </div>
          <div className=" flex flex-col items-center gap-3">
            <p className="text-black text-center font-[Inter] text-[14px] font-semibold leading-6">
              Your Gender:
            </p>
            <div className={`flex justify-center items-center gap-3`}>
              <Button
                className={`!flex !px-3.5 !py-2.5 !justify-center !items-center !gap-2.5 !rounded-[99px] !border-[0.5px] !border-solid !font-[Inter] !text-[12px] !font-medium !leading-normal !border-[#8E8E8E] ${
                  chat.gender === "Female"
                    ? " !bg-black !text-white"
                    : " !bg-transparent !text-black"
                }`}
                onClick={() => {
                  setChat({ ...chat, gender: "Female" });
                }}
              >
                Female
              </Button>
              <Button
                className={`!flex !px-3.5 !py-2.5 !justify-center !items-center !gap-2.5 !rounded-[99px] !border-[0.5px] !border-solid !font-[Inter] !text-[12px] !font-medium !leading-normal !border-[#8E8E8E] ${
                  chat.gender === "Male"
                    ? " !bg-black !text-white"
                    : " !bg-transparent !text-black"
                }`}
                onClick={() => {
                  setChat({ ...chat, gender: "Male" });
                }}
              >
                Male
              </Button>
              <Button
                className={`!flex !px-3.5 !py-2.5 !justify-center !items-center !gap-2.5 !rounded-[99px] !border-[0.5px] !border-solid !font-[Inter] !text-[12px] !font-medium !leading-normal !border-[#8E8E8E] ${
                  chat.gender === "Transgender"
                    ? " !bg-black !text-white"
                    : " !bg-transparent !text-black"
                }`}
                onClick={() => {
                  setChat({ ...chat, gender: "Transgender" });
                }}
              >
                Transgender
              </Button>
              <Button
                className={`!flex !px-3.5 !py-2.5 !justify-center !items-center !gap-2.5 !rounded-[99px] !border-[0.5px] !border-solid !font-[Inter] !text-[12px] !font-medium !leading-normal !border-[#8E8E8E] ${
                  chat.gender === "Non-Binary"
                    ? " !bg-black !text-white"
                    : " !bg-transparent !text-black"
                }`}
                onClick={() => {
                  setChat({ ...chat, gender: "Non-Binary" });
                }}
              >
                Non-Binary
              </Button>
            </div>
          </div>
          <div className=" flex flex-col items-center gap-3">
            <p className="text-black text-center font-[Inter] text-[14px] font-semibold leading-6">
              Your Location:
            </p>
            <div
              className={`flex justify-center items-center px-4 py-2.5 rounded-[5px] border-[0.5px] border-solid border-[#8E8E8E] w-[354px]`}
            >
              <input
                className="font-[Inter] text-[14px] font-normal leading-normal flex-1 outline-none focus:outline-none"
                value={chat.location}
                onChange={(e) => setValue(e)}
                placeholder="Start typing to search for a location"
              ></input>
              <RiSendPlaneLine className=" w-6 h-6 !text-[#8E8E8E]" />
            </div>
          </div>
        </div>
        <div className="p-5 w-full">
          <Button
            className={`!w-full !flex !h-[50px] !px-4 !py-3 !justify-center !items-center !gap-0.5 !self-stretch !rounded-[99px] !font-[inter] !text-[16px] !font-semibold !leading-normal ${
              chat.level !== "" &&
              chat.age !== "" &&
              chat.gender !== "" &&
              chat.location !== ""
                ? " !bg-black !text-white"
                : " !bg-[#8E8E8E] !text-[#D9D9D9]"
            }`}
            disabled={
              chat.level !== "" &&
              chat.age !== "" &&
              chat.gender !== "" &&
              chat.location !== ""
                ? false
                : true
            }
            onClick={addChat}
          >
            Get Started
          </Button>
        </div>
      </SModal>
      <SModal
        headerTitle="Prepare for a route"
        onClose={handleUploadClose}
        open={openUpload}
      >
        <div className=" w-full p-5 flex flex-col gap-5 justify-between">
          <p className="text-black text-center font-[Inter] text-[12px] font-normal leading-normal">
            I can certainly help you prepare for a route. Search for well-known
            routes below, or
            <br /> a gpx file for me to analyze.
          </p>
          <div className=" flex flex-col items-center gap-3">
            <div
              className={`justify-center items-center px-4 py-2.5 rounded-[5px] border-[0.5px] border-solid border-[#8E8E8E] w-[354px] gap-2 ${
                !uploadS ? "flex" : "hidden"
              }`}
            >
              <GoSearch className=" w-6 h-6 !text-[#8E8E8E]" />
              <input
                className="font-[Inter] text-[14px] font-normal leading-normal flex-1 outline-none focus:outline-none"
                value={searchValue}
                onChange={(e) => setValue(e)}
                placeholder="Start typing to search for a location"
              ></input>
            </div>
            <p className="text-black text-center font-[Inter] text-[14px] font-semibold leading-6">
              or
            </p>
            <div></div>
            <div className={`flex justify-center items-center gap-3`}>
              <label
                className={`!flex !px-3.5 !py-2.5 !justify-center !items-center !gap-2.5 !rounded-[99px] !border-[0.5px] !border-solid !font-[Inter] !text-[12px] !font-medium !leading-normal !border-[#8E8E8E]  !bg-transparent !text-black `}
              >
                <FiUpload className="w-6 h-6" />
                Upload a GPX file
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="file_input"
                  aria-describedby="file_input_help"
                  onChange={uploadAction}
                />
              </label>
            </div>
            {Up ? (
              <div
                className={`p-3 rounded-full border-[0.5px] border-solid border-[#8E8E8E] flex justify-between  items-center py-5 px-5 gap-10  ${
                  uploadS ? "flex" : "hidden"
                }`}
              >
                <div className="grid grid-rows-3"></div>
                <div className="ml-[-10px]">
                  <CheckIcon />
                </div>
                <div>
                  <input type="button" value={Up} />
                </div>
                <div className="mr-[-10px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <img />
              </div>
            ) : null}
          </div>
        </div>
        <div className="p-5 w-full">
          <Button
            className={`!w-full !flex !h-[50px] !px-4 !py-3 !justify-center !items-center !gap-0.5 !self-stretch !rounded-[99px] !font-[inter] !text-[16px] !font-semibold !leading-normal ${
              chat.level !== "" &&
              chat.age !== "" &&
              chat.gender !== "" &&
              chat.location !== ""
                ? " !bg-black !text-white"
                : " !bg-[#8E8E8E] !text-[#D9D9D9]"
            }`}
            // disabled={
            //   chat.level !== "" &&
            //   chat.age !== "" &&
            //   chat.gender !== "" &&
            //   chat.location !== ""
            //     ? false
            //     : true
            // }
            // onClick={() =>
            //   console.log(chat.level, chat.age, chat.gender, chat.location)
            // }
            onClick={handleFileUpload}
          >
            Submit
          </Button>
        </div>
      </SModal>
    </div>
  );
};

export default PersonalAI;
