import './styles.css';
import React from 'react';
import Header from '@/components/header/header.js';
import PersonalCard from '@/components/personal-card/personal-card';

export default function Home() {

  return (
    <>
      <Header/>
      <div className="mainBody">
        <PersonalCard/>
      </div>
      
    </>
  );
}