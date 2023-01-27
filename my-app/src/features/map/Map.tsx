import Restaurant from '../restaurant/Restaurant';
import styles from './Map.module.css';
import { useEffect } from 'react';
import { getResults, selectCenter, selectFilter, selectResults, setMap } from '../../app/reducers/resultSlice';
import { GoogleMap, useLoadScript, InfoWindowF, MarkerF } from "@react-google-maps/api"
import { selectSelected, setSelected } from '../../app/reducers/selectedSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

const Map = () => {
  const dispatch = useAppDispatch();
  const center = useAppSelector(selectCenter);
  const filter = useAppSelector(selectFilter);
  const markers = useAppSelector(selectResults);
  const selectedMarker = useAppSelector(selectSelected);

  useEffect(()=>{
    getMarkers()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center])
  
  const getMarkers = () => {
    dispatch(getResults({filter: filter, center: center}))
  }
  
  const { isLoaded } = useLoadScript({googleMapsApiKey:"AIzaSyCqWHKkgLxJiSwS63bxfWpQ-XhSQs65H5c"});
  
  if (!isLoaded) {return <div>Loading...</div>} ;

  const handleOnLoad = (map:any) => {
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(({ geometry }) => bounds.extend(geometry.location));
    map.fitBounds(bounds);
    dispatch(setMap({map:map}))
  };

  const updateSelectedMarker = (id:string) => {
    if (id === selectedMarker) {
      dispatch(setSelected({id: ""}))
    }else {
      dispatch(setSelected({id: id}))
    }
  };

  return (
    <div className={styles.mapContainer} >
      <div className={styles.row} >
        <GoogleMap
          mapContainerClassName={styles.map}
          onClick={()=> {updateSelectedMarker("")}}
          onLoad={handleOnLoad}
          options={{disableDefaultUI:true, center:center}}
          zoom={14} >
          {markers.map((restaurant, index) => (
            <MarkerF
              icon={selectedMarker === restaurant.reference ? "pin-selected.svg" : "pin-resting.svg"}
              key={`marker-${index}`}
              onClick={() => updateSelectedMarker(restaurant.reference)}
              position={restaurant.geometry.location}
            >
              {selectedMarker === restaurant.reference && (
                <InfoWindowF 
                  onCloseClick={() => updateSelectedMarker("")} 
                  options={{minWidth: 327}} >
                  <div className={styles.infowindow} >
                    <Restaurant {...restaurant} />
                  </div>
                </InfoWindowF>
              )}
            </MarkerF>
          ))}
        </GoogleMap>
      </div>
    </div>
  );
}
export default Map;
