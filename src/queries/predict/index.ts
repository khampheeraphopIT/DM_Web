import { useMutation } from "@tanstack/react-query";
import { predictDisease } from "../../services/predict";

export const usePredictDiseaseMutation = () => {
  return useMutation({
    mutationFn: ({
      province,
      imageFile,
    }: {
      province: string;
      imageFile: File;
    }) => predictDisease(province, imageFile),
  });
};
