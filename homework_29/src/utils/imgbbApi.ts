import { RcFile } from 'antd/lib/upload';
import { API_KEY, API_POINT_IMG_UPLOAD, BASE_URL } from '../constants/api/imgbb';

const fetchBase = (baseURL: string, apiPoint: string, image: string | RcFile | Blob) => {
  const url = baseURL + apiPoint;
  const bodyData = new FormData();
  bodyData.set('key', API_KEY);
  bodyData.set('image', image);

  return fetch(url.toString(), {
    method: 'POST',
    body: bodyData
  });
};

const fetchUploadImage = (image: string | RcFile | Blob) => fetchBase(BASE_URL, API_POINT_IMG_UPLOAD, image);

export { fetchUploadImage };
