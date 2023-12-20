import './header.css';
import React from 'react';
import Link from 'next/link';
import DownloadSVG from '@/components/reusable-items/icons/downloadSVG';
import Spinner from '../loaders/spinners/main-spinner/spinner';

const Header = () => {
    return (
        <header>
            <div className="logo">
                <h1>CAA</h1>
                <Spinner/>
            </div>
            
            <nav>
                <Link href='/'>Home</Link>
                <Link href='/projects'>Projects</Link>
                <Link href='/contact'>Contact</Link>
            </nav>
            <button>Resume
                <DownloadSVG/>
            </button>
        </header>
    )
}

export default Header;