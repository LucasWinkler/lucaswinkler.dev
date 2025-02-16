import { notFound } from "next/navigation";

const isProduction = process.env.NODE_ENV === "production";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Disable page in production as it's a work in progress
  if (isProduction) {
    return notFound();
  }

  return <>{children}</>;
}
