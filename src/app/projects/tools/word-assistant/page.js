'use client';
import '@/app/styles.css';
import './wordAssistant.css';
import React, { useState } from 'react';
import Head from 'next/head';
import Header from '@/components/reusable-items/header/header.js';
import WordAssistantSVG from '@/components/reusable-items/icons/wordAssistantSVG';

export default function WordAssistant() {
  const [text, setText] = useState('');
  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const sentenceCount = text.split(/[.!?]+/).filter(Boolean).length;
  const paragraphCount = text.split(/\n\n+/).filter(Boolean).length;


  const handleTextChange = (e) => {
    setText(e.target.value);
  }

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
        <textarea
          name="textArea"
          className="textArea"
          value={text}
          onChange={handleTextChange}
          placeholder="Type or paste your text here..."
        />
        <div className="textStats">
          <div className="statItem">Characters: {charCount}</div>
          <div className="statItem">Words: {wordCount}</div>
          <div className="statItem">Sentences: {sentenceCount}</div>
          <div className="statItem">Paragraphs: {paragraphCount}</div>
          <div className="statItem">Grammar Rating: {'Not Implemented Yet'}</div>
        </div>
        
      </div>
    </>
  );
}