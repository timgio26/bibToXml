import { useState } from "react";
import "./App.css";
import { useGetXml } from "./MyQuery";

function App() {
  const [url, setUrl] = useState<string>("");
  const [mode,setMode] = useState<"url"|"text">("url")

  const { getXml, isPending } = useGetXml();

  function handleGetXml() {
    getXml({source:url,mode});
  }

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-8 bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-lg max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          BibTeX to XML Converter
        </h1>
        <p className="text-gray-600 text-sm">
          Because we write in MS Word — and it only imports XML.
        </p>
      </div>
      <div className="flex items-center gap-4 p-4 font-medium text-gray-800">
        <span className="text-gray-500 font-semibold">Source:</span>
        <button className={`px-4 py-2 rounded-md border border-gray-300 bg-white ${mode=="url"&&"bg-blue-50 border-blue-500 text-blue-600 transition"} transition`}
        onClick={()=>setMode("url")}>
          BibTex URL
        </button>
        <button className={`px-4 py-2 rounded-md border border-gray-300 bg-white ${mode=="text" && "bg-blue-50 border-blue-500 text-blue-600 transition"} transition`}
        onClick={()=>setMode("text")}>
          BibTex
        </button>
      </div>
      {/* Input + Button */}
      <div className="w-full flex flex-col items-center gap-4">
        <textarea
          name="urlinput"
          id="urlinput"
          className="w-full md:w-2/3 h-32 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
          placeholder={`Paste BibTeX ${mode=="url"?"URL ":""}from Google Scholar`}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          onClick={handleGetXml}
          disabled={isPending}
          className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
            isPending||!url
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 text-white shadow-md"
          }`}
        >
          {isPending ? "Generating XML..." : "Generate XML"}
        </button>
      </div>
    </div>
  );
}

export default App;
