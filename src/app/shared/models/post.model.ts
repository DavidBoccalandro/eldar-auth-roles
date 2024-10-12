export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  isFavorite?: boolean;
}
