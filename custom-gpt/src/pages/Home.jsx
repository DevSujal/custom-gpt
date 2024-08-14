import React from "react";
import { Chat } from "../components";

function Home() {
  return (
    <div className="h-full flex">

      <Chat className=" flex-grow h-full" />
    </div>
  );
}

export default Home;
