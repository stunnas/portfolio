/* eslint-disable react/no-unescaped-entities */
'use client';
import '@/app/styles.css';
import '@/app/projects/sumdinger/sumdinger.css';
import React, { useState, useEffect } from 'react';
import Header from '@/components/reusable-items/header/header.js';
import GridShowcase from '@/components/reusable-items/grid-showcase/grid-showcase';

const gridItems = [
    {
        id: 1,
        type: 'image',
        src: '/images/projects/sumdinger.webp',
    },
    {
        id: 2,
        type: 'video',
        src: '/videos/EUReader.mp4',
    },
]


export default function Sumdinger() {
    const [activeContent, setActiveContent] = useState('description');

    useEffect(() => {
        // Add a class to the body when the component mounts
        document.body.classList.add('eu-reader');
    
        // Remove the class when the component unmounts
        return () => {
          document.body.classList.remove('eu-reader');
        };
    }, []);

    const changeContent = (content) => {
        setActiveContent(content);
    };

    const renderContent = () => {
        switch (activeContent) {
            case 'description':
                return <p>Sumdinger is a simple dice game bounds by the rules of getting 2 random die and using their sum to try and clear all 10 combinations (3-11). Any combinations of 2 or 12 will be an automatic free roll (be strategic). Made using Swift.</p>;
            default:
                return <p>Welcome to Sumdinger.</p>;
        }
    };

    return (
      <>
        <Header />
        <div className="mainBody">
            <div style={{height: '100vh', width: '100vw'}}>
                <div className="iframeWrapper">
                    <iframe src="https://gifer.com/embed/b8y" allowFullScreen />
                    <div className="nonClickableOverlay"/>
                </div>
                <div className='reader-showcase'>
                    <div className='reader-info'>
                        <h1 className='eu-title'>Sumdinger</h1>
                        {renderContent()}
                        <div className='reader-content-buttons'>
                            <button onClick={() => changeContent('description')}>Description<div/></button>
                            <button onClick={() => window.open('https://github.com', '_blank')} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px'}}>GitHub <img alt="external link" src="/images/logos/link.png" style={{filter: 'invert()'}}/><div/></button>
                        </div>
                    </div>
                    <div className='reader-grid'>
                        <GridShowcase items={gridItems}/>
                    </div>
                </div>
            </div>
        </div>
      </>
    );
  }