import React from 'react';
import Link from 'next/link';

const ToolContainer = ({ SvgComponent, title, linkHref }) => {
  return (
    <div className="toolContainer">
      <div className="svgContainer">
        <SvgComponent />
      </div>
      <h2>{title}</h2>
      <Link href={linkHref}>
        <button>Use</button>
      </Link>
    </div>
  );
};

export default ToolContainer;
