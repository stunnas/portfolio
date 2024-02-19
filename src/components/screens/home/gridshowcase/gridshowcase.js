import React, { useState } from 'react';
import './gridShowcase.css';

const GridItem = ({ id, isSelected, onClick, children }) => {
    // This className will conditionally apply the 'selected' class based on the state
    const className = `grid-item ${isSelected ? 'selected' : 'unselected'}`;
    return (
      <div className={className} onClick={() => onClick(id)}>
        {children}
      </div>
    );
};
  
  const GridShowcase = ({ items }) => {
    const [selectedId, setSelectedId] = useState(null);
  
    const handleItemClick = (id) => {
      setSelectedId(selectedId === id ? null : id); // Toggle the selected state
    };
    
    return (
      <div className="grid-container">
        {items.map((item) => (
          <GridItem
            key={item.id}
            id={item.id}
            isSelected={selectedId === item.id}
            onClick={() => handleItemClick(item.id)}
          >
            <div
              className="grid-background"
              style={{ backgroundImage: `url(${item.imageSrc})` }}
            >
              <div className="grid-content">
                {item.content}
              </div>
            </div>
          </GridItem>
        ))}
      </div>
    );
  };
  
  export default GridShowcase;