import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { OfferType } from '../../../shared/types';
import { useEffect, useMemo, useRef } from 'react';
import useMap from '../hooks';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../const';

interface ICityMapProps {
    offersData: OfferType[];
    selectedOfferId?: string|null;
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
function CityMap({offersData, selectedOfferId}: ICityMapProps) {
  const mapRef = useRef(null);
  const city = useMemo(()=>offersData[0]?.city, [offersData]);
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
  }, [map, offersData, selectedOfferId]);
  return (
    <div
      style={{height: '100%'}}
      ref={mapRef}
    >
    </div>
  );
}

export default CityMap;
