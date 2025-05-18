export interface simpleBlogCard {
  title: string;
  SmallDescription: string;
  currentSlug: string;
  titleImage: {
    asset: {
      url: string;
    };
    alt?: string;
  };
}

export interface fullBlog {
  currentSlug: string;
  title: string;
  content: Array<{
    _type: string;
    children: Array<{
      _type: string;
      text: string;
    }>;
  }>;
  titleImage: {
    asset: {
      url: string;
    };
    alt?: string;
  };
}
