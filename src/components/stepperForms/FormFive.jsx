import SignatureCanvas from "react-signature-canvas";
import usesignature from "../../assets/svg/usesignature.svg";
import { useRef } from "react";
import { useGlobalContext } from "../../Context";

const FormFive = () => {
  const sigCanvas = useRef(null);
  const { setSignature } = useGlobalContext();

  const saveSignature = () => {
    const dataUrl = sigCanvas.current.toDataURL();
    console.log(dataUrl);

    setSignature(dataUrl);
  };

  const clearSignature = () => {
    sigCanvas.current.clear();
  };

  return (
    <div className="overflow-hidden">
      <div className="text-lg font-semibold leading-normal mb-6 xl:text-2xl xl:mb-[32px]">
        Sign Signature
      </div>
      <div className="bg-white max-w-[608px] h-[202px]">
        <SignatureCanvas
          ref={sigCanvas}
          penColor="black"
          canvasProps={{
            width: 608,
            height: 202,
          }}
        />

        <div className="flex justify-end my-4">
          <button onClick={clearSignature}>Clear</button>
        </div>
      </div>
      <div className="mt-[50px] xl:mb-[66px] lg:flex lg:justify-center">
        <button
          type="submit"
          onClick={saveSignature}
          className="flex items-center justify-center gap-2 pr-bg-clr w-full rounded-lg text-white text-[0.75rem] py-[14px] lg:w-auto lg:mx-auto lg:px-[60px] xl:py-6 xl:text-xl "
        >
          Use signature
          <img src={usesignature} alt="tick" />
        </button>
      </div>
    </div>
  );
};
export default FormFive;
