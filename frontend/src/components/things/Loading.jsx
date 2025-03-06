

import { BounceLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <BounceLoader color="#ffffff" size={150} />
    </div>
  );
};

export default Loading;
