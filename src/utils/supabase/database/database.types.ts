export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      accounts: {
        Row: {
          id: string;
          created_at: string | null;
          username: string;
          full_name: string;
          profile_picture: string | null;
          public_profile: boolean;
        };
        Insert: {
          username: string;
          full_name: string;
          profile_picture: string | null;
          public_profile: boolean;
        };
        Update: {
          username: string | null;
          full_name: string | null;
          profile_picture: string | null;
          public_profile: boolean;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
