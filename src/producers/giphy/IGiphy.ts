interface IGiphy {
  data: Data;
  meta: Meta;
}

interface Data {
  type: string;
  id: string;
  url: string;
  slug: string;
  bitly_gif_url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  title: string;
  rating: string;
  content_url: string;
  source_tld: string;
  source_post_url: string;
  is_sticker: number;
  import_datetime: string;
  trending_datetime: string;
  images: Images;
  image_original_url: string;
  image_url: string;
  image_mp4_url: string;
  image_frames: string;
  image_width: string;
  image_height: string;
  fixed_height_downsampled_url: string;
  fixed_height_downsampled_width: string;
  fixed_height_downsampled_height: string;
  fixed_width_downsampled_url: string;
  fixed_width_downsampled_width: string;
  fixed_width_downsampled_height: string;
  fixed_height_small_url: string;
  fixed_height_small_still_url: string;
  fixed_height_small_width: string;
  fixed_height_small_height: string;
  fixed_width_small_url: string;
  fixed_width_small_still_url: string;
  fixed_width_small_width: string;
  fixed_width_small_height: string;
  caption: string;
}

interface Meta {
  status: number;
  msg: string;
  response_id: string;
}

interface Images {
  downsized_large: DownsizedLarge;
  fixed_height_small_still: FixedHeightSmallStill;
  original: Original;
  fixed_height_downsampled: FixedHeightDownsampled;
  downsized_still: DownsizedStill;
  fixed_height_still: FixedHeightStill;
  downsized_medium: DownsizedMedium;
  downsized: Downsized;
  preview_webp: PreviewWebp;
  original_mp4: OriginalMp4;
  fixed_height_small: FixedHeightSmall;
  fixed_height: FixedHeight;
  downsized_small: DownsizedSmall;
  preview: Preview;
  fixed_width_downsampled: FixedWidthDownsampled;
  fixed_width_small_still: FixedWidthSmallStill;
  fixed_width_small: FixedWidthSmall;
  original_still: OriginalStill;
  fixed_width_still: FixedWidthStill;
  looping: Looping;
  fixed_width: FixedWidth;
  preview_gif: PreviewGif;
  "480w_still": Four80wStill;
}

interface DownsizedLarge {
  height: string;
  size: string;
  url: string;
  width: string;
}

interface FixedHeightSmallStill {
  height: string;
  size: string;
  url: string;
  width: string;
}

interface Original {
  frames: string;
  hash: string;
  height: string;
  mp4: string;
  mp4_size: string;
  size: string;
  url: string;
  webp: string;
  webp_size: string;
  width: string;
}

interface FixedHeightDownsampled {
  height: string;
  size: string;
  url: string;
  webp: string;
  webp_size: string;
  width: string;
}

interface DownsizedStill {
  height: string;
  size: string;
  url: string;
  width: string;
}

interface FixedHeightStill {
  height: string;
  size: string;
  url: string;
  width: string;
}

interface DownsizedMedium {
  height: string;
  size: string;
  url: string;
  width: string;
}

interface Downsized {
  height: string;
  size: string;
  url: string;
  width: string;
}

interface PreviewWebp {
  height: string;
  size: string;
  url: string;
  width: string;
}

interface OriginalMp4 {
  height: string;
  mp4: string;
  mp4_size: string;
  width: string;
}

interface FixedHeightSmall {
  height: string;
  mp4: string;
  mp4_size: string;
  size: string;
  url: string;
  webp: string;
  webp_size: string;
  width: string;
}

interface FixedHeight {
  height: string;
  mp4: string;
  mp4_size: string;
  size: string;
  url: string;
  webp: string;
  webp_size: string;
  width: string;
}

interface DownsizedSmall {
  height: string;
  mp4: string;
  mp4_size: string;
  width: string;
}

interface Preview {
  height: string;
  mp4: string;
  mp4_size: string;
  width: string;
}

interface FixedWidthDownsampled {
  height: string;
  size: string;
  url: string;
  webp: string;
  webp_size: string;
  width: string;
}

interface FixedWidthSmallStill {
  height: string;
  size: string;
  url: string;
  width: string;
}

interface FixedWidthSmall {
  height: string;
  mp4: string;
  mp4_size: string;
  size: string;
  url: string;
  webp: string;
  webp_size: string;
  width: string;
}

interface OriginalStill {
  height: string;
  size: string;
  url: string;
  width: string;
}

interface FixedWidthStill {
  height: string;
  size: string;
  url: string;
  width: string;
}

interface Looping {
  mp4: string;
  mp4_size: string;
}

interface FixedWidth {
  height: string;
  mp4: string;
  mp4_size: string;
  size: string;
  url: string;
  webp: string;
  webp_size: string;
  width: string;
}

interface PreviewGif {
  height: string;
  size: string;
  url: string;
  width: string;
}

interface Four80wStill {
  url: string;
  width: string;
  height: string;
}

export { IGiphy as default };
