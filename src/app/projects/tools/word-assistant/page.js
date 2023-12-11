import '@/app/styles.css';
import React from 'react';
import Head from 'next/head';
import Header from '@/components/header/header.js';
import WordAssistantSVG from '@/components/icons/wordAssistantSVG';

export default function WordAssistant() {
  return (
    <>
      <Head>
        <title>CAA - Tools - Word Assistant</title>
        <script src="http://localhost:3000"></script>
      </Head>
      <Header />
      <div className="mainBody">
        <div className="toolTitle">
            <h1>Word Assistant</h1>
            <WordAssistantSVG/>
        </div>
        
      </div>
    </>
  );
}