"use client";

import { PuffLoader } from "react-spinners";

const Loader = () => {
  return (
    <div
      className="
        flex
        flex-col
        justify-center
        items-center
      "
    >
      <PuffLoader size={40} color="orange" />
    </div>
  );
};

export default Loader;
