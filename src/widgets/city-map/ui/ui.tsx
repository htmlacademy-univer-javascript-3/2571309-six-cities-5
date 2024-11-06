import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { OfferType } from '../../../shared/types';
import { useEffect, useMemo, useRef } from 'react';
import useMap from '../hooks';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../const';

interface ICityMapProps {
    offersMockData: OfferType[];
    selectedOfferId: string;
}
function CityMap({offersMockData, selectedOfferId}: ICityMapProps) {
  const mapRef = useRef(null);
  const city = useMemo(()=>offersMockData[0]?.city, offersMockData);
  const map = useMap(mapRef, city);
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

  useEffect(() => {
    if (map) {
      offersMockData.forEach((offer) => {
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
  }, [map, offersMockData, selectedOfferId]);
  return (
    <div
      style={{height: '500px'}}
      ref={mapRef}
    >
    </div>
  );
}

export default CityMap;
