//import { createReducer, on, Action } from '@ngrx/store';

import { ActionTypes, WeatherForecastsActions } from './weather-forecast.actions';
import { ForecastPointEntity, WeatherEntity, WeatherForecastType } from '../../models/weather-forecast.models';

export const WEATHER_FORECAST_FEATURE_KEY = 'weatherForecast';

export interface WeatherForecastState {
	lastPoint: ForecastPointEntity | null;
	type: WeatherForecastType;
	error: string | null;
	dailyWeather: WeatherEntity[],
	hourlyWeather: WeatherEntity[]
}

export interface AppState {
	weather: WeatherForecastState;
}

export const initialWeatherForecastState = {
	lastPoint: null,
	type: WeatherForecastType.Daily,
	error: null,
	dailyWeather: [],
	hourlyWeather: []
} as WeatherForecastState;

export function weatherForecastReducer(state: WeatherForecastState = initialWeatherForecastState, action: WeatherForecastsActions): WeatherForecastState {
	switch (action.type) {
	  	case ActionTypes.LoadGeoPointSuccess:
			return { ...state, lastPoint: action.point, error: null };
  
		case ActionTypes.SetWeatherForecastType:
			return { ...state, type: action.weatherType, error: null };
	  
		case ActionTypes.LoadWeatherForecastSuccess:
			return { 
				...state, 
				dailyWeather: 
					state.type === WeatherForecastType.Daily ?
						[action.weatherForecast, ...state.dailyWeather] : state.dailyWeather,
				hourlyWeather: 
					state.type === WeatherForecastType.Hourly ?
						[action.weatherForecast, ...state.hourlyWeather] : state.hourlyWeather,
				error: null };
  
	  	case ActionTypes.LoadWeatherForecastFailure:
			return { ...state, lastPoint: null, error: action.error };

	  	default:
			return state;
	}
};
