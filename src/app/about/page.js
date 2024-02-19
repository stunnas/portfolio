import '@/app/styles.css';
import React from 'react';
import Link from 'next/link';
import Header from '@/components/reusable-items/header/header.js';

export default function About() {
  return (
    <>
      <Header />
      <div className="mainBody">
        <h1>My story</h1>
      </div>
    </>
  );
}