// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
"use client";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { theme } from "@/theme";
import { AuthProvider } from "@/contexts/AuthContext";
import { Notifications } from "@mantine/notifications";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Gmail</title>
      </head>
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <ColorSchemeScript defaultColorScheme="light" />
          <MantineProvider theme={theme} defaultColorScheme="light">
            <Notifications />
            {children}
          </MantineProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
