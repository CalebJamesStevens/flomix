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
          user_id: string;
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
      members_teams: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          team_id: string;
          member_email: string;
          member_phone_number: string | null;
          member_role: string | null;
          team_manager: boolean;
        };
        Insert: {};
        Update: {};
      };
      teams: {
        Row: {
          id: string;
          created_at: string | null;
          team_name: string | null;
        };
        Insert: {};
        Update: {};
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
