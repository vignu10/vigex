import DashBoard from "@/components/core/DashBoard";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
export default function Home() {
  return (
    <>
      <DashBoard></DashBoard>
      <SpeedInsights />
      <Analytics />
    </>
  );
}
