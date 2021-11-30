import {useContext} from 'react';
import cairoLessons from '../config/cairo-lessons.json';
import starknetLessons from '../config/starknet-lessons.json';
import {AppContext} from '../context/app/app-context';

const useLessons = () => {
  const {isCairoMode} = useContext(AppContext);
  return isCairoMode
    ? [...cairoLessons, ...starknetLessons]
    : starknetLessons;
};

export {useLessons};
