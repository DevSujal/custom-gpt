import React, { useEffect, useRef, useState } from "react";
import Question from "./Question";
import Answer from "./Answer";
import useRequestResponseContext from "../store/requestRespnse";
import Loading from "react-loading";
function Messages({ className, ...props }) {
  const { data } = useRequestResponseContext();
  const chatsRef = useRef(null);
  useEffect(() => {
    const currentChat = chatsRef.current;
    if (currentChat) currentChat.scrollTop = currentChat.scrollHeight;
  }, [data]);

  return (
    <div
      ref={chatsRef}
      className={`p-1 bg-transparent flex flex-col overflow-y-scroll scroll-smooth gap-3 ${className}`}
      {...props}
    >
      {data.map(({ id, question, answer }) => (
        <div className="flex flex-col gap-3" key={id}>
          <Question>{question}</Question>
          {answer !== "" ? <Answer>{answer}</Answer> : <Loading type="bubbles" color="gray" />}
        </div>
      ))}
    </div>
  );
}

export default Messages;
