import '@/app/styles.css';
import './projects.css';
import React from 'react';
import Link from 'next/link';
import Header from '@/components/reusable-items/header/header.js';

export default function Projects() {
  return (
    <>
      <Header />
      <div className="mainBody">
        <div className="choices">
          <div className="choiceContainer">
            <img src="/images/projects.jpg" alt="Projects Overview"></img>
            <h2>Overview</h2>
            <p>
              Dive into my world of creativity and innovation where I've amalgamated ideas
              into tangible projects. From conception to deployment, you'll find a diverse
              array of applications, websites, and systems that solve real-world problems.
              Take a look at the screenshots, read the stories behind each project, and explore
              the repositories on GitHub to understand the breadth and depth of my technical
              expertise.
            </p>
            <Link href="projects/overview"><button>View Overview</button></Link>
          </div>
          <div className="choiceContainer">
            <img src="/images/tools.jpg" alt="Interactive Tools"></img>
            <h2>Tools</h2>
            <p>
              Explore a suite of handy tools designed to make your life a little easier
              and more fun. From a word counter for your essays to a color palette generator
              for your design projects, these tools are built to assist you with your everyday
              tasks. Each tool is crafted with usability in mind, ensuring you get the most
              out of your visit to my portfolio. So go ahead, try them out and see how they
              can help you today!
            </p>
            <Link href="projects/tools"><button>View Tools</button></Link>
          </div>
        </div>
        
      </div>
    </>
  );
}