import { useQuery } from "@tanstack/react-query";
import { getCountries } from "../../services/apiCountriesandStates";
export default function useGetCountries() {
  const {
    data: countries,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
  });

  return {
    countries,
    isLoading,
    error,
  };
}
