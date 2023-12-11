import '@/app/styles.css';
import React from 'react';
import Head from 'next/head';
import Header from '@/components/reusable-items/header/header.js';
import DailyAffirmationSVG from '@/components/reusable-items/icons/dailyAffirmationSVG';

export default function DailyAffirmation() {
  return (
    <>
      <Head>
        <title>CAA - Tools - Daily Affirmation</title>
        <script src="http://localhost:3000"></script>
      </Head>
      <Header />
      <div className="mainBody">
        <div className="toolTitle">
            <h1>Daily Affirmation</h1>
            <DailyAffirmationSVG/>
        </div>
        
      </div>
    </>
  );
}