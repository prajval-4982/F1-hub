/* data/radar.ts — car attribute data for comparison tab */

export interface RadarTeam {
    name: string;
    color: string;
    attrs: number[];
}

export const RADAR_TEAMS: RadarTeam[] = [
    { name: 'Mercedes', color: '#27F4D2', attrs: [95, 80, 88, 92, 75, 90] },
    { name: 'Ferrari', color: '#E8002D', attrs: [72, 88, 75, 70, 82, 78] },
    { name: 'McLaren', color: '#FF8000', attrs: [88, 78, 90, 85, 80, 45] },
    { name: 'Red Bull', color: '#3671C6', attrs: [68, 72, 70, 68, 70, 72] },
];

export const ATTR_LABELS = ['PU Power', 'Aero', 'Chassis', 'Downforce', 'Tyre Mgmt', 'Reliability'];

export interface CarDiff {
    name: string;
    color: string;
    note: string;
}

export const CAR_DIFFS: CarDiff[] = [
    { name: 'Mercedes W16', color: '#27F4D2', note: 'Best MGU-H electric integration, exceptional energy recovery through corners' },
    { name: 'Ferrari SF-25', color: '#E8002D', note: 'Explosive ICE output — dominant on straights, weaker in aero efficiency' },
    { name: 'McLaren MCL39', color: '#FF8000', note: 'Best chassis balance in the field but PU unreliability masking true pace' },
    { name: 'Red Bull RB21', color: '#3671C6', note: 'Struggling with new PU architecture — overweight, Verstappen very vocal' },
];
