import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './editor-styles.css';
import EditorPane from './EditorPane';
import InsertImage from './InsertImage';
function Editor() {
  const location = useLocation();
  const template = location.state?.template;

  const [data, setData] = useState(template);
  const [selectedBlockTitle, setTitle] = useState(null);
  const [selectedBlockId, setId] = useState(null);
  const [selectedBlockData, setSelectedBlock] = useState(null);

  if (!template) {
    return <div>Error: No template selected.</div>;
  }

  const handleBlockClick = (blockId) => {
    const selectedBlock = data.rows
      .flatMap((row) => row.blocks)
      .find((block) => block.id === blockId);

    if (selectedBlock) {
      setData((prev) => ({ ...prev, activeBlockId: blockId }));
      setTitle(selectedBlock.title);
      setId(selectedBlock.id);
      setSelectedBlock(selectedBlock);
    }
  };

  const handleDownload = () => {
    const htmlContent = generateHTMLContent(data);
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'email-template.html';
    link.click();
  };

  const handleBlockChange = (blockId, newContent) => {
    setData((prev) => ({
      ...prev,
      rows: prev.rows.map((row) => ({
        ...row,
        blocks: row.blocks.map((block) =>
          block.id === blockId
            ? { ...block, rawContent: newContent }
            : block
        ),
      })),
    }));
  };
  


  const generateStyle = (style) => {
    return Object.entries(style)
      .map(([key, value]) => `${key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}:${value};`)
      .join("");
  };
  
  const generateHTMLContent = (data, selectedFontFamily = "Arial") => {
    const fontCDNs = {
      Arial: '',
      Georgia: '',
      Helvetica: '',
      "Times New Roman": '',
      Verdana: '',
      Roboto: `<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">`,
      'Open Sans': `<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">`,
    };
  
    const selectedFontCDN = fontCDNs[selectedFontFamily] || fontCDNs["Arial"];
    const bodyStyle = `
      <style>
        body {
          margin: 0;
          padding: 0;
        }
      </style>
    `;
  
    return `
      <html>
        <head>
          ${selectedFontCDN}
          ${bodyStyle}
        </head>
        <body>
          ${data.rows
            .map(
              (row) =>
                `<div>${row.blocks
                  .map((block) =>
                    block.type === "image"
                      ? `<div style="text-align: ${block.style?.textAlign || "left"};">
                           <img src="${block.rawContent}" style="${generateStyle(block.style)}" />
                         </div>`
                      : `<div style="${generateStyle(block.style)}">${block.rawContent}</div>`
                  )
                  .join("")}</div>`
            )
            .join("")}
        </body>
      </html>
    `;
  };
  
  
  
  
  
  
  

  return (
    <div className="container">
      <div className="editor-pane">
        {data.rows.map((row) => (
          <div key={row.id} className="row">
            {row.blocks.map((block) => (
              <div
                key={block.id}
                className={`block ${data.activeBlockId === block.id ? 'active' : ''}`}
                onClick={() => handleBlockClick(block.id)}
              >
                {block.type === 'text' ? (
                        <input
                        className='block-content'
                            type="text"
                            name="text"
                            id={block.id}
                            value={block.rawContent}
                            onChange={(e) => handleBlockChange(block.id, e.target.value)}
                            style={{
                              ...block.style,
                              padding: `${block.style.padding || 0}px`,
                              margin: `${block.style.margin || 0}px`,
                              backgroundColor: block.style.backgroundColor || "transparent",
                              textAlign: block.style.textAlign || "left",
                              fontFamily: block.style.fontFamily || "Arial",
                              fontSize: `${block.style.fontSize || 16}px`,
                              width: block.style.width || "100%",
                              textDecoration: block.style.textDecoration || "none",
                            }}
                            
                            
                        />
                
                ) :
                
                block.rawContent !== '' ? (
                  <div style={{
                    display: "flex",
                    justifyContent: block.style?.textAlign === 'center' ? "center" : block.style?.textAlign === 'right' ? "flex-end" : "flex-start",
                    alignItems: "center",  // Align vertically if needed
                  }}>
                    <img
                      src={block.rawContent}
                      alt="Block"
                      style={{
                        width: block.style?.width ? `${block.style.width}px` : "100%",
                        height: block.style?.height ? `${block.style.height}px` : "auto",
                        padding: block.style?.padding ? `${block.style.padding}px` : "0",
                        margin: block.style?.margin ? `${block.style.margin}px` : "0",
                        borderRadius: block.style?.borderRadius ? `${block.style.borderRadius}px` : "0",
                      }}
                    />
                  </div>
                  ) : (
                    <InsertImage h="3rem" w="3rem" handleBlockChange={handleBlockChange} blockId={block.id} />
                  )
                }
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="editor-controls">
        <div>
            <h3>{selectedBlockTitle === null ? 'Editor Pane' : selectedBlockTitle}</h3>
            <hr/>
            <EditorPane
              data={data}
              setData={setData}
              selectedBlockData={selectedBlockData}
              setSelectedBlock={setSelectedBlock}
            />
        </div>
        <button onClick={handleDownload} className="download-btn">
          Download Template
        </button>
      </div>
    </div>
  );
}

export default Editor;