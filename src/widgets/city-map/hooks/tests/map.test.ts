import { renderHook } from '@testing-library/react';
import useMap from '..';
import { Cities } from '../../../../shared/api';
import leaflet from 'leaflet';
describe('Hook: useMap', () => {
  const fakeMapRef = document.createElement('div');
  const fakeCity = {
    'name': Cities.Amsterdam,
    'location': {
      'latitude': 48.85661,
      'longitude': 2.351499,
      'zoom': 13
    }
  };
  vi.mock('leaflet', () => ({
    default: {
      map: vi.fn().mockReturnValue({
        addTo: vi.fn(),
      }),
      tileLayer: vi.fn().mockReturnValue({
        addTo: vi.fn(),
      }),
    }
  }));
  beforeEach(()=>{
    vi.clearAllMocks();
  });
  it('should initialized correctly', () => {
    const { result } = renderHook(() => useMap({current: fakeMapRef}, fakeCity));
    expect(leaflet.map).toHaveBeenCalledWith(fakeMapRef, {
      center: {
        lat: fakeCity.location.latitude,
        lng: fakeCity.location.longitude,
      },
      zoom: fakeCity.location.zoom,
    });
    expect(leaflet.tileLayer).toBeCalledTimes(1);
    expect(leaflet.tileLayer).toHaveBeenCalled();
    expect(result.current).toBeDefined();
  });

  it('should not initialize the map again on re-render', () => {
    const mockMap = vi.spyOn(leaflet, 'map');
    const { rerender } = renderHook(() => useMap({current: fakeMapRef}, fakeCity));
    rerender();
    expect(mockMap).toBeCalledTimes(1);
  });

});
