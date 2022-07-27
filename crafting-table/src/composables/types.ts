export type Image = {
  width: number;
  height: number;
  alt: string;
  src: string;
};

export type Item = {
  id: string;
  name: string;
  image: Image;
};
