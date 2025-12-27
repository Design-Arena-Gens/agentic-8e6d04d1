import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "n8n YouTube Automation Studio",
  description:
    "Design, orchestrate, and launch AI-driven YouTube video automations powered by n8n workflows."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
