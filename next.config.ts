import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "localhost",
    "localhost:3000",
    "localhost:3001",
    "*.local",
    "172.16.50.34",
  ],
};

export default nextConfig;
