import '@/app/styles.css';
import React from 'react';
import Link from 'next/link';
import Header from '@/components/reusable-items/header/header.js';

export default function Overview() {
  return (
    <>
      <Header />
      <div className="mainBody">
        <Link href='overview/cookie'><button style={{margin: '100px'}}>Cookie Game</button></Link>
      </div>
    </>
  );
}