import { message, Upload } from "antd";

export const validateDocMimeType = (file: File) => {
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
  const maxSizeInMB = 2;
  const isSizeValid = file.size / 1024 / 1024 < maxSizeInMB;

  if (!isSizeValid) {
    message.error(`${file.name} is too large. Maximum size is ${maxSizeInMB} MB.`);
  }

  if (!allowedTypes.includes(file.type)) {
    message.error(`${file.name} is not a valid file type! Only PDF files are allowed.`);
    return Upload.LIST_IGNORE;
  }

  return false;
};

export const validateXlsMimeType = (file: File) => {
  const allowedTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
  const maxSizeInMB = 2;
  const isSizeValid = file.size / 1024 / 1024 < maxSizeInMB;

  if (!isSizeValid) {
    message.error(`${file.name} is too large. Maximum size is ${maxSizeInMB} MB.`);
  }

  if (!allowedTypes.includes(file.type)) {
    message.error(`${file.name} is not a valid file type! Only excel files are allowed.`);
    return Upload.LIST_IGNORE;
  }

  return false;
};

export const validateImgMimeType = (file: File) => {
  const allowedTypes = ['image/jpeg', 'image/png'];
  const maxSizeInMB = 2;
  const isSizeValid = file.size / 1024 / 1024 < maxSizeInMB;

  if (file.length < 3) {
    message.error('You must upload at least 2 files.');
    return Upload.LIST_IGNORE;
  }

  if (!isSizeValid) {
    message.error(`${file.name} is too large. Maximum size is ${maxSizeInMB} MB.`);
    return Upload.LIST_IGNORE;
  }

  if (!allowedTypes.includes(file.type)) {
    message.error(`${file.name} is not a valid file type! Only PDF files are allowed.`);
    return Upload.LIST_IGNORE;
  }

  return false;
};