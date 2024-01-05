"use client";
import Loading from "@/components/Loading";
import { EmailDetail } from "@/interface/Email";
import { axiosInstance } from "@/services/Axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Avatar, Button, Text } from "@mantine/core";
import useSWR from "swr";
import { IconChevronLeft, IconTrash, IconReload } from "@tabler/icons-react";
import { useAuth } from "@/contexts/AuthContext";

export default function EmailDetailPage() {
  const [emailDetail, setEmailDetail] = useState<EmailDetail | null>(null);
  const router = useRouter();
  const param = useParams();
  const query = useSearchParams();
  const isSended = query.get("isSended");
  const { user } = useAuth();
  const fetcher = async (url: string) => {
    let res = await axiosInstance.get(url);
    return res.data;
  };
  const handleClick = async (update: boolean) => {
    await axiosInstance.put(`emails/${param.id}?isSpam=${update}`);
    router.back();
  };
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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <IconChevronLeft onClick={() => router.back()} />
        {!(isSended == "true") ? (
          !emailDetail?.is_spam ? (
            <Button
              onClick={() => handleClick(!emailDetail!.is_spam)}
              styles={{ root: { backgroundColor: "red" } }}
            >
              Spam
            </Button>
          ) : (
            <Button onClick={() => handleClick(!emailDetail!.is_spam)}>
              Restore
            </Button>
          )
        ) : null}
      </div>
      <Text style={{ fontSize: 30, marginLeft: 48 }}>{emailDetail?.title}</Text>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 15,
          marginBottom: 10,
        }}
      >
        <Avatar radius="xl" />
        <div style={{ width: 10 }} />
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {emailDetail?.sender_name}
            </Text>
            <Text style={{ fontSize: 14 }}>
              &lt;{emailDetail?.sender_email}&gt;
            </Text>
          </div>

          <Text style={{ fontSize: 14 }}>
            {user?.email == emailDetail?.receiver_email
              ? "to me"
              : "to " + emailDetail?.receiver_name}
          </Text>
        </div>
      </div>

      <Text style={{ marginLeft: 48 }}>{emailDetail?.body}</Text>
    </div>
  );
}
