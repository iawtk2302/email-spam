import { AppShell, Burger, Button, Group, Space, Tabs } from "@mantine/core";
import { IconBrandGmail } from "@tabler/icons-react";
import React, { useState } from "react";
import ComposeEmailModal from "./ComposeEmail";
import { useDisclosure } from "@mantine/hooks";
import classes from "@/styles/Tab.module.css";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

function SideBar({ children }: { children: React.ReactNode }) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const router = useRouter();
  const { logout } = useAuth();
  const openComposeModal = () => {
    setIsComposeOpen(true);
  };

  const closeComposeModal = () => {
    setIsComposeOpen(false);
  };
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="sm"
          />
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
          />
          <IconBrandGmail size={30} />
          Gmail
        </Group>
      </AppShell.Header>
      <Tabs
        defaultValue={"inbox"}
        variant="pills"
        orientation="vertical"
        color="#d3e2fd"
        classNames={classes}
        onChange={(tab) => router.push(`/email/${tab}`)}
      >
        <AppShell.Navbar p="md">
          <Button onClick={openComposeModal}>Compose Email</Button>
          <div style={{ height: 20 }} />
          <Tabs.List>
            <Tabs.Tab value="inbox">Inbox</Tabs.Tab>
            <Tabs.Tab value="sended">Sended</Tabs.Tab>
            <Tabs.Tab value="spam">Spam</Tabs.Tab>
          </Tabs.List>
          <Space />
          <Button onClick={logout}>Logout</Button>
        </AppShell.Navbar>
        <AppShell.Main>
          <ComposeEmailModal
            isOpen={isComposeOpen}
            onClose={closeComposeModal}
          />
          {children}
        </AppShell.Main>
      </Tabs>
    </AppShell>
  );
}

export default SideBar;
