import { EHttpStatus } from '~/constant/statusCode';
import { TError } from '~/types/genericTypes';

export interface IParseErrorMessageConfig {
  mapFieldName: { [key: string]: string };
}

export const parseErrorMessage = (error: TError, config?: IParseErrorMessageConfig) => {
  switch (error.statusCode) {
    case EHttpStatus.BAD_REQUEST: {
      if (error.message === 'Validation error') {
        return (error.data as { field: string; message: string }[]).map(
          (item) =>
            `Vui lòng kiểm tra lại thông tin ${config?.mapFieldName ? config.mapFieldName[item.field] : item.field}.`,
        );
      }

      if (error.message.includes('duplicate')) {
        return 'Thông tin đã tồn tại.';
      }

      return error.message;
    }
    case EHttpStatus.UNAUTHORIZED: {
      return 'Vui lòng đăng nhập.';
    }
    default: {
      return 'Có lỗi xảy ra, vui lòng thử lại sau.';
    }
  }
};
