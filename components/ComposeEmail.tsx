import { useState } from "react";
import {
  Modal,
  TextInput,
  Button,
  Container,
  Textarea,
  Box,
} from "@mantine/core";
import { ComposeEmailFormValues } from "@/interface/Form";
import { useForm } from "@mantine/form";
import { sendEmail } from "@/services/EmailService";

const ComposeEmailModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  // const [to, setTo] = useState("");
  // const [subject, setSubject] = useState("");
  // const [message, setMessage] = useState("");

  const handleSubmit = (values: ComposeEmailFormValues) => {
    sendEmail(values);
    onClose();
  };

  const form = useForm<ComposeEmailFormValues>({
    initialValues: {
      title: "",
      body: "",
      receiver_email: "",
    },
    validate: {},
  });

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
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput
            label="To:"
            placeholder="Recipient"
            {...form.getInputProps("receiver_email")}
          />
          <TextInput
            label="Subject:"
            placeholder="Subject"
            {...form.getInputProps("title")}
          />
          <Textarea
            minRows={20}
            maxRows={25}
            label="Message:"
            placeholder="Type your message here..."
            multiline
            styles={{ input: { height: 200 } }}
            {...form.getInputProps("body")}
          />
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button type="submit" variant="primary">
              Send
            </Button>
          </div>
        </form>
      </Container>
    </Modal>
  );
};

export default ComposeEmailModal;
