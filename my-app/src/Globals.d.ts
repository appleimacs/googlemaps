declare module "*.module.css";

export interface FavType {
  values: string[];
}

export interface LocationType {
  lat: number;
  lng: number
}

export interface RestaurantType {
    name: string, 
    editorial_summary: string, 
    geometry: {location:google.maps.LatLng}, 
    photo: string, 
    rating:number, 
    reference:string, 
    user_ratings_total: number
}

export interface ResultType {
  values: any[];
  filter: string;
  center: LocationType;
  map: any;
  status: 'idle' | 'loading' | 'failed';
}

export interface SelectedType {
  value: string;
}