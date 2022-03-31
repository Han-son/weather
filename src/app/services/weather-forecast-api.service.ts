import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherForecastEntity, WeatherForecastGeoEntity, WeatherForecastType } from '../models/weather-forecast.models';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class WeatherForecastApiService {

	private _apiKey = '010721642521f31b0fbc8c3831d45951';
	private API_URL = 'http://api.openweathermap.org'

	constructor(private http: HttpClient) {}

	getGeoByCityName(cityName: string): Observable<WeatherForecastGeoEntity[]> {
		return this.http.get<WeatherForecastGeoEntity[]>(`${this.API_URL}/geo/1.0/direct?q=${cityName}&limit=1&appid=${this._apiKey}`);
	}

	getWeatherByGeo(type: WeatherForecastType, lat: number, lon: number): Observable<WeatherForecastEntity> {
		return this.http.get<WeatherForecastEntity>(this.getWeatherForecastURLByGeo(type, lat, lon));
	}

	private getWeatherForecastURLByGeo = (type: WeatherForecastType, lat: number, lon: number) =>
		`${this.API_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=current,minutely,
			${type === WeatherForecastType.Daily ? 'hourly' : 'daily'},alerts&appid=${this._apiKey}`;
}