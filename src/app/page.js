import './styles.css';
import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';
import Header from '@/components/reusable-items/header/header.js';
import Spinner from '@/components/reusable-items/loaders/spinners/main-spinner/spinner';

const PersonalCard = dynamic(() => import('@/components/spline/personal-card/personal-card'), {
  loading: () => <Spinner/>,
});

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