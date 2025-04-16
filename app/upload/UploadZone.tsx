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
    <div className="flex flex-col space-y-4 p-4">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-bold text-gray-200">
          Upload Lobby Screenshot
        </h1>
        <p className="text-white opacity-50">
          Take a screenshot of just the lobby. Do not include your friendslist,
          wallpaper, or the menu bar at the top of the client. 2Mb max file
          size.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="file"
          id="file"
          className="bg-gray-800 hover:bg-gray-700 transition duration-200 py-2 px-4 cursor-pointer rounded-l"
          required
        />
        <button
          type="submit"
          id="upload"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 cursor-pointer transition duration-200 text-white rounded-r disabled:bg-gray-400"
        >
          {isLoading ? "Analyzing..." : "Upload"}
        </button>

        {error && <p className="text-red-600">{error}</p>}
      </form>
      {previewUrl && (
        <div className="mt-4">
          <img
            src={previewUrl}
            alt="Uploaded preview"
            className="max-w-3xl border border-gray-300"
          />
        </div>
      )}
    </div>
  );
}
