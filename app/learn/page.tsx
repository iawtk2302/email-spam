"use client";
import { useDisclosure } from "@mantine/hooks";
import {
  AppShell,
  Burger,
  Button,
  Group,
  Tabs,
} from "@mantine/core";
import { IconBrandGmail } from "@tabler/icons-react";
import { useState } from "react";
import ComposeEmailModal from "@/components/ComposeEmail";
import classes from "@/styles/Tab.module.css";

export default function CollapseDesktop() {
  const [selectedTab, setSelectedTab] = useState<string|null>('inbox');
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  const onChangeTab=(value:string)=>{
    setSelectedTab(value);
  }

  const openComposeModal = () => {
    setIsComposeOpen(true);
  };

  const closeComposeModal = () => {
    setIsComposeOpen(false);
  };

  const getEmailList = (tab:string) => {
    return (
      <div>
        {/* {emails.map((email) => (
          <Card key={email.id} onClick={() => handleClick(email)}>
            <Text weight={700}>{email.sender}</Text>
            <Text>{email.subject}</Text>
          </Card>
        ))} */}
      </div>
    );
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
          <IconBrandGmail size={30} />Gmail
        </Group>
      </AppShell.Header>
      <Tabs
        value={selectedTab}
        onChange={onChangeTab}
        variant="pills"
        orientation="vertical"
        color="#d3e2fd"
        classNames={classes}
      >
        <AppShell.Navbar p="md">
          <Button onClick={openComposeModal}>Compose Email</Button>
          <div style={{ height: 20 }} />
          <Tabs.List>
            <Tabs.Tab value="inbox">Inbox</Tabs.Tab>
            <Tabs.Tab value="spam">Spam</Tabs.Tab>
          </Tabs.List>
        </AppShell.Navbar>
        <AppShell.Main>
          <ComposeEmailModal
            isOpen={isComposeOpen}
            onClose={closeComposeModal}
          />
          <Tabs.Panel value="inbox">Inbox</Tabs.Panel>
          <Tabs.Panel value="spam">Spam</Tabs.Panel>
        </AppShell.Main>
      </Tabs>
    </AppShell>
  );
}
