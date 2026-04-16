export interface IStateResponse {
  name: string;
  state_code: string;
}

export type StateListResponse = IStateResponse[];

export interface IStatesResponse {
  error: boolean;
  msg: string;
  data: {
    name: string;
    iso3: string;
    iso2: string;
    states: StateListResponse;
  }
}