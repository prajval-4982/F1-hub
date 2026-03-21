/* lib/api.ts — Jolpica F1 API client, calls local proxy to avoid CORS */
import type { DriverStanding, ConstructorStanding, Race } from './types';

const SEASON = 2026;

// eslint-disable-next-line
const _cache: Record<string, any> = {};

async function apiFetch(path: string) {
    if (_cache[path]) return _cache[path];
    try {
        const res = await fetch(`/api/f1${path}?limit=100`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        _cache[path] = json;
        return json;
    } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        console.warn('[API]', path, msg);
        return null;
    }
}

export async function getDriverStandings(): Promise<DriverStanding[]> {
    const d = await apiFetch(`/${SEASON}/driverstandings/`);
    return d?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings ?? [];
}

export async function getConstructorStandings(): Promise<ConstructorStanding[]> {
    const d = await apiFetch(`/${SEASON}/constructorstandings/`);
    return d?.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings ?? [];
}

export async function getAllResults(): Promise<Race[]> {
    const d = await apiFetch(`/${SEASON}/results/`);
    return d?.MRData?.RaceTable?.Races ?? [];
}

export async function getRaceResult(round: string): Promise<Race | null> {
    const d = await apiFetch(`/${SEASON}/${round}/results/`);
    return d?.MRData?.RaceTable?.Races?.[0] ?? null;
}

export async function getSchedule(): Promise<Race[]> {
    const d = await apiFetch(`/${SEASON}/`);
    return d?.MRData?.RaceTable?.Races ?? [];
}

export function fmtDate(str: string): string {
    if (!str) return '';
    return new Date(str).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}
