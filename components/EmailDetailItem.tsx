import { axiosInstance } from '@/services/Axios';
import React from 'react'
import useSWR from "swr";
import Loading from './Loading';
import { EmailDetail } from '@/interface/Email';

const fetcher = async (url: string) => {
  let res = await axiosInstance.get(url);
  return res.data;
};

function EmailDetailItem({id}:{id:string}) {
  const { data, error, isLoading } = useSWR<EmailDetail>(
    `/emails/${id}`,
    fetcher,
    {
      onSuccess: (data) => {
        console.log(data)
      },
    }
  );
  if (error) return <div>{error.message}</div>;
  if (isLoading) return <Loading />;
  return (
    <div>
      
    </div>
  )
}

export default EmailDetailItem