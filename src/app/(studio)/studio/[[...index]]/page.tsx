"use client";

import dynamic from "next/dynamic";
import config from "../../../../../sanity.config";

const NextStudio = dynamic(
  () => import("next-sanity/studio").then((mod) => mod.NextStudio),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "#0a0a0a",
          color: "#fff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        Carregant editor…
      </div>
    ),
  }
);

export default function StudioPage() {
  return <NextStudio config={config} />;
}
