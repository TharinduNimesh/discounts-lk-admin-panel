interface StoreCategory {
  id: number;
  name: string;
}

export interface Discount {
  id: number;
  title: string;
  started_at: string | null;
  ended_at: string;
  discount_type: "Normal" | "Sponsored" | "Exclusive";
  views: number;
  store: string;
  category: StoreCategory;
  image: string;
}