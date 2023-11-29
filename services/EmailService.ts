import { ComposeEmailFormValues } from "@/interface/Form";
import { axiosInstance } from "./Axios";
import { showErrorNotification, showSuccessNotification } from "./Notification";
import axios from "axios";

export const sendEmail = async (data: ComposeEmailFormValues) => {
  try {
    const response = await axiosInstance.post("/emails", {
      body: data.body,
      title: data.title,
      receiver_email: data.receiver_email,
    });
    console.log(response);
    showSuccessNotification("You have successfully sended email.");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      showErrorNotification(error.response?.data.message);
    }
    throw error;
  }
};
