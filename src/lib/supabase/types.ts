import type { SurveyCategory, Gender } from "@/types";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: SurveyCategory;
          title: string;
          description: string;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id: SurveyCategory;
          title: string;
          description: string;
          sort_order: number;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["categories"]["Insert"]>;
      };
      question_sets: {
        Row: {
          id: string;
          key: Gender;
          title: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          key: Gender;
          title: string;
          is_active?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["question_sets"]["Insert"]>;
      };
      questions: {
        Row: {
          id: string;
          question_set_id: string;
          category_id: SurveyCategory;
          prompt: string;
          order_in_survey: number;
          order_in_category: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          question_set_id: string;
          category_id: SurveyCategory;
          prompt: string;
          order_in_survey: number;
          order_in_category: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["questions"]["Insert"]>;
      };
      submissions: {
        Row: {
          id: string;
          public_token: string;
          audience: Gender;
          status: "in_progress" | "completed";
          started_at: string;
          completed_at: string;
          user_agent: string | null;
          ip_hash: string | null;
        };
        Insert: {
          id?: string;
          public_token?: string;
          audience: Gender;
          status?: "in_progress" | "completed";
          started_at?: string;
          completed_at?: string;
          user_agent?: string | null;
          ip_hash?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["submissions"]["Insert"]>;
      };
      answers: {
        Row: {
          id: string;
          submission_id: string;
          question_id: string;
          score: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          submission_id: string;
          question_id: string;
          score: number;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["answers"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      gender: Gender;
      submission_status: "in_progress" | "completed";
    };
    CompositeTypes: Record<string, never>;
  };
};
