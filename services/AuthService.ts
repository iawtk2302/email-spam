import { LOGIN_URL, REGISTER_URL } from "@/constants/AppConstants";
import { LoginFormValues, RegisterFormValues } from "@/interface/Form";
import axios from "axios";
import { showErrorNotification, showSuccessNotification } from "./Notification";
import { axiosInstance } from "./Axios";

export const signIn = async (data: LoginFormValues) => {
  try {
    const response = await axiosInstance.post(LOGIN_URL, {
      email: data.email,
      password: data.password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      showErrorNotification(error.response?.data.message);
    }
    throw error;
  }
};
export const register = async (data: RegisterFormValues) => {
  try {
    const response = await axiosInstance.post(REGISTER_URL, {
      email: data.email,
      password: data.password,
      username: data.username,
    });
    showSuccessNotification("You have successfully registered your account");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      showErrorNotification(error.response?.data.message);
    }
    throw error;
  }
};
