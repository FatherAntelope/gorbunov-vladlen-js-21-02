import {
  IResponseList, IResponseUserAuth, IResponseUserFull,
  IResponseUserFullConvert,
  IResponseUserPreview,
  IResponseUserPreviewConvert
} from '../types/api/dumMyApi';
import {getConvertUserFullName, getDate} from '../utils/common';

class UserMapper {
  static getConvertUsersList(
    userList: IResponseList<IResponseUserPreview>
  ): IResponseList<IResponseUserPreviewConvert> {
    const data = userList.data.map((item: IResponseUserPreview) => this.getConvertUserPreview(item));
    const { page, limit, total } = userList;
    return { data, page, limit, total };
  }

  static getConvertUserPreview(user: any): IResponseUserPreviewConvert {
    return {
      id: user.id,
      fullName: getConvertUserFullName(user.firstName, user.lastName),
      picture: user.picture,
      title: user.title
    };
  }

  static getConvertUser(user: IResponseUserFull): IResponseUserFullConvert {
    return {
      id: user.id,
      fullName: getConvertUserFullName(user.firstName, user.lastName),
      gender: user.gender,
      title: user.title,
      registerDate: user.registerDate && getDate(user.registerDate),
      dateOfBirth: user.dateOfBirth && getDate(user.dateOfBirth),
      dateOfBirthOriginal: user.dateOfBirth,
      email: user.email,
      phone: user.phone,
      picture: user.picture
    };
  }

  static getConvertUserAuth(user: IResponseUserFull): IResponseUserAuth {
    return {
      id: user.id,
      firstName: user.firstName,
      picture: user.picture
    };
  }
}

export default UserMapper;
