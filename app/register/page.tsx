"use client";
import { REGEX_PASSWORD } from "@/constants/Regex";
import { RegisterFormValues } from "@/interface/Form";
import { register } from "@/services/AuthService";

import {
  Container,
  Title,
  Text,
  Anchor,
  TextInput,
  Paper,
  Button,
  PasswordInput,
} from "@mantine/core";
import { useForm, isNotEmpty, isEmail, matches } from "@mantine/form";
import Link from "next/link";
import { useState } from "react";

function RegisterPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const registerForm = useForm<RegisterFormValues>({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },

    validate: {
      // username: isNotEmpty("Enter your full name"),
      // email: isEmail("Invalid email"),
      // password: matches(REGEX_PASSWORD, "Invalid password"),
    },
  });

  const handleSubmit = async (values: RegisterFormValues) => {
    console.log(values);
    try {
      setIsLoading(true);
      await register(values);
      setIsLoading(false);
      registerForm.reset();
    } catch (e) {
      setIsLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <form onSubmit={registerForm.onSubmit(handleSubmit)}>
        <Title
          ta="center"
          style={{
            fontFamily: "Greycliff CF, var(--mantine-font-family)",
            fontWeight: "900",
          }}
        >
          Create account
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do you already have an account?{" "}
          <Anchor size="sm" component={Link} href="/login">
            Sign in
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Username"
            placeholder="Your full name"
            {...registerForm.getInputProps("fullName")}
          />
          <TextInput
            label="Email"
            placeholder="example@gmail.com"
            {...registerForm.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            {...registerForm.getInputProps("password")}
          />
          <Button fullWidth mt="xl" type="submit" loading={isLoading}>
            Sign up
          </Button>
        </Paper>
      </form>
    </Container>
  );
}

export default RegisterPage;
