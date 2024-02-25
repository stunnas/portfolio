import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import './projects-showcase.css';
import AOS from 'aos';
import 'aos/dist/aos.css';


const ITEMS_PER_PAGE = 3;

const ProjectItem = ({ item, isSelected, isFlipping, onClick }) => {

  const gridDescriptionStyle = {
      background: isSelected ? 'rgba(255, 151, 151, 0.9)' : 'transparent',
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
            {isSelected &&
              <Link href={item.link}>
                <div className="grid-link-button-container">
                  <div className="grid-link-button"><a>Read More</a></div>
                </div>
              </Link>
            }
            
          </div>
          <div className="grid-name">
            {item.content}
          </div>
        </div>
      </div>
    );
};
  
const ProjectsShowcase = ({ items }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [indicatorLeft, setIndicatorLeft] = useState(0);
  const scrollerRef = useRef(null);
  const indicatorRef = useRef(null);
  const flipTimeoutRef = useRef(null);
  const pageCount = Math.ceil(items.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const itemsToShow = items.slice(startIndex, endIndex);
  const flipDuration = 1000;
  let isCurrentlyFlipping = false;
  

  const handleItemClick = (id) => {
    setSelectedId(selectedId === id ? null : id);
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, mirror: true, offset: 150 });
  }, []);

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
    }, flipDuration);

    const tabWidth = scrollerRef.current.offsetWidth / pageCount;
    setIndicatorLeft((Number(event.target.value) - 1) * tabWidth);

  };

  useEffect(() => {
    const handleResize = () => {
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
    event.dataTransfer.setDragImage(new Image(0, 0), 0, 0); //non draggable image
  };
  
  const onDragEnd = () => {
    setDragging(false);
    snapToClosestTab();
  };
  
  const onDrag = (event) => {
    if (dragging && event.clientX !== 0 && scrollerRef.current && indicatorRef.current) {
        const newLeft = event.clientX - dragStartX;
        const maxLeft = scrollerRef.current.offsetWidth - indicatorRef.current.offsetWidth;
        setIndicatorLeft(Math.max(0, Math.min(newLeft, maxLeft)));
    }
  };
  
  const snapToClosestTab = () => {
    const tabWidth = scrollerRef.current.offsetWidth / pageCount;
    const closestTab = Math.round(indicatorLeft / tabWidth);
    setIndicatorLeft(closestTab * tabWidth);
    setCurrentPage(closestTab + 1);
    
    if (!isCurrentlyFlipping) {
      isCurrentlyFlipping = true;
      setIsFlipping(true);

      if (flipTimeoutRef.current) {
        clearTimeout(flipTimeoutRef.current);
      }

      flipTimeoutRef.current = setTimeout(() => {
        setIsFlipping(false);
        isCurrentlyFlipping = false;
      }, flipDuration);
    }
    
  };

  

  
  
  return (
    <div data-aos="fade-in-out" className='projects-container'>
        <div className="grid-container">
        {itemsToShow.map((item) => (
          <ProjectItem
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

            <div className="indicator"
              ref={indicatorRef}
              draggable={true}
              onDragStart={onDragStart}
              onDrag={onDrag}
              onDragEnd={onDragEnd}
              style={{ left: `${indicatorLeft}px` }}   
            />
            <div
              className="scroller"
              ref={scrollerRef}
              draggable={false}       
            />
              
          </div>
        </div>
      </div>
    </div>
    
    
  );
};
  
export default ProjectsShowcase;