export interface Location {
  id: number;
  name: string;
}

export interface Branch {
  id?: number;
  location?: Location;
  contactNumber?: string;
  openingHours?: string;
}
