import { useMutation, useQuery } from "@tanstack/react-query";
import { apiService } from "../services/api";
import type { ApiResponse } from "../types";

/**
 * Hook สำหรับวิเคราะห์โรคใบอ้อย
 */
export const usePredictDisease = () => {
  return useMutation<ApiResponse, Error, File>({
    mutationFn: async (imageFile: File) => {
      return apiService.predictDisease(imageFile);
    },
  });
};

/**
 * Hook สำหรับดึงข้อมูลโรคทั้งหมด
 */
export const useGetDiseases = () => {
  return useQuery({
    queryKey: ["diseases"],
    queryFn: () => apiService.getDiseases(),
    staleTime: 1000 * 60 * 60, // Cache 1 hour
  });
};
