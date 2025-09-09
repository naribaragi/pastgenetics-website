export interface QuickLookData {
  id: string;
  title: string;
  coverImage: string;
  price: string;
  rating?: number;
  modelTag: string;
  slug: string;
  smallThumb?: string;
  isVideo?: boolean;
  isSaved?: boolean;
}
