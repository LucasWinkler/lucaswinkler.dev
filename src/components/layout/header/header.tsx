'use client';

import Link from 'next/link';
import { Container } from '../container';
import { DesktopNav } from './desktop-nav';
import { MobileNav } from './mobile-nav';
import { useEffect, useState } from 'react';

export const Header = () => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky dark top-0 z-50 h-16 w-full bg-background/95 backdrop-blur transition-[border-color,background-color] duration-200 supports-[backdrop-filter]:bg-background/60 ${
        hasScrolled ? 'border-b' : 'border-b border-transparent'
      }`}>
      <Container className='relative flex w-full items-center justify-between gap-4 h-full'>
        <Link
          className='font-semibold py-2 pr-4'
          href='/'
          aria-label='Logo'
          aria-description='Link to the home page'>
          Lucas Winkler
        </Link>
        <DesktopNav />
        <MobileNav />
      </Container>
    </header>
  );
};
