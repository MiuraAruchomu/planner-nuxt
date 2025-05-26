import { useAuth } from '@/composables/useAuth';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import type { User, UserCredential } from 'firebase/auth';
import type { NavigationFailure, RouteLocationRaw } from 'vue-router';

export const useAuthStore = defineStore('auth-store', () => {
  const auth = useAuth();
  const user = ref<User | null | undefined>(undefined);

  async function signupWithFirebase(
    email: string,
    password: string,
  ): Promise<UserCredential | null | undefined> {
    return withRequestStatus<UserCredential>(() =>
      createUserWithEmailAndPassword(auth, email, password),
    );
  }

  async function signinWithFirebase(
    email: string,
    password: string,
  ): Promise<UserCredential | null | undefined> {
    return withRequestStatus<UserCredential>(() =>
      signInWithEmailAndPassword(auth, email, password),
    );
  }

  async function signoutWithFirebase(): Promise<
    false | RouteLocationRaw | NavigationFailure | void
  > {
    try {
      await signOut(auth);
      return navigateTo('/');
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  }

  onAuthStateChanged(auth, (firebaseUser) => {
    user.value = firebaseUser;
  });

  return {
    user,
    signinWithFirebase,
    signupWithFirebase,
    signoutWithFirebase,
  };
});
