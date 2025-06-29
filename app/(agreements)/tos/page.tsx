import Link from "next/link"

export default function Tos() {
  return (
    <main className="flex flex-col items-center min-h-screen w-full">
      <h1 className="text-3xl font-bold mb-6 text-white">Terms of Service</h1>
      <div className="w-full max-w-7xl mx-auto p-4 mb-24">
        <strong>Last Updated: 06-30-2024</strong>
        <p>
          This Terms of Service agreement covers how Inhouse Tracker&#39;s (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
          services should be used, including our website,{" "}
          <Link href="https://inhousetracker.com/" className="text-blue-500 underline">
            https://inhousetracker.com/
          </Link>{" "}
          . By using our services or website, you agree to the terms of this agreement. These Terms of Service are governed in the
          United States under Texas law.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-white">1. Our Services</h2>
        <p>Inhouse Tracker is a stat tracker for the video game League of Legends.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-white">3. Additional Data Collection and Privacy</h2>
        <p>
          We collect and store user data, including player usernames and other League of Legends related data, to provide our
          services. Please refer to our Privacy Policy at{" "}
          <Link href="https://inhousetracker.com/privacy" className="text-blue-500 underline">
            https://inhousetracker.com/privacy
          </Link>{" "}
          for additional information about how we use your data. Additionally, we collect non-personal data for basic analytics
          and to track interest in our services. We do not use cookies.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-white">5. Updates and Contact</h2>
        <p>
          Updates to this Terms of Service will be reflected on this page. For any questions or concerns, join our Discord server
          at{" "}
          <Link href="https://discord.gg/Dg2v4rHC" className="text-blue-500 underline">
            https://discord.gg/Dg2v4rHC
          </Link>{" "}
        </p>
      </div>
    </main>
  )
}
