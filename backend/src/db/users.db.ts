import { UserStatus } from '@prisma/client';
import { prisma } from '../app';
import { UserCreateForm, UserUpdateForm } from '../types/users';
import bcrypt from 'bcrypt';

// Hashing
const saltRounds = 12;

// Exclude keys from user
export function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> {
  for (const key of keys) {
    delete user[key];
  }
  return user;
}

const getUsers = async () => {
  const result = await prisma.user.findMany();
  return result.map((user) =>
    exclude(user, ['password', 'createdAt', 'updatedAt'])
  );
};

const getUserById = async (userId: string) => {
  const result = await prisma.user.findUnique({ where: { userId: userId } });
  return result;
};

const getUserByUsername = async (username: string) => {
  const result = await prisma.user.findUnique({
    where: { username: username }
  });
  return result;
};

const createUser = async (user: UserCreateForm) => {
  const result = await prisma.user.create({
    data: {
      ...user,
      password: bcrypt.hashSync(user.password, saltRounds),
      status: UserStatus.pending
    }
  });
  return exclude(result, [
    'password',
    'createdAt',
    'updatedAt',
    'createdAt',
    'updatedAt'
  ]);
};

const updateUser = async (userId: string, user: UserUpdateForm) => {
  const result = await prisma.user.update({
    where: { userId: userId },
    data: {
      ...user
    }
  });
  return exclude(result, ['password', 'createdAt', 'updatedAt']);
};

const updateUserPassword = async (userId: string, password: string) => {
  await prisma.user.update({
    where: { userId: userId },
    data: {
      password: bcrypt.hashSync(password, saltRounds)
    }
  });
  return true;
};

const deleteUser = async (userId: string) => {
  await prisma.user.delete({
    where: { userId: userId }
  });
  return true;
};

export default {
  getUsers,
  getUserById,
  getUserByUsername,
  createUser,
  updateUser,
  updateUserPassword,
  deleteUser
};
