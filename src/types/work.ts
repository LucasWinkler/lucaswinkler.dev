export type SelectedWorkImage = {
  src: string;
  srcSet: string;
  avifSrcSet: string;
  sizes: string;
  width: number;
  height: number;
};

export type SelectedWorkItem = {
  id: string;
  brand: string;
  domain: string;
  url: string;
  description?: string;
  tech: string[];
  image?: SelectedWorkImage;
  imagePosition?: string;
  logo?: string;
  logoScale?: number;
  brandColor: string;
};
