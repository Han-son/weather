import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeatherForecastType } from 'src/app/models/weather-forecast.models';
import { WeatherForecastState, WEATHER_FORECAST_FEATURE_KEY } from './weather-forecast.reducer';

export const getWeatherForecastState = createFeatureSelector<WeatherForecastState>(WEATHER_FORECAST_FEATURE_KEY);

export const getLastPoint = createSelector(getWeatherForecastState, (state: WeatherForecastState) => state.lastPoint);

export const getWeather = createSelector(getWeatherForecastState, (state: WeatherForecastState) =>
    state.type === WeatherForecastType.Daily ? state.dailyWeather : state.hourlyWeather);

export const getType = createSelector(getWeatherForecastState, (state: WeatherForecastState) => state.type);

export const getError = createSelector(getWeatherForecastState, (state: WeatherForecastState) => state.error);
