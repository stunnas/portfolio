import '@/app/styles.css';
import React from 'react';
import Head from 'next/head';
import Header from '@/components/reusable-items/header/header.js';
import ImageEditorSVG from '@/components/reusable-items/icons/imageEditorSVG';

export default function ImageEditor() {
  return (
    <>
      <Head>
        <title>CAA - Tools - Image Editor</title>
        <script src="http://localhost:3000"></script>
      </Head>
      <Header />
      <div className="mainBody">
        <div className="toolTitle">
            <h1>Image Editor</h1>
            <ImageEditorSVG/>
        </div>
        
      </div>
    </>
  );
}