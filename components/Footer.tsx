import Link from "next/link"

export default function Footer() {
  return (
    <footer className="text-xs mt-4">
      <Link href="/privacy">Privacy Policy</Link> | <Link href="/tos">Terms of Service</Link>
    </footer>
  )
}
