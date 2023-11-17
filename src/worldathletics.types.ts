export interface Athlete {
    /** @format date-time */
    birthdate: string | null;
    country: string;
    currentWorldRankings: CurrentWorldRanking[];
    firstname: string;
    honours: Honour[];
    id: number;
    lastname: string;
    personalbests: Performance[];
    seasonsbests: Performance[];
    sex: 'MALE' | 'FEMALE' | null;
  }
  
  export interface Country {
    areaCode: string;
    areaName: string;
    countryName: string;
    id: string;
  }
  
  export interface CurrentWorldRanking {
    eventGroup: string;
    place: number;
  }
  
  export interface Discipline {
    discipline: string;
    disciplineCode: string;
  }
  
  export interface Honour {
    category: string;
    results: Result[];
  }
  
  export interface Performance {
    /** @format date-time */
    date: string;
    discipline: string;
    disciplineCode: string;
    indoor: boolean;
    mark: string;
    notLegal: boolean;
    venue: string;
  }
  
  export interface Result {
    competition: string;
    /** @format date-time */
    date: string;
    discipline: string;
    disciplineCode: string;
    indoor: boolean;
    mark: string;
    place: number;
    venue: string;
  }