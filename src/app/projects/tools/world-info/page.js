import '@/app/styles.css';
import './worldInfo.css'
import React from 'react';
import Header from '@/components/reusable-items/header/header.js';
import WorldClockSVG from '@/components/reusable-items/icons/worldClockSVG';
import WorldInfoTool from '@/components/tools/world-info-tool/worldInfoTool';

export const metadata = {
  title: 'World Info',
}
export default function WorldInfo() {
  return (
    <>
      <Header />
      <div className="mainBody">
        <div className="toolTitle">
            <h1>World Info</h1>
            <WorldClockSVG/>
        </div>
        <WorldInfoTool/>
      </div>
    </>
  );
}