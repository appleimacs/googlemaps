import { useEffect, useState } from 'react';
import Map from './features/map/Map';
import Results from './features/results/Results';
import './App.css';
import useWindowDimensions, { useAppDispatch, useAppSelector } from './app/hooks';
import Search from './features/search/Search';
import { getResults, selectCenter, selectFilter } from './app/reducers/resultSlice';

export enum SCREEN {
  MOBILE = 'mobile',
  DESKTOP = 'desktop',
}
export enum VIEW_MODE {
  MAP = 'map',
  LIST = 'list',
}

function App() {
  const dispatch = useAppDispatch();
  const center = useAppSelector(selectCenter);
  const filter = useAppSelector(selectFilter);
  const { width } = useWindowDimensions();
  const [screenSize, setScreenSize] = useState(SCREEN.DESKTOP)
  const [viewMode, setViewMode] = useState(VIEW_MODE.MAP)
  const showList = (screenSize === SCREEN.DESKTOP || viewMode === VIEW_MODE.LIST) ? true : false; 
  const showMap = (screenSize === SCREEN.DESKTOP || viewMode === VIEW_MODE.MAP) ? true : false;
  const showButton = screenSize === SCREEN.MOBILE ? true : false;

  const updateViewMode = (mode: VIEW_MODE) => {
    setViewMode(mode)
    dispatch(getResults({filter: filter, center:center}))
  }

  useEffect(()=>{
    if(width > 960){
      if(screenSize !== SCREEN.DESKTOP){
        dispatch(getResults({filter: filter, center:center}))
      }
      setScreenSize(SCREEN.DESKTOP)
    }else {
      if(screenSize !== SCREEN.MOBILE){
        dispatch(getResults({filter: filter, center:center}))
      }
      setScreenSize(SCREEN.MOBILE)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width])

  return (
    <div className="App">
      <header className="App-header">
        <img src="logo.svg" className={"App-logo"} alt="logo" />
        <Search />
      </header>
      <div className='wrapper'>
        {showList && <Results />}
        {showMap && <Map />}
        {showMap && showButton && <button className='view-button' onClick={()=>{updateViewMode(VIEW_MODE.LIST)}}>
          <img src="list.svg" width="24" height="24" alt="list view"/>
          <span>List</span>
        </button>}
        {showList && showButton && <button className='view-button' onClick={()=>{updateViewMode(VIEW_MODE.MAP)}}>
          <img src="map.svg" width="24" height="24" alt="map view"/>
          <span>Map</span>
        </button>}
      </div>
    </div>
  );
}

export default App;
