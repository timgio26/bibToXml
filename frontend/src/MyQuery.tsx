import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast";

export function useGetXml(){
  const {mutate:getXml,isPending} = useMutation({
    mutationFn:async(url:string)=>{
      const resp = await axios.post("api/getxml",{url},{responseType:"blob"})
      
      // Extract filename from headers
      const disposition = resp.headers['content-disposition'];
      const match = disposition?.match(/filename="?(.+)"?/);
      const filename = match?.[1] || 'download.xml';

      // Create blob URL and trigger download
      const blobUrl = window.URL.createObjectURL(resp.data);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);

    },
    onSuccess:()=>{
      toast.success("file downloaded")
    },
    onError:()=>{
      toast.error("something wrong. try again later")
    }
  })
  return {getXml,isPending}
}