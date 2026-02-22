import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <>
      <div className="loading-container">
        <ClipLoader color="#0d6dfd" size={35} speedMultiplier={0.7} />
      </div>
    </>
  );
};

export default Loader;
