import React from "react";

const Question = ({children}) => {
  return (
    <div className="flex items-center justify-end space-y-3">
      <p className=" text-sm p-2 max-w-max text-white bg-gray-500/10 rounded-lg rounded-se-none font-semibold w-10/12">
        {children}
      </p>
    </div>
  );
};

export default Question;
