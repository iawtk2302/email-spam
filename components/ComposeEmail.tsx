import { useState } from "react";
import {
  Modal,
  TextInput,
  Button,
  Container,
  Textarea,
  Box,
} from "@mantine/core";

const ComposeEmailModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    // Xử lý việc gửi email, có thể gọi API ở đây
    console.log("To:", to);
    console.log("Subject:", subject);
    console.log("Message:", message);

    // Đóng modal sau khi gửi email
    onClose();
  };

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title="Compose Email"
      size="lg"
      withCloseButton
      closeOnClickOutside={false}
      styles={{
        content: {
          width: "40%",
          position: "fixed",
          bottom: 0,
          right: 20,
        },
      }}
    >
      <Container>
        <TextInput
          label="To:"
          placeholder="Recipient"
          value={to}
          onChange={(event) => setTo(event.target.value)}
        />
        <TextInput
          label="Subject:"
          placeholder="Subject"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
        />
        <Textarea
          minRows={20}
          maxRows={25}
          label="Message:"
          placeholder="Type your message here..."
          multiline
          styles={{ input: { height: 200 } }}
        />
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button onClick={handleSubmit} variant="primary">
            Send
          </Button>
        </div>
      </Container>
    </Modal>
  );
};

export default ComposeEmailModal;
