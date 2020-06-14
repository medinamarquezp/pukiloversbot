interface IUnsplash {
  id: string;
  created_at: string;
  updated_at: string;
  promoted_at?: null;
  width: number;
  height: number;
  color: string;
  description?: null;
  alt_description: string;
  urls: Urls;
  links: Links;
  categories?: null[] | null;
  likes: number;
  liked_by_user: boolean;
  current_user_collections?: null[] | null;
  sponsorship?: null;
  user: User;
  exif: Exif;
  location: Location;
  views: number;
  downloads: number;
}
interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}
interface Links {
  self: string;
  html: string;
  download: string;
  download_location: string;
}
interface User {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  twitter_username?: null;
  portfolio_url: string;
  bio: string;
  location: string;
  links: Links1;
  profile_image: ProfileImage;
  instagram_username: string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  accepted_tos: boolean;
}
interface Links1 {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
  following: string;
  followers: string;
}
interface ProfileImage {
  small: string;
  medium: string;
  large: string;
}
interface Exif {
  make: string;
  model: string;
  exposure_time: string;
  aperture: string;
  focal_length: string;
  iso: number;
}
interface Location {
  title?: null;
  name?: null;
  city?: null;
  country?: null;
  position: Position;
}
interface Position {
  latitude?: null;
  longitude?: null;
}

export { IUnsplash as default, Urls };
