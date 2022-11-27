import React from "react";

import { Editor } from "@tinymce/tinymce-react";
interface TextEditorProps {
  initialValue: string;
  editorRef: React.MutableRefObject<any>;
  height?: number;
  plugins?: string[];
}

const DEFAULT_HEIGHT = 200;
const DEFAULT_PLUGINS = [
  "advlist",
  "autolink",
  "lists",
  "link",
  "image",
  "charmap",
  "preview",
  "anchor",
  "searchreplace",
  "visualblocks",
  "code",
  "fullscreen",
  "insertdatetime",
  "media",
  "table",
  "code",
  "help",
  "wordcount",
];

function TextEditor({
  initialValue,
  editorRef,
  height = DEFAULT_HEIGHT,
  plugins = DEFAULT_PLUGINS,
}: TextEditorProps): React.ReactElement {
  return (
    <Editor
      apiKey="your-api-key"
      onInit={(evt, editor) => (editorRef.current = editor)}
      initialValue={initialValue}
      init={{
        height,
        menubar: false,
        plugins,
        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
    />
  );
}
export { TextEditor };
