export interface RegisterFormValues {
  email: string;
  password: string;
  username: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface ComposeEmailFormValues {
  receiver_email: string;
  title: string;
  body: string;
}
