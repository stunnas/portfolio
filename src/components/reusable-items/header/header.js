'use client';

import './header.css';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import DownloadSVG from '@/components/reusable-items/icons/downloadSVG';
import Spinner from '../loaders/spinners/main-spinner/spinner';

const Header = () => {
    const pathname = usePathname()
    const isActive = (href) => pathname === href;

    return (
        <header>
            <div className="logo">
                <h1>CAA</h1>
                <Spinner/>
            </div>
            
            <nav>
                <Link href='/' className={isActive('/') ? 'active' : ''}>Home</Link>
                <Link href='/projects' className={isActive('/projects') ? 'active' : ''}>Projects</Link>
                <Link href='/about' className={isActive('/about') ? 'active' : ''}>About</Link>
                <Link href='/contact' className={isActive('/contact') ? 'active' : ''}>Contact</Link>
            </nav>
            <button>Resume
                <DownloadSVG/>
            </button>
        </header>
    )
}

export default Header;