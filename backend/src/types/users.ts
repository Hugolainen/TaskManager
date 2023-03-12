import { User } from '@prisma/client';

export type UserCreateForm = Omit<User, 'userId' | 'status'>;

export type UserUpdateForm = Omit<UserCreateForm, 'type' | 'password'>;

// Prisma Validator
// https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/prisma-validator
export interface UserUpdatePassword {
  currentPassword: string;
  newPassword: string;
}
