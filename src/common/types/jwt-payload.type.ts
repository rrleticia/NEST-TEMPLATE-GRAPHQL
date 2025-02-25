import { Role } from '@prisma/client';

export type JwtPayloadType = {
  id: string;
  email: string;
  issuer: string;
  roles: Role[];
};
