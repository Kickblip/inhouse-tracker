import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ddragon.leagueoflegends.com",
        port: "",
        pathname: "/**",
      },
    ],
    minimumCacheTTL: 2678400,
  },
}

export default nextConfig
