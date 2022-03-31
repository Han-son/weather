import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { WeatherForecastApiService } from '../../services/weather-forecast-api.service';
import * as WeatherForecastActions from './weather-forecast.actions';
import { ForecastPointEntity, WeatherEntity, WeatherForecastEntity, WeatherForecastType } from '../../models/weather-forecast.models';
import { Store } from '@ngrx/store';
import { AppState } from './weather-forecast.reducer';
import * as WeatherForecastSelectors from './weather-forecast.selectors';

@Injectable()
export class WeatherForecastEffects {
	loadWeatherForecast$ = createEffect(() =>
		this.actions$.pipe(
			ofType<WeatherForecastActions.LoadWeatherForecast>(WeatherForecastActions.ActionTypes.LoadWeatherForecast),
			switchMap(action => this.service.getGeoByCityName(action.searchString).pipe(
				map(geoLocation => !!geoLocation && geoLocation.length ? geoLocation[0] : null),
				withLatestFrom(this.store.select(WeatherForecastSelectors.getType)),
				switchMap(([geoLocation, type]) => !!geoLocation
					? this.service.getWeatherByGeo(type, geoLocation.lat, geoLocation.lon).pipe(
						switchMap(weather => {
							return of(
								new WeatherForecastActions.LoadGeoPointSuccess({...geoLocation} as ForecastPointEntity),
								new WeatherForecastActions.LoadWeatherForecastSuccess({
									...geoLocation,
									weatherData: this.adaptWeatherData(type, weather)
								} as WeatherEntity)
							);
						})
					)
					: of(new WeatherForecastActions.LoadWeatherForecastFailure('City not found!'))),
				catchError((error: Error) => of(new WeatherForecastActions.LoadWeatherForecastFailure(error.message)))
			))

		)
	);

	constructor(private actions$: Actions, private service: WeatherForecastApiService, private store: Store<AppState>) {}

	private adaptWeatherData(weatherType: WeatherForecastType , weather: WeatherForecastEntity): string[] {
		let result: string[] = [];
		const oneSecMs = 1000;
		const oneHourMs = oneSecMs * 60 * 60;
		const oneDayMs = oneHourMs * 24;
		if (weatherType === WeatherForecastType.Daily) {
			if (!!weather.daily) {
				result = weather.daily
					.map(dayWeather => {
						const weekDay = (new Date(dayWeather.dt * oneSecMs)).getDay();
						return {
							weekDay: (weekDay === 0 ? 7 : weekDay) - 1,
							dayDiff: Math.floor(Math.abs((new Date(dayWeather.dt * oneSecMs)).getTime()-(new Date()).getTime()) / oneDayMs),
							temp: dayWeather.temp.day.toFixed(0)
						};
					})
					.filter(weekTemp => weekTemp.dayDiff < 7)
					.sort(({weekDay: a}, {weekDay: b}) => a-b)
					.map(dayTemp => dayTemp.temp);
			}
		} else {
			if (!!weather.hourly) {
				result = weather.hourly
					.map(hourWeather => {
						const hours = (new Date(hourWeather.dt * oneSecMs)).getHours();
						return {
							hours: hours === 0 ? 24 : hours,
							hoursDiff: Math.floor(Math.abs((new Date(hourWeather.dt * oneSecMs)).getTime()-(new Date()).getTime()) / oneHourMs),
							temp: hourWeather.temp.toFixed(0)
						};
					})
					.filter(hourTemp => (hourTemp.hours % 3) === 0)
					.sort(({hoursDiff: a}, {hoursDiff: b}) => a-b)
					.slice(0, 8)
					.sort(({hours: a}, {hours: b}) => a-b)
					.map(dayTemp => dayTemp.temp);
			}
		}
		return result;
	}

}
