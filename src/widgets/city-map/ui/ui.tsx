import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CityType, OfferType } from '../../../shared/types';
import { memo, useEffect, useRef } from 'react';
import useMap from '../hooks';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../const';

interface ICityMapProps {
    offersData: OfferType[];
    selectedOfferId?: string|null;
    city: CityType;
}
const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
function MemoCityMap({offersData, selectedOfferId,city}: ICityMapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  useEffect(() => {
    if (map) {
      offersData.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: offer.id === selectedOfferId ? currentCustomIcon : defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, offersData, selectedOfferId,city]);
  return (
    <div
      style={{height: '100%'}}
      ref={mapRef}
    >
    </div>
  );
}

export const CityMap = memo(MemoCityMap);
