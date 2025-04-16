"use client"

import React from "react"

interface EditableCellProps {
  initialValue: string | number
  onUpdate: (value: string) => void
  className?: string
}

export function EditableCell({ initialValue, onUpdate, className = "" }: EditableCellProps) {
  const [editing, setEditing] = React.useState(false)
  const [value, setValue] = React.useState(String(initialValue))

  const handleBlur = () => {
    setEditing(false)
    onUpdate(value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur()
    }
  }

  if (editing) {
    return (
      <input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`w-full p-1 text-gray-900 ${className}`}
      />
    )
  }

  return (
    <span onClick={() => setEditing(true)} className={`cursor-pointer ${className}`}>
      {value}
    </span>
  )
}
