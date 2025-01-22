import React, { useState } from 'react';
import axios from 'axios';

export default function InsertImage({ h, w, handleBlockChange, blockId }) {
  
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        const serverFilePath = await axios.post("http://localhost:3000/api/images/uploadImage", formData)
        console.log(serverFilePath);
        handleBlockChange(blockId, serverFilePath.data.imageUrl);
        
      } catch (error) {
        console.log(error);
        
      }
    }
  };

  return (
    <div 
      style={{ 
        textAlign: 'center',
        
        padding: '10px',
        backgroundColor: 'lightgray',
        borderRadius: '5px',

        }}>
      <label
        style={{
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          flexDirection: 'column',
          fontFamily:"sans-serif",
          color:"#3f4545",
          padding: '10px',
          maxWidth:'15rem',
          margin:"0 auto",
          backgroundColor:"#e6e6e6",
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Image-Upload--Streamline-Outlined-Expansion" height={h} width={w} ><desc>{"Image Upload Streamline Icon: https://streamlinehq.com"}</desc><g id="image-upload"><path id="Union" fill="#3f4545" fillRule="evenodd" d="M19 4.825V9h2V4.825l1.6 1.6L24 5l-4 -4 -4 4 1.425 1.4L19 4.825ZM3 5c0 -1.10457 0.89543 -2 2 -2h9v2H5v14h14v-8h2v8c0 1.1046 -0.8954 2 -2 2H5c-1.10457 0 -2 -0.8954 -2 -2V5Zm15 12 -3.75 -5 -3 4L9 13l-3 4h12Z" clipRule="evenodd" strokeWidth={1} /></g></svg>
        Upload Image
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />
      </label>
    </div>
  );
}