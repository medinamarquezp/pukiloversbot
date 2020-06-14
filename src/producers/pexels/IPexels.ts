export interface IPexels {
  total_results: number;
  page: number;
  per_page: number;
  photos?: PhotosEntity[] | null;
  next_page: string;
}
interface PhotosEntity {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  src: Src;
  liked: boolean;
}
interface Src {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}
