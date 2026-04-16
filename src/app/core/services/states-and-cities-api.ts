import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { IStatesResponse, StateListResponse } from "../../shared/models/states-response";
import { map, Observable } from "rxjs";
import { CitiesListResponse, ICitiesResponse } from "../../shared/models/cities-response";

@Injectable({
  providedIn: 'root',
})
export class StatesAndCitiesApi {
  private readonly _httpClient = inject(HttpClient);

  readonly BASE_URL = 'https://countriesnow.space/api/v0.1/countries';
  readonly COUNTRY = "Brazil";

  getStates(): Observable<StateListResponse> {
    return this._httpClient
      .post<IStatesResponse>(this.BASE_URL + '/states', {
        country: this.COUNTRY
      })
      .pipe(map((statesResponse)=> statesResponse.data.states));
  }

  getCities(state: string): Observable<CitiesListResponse> {
    return this._httpClient.post<ICitiesResponse>(this.BASE_URL + '/state/cities', {
      country: this.COUNTRY,
      state 
    }).pipe(map((citiesResponse) => citiesResponse.data));
  }
}