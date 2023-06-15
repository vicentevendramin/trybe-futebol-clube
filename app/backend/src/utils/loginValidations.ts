import Login from '../Interfaces/Login';

const loginFieldsValidations = (
  email: string,
  password: string,
): Login | undefined => {
  if (!email || !password) {
    return { status: 400, message: 'All fields must be filled' };
  }

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);

  if (!emailRegex || password.length < 6) {
    return { status: 401, message: 'Invalid email or password' };
  }

  return undefined;
};

export default loginFieldsValidations;
