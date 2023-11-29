// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
"use client";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "@/theme";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Notifications } from "@mantine/notifications";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  return (
    <html lang="en">
      <head>
        <title>Gmail</title>
      </head>
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <MantineProvider theme={theme}>
            <Notifications />
            {children}
          </MantineProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
