import { Container } from "@/components/layout/container";

export const BackgroundEffect = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-x-clip">
      <Container className="relative h-full">
        <div className="absolute inset-0">
          {/* Purple gradient - left side */}
          <div className="absolute top-[40%] -left-[300px] h-[700px] w-[700px] -translate-y-1/2 bg-radial/oklch from-bg-circle-purple-from from-0% via-bg-circle-purple-via via-45% to-transparent to-75% sm:-left-[400px] sm:h-[900px] sm:w-[900px] md:top-[45%] md:-left-[500px] md:h-[1200px] md:w-[1200px]" />
          {/* Indigo gradient - right side */}
          <div className="absolute top-[0px] right-[-250px] h-[600px] w-[600px] bg-radial/oklch from-bg-circle-indigo-from from-0% via-bg-circle-indigo-via via-45% to-transparent to-75% sm:top-[-50px] sm:right-[-350px] sm:h-[800px] sm:w-[800px] md:-top-[200px] md:right-[-500px] md:h-[1200px] md:w-[1200px]" />
          {/* Blue gradient - right side */}
          <div className="absolute top-[100px] right-[-50px] h-[450px] w-[450px] bg-radial/oklch from-bg-circle-blue-from from-0% via-bg-circle-blue-via via-45% to-transparent to-75% sm:top-[75px] sm:right-[-150px] sm:h-[600px] sm:w-[600px] md:-top-[25px] md:right-[-200px] md:h-[900px] md:w-[900px]" />
        </div>
        <div className="absolute inset-0 opacity-[0.15] bg-radial-[circle_at_1px_1px] from-slate-900/40 dark:from-white/20 to-transparent from-[1px] to-[1px] bg-[size:32px_32px]" />
      </Container>
    </div>
  );
};
