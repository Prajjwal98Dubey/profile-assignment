import { SPINNER_ICON } from "../assets/icons";

const HomeShimmer = () => {
  return (
    <div>
      <div className="bg-gray-500 rounded-md w-full h-[40px] flex mb-2 mt-2 animate-pulse"></div>
      <div className="flex justify-center items-center p-2"><img src={SPINNER_ICON} alt="loading" className="lg:w-[25px] lg:h-[25px] md:w-[20px] md:h-[20px] sm:w-[15px] sm:h-[15px] animate-ping" /></div>
    </div>
  );
};

export default HomeShimmer;
