import React, { useState, useRef, useEffect } from 'react';
import './gridShowcase.css';

const ITEMS_PER_PAGE = 3;

const GridItem = ({ item, isSelected, isFlipping, onClick }) => {

  const gridDescriptionStyle = {
      background: isSelected ? 'rgba(255, 151, 151, 0.75)' : 'transparent',
      color: isSelected ? 'rgb(0, 0, 0)' : 'rgba(0, 0, 0, 0)', 
  };
    const className = `grid-item ${isSelected ? 'selected' : 'unselected'} ${isFlipping ? 'flipping' : ''}`;
    return (
      <div className={className} onClick={() => onClick(item.id)}>
        <div
          className="grid-background"
          style={{ backgroundImage: `url(${item.imageSrc})` }}
        >
          <div className="grid-description" style={gridDescriptionStyle}>
            {isSelected && item.description}
            {isSelected && <button className='grid-link-button'>Go</button>}
            
          </div>
          <div className="grid-name">
            {item.content}
          </div>
        </div>
      </div>
    );
};
  
  const GridShowcase = ({ items }) => {
    const [selectedId, setSelectedId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isFlipping, setIsFlipping] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [indicatorLeft, setIndicatorLeft] = useState(0);
    const scrollerRef = useRef(null);
    const flipTimeoutRef = useRef(null);
    const pageCount = Math.ceil(items.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const itemsToShow = items.slice(startIndex, endIndex);
  

    const handleItemClick = (id) => {
      setSelectedId(selectedId === id ? null : id); // Toggle the selected state
    };

    useEffect(() => {
      const currentTimeout = flipTimeoutRef.current;
    
      return () => {

        if (currentTimeout) {
          clearTimeout(currentTimeout);
        }
      };
    }, []);

    const handleTabChange = (event) => {
      if (flipTimeoutRef.current) {
        clearTimeout(flipTimeoutRef.current);
      }

      setIsFlipping(true);
      setCurrentPage(Number(event.target.value));

      flipTimeoutRef.current = setTimeout(() => {
        setIsFlipping(false);
      }, 1000);

      const tabWidth = scrollerRef.current.offsetWidth / pageCount;
      setIndicatorLeft((Number(event.target.value) - 1) * tabWidth);

    };

    useEffect(() => {
      const handleResize = () => {
        // Recalculate the indicator position based on the new scroller width
        const tabWidth = scrollerRef.current.offsetWidth / pageCount;
        setIndicatorLeft((currentPage - 1) * tabWidth);
      };
    
      window.addEventListener('resize', handleResize);
    
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [currentPage, pageCount]);

    const onDragStart = (event) => {
      setDragging(true);
      setDragStartX(event.clientX - indicatorLeft);
    };
    
    const onDragEnd = () => {
      setDragging(false);
      snapToClosestTab();
    };
    
    const onDrag = (event) => {
      if (dragging && event.clientX !== 0) { // Check to prevent the drag event with clientX = 0
        const newLeft = event.clientX - dragStartX;
        setIndicatorLeft(Math.max(0, Math.min(newLeft, scrollerRef.current.offsetWidth - scrollerRef.current.firstChild.offsetWidth)));
      }
    };
    
    const snapToClosestTab = () => {
      // Assuming the tabs are of equal width
      const tabWidth = scrollerRef.current.offsetWidth / pageCount;
      const closestTab = Math.round(indicatorLeft / tabWidth);
      setIndicatorLeft(closestTab * tabWidth);
      setCurrentPage(closestTab + 1);
    };

    

    
    
    return (
      <div className='projects-container'>
         <div className="grid-container">
          {itemsToShow.map((item) => (
            <GridItem
              key={item.id}
              item={item}
              isSelected={selectedId === item.id}
              onClick={() => handleItemClick(item.id)}
              isFlipping={isFlipping}
            />
              
          ))}
        </div>
        <div className="pagination-controls">
          <div>
            <div className="tab-container">
              {[...Array(pageCount).keys()].map((page) => (
                <React.Fragment key={page}>
                  <input
                    className={`tab tab--${page + 1}`}
                    id={`tab${page + 1}`}
                    name="tab"
                    type="radio"
                    value={page + 1}
                    checked={currentPage === page + 1}
                    onChange={handleTabChange}
                  />
                  <label htmlFor={`tab${page + 1}`} className="tab_label">{page + 1}</label>
                </React.Fragment>
              ))}

              <div className="indicator"/>
              <div
                className="scroller"
                ref={scrollerRef}
                draggable={true}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDrag={onDrag}
                style={{ left: `${indicatorLeft}px` }}              
              />
                
            </div>
          </div>
        </div>
      </div>
     
      
    );
  };
  
  export default GridShowcase;