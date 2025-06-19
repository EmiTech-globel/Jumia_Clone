import type { Metadata } from "next";
import "@/app/globals.css";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import Header from "@/components/Header";
import { SanityLive } from "@/sanity/lib/live";
import { VisualEditing } from "next-sanity";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { draftMode } from "next/headers";
import { Toaster } from "react-hot-toast";
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: "SwiftCart | Shop the Latest Trends",
  description: "Discover the latest trends and shop top products at our modern online store. Enjoy a seamless shopping experience with fast checkout and exclusive deals.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
        {(await draftMode()).isEnabled && (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        )}

          <main>
            <Header />
            {children}
            <Toaster position="bottom-right" reverseOrder={false} />
            <Analytics />
          </main>

          <SanityLive />
        </body>
      </html>
    </ClerkProvider>
  );
}
