import { SOCIAL_LINKS } from '@/constants/links';
import { Container } from './container';

export const Footer = () => {
  return (
    <Container>
      <footer className='relative flex flex-col items-center justify-between gap-2 rounded-lg p-4'>
        <p>&copy; 2025 Lucas Winkler. All rights reserved.</p>
        <a href='mailto:hello@lucaswinkler.dev'>hello@lucaswinkler.dev</a>
        <div className='flex items-center gap-2'>
          {SOCIAL_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              rel='noopener noreferrer'
              target='_blank'>
              {link.label}
            </a>
          ))}
        </div>
      </footer>
    </Container>
  );
};
