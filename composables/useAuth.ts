export const useAuth = () => {
  const auth = useFirebaseAuth();

  if (!auth) {
    throw new Error('Firebase auth is not initialized yet');
  }

  return auth;
};
