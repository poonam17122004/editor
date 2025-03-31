import React, { useContext } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/mode-mysql";
import "ace-builds/src-noconflict/theme-sqlserver";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-min-noconflict/ext-language_tools";
import { ThemeContext } from "../ThemeContext";
import "./SqlEditor.css";

function SqlEditor({ setValue, value }) {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`sql-editor-container ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <div className="editor-header">
        <div className="editor-title">SQL Editor</div>
      </div>
      <AceEditor
        id="editor"
        aria-label="editor"
        mode="mysql"
        theme={isDarkMode ? "dracula" : "sqlserver"}
        name="editor"
        width="100%"
        fontSize={16}
        minLines={15}
        maxLines={10}
        showPrintMargin={false}
        showGutter
        placeholder="Write your query here..."
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          fontFamily: "'Source Code Pro', 'Menlo', 'Monaco', monospace",
        }}
        value={value}
        onChange={(value) => setValue(value)}
        showLineNumbers
      />
    </div>
  );
}

export default SqlEditor;
