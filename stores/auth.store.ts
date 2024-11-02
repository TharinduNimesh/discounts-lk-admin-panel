import type { User as SupabaseUser } from "@supabase/supabase-js";
import { defineStore } from "pinia";

type User = SupabaseUser | null;

export const useAuthStore = defineStore("useAuthStore", {
  state: () => ({
    user: null as User,
  }),
  getters: {
    isLoggedIn: (state) => state.user != null,
  },
  actions: {
    async fetchUser() {
      const supabase = useSupabase();
      const { data } = await supabase.auth.getUser();
      if (data) {
        this.user = data.user;
      } else {
        this.user = null;
      }
    },
    logout() {
      const supabase = useSupabase();
      this.user = null;

      supabase.auth.signOut();
      useRouter().push("/");
    },
  },
});
