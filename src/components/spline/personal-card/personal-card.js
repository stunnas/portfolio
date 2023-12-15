'use client';
import dynamic from 'next/dynamic';
import React, { useRef } from 'react';
import Spinner from '@/components/reusable-items/loaders/spinner/spinner';
const Spline = dynamic(() => import('@splinetool/react-spline'), { suspense: true, loading: () => <Spinner/> });

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
