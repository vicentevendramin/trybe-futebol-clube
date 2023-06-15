const loginWithoutPassword = { email: 'tryber@betrybe.com' };

const loginWithInvalidPassword = {
  email: 'tryber@betrybe.com',
  password: '1234',
};

const loginWithoutEmail = { password: 'senhasecreta' };

const loginWithInvalidEmail = {
  email: 'tryber.com',
  password: 'senhasecreta',
};

const userMock = {
  username: 'test',
  role: 'test',
  email: 'test@email.com',
  password: '0000000',
};

export {
  loginWithoutPassword,
  loginWithInvalidPassword,
  loginWithoutEmail,
  loginWithInvalidEmail,
  userMock,
};
