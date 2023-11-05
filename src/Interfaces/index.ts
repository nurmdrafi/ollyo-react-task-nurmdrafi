export interface GalleryItem {
  id: number;
  imagePath: string;
  isDoubleSize: boolean;
  hover?: boolean
  selected?: boolean
}

export interface ImageStates {
  images: GalleryItem[],
  selectedImagesCount: number
}

export interface CheckboxProps {
  image: GalleryItem
}
