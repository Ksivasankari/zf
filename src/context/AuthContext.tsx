// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { User } from '../types';

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   signup: (name: string, email: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// const initialAuthContext: AuthContextType = {
//   user: null,
//   isAuthenticated: false,
//   isLoading: true,
//   login: async () => {},
//   signup: async () => {},
//   logout: () => {},
// };

// const AuthContext = createContext<AuthContextType>(initialAuthContext);

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const savedUser = localStorage.getItem('zim-user');
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//     setIsLoading(false);
//   }, []);

//   const login = async (email: string, password: string) => {
//     setIsLoading(true);
//     await new Promise(resolve => setTimeout(resolve, 1000));

//     let mockUser: User;

//     if (email === 'admin@example.com') {
//       mockUser = {
//         id: '1',
//         name: 'Admin User',
//         email,
//         role: 'admin',
//         avatar: `https://ui-avatars.com/api/?name=Admin+User&background=0EA5E9&color=fff`,
//       };
//     } else if (email === 'customer@example.com') {
//       mockUser = {
//         id: '2',
//         name: 'John Customer',
//         email,
//         role: 'customer',
//         avatar: `https://ui-avatars.com/api/?name=John+Customer&background=0EA5E9&color=fff`,
//       };
//     } else {
//       mockUser = {
//         id: '3',
//         name: 'Gym Owner',
//         email,
//         role: 'client',
//         avatar: `https://ui-avatars.com/api/?name=Gym+Owner&background=0EA5E9&color=fff`,
//       };
//     }

//     setUser(mockUser);
//     localStorage.setItem('zim-user', JSON.stringify(mockUser));
//     setIsLoading(false);
//   };

//   const signup = async (name: string, email: string, password: string) => {
//     setIsLoading(true);
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     const mockUser: User = {
//       id: '1',
//       name,
//       email,
//       role: 'client',
//       avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0EA5E9&color=fff`,
//     };
    
//     setUser(mockUser);
//     localStorage.setItem('zim-user', JSON.stringify(mockUser));
//     setIsLoading(false);
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('zim-user');
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAuthenticated: !!user,
//         isLoading,
//         login,
//         signup,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };


// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { User } from '../types';

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   login: (email: string, password: string) => Promise<User | null>;
//   signup: (name: string, email: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// const initialAuthContext: AuthContextType = {
//   user: null,
//   isAuthenticated: false,
//   isLoading: true,
//   login: async () => null,
//   signup: async () => {},
//   logout: () => {},
// };

// const AuthContext = createContext<AuthContextType>(initialAuthContext);

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const savedUser = localStorage.getItem('zim-user');
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//     setIsLoading(false);
//   }, []);

//   const login = async (email: string, password: string): Promise<User | null> => {
//     setIsLoading(true);
//     await new Promise(resolve => setTimeout(resolve, 1000));

//     let mockUser: User;

//     if (email === 'admin@example.com') {
//       mockUser = {
//         id: '1',
//         name: 'Admin User',
//         email,
//         role: 'admin',
//         avatar: `https://ui-avatars.com/api/?name=Admin+User&background=0EA5E9&color=fff`,
//       };
//     } else if (email === 'customer@example.com') {
//       mockUser = {
//         id: '2',
//         name: 'John Customer',
//         email,
//         role: 'customer',
//         avatar: `https://ui-avatars.com/api/?name=John+Customer&background=0EA5E9&color=fff`,
//       };
//     } else {
//       mockUser = {
//         id: '3',
//         name: 'Gym Owner',
//         email,
//         role: 'client',
//         avatar: `https://ui-avatars.com/api/?name=Gym+Owner&background=0EA5E9&color=fff`,
//       };
//     }

//     setUser(mockUser);
//     localStorage.setItem('zim-user', JSON.stringify(mockUser));
//     setIsLoading(false);

//     return mockUser; // <-- return user here for immediate use
//   };

//   const signup = async (name: string, email: string, password: string) => {
//     setIsLoading(true);
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     const mockUser: User = {
//       id: '1',
//       name,
//       email,
//       role: 'client',
//       avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0EA5E9&color=fff`,
//     };
    
//     setUser(mockUser);
//     localStorage.setItem('zim-user', JSON.stringify(mockUser));
//     setIsLoading(false);
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('zim-user');
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAuthenticated: !!user,
//         isLoading,
//         login,
//         signup,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };


// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { User } from '../types';
// import { supabase } from './supabaseClient'; // make sure this is correctly set up

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   login: (email: string, password: string) => Promise<User | null>;
//   signup: (name: string, email: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// const initialAuthContext: AuthContextType = {
//   user: null,
//   isAuthenticated: false,
//   isLoading: true,
//   login: async () => null,
//   signup: async () => {},
//   logout: () => {},
// };

// const AuthContext = createContext<AuthContextType>(initialAuthContext);

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const savedUser = localStorage.getItem('zim-user');
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//     setIsLoading(false);
//   }, []);

//   const login = async (email: string, password: string): Promise<User | null> => {
//     setIsLoading(true);

//     const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (authError || !authData.user) {
//       setIsLoading(false);
//       return null;
//     }

//     const { data, error } = await supabase
//       .from('users')
//       .select('*')
//       .eq('email', email)
//       .single();

//     if (error || !data) {
//       setIsLoading(false);
//       return null;
//     }

//     const userData: User = {
//       id: data.id,
//       name: data.name || 'Admin',
//       email: data.email,
//       role: data.role,
//       avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name || 'Admin')}&background=0EA5E9&color=fff`,
//     };

//     setUser(userData);
//     localStorage.setItem('zim-user', JSON.stringify(userData));
//     setIsLoading(false);
//     return userData;
//   };

//   const signup = async (name: string, email: string, password: string) => {
//     setIsLoading(true);
//     await new Promise(resolve => setTimeout(resolve, 1000));

//     const mockUser: User = {
//       id: '1',
//       name,
//       email,
//       role: 'client',
//       avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0EA5E9&color=fff`,
//     };

//     setUser(mockUser);
//     localStorage.setItem('zim-user', JSON.stringify(mockUser));
//     setIsLoading(false);
//   };

//   const logout = async () => {
//     await supabase.auth.signOut();
//     setUser(null);
//     localStorage.removeItem('zim-user');
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAuthenticated: !!user,
//         isLoading,
//         login,
//         signup,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };


import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { supabase } from './supabaseClient';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const initialAuthContext: AuthContextType = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => null,
  signup: async () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(initialAuthContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('zim-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<User | null> => {
    setIsLoading(true);

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !authData.user) {
      setIsLoading(false);
      return null;
    }

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) {
      setIsLoading(false);
      return null;
    }

    const userData: User = {
      id: data.id,
      name: data.name || 'Admin',
      email: data.email,
      role: data.role,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name || 'Admin')}&background=0EA5E9&color=fff`,
    };

    setUser(userData);
    localStorage.setItem('zim-user', JSON.stringify(userData));
    setIsLoading(false);
    return userData;
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError || !authData.user) {
      setIsLoading(false);
      throw new Error(authError?.message || 'Signup failed');
    }

    const { error: insertError } = await supabase.from('users').insert([
      {
        id: authData.user.id,
        email,
        name,
        role: 'admin', // You can change this to 'client' if needed
      },
    ]);

    if (insertError) {
      setIsLoading(false);
      throw new Error(insertError.message);
    }

    const newUser: User = {
      id: authData.user.id,
      name,
      email,
      role: 'admin',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0EA5E9&color=fff`,
    };

    setUser(newUser);
    localStorage.setItem('zim-user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem('zim-user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
