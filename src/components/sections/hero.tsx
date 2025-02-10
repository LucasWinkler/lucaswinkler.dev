import { Container } from '@/components/layout/container';

export const Hero = () => {
  return (
    <section className='flex flex-col items-center py-16 text-white'>
      <Container>
        <h1 className='font-heading text-4xl font-bold tracking-tight'>
          Full-Stack Developer
        </h1>
      </Container>
    </section>
  );
};
