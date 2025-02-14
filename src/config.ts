const getBaseUrl = (): string => {
  if (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  return `https://www.lucaswinkler.dev`;
};

export const config = {
  baseUrl: getBaseUrl(),
  domainName: "lucaswinkler.dev",
  appName: "Lucas Winkler Portfolio",
  appShortName: "Lucas Winkler",
  appDescription:
    "Lucas Winkler is a Full-Stack Developer based in Ontario, Canada who builds accessible and intuitive web experiences.",
  name: "Lucas Winkler",
  contactEmail: "hello@lucaswinkler.dev",
  twitterHandle: "@LucasJWinkler",
} as const;
