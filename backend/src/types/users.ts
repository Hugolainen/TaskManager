import { User } from '@prisma/client';

export type UserCreateForm = Omit<User, 'userId' | 'status'>;

export type UserUpdateForm = Omit<UserCreateForm, 'type' | 'password'>;

export interface UserUpdatePassword {
  currentPassword: string;
  newPassword: string;
}
