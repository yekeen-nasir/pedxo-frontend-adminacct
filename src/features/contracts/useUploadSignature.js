import { useMutation } from "@tanstack/react-query";
import { postSignature } from "../../services/apiContract";
import toast from "react-hot-toast";

export default function useUploadSignature() {
  const { mutate: uploadSignature, isPending: sendingForm } = useMutation({
    mutationKey: ["signature"],
    mutationFn: (signature) => postSignature(signature),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Signature uploaded successfully");
      const contractData = data?.data;
      console.log(data)
      sessionStorage.setItem("personal-info", JSON.stringify(contractData));
    },
    onError: (err) => {
        toast.error("Failed to upload signature")
      console.log(err);
    },
  });
  return {
    uploadSignature,
    sendingForm,
  };
}
