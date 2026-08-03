import { initializeApp, getApps } from "firebase/app";
import { getAuth, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId:             import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId:     import.meta.env.VITE_MEASUREMENT_ID,
};

// Guard against double-init in React StrictMode (mounts twice in dev)
const app = getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApps()[0];

export const auth = getAuth(app);
export const githubProvider = new GithubAuthProvider();

// Request these GitHub OAuth scopes — repo scope lets BugHunter
// read repository metadata for the dashboard
githubProvider.addScope("repo");
githubProvider.addScope("read:user");
githubProvider.addScope("user:email");