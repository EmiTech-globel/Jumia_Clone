import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SwiftCart Studio",
  description: "Manage your store and products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
  );
}