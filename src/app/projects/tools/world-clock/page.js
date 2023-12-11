import '@/app/styles.css';
import React from 'react';
import Head from 'next/head';
import Header from '@/components/header/header.js';
import WorldClockSVG from '@/components/icons/worldClockSVG';

export default function WorldClock() {
  return (
    <>
      <Head>
        <title>CAA - Tools - World Clock</title>
        <script src="http://localhost:3000"></script>
      </Head>
      <Header />
      <div className="mainBody">
        <div className="toolTitle">
            <h1>World Clock</h1>
            <WorldClockSVG/>
        </div>
        
      </div>
    </>
  );
}