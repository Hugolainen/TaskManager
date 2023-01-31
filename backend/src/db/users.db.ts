import { User, UserStatus } from '@prisma/client';
import { prisma } from '../app';
import { UserCreateForm, UserUpdateForm } from '../types/users';

const getUsers = async (): Promise<User[]> => {
  const result = await prisma.user.findMany();
  return result;
};

const getUserById = async (userId: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({ where: { userId: userId } });
  return result;
};

const createUser = async (user: UserCreateForm): Promise<User> => {
  const result = await prisma.user.create({
    data: {
      ...user,
      status: UserStatus.pending
    }
  });
  return result;
};

const updateUser = async (
  userId: string,
  user: UserUpdateForm
): Promise<User> => {
  const result = await prisma.user.update({
    where: { userId: userId },
    data: {
      ...user
    }
  });
  return result;
};

const deleteUser = async (userId: string): Promise<boolean> => {
  await prisma.user.delete({
    where: { userId: userId }
  });
  return true;
};

export default { getUsers, getUserById, createUser, updateUser, deleteUser };
