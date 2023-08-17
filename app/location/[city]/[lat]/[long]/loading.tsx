import { SunIcon } from "@heroicons/react/solid";
import React from "react";

const Loading = () => {
  return (
    <div className="bg-gradient-to-br from-[#394F68] to-[#183B7E] min-h-screen flex flex-col items-center justify-center text-slate-500">
      <SunIcon
        className="w-24 text-yellow-500 h-25 animate-bounce"
        color="yellow"
      />
      <h1 className="mb-10 text-6xl font-bold text-center animate-pulse">
        Loading City Weather Information
      </h1>
      <h2 className="mb-10 text-xl font-bold text-center animate-pulse">
        Hold on, we are crunching the numbers & generating an AI summary of the
        Weather!
      </h2>
    </div>
  );
};

export default Loading;
