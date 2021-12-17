import {
  IResponseList,
  IResponsePost,
  IResponsePostConvert,
  IResponsePostPreview,
  IResponsePostPreviewConvert,
  IResponsePostUserConvert
} from '../types/api/dumMyApi';
import { getConvertDateOfPublish } from "../utils/common";
import UserMapper from './userMapper';

class PostMapper {
  static getConvertPost(post: IResponsePost | IResponsePostPreview): IResponsePostConvert {
    return ({
      id: post.id,
      text: post.text,
      image: post.image,
      publishDate: getConvertDateOfPublish(post.publishDate),
      owner: UserMapper.getConvertUserPreview(post.owner)
    });
  }

  static getConvertUserPost(post: IResponsePost | IResponsePostPreview): IResponsePostUserConvert {
    return ({
      id: post.id,
      text: post.text,
      image: post.image,
      publishDate: getConvertDateOfPublish(post.publishDate),
    });
  }

  static getConvertUsersPosts(postList: IResponseList<IResponsePostPreview>): IResponseList<IResponsePostUserConvert> {
    const data = postList.data.map((item: IResponsePostPreview) => this.getConvertUserPost(item));
    const { page, limit, total } = postList;
    return { data, page, limit, total };
  }

  static getConvertPosts(postList: IResponseList<IResponsePostPreview>): IResponseList<IResponsePostPreviewConvert> {
    const data = postList.data.map((item: IResponsePostPreview) => this.getConvertPost(item));
    const { page, limit, total } = postList;
    return { data, page, limit, total };
  }
}

export default PostMapper;
