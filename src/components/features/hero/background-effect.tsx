import { Container } from "@/components/layout/container";

export const BackgroundEffect = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Container className="relative h-full">
        <div className="absolute inset-0">
          <div className="xs:h-[450px] xs:w-[450px] absolute top-[80px] -left-[100px] h-[300px] w-[300px] transform-gpu rounded-full bg-gradient-to-tr from-purple-500/[0.15] via-purple-500/[0.08] to-transparent blur-[130px] sm:top-[50px] sm:-left-[150px] sm:h-[600px] sm:w-[600px]" />
          <div className="xs:h-[350px] xs:w-[350px] absolute -top-[25px] right-[50px] h-[250px] w-[250px] transform-gpu rounded-full bg-gradient-to-bl from-indigo-500/[0.18] via-indigo-500/[0.12] to-transparent blur-[140px] sm:-top-[50px] sm:right-[100px] sm:h-[600px] sm:w-[600px]" />
          <div className="xs:h-[300px] xs:w-[300px] absolute top-[150px] right-[25px] h-[200px] w-[200px] transform-gpu rounded-full bg-gradient-to-tr from-blue-500/[0.16] via-blue-500/[0.12] to-transparent blur-[120px] sm:top-[200px] sm:right-[50px] sm:h-[500px] sm:w-[500px]" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.2) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </Container>
      <div className="from-background-dark absolute right-0 bottom-0 left-0 h-32 bg-gradient-to-t from-0% via-[color-mix(in_srgb,var(--background-dark)_80%,transparent)_30%,color-mix(in_srgb,var(--background-dark)_40%,transparent)_60%] to-transparent to-100%" />
    </div>
  );
};
