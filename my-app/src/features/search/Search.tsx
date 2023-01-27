import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectMap, setCenter, setFilter } from '../../app/reducers/resultSlice';
import styles from './Search.module.css';

const Search = () => {
  const dispatch = useAppDispatch();
  const map = useAppSelector(selectMap);

  const handleSearch = (e: any) => {
      if(e.key === 'Enter' || e.keyCode === 13){
          const filter = e.target.value;
          const newCenter = {lng: map.getCenter().lng(), lat: map.getCenter().lat()}

          dispatch(setCenter({center: newCenter}))
          dispatch(setFilter({filter: filter}))
      }
  }

  return (
    <div className={styles.mapContainer} >
        <input type="text" placeholder='Search restaurants' className={styles.search} onKeyUp={(e)=>{handleSearch(e)}}/>
    </div>
  );
}
export default Search;
