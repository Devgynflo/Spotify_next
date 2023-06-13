import Sidebar from "@/components/Sidebar";
import "./globals.css";
import { Inter } from "next/font/google";
import SupabaseProvider from "@/providers/Supabase.provider";
import UserProvider from "@/providers/UserProvider";

const font = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Spotify next",
  description: "Listen to music",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={font.className}>
        <SupabaseProvider>
          <UserProvider>
            <Sidebar>{children}</Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
