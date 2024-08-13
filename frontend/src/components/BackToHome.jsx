import { HOME_ICON } from "../assets/icons";

const BackToHome = () => {
  return (
    <div className="w-[70px] h-[70px] rounded-full fixed bottom-4 right-3 flex justify-center items-center bg-black border border-gray-400 cursor-pointer hover:bg-purple-600">
      <img
        src={HOME_ICON}
        alt="loading"
        loading="lazy"
        className="flex justify-center items-center w-[28px] h-[28px]"
      />
    </div>
  );
};

export default BackToHome;
