import Link from 'next/link';
import { Container } from './container';
import { NAV_LINKS } from '@/constants/links';

export const Navbar = () => {
  return (
    <header className='py-4'>
      <Container>
        <nav className='flex items-center justify-between text-white'>
          <Link href='/'>Lucas Winkler</Link>
          <ul className='flex items-center gap-4'>
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
};
