export type PlaceType = 'room' | 'apartment' | 'house' | 'hotel';
export type OfferType = {
  id: string;
  title: string;
  type: PlaceType;
  price: number;
  previewImage: string;
  city: CityType;
  location: LocationType;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
}

export type CityType = {
    name: string;
    location: LocationType;
}

export type LocationType = {
    latitude: number;
    longitude: number;
    zoom: number;
}
