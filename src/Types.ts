import { RegisterUser } from "./validation";

export type LoginUser = Pick<RegisterUser, "email" | "password">;

export interface IErrorState {
  isError: boolean;
  content: string;
}

export interface ISeasonContext {
  season: string;
  setSeason: React.Dispatch<React.SetStateAction<string>>;
}

export interface IUserState {
  isLoggedIn: boolean;
  userId: string;
}

export interface IUserContext {
  userState: IUserState;
  setUserState: React.Dispatch<React.SetStateAction<IUserState>>;
}

export interface ResultsData {
  MRData: Results;
}

export interface Results {
  RaceTable: RaceTable;
}

export interface RaceTable {
  Races: Race[];
}

export interface Race {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: Date;
}

export interface Circuit {
  circuitName: string;
  Location: Location;
}

export interface Location {
  country: string;
}

export type AppTableColumns<T> = { columnKey: keyof T; label: string }[];

export type TabRace = Omit<Race, "Circuit"> & {
  circuitName: string;
  country: string;
};

export interface RaceRes {
  MRData: RaceData;
}

export interface RaceData {
  RaceTable: RaceDataTable;
}

export interface RaceDataTable {
  season: string;
  round: string;
  Races: RaceTabEntry[];
}

export interface RaceTabEntry {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: RaceCircuit;
  date: Date;
  Results: RaceResult[];
}

export interface RaceCircuit {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: RaceLocation;
}

export interface RaceLocation {
  lat: string;
  long: string;
  locality: string;
  country: string;
}

export interface RaceResult {
  number: string;
  position: string;
  positionText: string;
  points: string;
  Driver: Driver;
  Constructor: Constructor;
  grid: string;
  laps: string;
}

export interface Constructor {
  url: string;
  name: string;
  nationality: string;
}

export interface Driver {
  driverId: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  nationality: string;
}

export interface ISingleComment {
  id: number;
  raceId: string;
  comment: string;
}

export interface QualiRes {
  MRData: QualiData;
}

export interface QualiData {
  xmlns: string;
  series: string;
  url: string;
  limit: string;
  offset: string;
  total: string;
  RaceTable: QualiTable;
}

export interface QualiTable {
  season: string;
  round: string;
  Races: QualiRace[];
}

export interface QualiRace {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: Date;
  time: string;
  QualifyingResults: QualifyingResult[];
}

export interface QualifyingResult {
  number: string;
  position: string;
  Driver: Driver;
  Constructor: Constructor;
  Q1: string;
  Q2?: string;
  Q3?: string;
}

export interface DriverStandings {
  MRData: DriverStandingsData;
}

export interface DriverStandingsData {
  StandingsTable: StandingsTable;
}

export interface StandingsTable {
  season: string;
  StandingsLists: StandingsList[];
}

export interface StandingsList {
  season: string;
  round: string;
  DriverStandings: DriverStanding[];
}

export interface DriverStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Driver: Driver;
  Constructors: Constructor[];
}

export interface ConstructorStandings {
  MRData: ConstructorStandingsData;
}

export interface ConstructorStandingsData {
  xmlns: string;
  series: string;
  url: string;
  limit: string;
  offset: string;
  total: string;
  StandingsTable: ConstructorStandingsTable;
}

export interface ConstructorStandingsTable {
  season: string;
  StandingsLists: ConstructorStandingsList[];
}

export interface ConstructorStandingsList {
  season: string;
  round: string;
  ConstructorStandings: ConstructorStanding[];
}

export interface ConstructorStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Constructor: Constructor;
}

export interface IPost {
  id: number;
  content: string;
  title: string;
  photo: string;
}

export interface IAddPost {
  authorId: string;
  content: string;
  title: string;
  photo: string;
}

export interface IGeneralResponse {
  message: string;
}

export interface IJwtResponsePayload {
  userId: number;
  sub: string;
}
