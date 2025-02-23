import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./_components/NavBar";



export const metadata: Metadata = {
  title: "OASES",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
