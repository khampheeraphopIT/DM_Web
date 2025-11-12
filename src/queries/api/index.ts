import { useQuery } from "@tanstack/react-query";
import { getProvinces } from "../../services/api";

export const useProvincesQuery = () => {
  return useQuery({
    queryKey: ["provinces"],
    queryFn: getProvinces,
  });
};
