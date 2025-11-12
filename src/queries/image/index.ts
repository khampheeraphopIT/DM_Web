import { useMutation } from "@tanstack/react-query";
import { preprocessImage } from "../../services/image";

export const usePreprocessImage = () => {
  return useMutation({
    mutationFn: (file: File) => preprocessImage(file),
  });
};
