import "./globals.css";
import { Figtree } from "next/font/google";
// Providers
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
// Actions
import getSongsByUserId from "@/actions/getSongsByUserId";
// Component
import Sidebar from "@/components/Sidebar";
import Player from "@/components/Player";

const font = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Spotify next",
  description: "Listen to music",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const songsByUserId = await getSongsByUserId();
  return (
    <html lang="fr">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={songsByUserId}>{children}</Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
