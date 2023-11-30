"use client";
import EmailItem from "@/components/EmailItem";
import Loading from "@/components/Loading";
import { Email, Meta } from "@/interface/Email";
import { axiosInstance } from "@/services/Axios";
import { Pagination } from "@mantine/core";
import { useState } from "react";
import useSWR from "swr";

export default function SpamPage() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [activePage, setPage] = useState(1);
  const fetcher = async (url: string) => {
    let res = await axiosInstance.get(url);
    return res.data;
  };
  const { data, error, isLoading } = useSWR(
    `/emails/spam?page=${activePage}`,
    fetcher,
    {
      onSuccess: (data) => {
        setEmails(data.data);
        setMeta(data.meta);
      },
    }
  );
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
      <Pagination
        value={activePage}
        onChange={setPage}
        total={meta?.pages ?? 1}
      />
    </div>
  );
}
