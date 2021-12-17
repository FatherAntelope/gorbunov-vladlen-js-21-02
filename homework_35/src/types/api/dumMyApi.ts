export interface IResponseList<T> {
  data: Array<T>;
  total: number;
  page: number;
  limit: number;
}

export interface IResponseUserPreview {
  id: string;
  title: 'ms' | 'mr' | 'mrs' | 'miss' | 'dr' | '';
  firstName: string;
  lastName: string;
  picture: string;
}

export interface IResponseUserPreviewConvert {
  id: string;
  title: 'ms' | 'mr' | 'mrs' | 'miss' | 'dr' | '';
  fullName: string
  picture: string;
}

export interface IResponseCommentPreview {
  id: string;
  message: string;
  owner: IResponseUserPreview;
  post: string;
  publishDate: string;
}

export interface IResponseCommentPreviewConvert {
  id: string;
  message: string;
  owner: IResponseUserPreviewConvert;
  publishDate: string;
}

export interface IResponseUserFull extends IResponseUserPreview {
  gender: 'male' | 'female' | 'other' | '';
  email: string;
  dateOfBirth: string;
  registerDate: string;
  phone: string;
}

export interface IResponseUserFullConvert extends IResponseUserPreviewConvert {
  gender: 'male' | 'female' | 'other' | '';
  email: string;
  dateOfBirth: string;
  dateOfBirthOriginal: string;
  registerDate: string;
  phone: string;
}

export interface IResponseUserAuth {
  id: string;
  firstName: string;
  picture: string;
}

export interface IResponsePostPreview {
  id: string;
  text: string;
  image: string;
  publishDate: string;
  likes: number;
  tags: string[];
  owner: IResponseUserPreview;
}

export interface IResponsePostPreviewConvert {
  id: string;
  text: string;
  image: string;
  publishDate: string;
  owner: IResponseUserPreviewConvert;
}

export interface IResponsePostUserConvert {
  id: string;
  text: string;
  image: string;
  publishDate: string;
}

export interface IResponsePost extends  IResponsePostPreview {
  link: string;
}

export interface IResponsePostConvert extends  IResponsePostPreviewConvert {}
