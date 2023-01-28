import * as React from 'react';

export enum EUserRole {
  DRIVER,
  MANAGER,
}

export type LoggedInUser = {
  id: string;
  userName: string;
  role: EUserRole;
};

interface IContext {
  loadingAuth: boolean;
  isLoggedIn: boolean;
  loggedInUser: LoggedInUser | null;
}
interface IReadProvider {
  children: React.ReactNode;
}
const AuthContext = React.createContext<IContext>({
  loadingAuth: false,
  isLoggedIn: false,
  loggedInUser: null,
});

const AuthProvider = ({ children }: IReadProvider) => {
  const [loadingAuth, setLoadingAuth] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [loggedInUser, setLoggedInUser] = React.useState<LoggedInUser | null>(null);

  const value = { loadingAuth, isLoggedIn, loggedInUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
