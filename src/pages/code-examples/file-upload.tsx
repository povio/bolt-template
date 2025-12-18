import { Typography } from "@povio/ui";
import { createFileRoute } from "@tanstack/react-router";

/**
 * FILE UPLOAD PATTERN - 3 STEPS
 *
 * 1. Request upload instructions (get media_id, presigned URL)
 * 2. Upload file to S3 using uploadFileToS3()
 * 3. Link media_id to resource (optional, can be done later)
 */

function FileUploadExamplePage() {
  return (
    <div className="mx-auto max-w-4xl p-8">
      <Typography
        as="h1"
        size="title-2"
        className="mb-2"
      >
        File Upload Pattern
      </Typography>
      <Typography
        as="p"
        size="body-2"
        className="mb-8 text-neutral-600"
      >
        Three-step process: request instructions → upload to S3 → link to resource
      </Typography>

      <div className="rounded-lg bg-neutral-900 p-6">
        <pre className="overflow-x-auto text-neutral-100 text-sm">
          <code>{`import { useState } from "react";
import { InputUpload, Button, useToast } from "@povio/ui";
import { MediaQueries } from "@/openapi/media/media.queries";
import { uploadFileToS3 } from "@/util/media/upload.utils";
function MyUploadComponent() {
  const [file, setFile] = useState<File | null>(null);
  const [instructions, setInstructions] = useState(null);
  const { successToast, errorToast } = useToast();
  // STEP 1: Get upload instructions mutation
  const uploadRequestMutation = MediaQueries.useUploadRequest();
  
  // STEP 3: Your linking mutation (check your backend API)
  const yourMutation = YourQueries.useYourMutation();
  const handleFileChange = async (selectedFile: File | null) => {
    if (!selectedFile) return;
    setFile(selectedFile);
    try {
      // STEP 1: Request upload instructions from backend
      const uploadInstructions = await uploadRequestMutation.mutateAsync({
        data: {
          resourceName: "large-image",  // or "small-image", "document", etc.
          fileName: selectedFile.name,
          fileSize: selectedFile.size,
          mimeType: selectedFile.type,
        },
      });
      
      // Save instructions containing: id (media_id), url, method, fields
      setInstructions(uploadInstructions);
      successToast({ text: "Ready to upload!" });
    } catch {
      errorToast({ text: "Failed to get upload instructions" });
    }
  };
  const handleUpload = async () => {
    if (!file || !instructions) return;
    try {
      // STEP 2: Upload file directly to S3 (bypasses backend)
      await uploadFileToS3(file, instructions);
      
      // STEP 3 (OPTIONAL): Link media_id to your resource
      // Can also save instructions.id and use later in any mutation
      await yourMutation.mutateAsync({
        data: { media_id: instructions.id }
      });
      
      successToast({ text: "Upload complete!" });
    } catch {
      errorToast({ text: "Upload failed" });
    }
  };
  return (
    <div>
      <InputUpload
        label="Select File"
        onChange={handleFileChange}
        allowsMultiple={false}
      />
      
      {instructions && (
        <>
          <p>Media ID: {instructions.id}</p>
          <Button onPress={handleUpload}>Upload</Button>
        </>
      )}
    </div>
  );
}`}</code>
        </pre>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/code-examples/file-upload")({
  component: FileUploadExamplePage,
});
