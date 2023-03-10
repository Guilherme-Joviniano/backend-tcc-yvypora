import bcryptjs from 'bcryptjs';

const checkPassword = async (password: string, hash: string) => {
  const isValidPassword = await bcryptjs.compare(password, hash);
  return isValidPassword;
};

const hashPassword = async (password: string) => {
  const hash = await bcryptjs.hash(password, 6);
  return hash;
};

const isValidDate = (date: string): boolean => {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  return date.match(regEx) != null;
};

export { checkPassword, hashPassword, isValidDate };
