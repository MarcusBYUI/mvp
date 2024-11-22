import { TailSpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <>
      <TailSpin
        height="30"
        width="30"
        color="#0098ea"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{justifyContent: "center"}}
        wrapperClass=""
        visible={true}
      />
    </>
  );
};

export default Loader;
