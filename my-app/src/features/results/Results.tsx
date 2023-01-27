import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectResults } from '../../app/reducers/resultSlice';
import styles from './Results.module.css';
import { setSelected } from '../../app/reducers/selectedSlice';
import Restaurant from '../restaurant/Restaurant';

const Results = () => {
  const dispatch = useAppDispatch();
  const results = useAppSelector(selectResults);

  const updateSelected = (id: string) => {
    dispatch(setSelected({id: id}))
  }

  return (
    <section className={styles.results}>
        {results.map((restaurant, index) => (
            <div 
                className={styles.resultItem} 
                key={`list-item-${index}`} 
                onClick={()=>{updateSelected(restaurant.reference)}} >
                <div className={styles.infowindow} >
                    <Restaurant {...restaurant}/>
                </div>
            </div>
      ))}
     
    </section>
  );
}
export default Results;
