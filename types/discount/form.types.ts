interface Branch {
  id: number;
  location: string;
  opening_hours: string;
}

interface Store {
  id: number;
  name: string;
}

export interface DiscountForm {
  image?: File;
  title?: string;
  description?: string;
  givenPrice?: number;
  price?: number;
  start_date?: string;
  end_date?: string;
  store?: Store;
  selectedBranch: Branch[];
  type?: string;
}
