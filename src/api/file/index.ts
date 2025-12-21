import request from '@/utils/request'
import {ResponseBase} from "@/api/base/types";

enum API {
  UPLOAD_URL = '/system/file/oss/upload',
}

export const upload = (formData: FormData) => request.post<FormData, ResponseBase<string>>(API.UPLOAD_URL, formData)





