import '@/app/styles.css';
import './apiTester.css';
import React from 'react';
import Head from 'next/head';
import Header from '@/components/reusable-items/header/header.js';
import APITesterSVG from '@/components/reusable-items/icons/apiTesterSVG';

export default function APITester() {
  return (
    <>
      <Head>
        <title>CAA - Tools - API Tester</title>
        <script src="http://localhost:3000"></script>
      </Head>
      <Header />
      <div className="mainBody">
        <div className="toolTitle">
            <h1>API Tester</h1>
            <APITesterSVG/>
        </div>
        
      </div>
    </>
  );
}