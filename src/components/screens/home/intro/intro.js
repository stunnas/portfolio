'use client';
import './intro.css'
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Intro = () => {
  
  useEffect(() => {
    AOS.init({ duration: 1000, once: false, mirror: true, offset: 150 });
  }, []);

  return (
    <>
        <div className='intro-container' data-aos="fade-up">
          <h1>Nice to meet you!</h1>
          <h2>I'm Chase, a dedicated Computer Science student with a fiery passion for gaming. My journey in programming has been driven by my fascination with creating and exploring virtual worlds. From developing intricate game mechanics to designing compelling narratives, every line of code I write is a step towards bringing these digital universes to life. In my quest, I continually strive to merge creativity with technology, ensuring every pixel serves a purpose and contributes to an immersive, engaging experience.</h2>
        </div>
    </>
  );
};

export default Intro;