import { reducer as weatherReducer } from '../Features/Weather/reducer';
import {measurementReducer} from '../Features/Measurements/measurementReducer'
export default {
  weather: weatherReducer,
  measurements: measurementReducer
};
