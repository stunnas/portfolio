/* eslint-disable react/no-unescaped-entities */
'use client';
import '@/app/styles.css';
import '@/app/projects/eu-reader/eu-reader.css';
import React, { useState, useEffect } from 'react';
import Header from '@/components/reusable-items/header/header.js';
import GridShowcase from '@/components/reusable-items/grid-showcase/grid-showcase';

const gridItems = [
    {
        id: 1,
        type: 'image',
        src: '/images/books.png',
    },
    {
        id: 2,
        type: 'video',
        src: '/videos/EUReader.mp4',
    },
]


export default function EUReader() {
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
                return <p>Welcome to EU Reader, an innovative augmented reality (AR) application designed to transform how students, faculty, and visitors explore and connect with Elon University. By simply scanning image targets around campus, EU Reader brings the rich history, vibrant community, and extensive academic offerings of Elon to life, right before your eyes. Made using Unity and C#.</p>;
            case 'useCases':
                return <p> Dive into a wide array of information, including detailed overviews of academic departments, insights into student life, highlights of extracurricular opportunities, and practical information about campus facilities. EU Reader makes exploring this content more accessible and engaging than ever before.</p>;
            case 'behindScenes':
                return <p>Creating EU Reader was a journey filled with challenges, learning, and collaboration. Our team, consisting of myself and another developer, worked tirelessly to ensure that the app not only met but exceeded our community's expectations. From late-night coding sessions to feedback rounds with students, every step in the development process was driven by our passion for innovation and commitment to the Elon community.</p>;
            default:
                return <p>Welcome to EU Reader, an innovative augmented reality (AR) application.</p>;
        }
    };

    return (
      <>
        <Header />
        <div className="mainBody">
            <div style={{height: '100vh', width: '100vw'}}>
                <div className="iframeWrapper">
                    <iframe src="https://gifer.com/embed/U8mq" allowFullScreen />
                    <div className="nonClickableOverlay"/>
                </div>
                <div className='reader-showcase'>
                    <div className='reader-info'>
                        <h1 className='eu-title'>EU Reader</h1>
                        {renderContent()}
                        <div className='reader-content-buttons'>
                            <button onClick={() => changeContent('description')}>Description<div/></button>
                            <button onClick={() => changeContent('useCases')}>Use Cases<div/></button>
                            <button onClick={() => changeContent('behindScenes')}>Behind the Scenes<div/></button>
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