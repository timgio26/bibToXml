import { useState } from "react";
import "./App.css";
import { useGetXml } from "./MyQuery";



function App() {
  const [url, setUrl] = useState<string>("");

  const {getXml} = useGetXml()

  function handleGetXml(){
    getXml(url)
  }
  
  return (
    <div className="flex flex-col gap-3 px-1.5">
      <div className="flex flex-col items-center">
        <span className="text-2xl">BibTeX to XML</span>
        <span>Because we write in MS Word, and it only able to import XML</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <textarea
          name="urlinput"
          id="urlinput"
          className="border w-full md:w-1/2 p-1"
          placeholder="Paste BibTeX URL from Google Schoolar"
          value={url}
          onChange={(e)=>setUrl(e.target.value)}
        />
        <button className="border bg-green-300 px-3 rounded cursor-pointer" onClick={handleGetXml}>
          generate xml
        </button>
      </div>
    </div>
  );
}

export default App;
