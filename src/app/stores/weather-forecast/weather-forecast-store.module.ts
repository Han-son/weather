import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromWeatherForecast from './weather-forecast.reducer';
import { WeatherForecastEffects } from './weather-forecast.effects';
import { WeatherForecastApiService } from '../../services/weather-forecast-api.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	imports: [
		StoreModule.forFeature(fromWeatherForecast.WEATHER_FORECAST_FEATURE_KEY, fromWeatherForecast.weatherForecastReducer),
		EffectsModule.forFeature([WeatherForecastEffects]),
		HttpClientModule
	],
	providers: [
		WeatherForecastApiService
	  ]
})
export class WeatherForecastStoreModule {}
