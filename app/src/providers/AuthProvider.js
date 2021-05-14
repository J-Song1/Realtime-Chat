import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../services/firebase';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  useEffect(() => {
    const cleanup = auth.onAuthStateChanged(user => {
      setUser(user)
    })

    return cleanup
  })

  const value = {
    signup,
    login,
    user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )

}