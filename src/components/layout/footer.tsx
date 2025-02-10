import { SOCIAL_LINKS } from '@/constants/links';
import { Container } from './container';
import { config } from '@/config';

export const Footer = () => {
  return (
    <Container>
      <footer className='relative flex flex-col items-center justify-between gap-2 rounded-lg p-4'>
        <p>&copy; 2025 {config.name}. All rights reserved.</p>
        <a
          className='text-foreground-dark-secondary hover:text-foreground-dark-tertiary transition-colors'
          href={`mailto:${config.contactEmail}`}>
          {config.contactEmail}
        </a>
        <div className='flex items-center gap-2'>
          {SOCIAL_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              rel='noopener noreferrer'
              target='_blank'>
              <link.icon className='size-5 text-foreground-dark-secondary hover:text-foreground-dark-tertiary transition-colors' />
              <span className='sr-only'>{link.label}</span>
            </a>
          ))}
        </div>
      </footer>
    </Container>
  );
};
