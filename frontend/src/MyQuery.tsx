import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast";

interface UseGetXmlProp {
  source:string
  mode:"url"|"text"
}
export function useGetXml(){
  const {mutate:getXml,isPending} = useMutation({
    mutationFn:async({source,mode}:UseGetXmlProp)=>{
      let resp
      if (mode=="url"){
        resp = await axios.post("api/getxmlfromurl",{bibtexurl:source},{responseType:"blob"})
      }else{
        resp = await axios.post("api/getxmlfrombibtex",{bibtex:source},{responseType:"blob"})
      }
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