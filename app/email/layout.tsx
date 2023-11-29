// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
"use client";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import { useAuth } from "@/contexts/AuthContext";
import SideBar from "@/components/SideBar";
// export const metadata = {
//   title: "EZTOEIC",
//   description: "I code it",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {isAuthenticated} = useAuth();
  return (
    <html lang="en">
      <head>
        <title>Gmail</title>
      </head>
      <body suppressHydrationWarning={true}>     
            {
              isAuthenticated?<SideBar>{children}</SideBar>:children
            }
      </body>
    </html>
  );
}
