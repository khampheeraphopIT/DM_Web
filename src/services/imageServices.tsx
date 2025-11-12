export class ImageService {
  static async preprocessImage(
    file: File
  ): Promise<{ original: File; resized: File }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          // 1. original: ใช้ file ต้นฉบับเลย (ดีที่สุด!)
          const original = file;

          // 2. resize เป็น 128x128
          const canvas = document.createElement("canvas");
          canvas.width = 128;
          canvas.height = 128;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Canvas context not available"));
            return;
          }

          ctx.drawImage(img, 0, 0, 128, 128);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const resized = new File([blob], `resized_${file.name}`, {
                  type: "image/jpeg",
                });
                resolve({ original, resized });
              } else {
                reject(new Error("Failed to create resized blob"));
              }
            },
            "image/jpeg",
            0.9
          );
        };

        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = event.target?.result as string;
      };

      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  }
}
