'use client';
import '@/app/styles.css';
import './cookieclicker.css';
import React, { useState } from 'react';
import Header from '@/components/reusable-items/header/header.js';
import CookieClicker from '@/components/three/cookieclicker';

export default function Cookie() {
  const [score, setScore] = useState(0);

  const updateScore = (increment) => {
    setScore(score + increment);
  };

  return (
    <>
      <Header />
      <div className="mainBody">
        <div className='description-container'>
          <h1>Description</h1>
          <p> Made with ThreeJS and React Three </p>
        </div>
        <CookieClicker updateScore={updateScore}/>
        <div className='stats-container'>
          <h2 className='click-count'>Total Clicks: {score}</h2>

        </div>
        
      </div>
    </>
  );
}