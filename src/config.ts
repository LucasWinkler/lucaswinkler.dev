const getBaseUrl = (): string => {
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }

  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }

  return `https://lucaswinkler.dev`;
};

export const config = {
  appName: 'Lucas Winkler - Full-Stack Developer',
  appShortName: 'Lucas Winkler',
  appDescription:
    'Lucas Winkler is a full-stack developer who builds accessible and intuitive web experiences.',
  domainName: 'lucaswinkler.dev',
  baseUrl: getBaseUrl(),
  twitterHandle: '@LucasJWinkler',
} as const;
