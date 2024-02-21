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
    imageSrc: '/images/projects.jpg',
    content: 'Stunna Persona',
    description: 'Explore Stunna Persona, my gym clothing brand.',
    language: ['HTML', 'CSS', 'JS'],
  },
  {
    id: 2,
    imageSrc: '/images/projects.jpg',
    content: 'Sumdinger',
    description: 'Simple dice game implemented',
    language: ['Swift'],
  },
  {
    id: 3,
    imageSrc: '/images/projects.jpg',
    content: 'Qvardle',
    description: 'Wordle variant with slightly different rules',
    language: ['Swift'],
  },
  {
    id: 4,
    imageSrc: '/images/projects.jpg',
    content: 'Content for item 4',
    description: 'Blank'
  },
  {
    id: 5,
    imageSrc: '/images/projects.jpg',
    content: 'Content for item 5',
    description: 'Blank'
  },
  {
    id: 6,
    imageSrc: '/images/projects.jpg',
    content: 'Content for item 6',
    description: 'Blank'
  },
  {
    id: 7,
    imageSrc: '/images/projects.jpg',
    content: 'Content for item 7',
    description: 'Blank'
  },
  {
    id: 8,
    imageSrc: '/images/projects.jpg',
    content: 'Content for item 8',
    description: 'Blank'
  },
  {
    id: 9,
    imageSrc: '/images/projects.jpg',
    content: 'Content for item 9',
    description: 'Blank'
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