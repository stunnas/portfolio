'use client';

import './header.css';
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import DownloadSVG from '@/components/reusable-items/icons/downloadSVG';
import Spinner from '../loaders/spinners/main-spinner/spinner';

const Header = () => {
    const pathname = usePathname()
    const isActive = (href) => pathname === href;
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    const toggleMenuVisibility = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    const controlNavbar = useCallback(() => {
        if (typeof window !== 'undefined') {
            if (window.scrollY > lastScrollY) {
                setIsNavVisible(false);
                setIsMenuVisible(false);
            } else {
                setIsNavVisible(true);
            }
            setLastScrollY(window.scrollY);
        }
    }, [lastScrollY]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);

            return () => {
                window.removeEventListener('scroll', controlNavbar);
            };
        }
    }, [lastScrollY, controlNavbar]);

    return (
        <header style={{ transform: isNavVisible ? 'translateY(0)' : 'translateY(-100%)', transition: 'transform 0.3s ease' }}>
            <div className="logo">
                <h1>CAA</h1>
                <Spinner/>
            </div>
            <button className="hamburger" onClick={toggleMenuVisibility}>☰</button>
            <nav className={isMenuVisible ? 'show' : ''}>
                <Link href='/' className={isActive('/') ? 'active' : ''}>Home</Link>
                <Link href='/projects' className={isActive('/projects') ? 'active' : ''}>Projects</Link>
                <Link href='/about' className={isActive('/about') ? 'active' : ''}>About</Link>
                <Link href='/contact' className={isActive('/contact') ? 'active' : ''}>Contact</Link>
            </nav>
            <button className='resume-download'>Resume
                <DownloadSVG/>
            </button>
        </header>
    )
}

export default Header;