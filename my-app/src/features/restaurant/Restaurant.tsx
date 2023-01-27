import styles from './Restaurant.module.css';
import { useAppDispatch, useAppSelector  } from '../../app/hooks';
import { deleteFav, insertFav, selectFavs } from '../../app/reducers/favSlice';

export interface RestaurantType {
    name: string, 
    editorial_summary: string, 
    geometry: {location:google.maps.LatLng}, 
    photo: string, 
    rating:number, 
    reference:string, 
    user_ratings_total: number
}

const Restaurant = ({
        name,
        editorial_summary,
        photo,
        rating,
        reference,
        user_ratings_total
    }: RestaurantType) => {
    const dispatch = useAppDispatch();
    const favs = useAppSelector(selectFavs);

    const findFav = (id: string) => {
        return favs.find((item)=>{return item===id});
    }

    const updateFavs = (id: string) => {
        const fav = findFav(id);

        if(fav === undefined){
        dispatch(insertFav({id:id}))
        }else{
        dispatch(deleteFav({id:id}))
        }
    }

    return (
        <>
            <img
                alt={name}
                className={styles.photo}
                height="auto"
                src={photo||"placeholder.png"}
                width="64px" />
            <div className={styles.infowindowContent}>
                <h3 className={styles.name}>{name}</h3>
                <p className={styles.alignLeft}>
                    <img src="star.svg" alt="star" className={styles.star} />{rating} &#x2022; ({user_ratings_total} review{user_ratings_total !== 1 && 's'})
                </p>
                <p className={styles.alignLeft}>{editorial_summary||"(no summary)"}</p>
            </div>
            <div onClick={()=>{updateFavs(reference)}} className={styles.save}>
                <img
                    alt={findFav(reference) === undefined ? "inactive bookmark" : "saved-bookmark.svg"}
                    src={findFav(reference) === undefined ? "bookmark-resting.svg" : "bookmark-saved.svg"}  />
            </div>
        </>
    );
}
export default Restaurant;
