export interface IResponseList<T> {
  data: Array<T>;
  total: number;
  page: number;
  limit: number;
}

export interface IResponseUserPreview {
  id: string;
  title: 'ms' | 'mr' | '';
  fullName: string;
  picture: string;
}

export interface IResponseCommentPreview {
  id: string;
  message: string;
  owner: IResponseUserPreview;
  post: string;
  publishDate: string;
}

export interface IResponseUserFull extends IResponseUserPreview {
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
  owner: IResponseUserPreview;
}

export interface IResponsePostUser {
  id: string;
  text: string;
  image: string;
  publishDate: string;
}

export interface ICreateUser {
  title: 'ms' | 'mr' | '';
  firstName: string;
  lastName: string;
  gender: 'male' | 'female' | 'other' | '';
  email: string;
  dateOfBirth: string;
  registerDate: Date;
  phone: string;
}
