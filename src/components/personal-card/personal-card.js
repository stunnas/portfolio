'use client';
import React, { useRef } from 'react';
import Spline from '@splinetool/react-spline';

const PersonalCard = () => {
  const objectToAnimate = useRef();

  function onLoad(spline) {
    const obj = spline.findObjectByName('Headshot');
    // save the object in a ref for later use
    objectToAnimate.current = obj;
  }

  function handleMouseEnter() {
    document.body.style.cursor = 'grab';
  }

  function handleMouseLeave() {
    document.body.style.cursor = 'default';
  }

  return (
    <>
      <Spline
        style={{ width: '500px', height: '500px' }}
        scene="https://prod.spline.design/UoOAPQ-q9Rirf8Js/scene.splinecode"
        onLoad={onLoad}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </>
  );
};

export default PersonalCard;
