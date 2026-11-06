export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          details: Json
          id: string
          target: string | null
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          details?: Json
          id?: string
          target?: string | null
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          details?: Json
          id?: string
          target?: string | null
        }
        Relationships: []
      }
      guide_messages: {
        Row: {
          created_at: string
          id: string
          message: Json
          message_id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: Json
          message_id: string
          role: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: Json
          message_id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      health_facilities: {
        Row: {
          address: string | null
          created_at: string
          district: string | null
          facility_type: string
          id: string
          name: string
          phone: string | null
          province: string | null
          services: string[]
          town: string | null
          updated_at: string
          verified: boolean
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          district?: string | null
          facility_type?: string
          id?: string
          name: string
          phone?: string | null
          province?: string | null
          services?: string[]
          town?: string | null
          updated_at?: string
          verified?: boolean
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string
          district?: string | null
          facility_type?: string
          id?: string
          name?: string
          phone?: string | null
          province?: string | null
          services?: string[]
          town?: string | null
          updated_at?: string
          verified?: boolean
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: []
      }
      library_articles: {
        Row: {
          body: string
          category: string
          created_at: string
          created_by: string | null
          id: string
          kind: string
          published: boolean
          summary: string | null
          title: string
          updated_at: string
        }
        Insert: {
          body?: string
          category?: string
          created_at?: string
          created_by?: string | null
          id?: string
          kind?: string
          published?: boolean
          summary?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          body?: string
          category?: string
          created_at?: string
          created_by?: string | null
          id?: string
          kind?: string
          published?: boolean
          summary?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      pain_entries: {
        Row: {
          created_at: string
          id: string
          max_intensity: number
          mood: string | null
          notes: string | null
          recorded_at: string
          regions: Json
          sleep_hours: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          max_intensity?: number
          mood?: string | null
          notes?: string | null
          recorded_at?: string
          regions?: Json
          sleep_hours?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          max_intensity?: number
          mood?: string | null
          notes?: string | null
          recorded_at?: string
          regions?: Json
          sleep_hours?: number | null
          user_id?: string
        }
        Relationships: []
      }
      professional_profiles: {
        Row: {
          bio: string | null
          created_at: string
          district: string | null
          facility: string | null
          full_name: string
          license_number: string
          licensing_body: string | null
          profession: string
          province: string | null
          review_note: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          services: string[]
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          district?: string | null
          facility?: string | null
          full_name: string
          license_number: string
          licensing_body?: string | null
          profession: string
          province?: string | null
          review_note?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          services?: string[]
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          district?: string | null
          facility?: string | null
          full_name?: string
          license_number?: string
          licensing_body?: string | null
          profession?: string
          province?: string | null
          review_note?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          services?: string[]
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          conditions: string[]
          consent_ai_insights: boolean
          consent_research: boolean
          consent_share_providers: boolean
          created_at: string
          cycle_tracking: boolean
          date_of_birth: string | null
          district: string | null
          full_name: string | null
          goals: string | null
          id: string
          notify_checkin: boolean
          notify_weekly: boolean
          pain_locations: string[]
          phone: string | null
          province: string | null
          symptoms: string[]
          theme: string
          therapy_preferences: string[]
          town: string | null
          updated_at: string
        }
        Insert: {
          conditions?: string[]
          consent_ai_insights?: boolean
          consent_research?: boolean
          consent_share_providers?: boolean
          created_at?: string
          cycle_tracking?: boolean
          date_of_birth?: string | null
          district?: string | null
          full_name?: string | null
          goals?: string | null
          id: string
          notify_checkin?: boolean
          notify_weekly?: boolean
          pain_locations?: string[]
          phone?: string | null
          province?: string | null
          symptoms?: string[]
          theme?: string
          therapy_preferences?: string[]
          town?: string | null
          updated_at?: string
        }
        Update: {
          conditions?: string[]
          consent_ai_insights?: boolean
          consent_research?: boolean
          consent_share_providers?: boolean
          created_at?: string
          cycle_tracking?: boolean
          date_of_birth?: string | null
          district?: string | null
          full_name?: string | null
          goals?: string | null
          id?: string
          notify_checkin?: boolean
          notify_weekly?: boolean
          pain_locations?: string[]
          phone?: string | null
          province?: string | null
          symptoms?: string[]
          theme?: string
          therapy_preferences?: string[]
          town?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_list_users: {
        Args: never
        Returns: {
          created_at: string
          email: string
          entry_count: number
          full_name: string
          id: string
          last_sign_in_at: string
          roles: string[]
        }[]
      }
      admin_review_professional: {
        Args: { _approve: boolean; _note: string; _user_id: string }
        Returns: undefined
      }
      admin_set_role: {
        Args: {
          _grant: boolean
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: undefined
      }
      admin_stats: { Args: never; Returns: Json }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      write_audit: {
        Args: { _action: string; _details: Json; _target: string }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "professional" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "professional", "user"],
    },
  },
} as const
