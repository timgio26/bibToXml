import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export function useGetXml(){
  const {mutate:getXml} = useMutation({
    mutationFn:async(url:string)=>{
      axios.post("http://localhost:5000/getxml",{
        url
      })
    }
  })
  return {getXml}
}