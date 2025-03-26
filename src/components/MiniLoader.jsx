import { ClipLoader } from "react-spinners";



function MiniLoader() {
  return (
    <ClipLoader
      color={"white"}
      size={20}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}

export default MiniLoader;
