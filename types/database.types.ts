export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      available_branches: {
        Row: {
          branch_id: number
          created_at: string
          discount_id: number
        }
        Insert: {
          branch_id: number
          created_at?: string
          discount_id: number
        }
        Update: {
          branch_id?: number
          created_at?: string
          discount_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "available_branches_branch_id_fkey"
            columns: ["branch_id"]
            isOneToOne: false
            referencedRelation: "branches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "available_branches_discount_id_fkey"
            columns: ["discount_id"]
            isOneToOne: false
            referencedRelation: "discounts"
            referencedColumns: ["id"]
          },
        ]
      }
      branches: {
        Row: {
          city_id: number
          contact_number: string | null
          created_at: string
          id: number
          opening_hours: string
          store_id: number
        }
        Insert: {
          city_id: number
          contact_number?: string | null
          created_at?: string
          id?: number
          opening_hours: string
          store_id: number
        }
        Update: {
          city_id?: number
          contact_number?: string | null
          created_at?: string
          id?: number
          opening_hours?: string
          store_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "branches_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "branches_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      cities: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      discount_images: {
        Row: {
          created_at: string
          discount_id: number
          id: number
          path: string
        }
        Insert: {
          created_at?: string
          discount_id: number
          id?: number
          path: string
        }
        Update: {
          created_at?: string
          discount_id?: number
          id?: number
          path?: string
        }
        Relationships: [
          {
            foreignKeyName: "discount_images_discount_id_fkey"
            columns: ["discount_id"]
            isOneToOne: false
            referencedRelation: "discounts"
            referencedColumns: ["id"]
          },
        ]
      }
      discounts: {
        Row: {
          category_id: number | null
          created_at: string
          description: string
          discount_type: Database["public"]["Enums"]["DiscountType"]
          ended_at: string
          id: number
          is_visible: boolean
          number_of_recommendations: number | null
          number_of_satisfaction: number | null
          price: number
          rating: number | null
          rating_count: number | null
          store_id: number
          title: string
          views: number | null
        }
        Insert: {
          category_id?: number | null
          created_at?: string
          description: string
          discount_type?: Database["public"]["Enums"]["DiscountType"]
          ended_at: string
          id?: number
          is_visible?: boolean
          number_of_recommendations?: number | null
          number_of_satisfaction?: number | null
          price: number
          rating?: number | null
          rating_count?: number | null
          store_id: number
          title: string
          views?: number | null
        }
        Update: {
          category_id?: number | null
          created_at?: string
          description?: string
          discount_type?: Database["public"]["Enums"]["DiscountType"]
          ended_at?: string
          id?: number
          is_visible?: boolean
          number_of_recommendations?: number | null
          number_of_satisfaction?: number | null
          price?: number
          rating?: number | null
          rating_count?: number | null
          store_id?: number
          title?: string
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "discounts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "store_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "discounts_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      profile: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string | null
          profile_image: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name?: string | null
          profile_image?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          profile_image?: string | null
        }
        Relationships: []
      }
      sponsored_discounts: {
        Row: {
          created_at: string
          discount_id: number | null
          id: number
          price: number
        }
        Insert: {
          created_at?: string
          discount_id?: number | null
          id?: number
          price: number
        }
        Update: {
          created_at?: string
          discount_id?: number | null
          id?: number
          price?: number
        }
        Relationships: [
          {
            foreignKeyName: "sponsored_discounts_discount_id_fkey"
            columns: ["discount_id"]
            isOneToOne: false
            referencedRelation: "discounts"
            referencedColumns: ["id"]
          },
        ]
      }
      sponsored_stores: {
        Row: {
          created_at: string
          ended_at: string
          id: number
          price: number
          store_id: number
        }
        Insert: {
          created_at?: string
          ended_at: string
          id?: number
          price: number
          store_id: number
        }
        Update: {
          created_at?: string
          ended_at?: string
          id?: number
          price?: number
          store_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "sponsored_stores_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      store_categories: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      stores: {
        Row: {
          category_id: number
          contact_name: string
          contact_number: string
          created_at: string
          id: number
          name: string
          no_of_recommendations: number | null
        }
        Insert: {
          category_id: number
          contact_name: string
          contact_number: string
          created_at?: string
          id?: number
          name: string
          no_of_recommendations?: number | null
        }
        Update: {
          category_id?: number
          contact_name?: string
          contact_number?: string
          created_at?: string
          id?: number
          name?: string
          no_of_recommendations?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "stores_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "store_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      user_role: {
        Row: {
          created_at: string
          id: number
          role: Database["public"]["Enums"]["Role"] | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          role?: Database["public"]["Enums"]["Role"] | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          role?: Database["public"]["Enums"]["Role"] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_role_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin_user: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_user_exists: {
        Args: {
          email_input: string
        }
        Returns: boolean
      }
    }
    Enums: {
      DiscountType: "Normal" | "Sponsored" | "Exclusive"
      Role: "Admin" | "User"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
