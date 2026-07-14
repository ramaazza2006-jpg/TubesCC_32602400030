import {
  FileText,
  FileSpreadsheet,
  FileArchive,
  File,
  Eye,
  Download,
  Trash2,
} from "lucide-react";

import * as materialService from "../../services/materialService";

export default function MaterialCard({
  material,
  deleteMaterial,
}) {

  async function handleDownload() {
    try {
      const url = await materialService.download(material.id);
      window.open(url, "_blank");
    } catch (err) {
      console.error(err);
      alert("Gagal mendownload file.");
    }
  }

  function fileIcon(type) {
    switch (type) {
      case "PDF":
        return <FileText className="text-red-500" size={42} />;

      case "DOCX":
        return <FileText className="text-blue-500" size={42} />;

      case "PPTX":
        return <FileSpreadsheet className="text-orange-500" size={42} />;

      case "ZIP":
        return <FileArchive className="text-yellow-500" size={42} />;

      default:
        return <File className="text-slate-500" size={42} />;
    }
  }

  return (
    <div className="bg-white rounded-2xl border shadow-sm hover:shadow-lg transition p-5">

      <div className="flex gap-4">

        <div>
          {fileIcon(material.type)}
        </div>

        <div className="flex-1">

          <h2 className="font-bold text-lg">
            {material.name}
          </h2>

          <p className="text-slate-500 mt-1">
            {material.course}
          </p>

          <div className="flex gap-3 mt-3 text-sm text-slate-400">
            <span>{material.type}</span>
            <span>•</span>
            <span>{material.size}</span>
          </div>

          <p className="text-sm text-slate-400 mt-2">
            Upload : {material.uploadDate}
          </p>

        </div>

      </div>

      <div className="flex gap-3 mt-6">

        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          <Eye size={18} />
          Preview
        </button>

        <button
          onClick={handleDownload}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
        >
          <Download size={18} />
          Download
        </button>

        <button
          onClick={() => deleteMaterial(material.id)}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition"
        >
          <Trash2 size={18} />
          Delete
        </button>

      </div>

    </div>
  );
}