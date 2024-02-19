'use client';
import './skills.css';
import React, { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Swiper from 'swiper';
import { Navigation, Pagination, EffectCoverflow, Autoplay, FreeMode, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Skills = () => {
    const [autoplayEnabled, setAutoplayEnabled] = useState(true);
    const swiperRef = useRef(null);
    const slidesData = [
        { title: 'html', color: 'pink', image: '/images/skills/html.png' },
        { title: 'css', color: 'aliceblue', image: '/images/skills/css.png' },
        { title: 'javascript', color: 'cornsilk', image: '/images/skills/javascript.png' },
        { title: 'react', color: 'lightblue', image: '/images/skills/react.png' },
        { title: 'sql', color: 'khaki', image: '/images/skills/sql.png' },
        { title: 'java', color: 'lightcoral', image: '/images/skills/java.png' },
        { title: 'c#', color: 'mediumorchid', image: '/images/skills/c-sharp.png' },
        { title: 'swift', color: 'orangered', image: '/images/skills/swift.png' },

    ];
    const toggleAutoplay = () => {
        setAutoplayEnabled(!autoplayEnabled);
    };

    useEffect(() => {
        AOS.init({ duration: 3000, once: false, mirror: true, offset: 150 });

        swiperRef.current = new Swiper('.swiper-container', {
            modules: [Navigation, Pagination, Autoplay, EffectCoverflow, FreeMode, Keyboard],
            slidesPerView: 3,
            spaceBetween: 20,
            loop: true,
            keyboard: true,
            freeMode: {
                enabled: true,
                sticky: true,
                momentumVelocityRatio: 3,
                momentumBounceRatio: 1.5
            },
            effect: 'coverflow',
            coverflowEffect: {
                rotate: 90,
                stretch: 0,
                depth: 100,
                modifier: 1,
                scale: 1,
                slideShadows: true,
            },
            autoplay: autoplayEnabled ? {
                delay: 1000,
                disableOnInteraction: false,
            } : false,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            
        });

        swiperRef.current.on('init', () => {
            document.querySelector('.swiper-slide-active').querySelectorAll('[data-aos]').forEach(el => {
                el.classList.add('aos-animate');
            });
        });
    
        swiperRef.current.init();

        setTimeout(() => {
            document.querySelectorAll('.swiper-slide').forEach((slide, index) => {
              slide.style.backgroundColor = slidesData[index].color;
            });
          }, 50);

        const stopAutoplay = () => {
            if (autoplayEnabled) {
                if (swiperRef.current && swiperRef.current.autoplay) {
                    swiperRef.current.autoplay.stop();
                }
                setAutoplayEnabled(false);
            }
        };
    
        swiperRef.current.on('touchStart', stopAutoplay);
        swiperRef.current.on('sliderMove', stopAutoplay);
        swiperRef.current.on('click', stopAutoplay);
    
        return () => {
            if (swiperRef.current) {
                swiperRef.current.off('touchStart', stopAutoplay);
                swiperRef.current.off('sliderMove', stopAutoplay);
                swiperRef.current.off('click', stopAutoplay);
                swiperRef.current.destroy();
            }
        };

    }, []);

    useEffect(() => {
        if (swiperRef.current) {
          if (autoplayEnabled) {
            swiperRef.current.params.autoplay = {
              delay: 1000,
              disableOnInteraction: false,
            };
            swiperRef.current.autoplay.start();
          } else {
            swiperRef.current.autoplay.stop();
          }
        }
      }, [autoplayEnabled]);


    return (
        <>
            <h1 data-aos='fade-in' className='skills-title'>Skills</h1>
            <div data-aos='zoom-out' className='skills-container skills-background'>
                <div className='swiper-container'>
                    <div className='swiper-wrapper'>
                        {slidesData.map((slide, index) => (
                            <div
                                key={index}
                                data-aos='flip-left'
                                className={`swiper-slide`}
                            >
                                <img src={slide.image} alt={slide.title} className='slide-image'/>
                            </div>
                        ))}
                    </div>
                    <div className='swiper-pagination'></div>
                    <div className='swiper-button-prev'></div>
                    <div className='swiper-button-next'></div>
                </div>
            </div>
            <div data-aos='fade-in' className='skills-options'>
                <h2>Arrowkeys Enabled.</h2>
                <div className='autoplay-container'>
                    <h2>Autoplay?</h2>
                    <label className="autoplay-toggle">
                        <input
                            type="checkbox"
                            id="autoplay-checkbox"
                            checked={autoplayEnabled}
                            onChange={toggleAutoplay}
                        />
                        <div className="toggle-indicator"></div>
                    </label>
                </div>
            </div>
            
            
        </>
    );
};

export default Skills;
