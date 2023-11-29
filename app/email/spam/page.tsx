"use client";
import EmailItem from "@/components/EmailItem";
import Loading from "@/components/Loading";
import { Email } from "@/interface/Email";
import { axiosInstance } from "@/services/Axios";
import { useState } from "react";
import useSWR from "swr";

export default function SpamPage() {
  const [emails, setEmails] = useState<Email[]>([]);
  const fetcher = async (url: string) => {
    let res = await axiosInstance.get(url);
    return res.data;
  };
  const { data, error, isLoading } = useSWR(`/emails/spam`, fetcher, {
    onSuccess: (data) => {
      setEmails(data.data);
    },
  });
  if (error) return <div>{error.message}</div>;
  if (isLoading) return <Loading />;
  return (
    <div
      style={{
        display: "flex",
        width: "76vw",
        flexDirection: "column",
      }}
    >
      {emails.map((email) => (
        <EmailItem email={email} key={email.id} />
      ))}
    </div>
  );
}
