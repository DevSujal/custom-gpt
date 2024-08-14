import React from "react";
import more from "../assets/more.png";
import Messages from "./Messages";
import SentBtn from "./SentBtn";
function Chat({ className }) {

  return (
    <div className={`bg-transparent flex flex-col justify-center items-center ${className}`}>
      <div className="flex justify-between items-center cursor-pointer bg-transparent w-full px-3 py-2">
        <span className="text-xl font-bold text-white">Sujal</span>
        <div className="flex justify-center items-center gap-5">
          <img
            src={more}
            alt="more img"
            className=" rotate-90 cursor-pointer"
          />
        </div>
      </div>
      <Messages style={{ width: "min(1000px, 97%)" }} className="flex-grow" />
      <SentBtn  />
    </div>
  );
}

export default Chat;
