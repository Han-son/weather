import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { WeatherForecastActions, WeatherForecastSelectors } from './stores/weather-forecast';
import { debounceTime, delay, distinctUntilChanged, filter, mergeMap, Observable, of, Subject, Subscription, take } from 'rxjs';
import { AppState } from './stores/weather-forecast/weather-forecast.reducer';
import { WeatherEntity, WeatherForecastType } from './models/weather-forecast.models';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
	title = 'Weather Forecast';

	type$: Observable<WeatherForecastType>;
	private keyUp$ = new Subject<string>();
	private subscription = new Subscription();

	private readonly keyUpFilterTimeout = 1000;
	  
	forecastDataSource$: Observable<WeatherEntity[]>;
	error$: Observable<string | null>;

	selectedType = '';

	@ViewChild("matButtonToggleGroup", { static: true }) buttonToggleGroup!: MatButtonToggleGroup;
	
	columnsDaily = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
	displayedColumnsDaily = ['name', ...this.columnsDaily];
	columnsHourly = ['03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00'];
	displayedColumnsHourly = ['name', ...this.columnsHourly];

	constructor(private store: Store<AppState>, private router: Router) {
		this.forecastDataSource$ = this.store.select(WeatherForecastSelectors.getWeather);
		this.type$ = this.store.select(WeatherForecastSelectors.getType);	
		this.error$ = this.store.select(WeatherForecastSelectors.getError);
	}

	get weatherForecastDailyType() {
		return WeatherForecastType.Daily;
	}

	ngOnInit() {
		this.subscription.add(
			this.keyUp$.asObservable().pipe(
				filter(query => !!query),
				debounceTime(this.keyUpFilterTimeout),
				distinctUntilChanged(),
				mergeMap(query => of(query).pipe(delay(this.keyUpFilterTimeout)))
			  ).subscribe(query => this.store.dispatch(new WeatherForecastActions.LoadWeatherForecast(query))));
		this.subscription.add(this.type$.pipe(take(1)).subscribe(value => this.selectedType = String(value)));
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
		
	isDailyWeatherType(weatherType: WeatherForecastType) {
		return weatherType === WeatherForecastType.Daily;
	}

	applyFilter(target: any) {
		!!target && this.keyUp$.next(target.value);
		this.updateRoute(target.value);
	}

	changeType(event: any) {
		this.selectedType = event.value;
		this.store.dispatch(new WeatherForecastActions.SetWeatherForecastType(parseInt(this.selectedType, 10)));
		this.updateRoute();
	}

	private updateRoute(query = '') {
		this.router.navigate(['/', 
			(parseInt(this.selectedType, 10) as WeatherForecastType) === WeatherForecastType.Daily ? 'daily' : 'hourly', encodeURIComponent(query) ]);

	}
} 