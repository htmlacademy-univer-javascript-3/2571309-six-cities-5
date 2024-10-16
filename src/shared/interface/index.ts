export type PlaceType = 'room' | 'apartment' | 'house' | 'hotel';
export type OfferType = {
  id: string;
  title: string;
  type: PlaceType;
  price: number;
  previewImage: string;
  city: {
      name: string;
      location: {
          latitude: number;
          longitude: number;
          zoom: number;
      };
  };
  location: {
      latitude: number;
      longitude: number;
      zoom: number;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
}
