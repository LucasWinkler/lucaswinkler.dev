import { Container } from "@/components/layout/container";

export const BackgroundEffect = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-x-clip">
      <Container className="relative h-full">
        <div className="absolute inset-0">
          {/* Purple gradient - left side */}
          <div className="absolute top-[40%] -left-[300px] h-[700px] w-[700px] -translate-y-1/2 bg-radial/oklch from-purple-500/[0.12] from-0% via-purple-500/[0.03] via-45% to-transparent to-75% sm:-left-[400px] sm:h-[900px] sm:w-[900px] sm:from-purple-500/[0.13] md:top-[45%] md:-left-[500px] md:h-[1200px] md:w-[1200px] md:from-purple-500/[0.14]" />
          {/* Indigo gradient - right side */}
          <div className="absolute top-[0px] right-[-250px] h-[600px] w-[600px] bg-radial/oklch from-indigo-500/[0.12] from-0% via-indigo-500/[0.02] via-45% to-transparent to-75% sm:top-[-50px] sm:right-[-350px] sm:h-[800px] sm:w-[800px] sm:from-indigo-500/[0.13] md:-top-[200px] md:right-[-500px] md:h-[1200px] md:w-[1200px] md:from-indigo-500/[0.14]" />
          {/* Blue gradient - right side */}
          <div className="absolute top-[100px] right-[-50px] h-[450px] w-[450px] bg-radial/oklch from-blue-500/[0.10] from-0% via-blue-500/[0.02] via-45% to-transparent to-75% sm:top-[75px] sm:right-[-150px] sm:h-[600px] sm:w-[600px] sm:from-blue-500/[0.11] md:-top-[25px] md:right-[-200px] md:h-[900px] md:w-[900px] md:from-blue-500/[0.12]" />
        </div>
        <div className="absolute inset-0 opacity-[0.15] bg-radial-[circle_at_1px_1px] from-white/20 to-transparent from-[1px] to-[1px] bg-[size:32px_32px]" />
      </Container>
    </div>
  );
};
