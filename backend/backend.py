from flask import Flask, Response,request,jsonify
import requests
import bibtexparser
import xml.etree.ElementTree as ET
import datetime
from pydantic import BaseModel
from typing import Optional

app = Flask(__name__)
headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/120.0.0.0 Safari/537.36"
        ),
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1"
    }

class RequestJson(BaseModel):
    url:str

class BibTexSchema(BaseModel):
    year:str
    journal:Optional[str] = None
    booktitle:Optional[str] = None
    pages:Optional[str] = None
    publisher:Optional[str] = None
    author:str
    title:str
    ENTRYTYPE:str
    ID:str

SourceTypeDict = {"inproceedings":"Conference Proceedings",
                  "article":"Journal Article",
                  "incollection":"Book Section"}

@app.route("/version")
def version():
    return "0.0.1"

@app.route("/getxml",methods=['POST'])
def hello():
    data = RequestJson(**request.get_json())
    resp = requests.get(data.url,headers=headers)
    bib_database = bibtexparser.loads(resp.text)
    root = ET.Element("b:Sources",attrib={"xmlns:b": "http://schemas.openxmlformats.org/officeDocument/2006/bibliography",
                                          "xmlns":"http://schemas.openxmlformats.org/officeDocument/2006/bibliography"})
    if(len(bib_database.entries)<1):
        return jsonify({"error": f"data length {len(bib_database.entries)}",
                        "raw":resp.text}),400
    for entry in bib_database.entries:
        parsed = BibTexSchema(**entry)
        record = ET.SubElement(root, "b:Source")
        ET.SubElement(record,"b:SourceType").text = SourceTypeDict.get(parsed.ENTRYTYPE) 
        ET.SubElement(record,"b:Title").text = parsed.title
        ET.SubElement(record,"b:Year").text = parsed.year
        ET.SubElement(record,"b:Publisher").text = parsed.publisher
        ET.SubElement(record,"b:JournalName").text = parsed.journal
        author1 = ET.SubElement(record,"b:Author")
        author2 = ET.SubElement(author1,"b:Author")
        namelist = ET.SubElement(author2,"b:NameList")

        authors=parsed.author.split(" and ")
        for i in authors:
            person = ET.SubElement(namelist,"b:Person")
            namesplit = i.split(", ")
            ET.SubElement(person,"b:Last").text = namesplit[0]
            # last=namesplit[0]
            if(len(namesplit)>1):
                # first=namesplit[1]
                ET.SubElement(person,"b:First").text = namesplit[1]

        ET.SubElement(record,"b:Tag").text = parsed.title.lower().replace(" ","-")

    
    xml_bytes = ET.tostring(root, encoding="utf-8", xml_declaration=True)
    now = datetime.datetime.now()
    return Response(xml_bytes, mimetype="application/xml",headers={
            "Content-Disposition": f"attachment; filename={now}.xml"
        }
        )


if __name__ == "__main__":
    app.run(debug=True)