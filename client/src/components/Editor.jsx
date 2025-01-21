import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './editor-styles.css';
import EditorPane from './EditorPane';

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

  const generateHTMLContent = (data) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Template</title>
      </head>
      <body>
        ${data.rows
          .map((row) =>
            `<div class="row">
              ${row.blocks
                .map(
                  (block) =>
                    block.type === 'text'
                      ? `<p style="${block.style || ''}">${block.rawContent || " "}</p>`
                      : `<img src="${block.rawContent}" style="${block.style || ''}" />`
                )
                .join('')}
            </div>`
          )
          .join('')}
      </body>
      </html>`;
  };

  console.log(data);

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
                  <div
                    className="block-content"
                    dangerouslySetInnerHTML={{ __html: block.rawContent || '' }}
                  />
                ) : (
                  <img src={block.content} alt="Block" className="block-img" />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="editor-controls">
        <div>
            <h3>{selectedBlockTitle === null ? 'Editor Pane' : selectedBlockTitle}</h3>
            <EditorPane
            data={data}
            setData={setData}
            selectedBlockData={selectedBlockData}
            setSelectedBlock={setSelectedBlock} // pass this to update the selected block data
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
