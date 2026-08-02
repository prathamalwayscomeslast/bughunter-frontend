import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode, type JSX
} from "react";
import {
    onAuthStateChanged,
    signInWithPopup,
    signOut as firebaseSignOut,
    type User,
} from "firebase/auth";

import { auth, githubProvider } from "@/lib/firebase";
import { api } from "@/lib/api-client";
import type { MeResponse } from "@/types/me";

interface AuthContextValue {
    user: User | null;
    profile: MeResponse | null;
    isAuthResolved: boolean;
    isProfileLoading: boolean;
    isAuthenticated: boolean;
    signInWithGitHub: () => Promise<void>;
    signOut: () => Promise<void>;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<MeResponse | null>(null);

    // Firebase auth state known or not
    const [isAuthResolved, setIsAuthResolved] = useState(false);

    // Separate from auth resolution: backend /me loading state
    const [isProfileLoading, setIsProfileLoading] = useState(false);

    const fetchProfile = async (currentUser: User | null) => {
        if (!currentUser) {
            setProfile(null);
            return;
        }

        setIsProfileLoading(true);
        try {
            const me = await api.get<MeResponse>("/me");
            setProfile(me);
        } catch (error) {
            console.error("Failed to fetch /me profile:", error);
            setProfile(null);
        } finally {
            setIsProfileLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);
            setIsAuthResolved(true);

            if (firebaseUser) {
                await fetchProfile(firebaseUser);
            } else {
                setProfile(null);
                setIsProfileLoading(false);
            }
        });

        return unsubscribe;
    }, []);

    const signInWithGitHub = async () => {
        await signInWithPopup(auth, githubProvider);
    };

    const signOut = async () => {
        await firebaseSignOut(auth);
        setProfile(null);
    };

    const refreshProfile = async () => {
        await fetchProfile(auth.currentUser);
    };

    const value = useMemo<AuthContextValue>(
        () => ({
            user,
            profile,
            isAuthResolved,
            isProfileLoading,
            isAuthenticated: !!user,
            signInWithGitHub,
            signOut,
            refreshProfile,
        }),
        [user, profile, isAuthResolved, isProfileLoading],
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}