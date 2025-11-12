export interface ImagePickerWidgetProps {
  imageFile: File | null;
  onCameraPressed: () => void;
  onGalleryPressed: () => void;
  errorText?: string;
  isProcessing: boolean;
  progress: number;
}
