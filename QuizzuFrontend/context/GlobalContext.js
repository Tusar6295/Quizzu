import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setIsLoggedIn(true);
        setUser({token: token});
      }else{
        setIsLoggedIn(false);
        setUser(null);
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const signOut = async () => {
    await AsyncStorage.removeItem('userToken');
    setIsLoggedIn(false);
    setUser(null);
    
    router.replace("/signIn");
    console.log(AsyncStorage.getItem('userToken'));
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, setIsLoggedIn, user,setUser,loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
