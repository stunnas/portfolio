import '@/app/styles.css';
import './typingSpeed.css';
import React from 'react';
import Head from 'next/head';
import Header from '@/components/reusable-items/header/header.js';
import TypingSpeedTool from '@/components/tools/typing-speed-tool/typingSpeedTool';
import TypingSpeedSVG from '@/components/reusable-items/icons/typingSpeedSVG';

export default function TypingSpeedTest() {
  return (
    <>
      <Head>
        <title>CAA - Tools - Typing Speed Test</title>
        <script src="http://localhost:3000"></script>
      </Head>
      <Header />
      <div className="mainBody">
        <div className="toolTitle">
            <h1>Typing Speed Test</h1>
            <TypingSpeedSVG/>
        </div>
        <p>Type the following text:</p>
        <TypingSpeedTool/>
      </div>
    </>
  );
}