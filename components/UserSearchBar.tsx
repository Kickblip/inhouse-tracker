"use client"

import { User } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { useRouter } from "next/navigation"
import { useLeaderboardStore } from "@/stores/LeaderboardStore"

export default function UserSearchBar() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const { searchableUsers, fetchLeaderboard } = useLeaderboardStore()

  useEffect(() => {
    void fetchLeaderboard()
  }, [fetchLeaderboard])

  return (
    <Command className="relative overflow-visible border md:min-w-[450px] max-w-5xl w-full mx-auto mt-4 mb-2">
      <CommandInput placeholder="Search for players..." onFocus={() => setOpen(true)} onBlur={() => setOpen(false)} />
      {open && (
        <CommandList className="bg-[#171717] border shadow-md rounded-b-lg absolute left-0 top-full z-20 w-full">
          <CommandEmpty>No results found.</CommandEmpty>
          {/* <CommandGroup heading="Commands">
            <CommandItem>
              <Calendar />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smile />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem disabled>
              <Calculator />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator /> */}
          <CommandGroup heading="Players">
            {searchableUsers.map((u) => (
              <CommandItem
                key={u.slug}
                value={u.username}
                asChild
                onMouseDown={(e) => {
                  e.preventDefault()
                  router.push(`/player/${u.slug}`)
                  setOpen(false)
                }}
                onSelect={() => {
                  router.push(`/player/${u.slug}`)
                  setOpen(false)
                }}
              >
                <div className="flex items-center cursor-pointer">
                  <User />
                  <span>{u.username}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      )}
    </Command>
  )
}
