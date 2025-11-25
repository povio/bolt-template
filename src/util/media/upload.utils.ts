import axios from "axios";

import type { MediaModels } from "@/openapi/media/media.models";

export async function uploadFileToS3(
  file: File,
  instructions: MediaModels.MediaUploadInstructionsResponse,
): Promise<void> {
  if (!instructions.url) {
    throw new Error("Upload URL not provided");
  }

  const method = instructions.method?.toUpperCase() || "PUT";

  if (method === "PUT") {
    await axios.put(instructions.url, file, {
      headers: {
        "Content-Type": file.type,
      },
    });
  } else if (method === "POST") {
    const formData = new FormData();

    if (instructions.fields) {
      for (const [key, value] of instructions.fields) {
        formData.append(key, value);
      }
    }

    formData.append("file", file);

    await axios.post(instructions.url, formData);
  } else {
    throw new Error(`Unsupported upload method: ${method}`);
  }
}
