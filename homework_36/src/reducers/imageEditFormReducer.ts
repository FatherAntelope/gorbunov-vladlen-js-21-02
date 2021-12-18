import { IImageEditFormState, ImageEditFormAC, ImageEditFormACTypes } from '../types/redux/imageEditForm';

const initialState: IImageEditFormState = {
  editImageURL: '',
  isLoading: false
};

const imageEditFormReducer = (state = initialState, action: ImageEditFormAC): IImageEditFormState => {
  switch (action.type) {
    case ImageEditFormACTypes.IMAGE_EDIT_FORM:
      return { isLoading: true, editImageURL: state.editImageURL };
    case ImageEditFormACTypes.IMAGE_EDIT_FORM_SUCCESS:
      return { isLoading: false, editImageURL: action.payload };
    case ImageEditFormACTypes.IMAGE_EDIT_FORM_ERROR:
      return { isLoading: false, editImageURL: state.editImageURL, error: action.payload };
    case ImageEditFormACTypes.IMAGE_EDIT_FORM_CLEAR:
      return { isLoading: false, editImageURL: action.payload };
    default:
      return state;
  }
};

export default imageEditFormReducer;
