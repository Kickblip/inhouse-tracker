import Link from "next/link"

export default function Privacy() {
  return (
    <main className="flex flex-col items-center min-h-screen w-full">
      <h1 className="text-3xl font-bold mb-6 text-white">Privacy Policy</h1>

      <div className="w-full max-w-7xl mx-auto p-4 mb-24">
        <strong>Last Updated: 06-23-2024</strong>
        <p>
          This Privacy Policy covers how Inhouse Tracker (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) manages your
          personal and non-personal information. This primarily includes data gathered from your usage of our website,{" "}
          <Link href="https://inhousetracker.com/" className="text-blue-500 underline">
            https://inhousetracker.com/
          </Link>
          . By using Inhouse Tracker, you agree to the terms of this Privacy Policy.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-white">1. Personal Data</h2>
        <p>
          We collect certain user data associated with your League of Legends and Riot account (such as usernames or statistics),
          some of which is non-public.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-white">2. Non-Personal Data</h2>
        <p>
          We may use basic analytics such as page views, browser type, and other device details. This data helps us analyze trends
          and improve our services. We do not use cookies on Inhouse Tracker.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-white">3. Personal Data Sharing</h2>
        <p>We do not share your personal data with any third parties.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-white">4. Children&#39;s Data</h2>
        <p>
          Inhouse Tracker is not intended for users under the age of&nbsp;18. We do not knowingly collect personal information of
          children. If you have any concerns regarding the data of a child, please contact us.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-white">5. Updates and Contact</h2>
        <p>
          Updates to this Privacy Policy will be reflected on this page. For any questions or concerns, join our Discord server at{" "}
          <Link href="https://discord.gg/Dg2v4rHC" className="text-blue-500 underline">
            https://discord.gg/Dg2v4rHC
          </Link>{" "}
        </p>
      </div>
    </main>
  )
}
