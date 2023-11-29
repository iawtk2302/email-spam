"use client";

import Loading from "@/components/Loading";
import { useAuth } from "@/contexts/AuthContext";
import { EmailDetail } from "@/interface/Email";
import { axiosInstance } from "@/services/Axios";
import useSWR from "swr";

export default function InboxPage() {
  const { logout } = useAuth();
  const fetcher = async (url: string) => {
    let res = await axiosInstance.get(url);
    return res.data;
  };
  const { data, error, isLoading } = useSWR<EmailDetail[]>(`/emails`, fetcher, {
    onSuccess: (data) => {
      console.log(data);
    },
  });
  if (error) return <div>{error.message}</div>;
  if (isLoading) return <Loading />;
  return (
    <div>
      {/* <button onClick={logout}>logout</button> */}
      {data?.map((email) => (
        <div>{email.senderName}</div>
      ))}
    </div>
  );
}
