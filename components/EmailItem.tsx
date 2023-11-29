import { Email } from "@/interface/Email";
import { Card, Container, Flex, Text } from "@mantine/core";
import React from "react";
import { format, isToday } from "date-fns";
import { useRouter } from "next/navigation";

function EmailItem({ email }: { email: Email }) {
  const router = useRouter();
  function formatDate(inputDate: string) {
    const date = new Date(inputDate);
    if (isToday(date)) {
      return format(date, "HH:mm"); // Nếu là ngày hiện tại, hiển thị giờ phút
    } else {
      return format(date, "dd MMM"); // Nếu không phải ngày hiện tại, hiển thị ngày tháng năm
    }
  }
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ marginBottom: 10 }}
      onClick={() => router.push(`/email/${email.id}`)}
    >
      <Flex justify={"space-between"}>
        <Text>{email.senderName}</Text>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Text>{email.title}</Text>
          <Text style={{ color: "gray" }}>- {email.body}</Text>
        </div>
        <Text style={{ color: "gray" }}>{formatDate(email.timeSend)}</Text>
      </Flex>
    </Card>
  );
}

export default EmailItem;
