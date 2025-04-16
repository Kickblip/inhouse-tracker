"use client"

import { useLobbyStore } from "@/stores/useLobbyStore"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function SaveToDBButton() {
  const { lobby } = useLobbyStore()

  const handleSaveToDB = async () => {
    if (!lobby) {
      toast.error("No lobby data to save")
      return
    }

    try {
      const response = await fetch("/api/save-lobby", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lobby),
      })

      if (!response.ok) {
        console.error("Error saving lobby data:", response.statusText)
        toast.error("Failed to save lobby data")
      } else {
        toast.success("Lobby data saved successfully")
      }
    } catch (error) {
      console.error("Error saving lobby data:", error)
      toast.error("An error occurred while saving lobby data")
    }
  }

  return (
    <button onClick={handleSaveToDB} className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
      Save to DB
    </button>
  )
}
