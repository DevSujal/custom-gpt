import React, { useEffect, useRef, useState } from "react";
import Input from "./Input";
import useRequestResponseContext from "../store/requestRespnse";
import axios from "axios";
import attach from "../assets/attach.png";
function SentBtn({ className, ...props }) {
  const [inputVal, setInputVal] = React.useState("");
  const { addData, updateData } = useRequestResponseContext();
  const ref = useRef(null);
  const [chatMessages, setChatMessages] = useState([
    { role: "user", content: "Hello, how are you?" },
    { role: "assistant", content: "I am good, thank you!" },
  ]);

  useEffect(() => {
    const chatMessages = localStorage.getItem("chatMessages");

    if (chatMessages && chatMessages.length > 0) {
      setChatMessages(JSON.parse(chatMessages));
    }

    const currentRef = ref.current;
    currentRef?.addEventListener("keypress", handleKeyPress);

    return () => {
      currentRef?.removeEventListener("keypress", handleKeyPress);
    };
  }, [inputVal]);

  const [isOn, setIsOn] = useState(false);

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      const input = inputVal;
      const id = Date.now();
      setInputVal("");
      if (ref.current) ref.current.disabled = true;
      try {
        addData({
          id,
          question: input,
          answer: "",
        });

        const response = await axios.post("http://localhost:3000/api/v1/chat", {
          input,
          gpt: isOn ? "4" : "3.5",
          prevMessages: chatMessages,
        });

        setChatMessages((prevMessages) => {
          const chatMessages = [
            ...prevMessages,
            {
              role: "user",
              content: input,
            },
            {
              role: "assistant",
              content: response.data.content,
            },
          ];

          localStorage.setItem("chatMessages", JSON.stringify(chatMessages));

          return chatMessages;
        });
        updateData(id, response.data.content);
      } catch (error) {
        console.log(error);
        updateData(id, "No definition found");
      } finally {
        if (ref.current) ref.current.disabled = false;
      }
    }
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const id = Date.now();
      setInputVal("");
      if (ref.current) ref.current.disabled = true;
      try {
        addData({
          id,
          question: file.name,
          answer: "",
        });

        const formData = new FormData();
        formData.append("file", file);
        formData.append("gpt", "3.5");
        formData.append("prevMessages", JSON.stringify(chatMessages));

        const response = await axios.post(
          "http://localhost:3000/api/v1/file",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response);
        setChatMessages((prevMessages) => {
          const chatMessages = [
            ...prevMessages,
            { role: "system", content: file.name + "  " + response.data.input },
            {
              role: "assistant",
              content: response.data.content,
            },
          ];

          localStorage.setItem("chatMessages", JSON.stringify(chatMessages));

          return chatMessages;
        });
        console.log("completed");
        updateData(id, response.data.content);
      } catch (error) {
        console.log(error);
        updateData(id, "No definition found");
      } finally {
        if (ref.current) ref.current.disabled = false;
      }
    }
  };

  return (
    <div className="w-11/12 max-w-2xl  mt-3 rounded py-3">
      <div className="mb-3 ml-3 flex gap-2">
        <label htmlFor="ison" className="text-md text-white">
          Use GPT-4
        </label>
        <input
          type="checkbox"
          name="ison"
          className="rounded-full cursor-pointer transform scale-150"
          value={isOn}
          onChange={() => setIsOn(!isOn)}
          id="ison"
        />
      </div>
      <span className=" mx-auto mb-4 flex justify-center px-4 items-center bg-gray-900 rounded-full">
        <label htmlFor="file" className="text-white">
          <img src={attach} alt="attachments" className=" filter invert" />
        </label>
        <span>
          <input
            type="file"
            id="file"
            className="hidden"
            onChange={handleFile}
          />
        </span>
        <Input
          ref={ref}
          inputVal={inputVal}
          setInputVal={setInputVal}
          handleKeyPress={handleKeyPress}
          className={`w-full bg-transparent ${className}`}
          placeholder="Enter your response"
          {...props}
        />
      </span>
    </div>
  );
}

export default SentBtn;
