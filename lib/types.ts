/* lib/types.ts — TypeScript types for Jolpica / Ergast API shapes */

export interface Driver {
    driverId: string;
    givenName: string;
    familyName: string;
    nationality: string;
}

export interface Constructor {
    constructorId: string;
    name: string;
}

export interface DriverStanding {
    position: string;
    points: string;
    wins: string;
    Driver: Driver;
    Constructors: Constructor[];
}

export interface ConstructorStanding {
    position: string;
    points: string;
    Constructor: Constructor;
}

export interface FastestLap {
    rank: string;
    lap: string;
    Time?: { time: string };
}

export interface RaceResult {
    position: string;
    Driver: Driver;
    Constructor: Constructor;
    laps: string;
    status: string;
    Time?: { time: string };
    FastestLap?: FastestLap;
}

export interface Circuit {
    circuitId: string;
    circuitName: string;
    Location: {
        locality: string;
        country: string;
    };
}

export interface Race {
    round: string;
    raceName: string;
    date: string;
    Circuit: Circuit;
    Results?: RaceResult[];
    Sprint?: unknown;
}
