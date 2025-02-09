import { useMutation } from "@tanstack/react-query";
import { createContract } from "../../services/apiContract";
import toast from "react-hot-toast";

export default function useCreateContract() {
  const { mutate: sendContract, isPending: isLoading } = useMutation({
    mutationKey: ["contract"],
    mutationFn: (details) => createContract(details),
    onError: () => {
      toast.error("Something went wrong, Try again later");
    },
  });

  return {
    sendContract,
    isLoading,
  };
}
