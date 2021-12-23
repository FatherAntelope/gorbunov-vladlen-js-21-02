import { getApiKeysConfigs } from '../configServer';
import FormData from 'form-data';
import axios, { AxiosRequestConfig } from 'axios';
import { API_POINT_IMG_UPLOAD, BASE_URL } from '../../constants/api/imgbb';

const { imgbb } = getApiKeysConfigs();

const fetchBase = (url: string, image: any) => {
  const formData = new FormData();
  formData.append('key', imgbb);
  formData.append('image', image.replace(/^.*,/, ''));
  let config: AxiosRequestConfig = {
    method: 'POST',
    headers : formData.getHeaders(),
    data: formData
  };

  return axios(url, config).then(data => data).catch(reason => reason.response);
};

const fetchUploadImage = (image: any) => fetchBase(BASE_URL + API_POINT_IMG_UPLOAD, image);


export { fetchUploadImage };
