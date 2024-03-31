import React from "react";

function Loading() {
  return (
    <div className="flex items-center justify-center max-h-screen mt-20">
        <span className="w-6 h-6 border-4 border-blue-200 rounded-full animate-spin border-t-transparent mr-4"></span>
        <p>Loading...</p>
    </div>
  );
}

export default Loading;
