import '../styles.css';
import React from 'react';
import Header from '@/components/reusable-items/header/header.js';
import SubSpinner from '@/components/reusable-items/loaders/spinners/sub-spinner/subSpinner';

export default function Contact() {
  return (
    <>
      <Header />
      <div className="mainBody">
        <h1>Contact</h1>
        <SubSpinner/>
      </div>
    </>
  );
}
