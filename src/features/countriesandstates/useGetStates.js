import { useQuery } from "@tanstack/react-query";
import { getStates } from "../../services/apiCountriesandStates";

export default function useGetStates(country) {
  const { data: states, isLoading: loadingStates, refetch } = useQuery({
    queryKey: ["states"],
    queryFn: async () => {
      if (!country) return;
      return getStates(country);
    },
    enabled: !!country,
  });

  return {
    states,
    refetch,
    loadingStates,
  };
}
