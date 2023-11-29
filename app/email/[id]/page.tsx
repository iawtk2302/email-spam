"use client";
import Loading from "@/components/Loading";
import { EmailDetail } from "@/interface/Email";
import { axiosInstance } from "@/services/Axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Text } from "@mantine/core";
import useSWR from "swr";
import { IconChevronLeft } from "@tabler/icons-react";

export default function EmailDetailPage() {
  const [emailDetail, setEmailDetail] = useState<EmailDetail | null>(null);
  const router = useRouter();
  const param = useParams();
  const fetcher = async (url: string) => {
    let res = await axiosInstance.get(url);
    return res.data;
  };
  console.log(param);
  const { data, error, isLoading } = useSWR(`/emails/${param.id}`, fetcher, {
    onSuccess: (data) => {
      setEmailDetail(data.data);
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
      <IconChevronLeft onClick={() => router.back()} />
      <Text style={{ fontSize: 30 }}>{emailDetail?.title}</Text>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        {emailDetail?.senderName}
      </Text>
      <Text>{emailDetail?.body}</Text>
    </div>
  );
}
