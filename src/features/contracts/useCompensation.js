import { useMutation } from "@tanstack/react-query";
import { updateCompensation } from "../../services/apiContract";
import toast from "react-hot-toast";

export default function useCompensation() {
  const { mutate: updatePayment, isPending: isUpdating } = useMutation({
    mutationKey: ["compensation"],
    mutationFn: (details) => updateCompensation(details),

    onSuccess: (data) => {
      toast.success("Form Saved");
      const contractData = data?.data;
      console.log(data);
      sessionStorage.setItem("personal-info", JSON.stringify(contractData));
    },
    onError: (err) => {
      toast.error("Saving Failed, Please try again");
      console.log(err);
    },
  });
  return {
    updatePayment,
    isUpdating,
  };
}
