'use client';
import './hero.css'
import React, { useEffect } from 'react';
import Tilty from 'react-tilty';
import AOS from 'aos';
import 'aos/dist/aos.css';
const Hero = () => {
  
  useEffect(() => {
    AOS.init({ duration: 1000, once: false, mirror: true, offset: 150 });
  }, []);

  return (
    <div data-aos="zoom-in-up" className='hero-container hero-background'>
      <div className='hero-info'>
        <div className='title'>
          <h1>Chase Albritton</h1>
          <h2>Frontend + Game Developer</h2>
          <p>I'm a dedicated Computer Science student with a fiery passion for gaming. My journey in programming has been driven by my fascination with creating and exploring virtual worlds. From developing intricate game mechanics to designing compelling narratives, every line of code I write is a step towards bringing these digital universes to life. In my quest, I continually strive to merge creativity with technology, ensuring every pixel serves a purpose and contributes to an immersive, engaging experience.</p>
        </div>
        <div className='option-links'>
          <button>Let's Chat</button>
          <button>My resumé</button>
        </div>
      </div>
      <Tilty
        className='tilty portrait-container'
        max={50}
        scale={1.15}
        perspective={750}
        speed={1000}
        onMouseEnter={(e) => {
          e.currentTarget.style.transition = 'transform 1s';
          e.currentTarget.style.transform = 'rotate(180deg)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transition = 'transform 1s';
          e.currentTarget.style.transform = 'rotate(0deg)';
        }}
      >
          <img src="/images/portrait.jpg" alt="Projects Overview"/>
      </Tilty>
    </div>
    
  );
};

export default Hero;