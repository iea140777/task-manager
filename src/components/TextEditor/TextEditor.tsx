import React from "react";

import { Editor } from "@tinymce/tinymce-react";
interface TextEditorProps {
  initialValue: string;
  editorRef: React.MutableRefObject<any>;
  height?: number;
  plugins?: string[];
  inline?: boolean;
  toolbar?: string;
  editorHandler?: () => void;
}

const DEFAULT_HEIGHT = 200;
const DEFAULT_PLUGINS = [
  "advlist",
  "autolink",
  "lists",
  "link",
  "image",
  "charmap",
  "anchor",
  "searchreplace",
  "visualblocks",
  "code",
  "fullscreen",
  "insertdatetime",
  "media",
  "table",
  "preview",
  "help",
  "wordcount",
];

const DEFAULT_TOOLBAR =
  "undo redo | blocks | " +
  "bold italic forecolor | alignleft aligncenter " +
  "alignright alignjustify | bullist numlist outdent indent | " +
  "removeformat ";

function TextEditor({
  initialValue,
  editorRef,
  height = DEFAULT_HEIGHT,
  plugins = DEFAULT_PLUGINS,
  toolbar = DEFAULT_TOOLBAR,
  inline = true,
  editorHandler = () => {},
}: TextEditorProps): React.ReactElement {
  return (
    <Editor
      apiKey="nsnx2aavjr1gsq75c73mxjzdx6vu5spniqfc9gb0f9474s6e"
      inline={inline}
      onInit={(evt, editor) => (editorRef.current = editor)}
      onEditorChange={editorHandler}
      initialValue={initialValue}
      init={{
        height,
        menubar: false,
        plugins,
        toolbar,
        body_class: "editor",
      }}
    />
  );
}
export { TextEditor };
