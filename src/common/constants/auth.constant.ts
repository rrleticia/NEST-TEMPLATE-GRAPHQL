import * as argon2 from 'argon2';

export const jwtConstants = {
  expiresIn: '15d',
  expiresInNum: 15,
};

export const argonConstants = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 3,
  parallelism: 8,
  saltLength: 16,
};
