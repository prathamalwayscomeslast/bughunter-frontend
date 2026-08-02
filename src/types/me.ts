export interface MeResponse {
    id: string;
    firebase_uid: string;
    email: string | null;
    email_verified: boolean;
    display_name: string | null;
    photo_url: string | null;
    sign_in_provider: string | null;
    created_at: string;
    updated_at: string;
}