"use client";

import React from "react";
import { useLobbyStore } from "@/stores/useLobbyStore";
import { file } from "./actions";

export default function UploadPage() {
  const setLobby = useLobbyStore((state) => state.setLobby);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [uploadedImage, setUploadedImage] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!uploadedImage) {
      setPreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(uploadedImage);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [uploadedImage]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    const lobbyData = await file(formData);

    if (!lobbyData) {
      setError("Could not parse lobby data.");
      setIsLoading(false);
      return;
    }

    setLobby(lobbyData);

    const fileFromForm = formData.get("file") as File | null;
    if (fileFromForm) {
      setUploadedImage(fileFromForm);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <label htmlFor="file" className="block font-medium text-gray-700">
        Photo
      </label>
      <input
        type="file"
        name="file"
        id="file"
        className="border p-2"
        required
      />

      <button
        type="submit"
        id="upload"
        disabled={isLoading}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
      >
        {isLoading ? "Analyzing..." : "Upload"}
      </button>

      {error && <p className="text-red-600">{error}</p>}

      {previewUrl && (
        <div className="mt-4">
          <img
            src={previewUrl}
            alt="Uploaded preview"
            className="max-w-3xl border border-gray-300"
          />
        </div>
      )}
    </form>
  );
}

// import file from "./actions";

// export default async function UploadZone() {
//   return (
//     <form action={file}>
//       <label htmlFor="file">Photo</label>
//       <input type="file" name="file" id="file" />
//       <button type="submit" id="upload">
//         Upload
//       </button>
//     </form>
//   );
// }
