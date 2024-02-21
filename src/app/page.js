'use client';
import './styles.css';
import React, {useEffect} from 'react';
import Header from '@/components/reusable-items/header/header.js';
import Hero from '@/components/screens/home/hero/hero';
import Intro from '@/components/screens/home/intro/intro';
import GridShowcase from '@/components/screens/home/gridshowcase/gridshowcase';
import Skills from '@/components/screens/home/skills/skills';
import Fullpage, { FullPageSections, FullpageSection, FullpageNavigation} from '@ap.cx/react-fullpage';
import AOS from 'aos';
import 'aos/dist/aos.css';


const gridItems = [
  {
    id: 1,
    imageSrc: '/images/projects/stunna-persona-project.webp',
    content: 'Stunna Persona',
    description: 'Explore Stunna Persona, my gym clothing brand.',
    language: ['HTML', 'CSS', 'JS'],
    link: '/contact/'
  },
  {
    id: 2,
    imageSrc: '/images/projects/sumdinger.webp',
    content: 'Sumdinger',
    description: 'Simple dice game bounds by the rules of getting 2 random die and using their sum to try and clear all 12 combinations.',
    language: ['Swift'],
    link: '/contact/'
  },
  {
    id: 3,
    imageSrc: '/images/projects/qvardle.webp',
    content: 'Qvardle',
    description: 'Wordle variant with slightly different rules.',
    language: ['Swift'], 
    link: '/contact/'
  },
  {
    id: 4,
    imageSrc: '/images/projects/eu-reader.webp',
    content: 'EU Reader',
    description: 'Augmented reality application that displays useful information about Elon University by scanning image targets and displaying it as a book.',
    language: ['C-Sharp'], 
    link: '/contact/'
  },
  {
    id: 5,
    imageSrc: '/images/projects/compleo.webp',
    content: 'Compleo',
    description: 'Productivity app that uses your tracked daily feelings and other data to produce a logical schedule for your day by day needs.',
    language: ['React Native'], 
    link: '/contact/'
  },
  {
    id: 6,
    imageSrc: '/images/projects.jpg',
    content: 'EU Reader',
    description: 'Augmented reality application that displays useful information about Elon University by scanning image targets and displaying it as a book.',
    language: ['C-Sharp'], 
    link: '/contact/'
  },

  {
    id: 7,
    imageSrc: '/images/projects.jpg',
    content: 'Content for item 7',
    description: 'Blank',
    language: ['Swift'], 
    link: '/contact/'
  },
  
];

export default function Home() {

  const SectionStyle = {
    height: '100vh', 
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
  useEffect(() => {
    AOS.init({duration: 2000});
  }, []);

  return (
    <>
      <Header/>
      <div className='mainBody'>
        <Hero/>
        <GridShowcase items={gridItems}/>
        <Skills/>
      </div>
      {/* <Fullpage>
        <FullpageNavigation/>
        <FullPageSections>
          <FullpageSection style={SectionStyle}>
            <Hero/>
          </FullpageSection>
          <FullpageSection style={SectionStyle}>
            <Intro/>
          </FullpageSection>
          <FullpageSection style={{...SectionStyle, backgroundColor: 'lightblue'}}>
            <Skills/>
          </FullpageSection>
        </FullPageSections>
      </Fullpage> */}
    </>
  );
}