import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex items-center gap-12 p-4 max-w-7xl mx-auto font-bold text-md">
      <Image src="/logo.png" alt="Logo" width={46} height={46} />

      <Link
        href="/"
        className="opacity-80 hover:opacity-100 transition-all duration-200"
      >
        Leaderboards
      </Link>
      <Link
        href="/about"
        className="opacity-80 hover:opacity-100 transition-all duration-200"
      >
        Club Stats
      </Link>
      <Link
        href="/contact"
        className="opacity-80 hover:opacity-100 transition-all duration-200"
      >
        Players
      </Link>
    </nav>
  );
}
