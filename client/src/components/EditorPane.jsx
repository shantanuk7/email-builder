import React from "react";
import "./editor-pane-styles.css";

export default function EditorPane({ data, setData, selectedBlockData, setSelectedBlock }) {
  if (!selectedBlockData) {
    return <div className="editor-pane-placeholder">Select a block to edit its styles.</div>;
  }

  const isText = selectedBlockData.type === "text";
  const isImage = selectedBlockData.type === "image";

  const handleStyleChange = (key, value) => {
    setData((prev) => ({
      ...prev,
      rows: prev.rows.map((row) => ({
        ...row,
        blocks: row.blocks.map((block) =>
          block.id === selectedBlockData.id
            ? { ...block, style: { ...block.style, [key]: value } }
            : block
        ),
      })),
    }));

    setSelectedBlock((prev) => ({
      ...prev,
      style: { ...prev.style, [key]: value },
    }));
  };

  return (
    <div className="editor-pane-content">
      {/* Common Fields */}
      <div className="editor-field">
        <label>Padding (px):</label>
        <input
          type="range"
          min="0"
          max="50"
          value={selectedBlockData.style?.padding || 0}
          onChange={(e) => handleStyleChange("padding", parseInt(e.target.value, 10))}
        />
      </div>
      <div className="editor-field">
        <label>Margin (px):</label>
        <input
          type="range"
          min="0"
          max="50"
          value={selectedBlockData.style?.margin || 0}
          onChange={(e) => handleStyleChange("margin", parseInt(e.target.value, 10))}
        />
      </div>
      <div className="editor-field">
        <label>Background Color:</label>
        <input
          type="color"
          value={selectedBlockData.style?.backgroundColor || "#ffffff"}
          onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
        />
      </div>
      <div className="editor-field">
        <label>Alignment:</label>
        <select
          value={selectedBlockData.style?.textAlign || "left"}
          onChange={(e) => handleStyleChange("textAlign", e.target.value)}
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
          <option value="justify">Justify</option>
        </select>
      </div>

      {/* Text-Specific Fields */}
      {isText && (
        <>
          <div className="editor-field">
            <label>Font Family:</label>
            <select
              value={selectedBlockData.style?.fontFamily || "Arial"}
              onChange={(e) => handleStyleChange("fontFamily", e.target.value)}
            >
              <option value="Arial">Arial</option>
              <option value="Georgia">Georgia</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Verdana">Verdana</option>
            </select>
          </div>
          <div className="editor-field">
            <label>Font Size (px):</label>
            <input
              type="number"
              value={selectedBlockData.style?.fontSize || 16}
              onChange={(e) => handleStyleChange("fontSize", parseInt(e.target.value, 10))}
            />
          </div>
          <div className="editor-field">
            <label>Block Width (%):</label>
            <input
              type="range"
              min="10"
              max="100"
              value={selectedBlockData.style?.width || 100}
              onChange={(e) => handleStyleChange("width", `${e.target.value}%`)}
            />
          </div>
          <div className="editor-field">
            <label>Text Decoration:</label>
            <select
              value={selectedBlockData.style?.textDecoration || "none"}
              onChange={(e) => handleStyleChange("textDecoration", e.target.value)}
            >
              <option value="none">None</option>
              <option value="underline">Underline</option>
              <option value="line-through">Strikethrough</option>
              <option value="italic">Italic</option>
              <option value="bold">Bold</option>
            </select>
          </div>
        </>
      )}

      {/* Image-Specific Fields */}
      {isImage && (
        <>
          <div className="editor-field">
            <label>Image Width (px):</label>
            <input
              type="number"
              value={selectedBlockData.style?.width || 100}
              onChange={(e) => handleStyleChange("width", parseInt(e.target.value, 10))}
            />
          </div>
          <div className="editor-field">
            <label>Image Height (px):</label>
            <input
              type="number"
              value={selectedBlockData.style?.height || 100}
              onChange={(e) => handleStyleChange("height", parseInt(e.target.value, 10))}
            />
          </div>
        </>
      )}
    </div>
  );
}
