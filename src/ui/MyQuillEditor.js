import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../index.css";

function MyQuillEditor({ value, onChange }) {
  const modules = {
    toolbar: [["bold", "italic", "underline", "strike"], ["image"]],
  };
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      className="mb-12 h-36 bg-violet-100 caret-violet-950 text-violet-950 rounded-md "
    />
  );
}

export default MyQuillEditor;
