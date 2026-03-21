/* data/tracks.ts — FastF1 representative telemetry, static per season */

export interface Segment {
    id: string;
    label: string;
    name: string;
    type: 'straight' | 'corner';
    desc: string;
    speeds: Record<string, number>;
    pts: number[][];
    lp: number[];
    la: 'start' | 'middle' | 'end';
}

export interface TrackData {
    name: string;
    country: string;
    segments: Segment[];
}

export const TRACKS: Record<string, TrackData> = {

    monza: {
        name: 'Autodromo Nazionale di Monza', country: 'Italy',
        segments: [
            {
                id: 's1', label: 'S1', name: 'Main Straight', type: 'straight',
                desc: 'Pit straight — DRS zone 1, peak speed sector',
                speeds: { mercedes: 338, ferrari: 344, mclaren: 348, redbull: 342 },
                pts: [[82, 150], [200, 150], [330, 150], [450, 150], [500, 150]], lp: [290, 128], la: 'middle'
            },
            {
                id: 't12', label: 'T1-T2', name: 'Variante del Rettifilo', type: 'corner',
                desc: 'First chicane — heaviest braking zone, 340 to 85 km/h',
                speeds: { mercedes: 86, ferrari: 88, mclaren: 82, redbull: 85 },
                pts: [[500, 150], [536, 150], [556, 156], [561, 173], [555, 190], [534, 194], [514, 194], [505, 210], [510, 230], [531, 238], [562, 240]], lp: [608, 194], la: 'start'
            },
            {
                id: 't3', label: 'T3', name: 'Curva Grande', type: 'corner',
                desc: 'Sweeping high-speed right hander at ~265 km/h',
                speeds: { mercedes: 272, ferrari: 263, mclaren: 258, redbull: 268 },
                pts: [[562, 240], [596, 270], [630, 308], [656, 348], [668, 390]], lp: [716, 300], la: 'start'
            },
            {
                id: 't45', label: 'T4-T5', name: 'Variante Roggia', type: 'corner',
                desc: 'Second chicane — entry from Curva Grande at speed',
                speeds: { mercedes: 89, ferrari: 95, mclaren: 87, redbull: 91 },
                pts: [[668, 390], [679, 410], [697, 422], [710, 440], [701, 454], [680, 459], [660, 463]], lp: [750, 437], la: 'start'
            },
            {
                id: 't6', label: 'T6', name: 'Lesmo 1', type: 'corner',
                desc: 'Fast right-hander through the wooded section',
                speeds: { mercedes: 220, ferrari: 215, mclaren: 209, redbull: 224 },
                pts: [[660, 463], [628, 471], [600, 465], [576, 451], [567, 445]], lp: [636, 494], la: 'middle'
            },
            {
                id: 't7', label: 'T7', name: 'Lesmo 2', type: 'corner',
                desc: 'Tighter second Lesmo — high mechanical grip demand',
                speeds: { mercedes: 197, ferrari: 192, mclaren: 187, redbull: 201 },
                pts: [[567, 445], [547, 453], [527, 462], [507, 468]], lp: [522, 494], la: 'middle'
            },
            {
                id: 's2', label: 'S2', name: 'Rettifilo Sud', type: 'straight',
                desc: 'Back straight — DRS zone 2, second top-speed measurement',
                speeds: { mercedes: 330, ferrari: 337, mclaren: 343, redbull: 335 },
                pts: [[507, 468], [420, 471], [330, 471], [240, 470], [165, 467]], lp: [330, 492], la: 'middle'
            },
            {
                id: 't810', label: 'T8-T10', name: 'Variante Ascari', type: 'corner',
                desc: 'Fast chicane sequence — complex rhythm and balance',
                speeds: { mercedes: 175, ferrari: 183, mclaren: 174, redbull: 177 },
                pts: [[165, 467], [140, 462], [122, 447], [118, 422], [128, 402], [149, 391], [169, 387], [183, 370], [178, 352]], lp: [60, 430], la: 'end'
            },
            {
                id: 't11', label: 'T11', name: 'Curva Parabolica', type: 'corner',
                desc: 'Long sweeping final corner — exit speed feeds main straight',
                speeds: { mercedes: 163, ferrari: 151, mclaren: 147, redbull: 155 },
                pts: [[178, 352], [163, 310], [139, 269], [112, 229], [90, 193], [82, 167], [82, 150]], lp: [30, 265], la: 'end'
            },
        ]
    },

    suzuka: {
        name: 'Suzuka International Racing Course', country: 'Japan',
        segments: [
            {
                id: 'ss1', label: 'S1', name: 'Start/Finish Straight', type: 'straight',
                desc: 'Main straight — DRS zone, wide braking into T1',
                speeds: { mercedes: 302, ferrari: 298, mclaren: 307, redbull: 310 },
                pts: [[100, 180], [200, 180], [310, 180], [420, 175]], lp: [260, 158], la: 'middle'
            },
            {
                id: 'st12', label: 'T1-T2', name: 'First Curve Complex', type: 'corner',
                desc: 'Tight right-left double apex — very high mechanical grip demand',
                speeds: { mercedes: 168, ferrari: 172, mclaren: 160, redbull: 175 },
                pts: [[420, 175], [455, 175], [480, 178], [495, 192], [490, 215], [468, 226], [448, 225], [430, 238], [430, 260]], lp: [540, 195], la: 'start'
            },
            {
                id: 'ses', label: 'Esses', name: 'S Curves', type: 'corner',
                desc: 'World-famous esses — taken flat out at ~220 km/h, huge aero load',
                speeds: { mercedes: 225, ferrari: 218, mclaren: 210, redbull: 228 },
                pts: [[430, 260], [445, 290], [420, 315], [450, 345], [420, 375]], lp: [540, 310], la: 'start'
            },
            {
                id: 'sdeg', label: 'Degner', name: 'Degner Curve', type: 'corner',
                desc: 'Blind fast right-hander under bridge — committed braking',
                speeds: { mercedes: 188, ferrari: 182, mclaren: 177, redbull: 192 },
                pts: [[420, 375], [405, 410], [386, 430], [365, 440], [338, 440]], lp: [540, 410], la: 'start'
            },
            {
                id: 'shs', label: 'S2', name: 'Hairpin Straight', type: 'straight',
                desc: 'Short straight to hairpin — DRS zone 2',
                speeds: { mercedes: 261, ferrari: 257, mclaren: 268, redbull: 264 },
                pts: [[338, 440], [270, 440], [205, 440], [155, 438]], lp: [245, 458], la: 'middle'
            },
            {
                id: 'shp', label: 'HP', name: 'Hairpin', type: 'corner',
                desc: 'Slowest point of the lap — hardest braking zone at Suzuka',
                speeds: { mercedes: 72, ferrari: 78, mclaren: 69, redbull: 75 },
                pts: [[155, 438], [118, 440], [100, 452], [98, 475], [115, 490], [142, 498], [170, 495], [195, 488]], lp: [50, 462], la: 'end'
            },
            {
                id: 'sspn', label: 'Spoon', name: 'Spoon Curve', type: 'corner',
                desc: 'Long sweeping left — critical for exit onto back straight',
                speeds: { mercedes: 195, ferrari: 188, mclaren: 183, redbull: 200 },
                pts: [[195, 488], [240, 495], [290, 492], [330, 482], [358, 462], [365, 440]], lp: [310, 465], la: 'middle'
            },
            {
                id: 'sbs', label: 'S3', name: 'Back Straight', type: 'straight',
                desc: 'Longest straight — DRS zone, 130R approach',
                speeds: { mercedes: 325, ferrari: 320, mclaren: 331, redbull: 328 },
                pts: [[365, 440], [390, 400], [395, 355], [392, 308], [387, 260]], lp: [422, 360], la: 'start'
            },
            {
                id: 's130r', label: '130R', name: '130R', type: 'corner',
                desc: 'Iconic flat-out sweeper — 130m radius, taken near 300 km/h',
                speeds: { mercedes: 292, ferrari: 285, mclaren: 278, redbull: 295 },
                pts: [[387, 260], [370, 218], [340, 190], [305, 178], [270, 178], [230, 182]], lp: [370, 192], la: 'middle'
            },
            {
                id: 'schi', label: 'Chicane', name: 'Casio Triangle', type: 'corner',
                desc: 'Final chicane before pit straight — late braking battle spot',
                speeds: { mercedes: 122, ferrari: 128, mclaren: 118, redbull: 125 },
                pts: [[230, 182], [200, 180], [165, 182], [150, 196], [155, 215], [170, 226], [185, 228], [200, 222], [220, 210], [240, 195], [255, 185], [270, 178]], lp: [175, 165], la: 'middle'
            },
        ]
    },

    china: {
        name: 'Shanghai International Circuit', country: 'China',
        segments: [
            {
                id: 'sha_s1', label: 'S1', name: 'Start/Finish Straight', type: 'straight',
                desc: '2nd longest F1 straight at 1.175 km — DRS zone 1, 330+ km/h at speed trap',
                speeds: { mercedes: 328, ferrari: 332, mclaren: 338, redbull: 318 },
                pts: [[82, 385], [200, 385], [340, 385], [478, 385], [545, 375]], lp: [310, 365], la: 'middle'
            },
            {
                id: 'sha_t12', label: 'T1-T2', name: 'Turns 1-2 Hairpin', type: 'corner',
                desc: 'Signature Shanghai hairpin — very slow apex, enormous braking zone, DRS overtake zone',
                speeds: { mercedes: 72, ferrari: 76, mclaren: 65, redbull: 70 },
                pts: [[545, 375], [582, 352], [608, 312], [615, 262], [602, 218], [572, 190], [530, 178], [488, 178], [450, 188], [422, 210]], lp: [648, 290], la: 'start'
            },
            {
                id: 'sha_esses', label: 'T3-T6', name: 'Esses Section', type: 'corner',
                desc: 'Flowing S-curves — aero efficiency critical, medium speed ~190 km/h',
                speeds: { mercedes: 198, ferrari: 188, mclaren: 182, redbull: 195 },
                pts: [[422, 210], [400, 235], [390, 268], [402, 298], [428, 318], [458, 328], [488, 322]], lp: [368, 305], la: 'end'
            },
            {
                id: 'sha_loop', label: 'T7-T11', name: 'Interior Loop', type: 'corner',
                desc: 'Technical back-of-circuit loop — aero-loaded sequence, Red Bull competitive here',
                speeds: { mercedes: 178, ferrari: 175, mclaren: 165, redbull: 182 },
                pts: [[488, 322], [525, 322], [558, 308], [578, 278], [580, 242], [568, 210], [545, 185], [512, 165], [472, 155], [428, 155], [390, 165], [362, 185]], lp: [598, 252], la: 'start'
            },
            {
                id: 'sha_s2', label: 'S2', name: 'Back Straight', type: 'straight',
                desc: 'DRS zone 2 running right-to-left — 310+ km/h before T13 braking zone',
                speeds: { mercedes: 312, ferrari: 315, mclaren: 318, redbull: 302 },
                pts: [[362, 185], [298, 188], [235, 188], [175, 185], [118, 185], [78, 195]], lp: [218, 168], la: 'middle'
            },
            {
                id: 'sha_final', label: 'T13-T16', name: 'Final Chicane Complex', type: 'corner',
                desc: 'Right-left-right final sequence — exit speed onto pit straight defines overall lap time',
                speeds: { mercedes: 148, ferrari: 155, mclaren: 140, redbull: 145 },
                pts: [[78, 195], [48, 220], [38, 262], [48, 308], [72, 350], [85, 385], [82, 385]], lp: [48, 268], la: 'end'
            },
        ]
    },

    australia: {
        name: 'Albert Park Circuit', country: 'Australia',
        segments: [
            {
                id: 'aus_s1', label: 'S1', name: 'Start/Finish Straight', type: 'straight',
                desc: 'Pit straight alongside the lake — DRS zone, 310 km/h approach into T1',
                speeds: { mercedes: 308, ferrari: 305, mclaren: 315, redbull: 298 },
                pts: [[553, 100], [553, 168], [552, 245], [548, 318]], lp: [578, 205], la: 'start'
            },
            {
                id: 'aus_t12', label: 'T1-T2', name: 'Turns 1-2 Chicane', type: 'corner',
                desc: 'Opening chicane — heavy braking from 310 km/h, right then sharp left',
                speeds: { mercedes: 88, ferrari: 92, mclaren: 82, redbull: 86 },
                pts: [[548, 318], [562, 352], [572, 382], [568, 410], [548, 428], [518, 435], [488, 428], [462, 412]], lp: [612, 378], la: 'start'
            },
            {
                id: 'aus_t36', label: 'T3-T6', name: 'Lakeside Complex', type: 'corner',
                desc: 'Fast flowing sequence alongside the lake — taken near flat, big commitment from drivers',
                speeds: { mercedes: 192, ferrari: 182, mclaren: 178, redbull: 188 },
                pts: [[462, 412], [422, 420], [382, 420], [338, 412], [302, 392], [275, 362], [262, 328]], lp: [318, 442], la: 'middle'
            },
            {
                id: 'aus_t78', label: 'T7-T8', name: 'Western Straight', type: 'straight',
                desc: 'Park-side run through the western grounds — medium speed into T9 chicane',
                speeds: { mercedes: 268, ferrari: 262, mclaren: 272, redbull: 255 },
                pts: [[262, 328], [258, 292], [260, 258], [268, 225], [282, 198], [302, 175]], lp: [228, 262], la: 'end'
            },
            {
                id: 'aus_t910', label: 'T9-T10', name: 'Turns 9-10 Chicane', type: 'corner',
                desc: 'DRS detection chicane — key overtaking setup zone, tight left-right sequence',
                speeds: { mercedes: 135, ferrari: 140, mclaren: 128, redbull: 132 },
                pts: [[302, 175], [338, 160], [378, 152], [418, 152], [455, 158], [482, 175], [498, 200]], lp: [390, 132], la: 'middle'
            },
            {
                id: 'aus_t1114', label: 'T11-T14', name: 'Northern Complex', type: 'corner',
                desc: 'Tricky technical sequence — car balance setup critical, drivers flag kerb issues',
                speeds: { mercedes: 202, ferrari: 192, mclaren: 185, redbull: 195 },
                pts: [[498, 200], [508, 228], [508, 258], [495, 282], [472, 296], [442, 302], [408, 296], [378, 282], [355, 260], [342, 235], [340, 208], [348, 182], [362, 162]], lp: [530, 252], la: 'start'
            },
            {
                id: 'aus_t1516', label: 'T15-T16', name: 'Final Corners', type: 'corner',
                desc: 'Final chicane onto pit straight — slow exit, but sets up the whole next lap',
                speeds: { mercedes: 155, ferrari: 160, mclaren: 148, redbull: 152 },
                pts: [[362, 162], [395, 148], [432, 138], [470, 135], [508, 138], [535, 148], [550, 105], [553, 100]], lp: [460, 118], la: 'middle'
            },
        ]
    },

    silverstone: {
        name: 'Silverstone Circuit', country: 'Great Britain',
        segments: [
            {
                id: 'sil_s1', label: 'S1', name: 'Wellington Straight', type: 'straight',
                desc: 'Pit straight — DRS zone 1, 310+ km/h approach into Copse',
                speeds: { mercedes: 312, ferrari: 308, mclaren: 318, redbull: 305 },
                pts: [[80, 300], [180, 300], [290, 298], [400, 295]], lp: [240, 278], la: 'middle'
            },
            {
                id: 'sil_copse', label: 'T1', name: 'Copse', type: 'corner',
                desc: 'Fast right-hander — taken near flat at 280 km/h, massive aero demand',
                speeds: { mercedes: 282, ferrari: 275, mclaren: 270, redbull: 278 },
                pts: [[400, 295], [440, 288], [478, 270], [505, 245], [520, 215]], lp: [540, 270], la: 'start'
            },
            {
                id: 'sil_maggotts', label: 'T2-T5', name: 'Maggotts-Becketts', type: 'corner',
                desc: 'Legendary high-speed esses — 250 km/h direction changes, ultimate car test',
                speeds: { mercedes: 258, ferrari: 248, mclaren: 242, redbull: 255 },
                pts: [[520, 215], [530, 185], [520, 155], [498, 132], [468, 118], [435, 112], [405, 118]], lp: [560, 150], la: 'start'
            },
            {
                id: 'sil_hangar', label: 'S2', name: 'Hangar Straight', type: 'straight',
                desc: 'Fastest point on track — DRS zone 2, 330+ km/h',
                speeds: { mercedes: 332, ferrari: 328, mclaren: 338, redbull: 325 },
                pts: [[405, 118], [340, 120], [270, 125], [200, 130], [140, 138]], lp: [270, 102], la: 'middle'
            },
            {
                id: 'sil_stowe', label: 'T6', name: 'Stowe', type: 'corner',
                desc: 'Heavy braking right-hander after Hangar Straight — key overtaking spot',
                speeds: { mercedes: 168, ferrari: 174, mclaren: 162, redbull: 170 },
                pts: [[140, 138], [110, 148], [92, 168], [85, 195], [90, 225]], lp: [55, 168], la: 'end'
            },
            {
                id: 'sil_vale', label: 'T7-T9', name: 'Vale-Club', type: 'corner',
                desc: 'Technical slow section — exit speed onto Wellington Straight is critical',
                speeds: { mercedes: 125, ferrari: 130, mclaren: 118, redbull: 122 },
                pts: [[90, 225], [95, 255], [105, 275], [80, 300]], lp: [55, 258], la: 'end'
            },
        ]
    },

    monaco: {
        name: 'Circuit de Monaco', country: 'Monaco',
        segments: [
            {
                id: 'mon_s1', label: 'S1', name: 'Start/Finish Straight', type: 'straight',
                desc: 'Short pit straight — 280 km/h, tight approach into Ste Devote',
                speeds: { mercedes: 278, ferrari: 275, mclaren: 282, redbull: 270 },
                pts: [[280, 120], [380, 120], [480, 118], [560, 115]], lp: [430, 100], la: 'middle'
            },
            {
                id: 'mon_ste', label: 'T1', name: 'Sainte Devote', type: 'corner',
                desc: 'Tight right-hander — 72 km/h, first overtaking opportunity of the lap',
                speeds: { mercedes: 72, ferrari: 78, mclaren: 68, redbull: 74 },
                pts: [[560, 115], [590, 108], [610, 92], [618, 72], [612, 52]], lp: [645, 90], la: 'start'
            },
            {
                id: 'mon_casino', label: 'T2-T5', name: 'Casino/Massenet', type: 'corner',
                desc: 'Uphill climb past Casino Square — sweeping left, 165 km/h, iconic scenery',
                speeds: { mercedes: 168, ferrari: 162, mclaren: 155, redbull: 165 },
                pts: [[612, 52], [590, 42], [555, 38], [518, 42], [488, 55], [462, 75]], lp: [540, 20], la: 'middle'
            },
            {
                id: 'mon_gch', label: 'T6', name: 'Grand Hotel Hairpin', type: 'corner',
                desc: 'Slowest corner in F1 — 48 km/h, requires full lock, iconic Monaco moment',
                speeds: { mercedes: 48, ferrari: 52, mclaren: 45, redbull: 50 },
                pts: [[462, 75], [442, 100], [435, 128], [445, 155], [468, 172]], lp: [405, 128], la: 'end'
            },
            {
                id: 'mon_tunnel', label: 'T7-T9', name: 'Tunnel Section', type: 'straight',
                desc: 'Tunnel straight — 260 km/h, driver eyes adapt from light to dark and back',
                speeds: { mercedes: 262, ferrari: 258, mclaren: 268, redbull: 255 },
                pts: [[468, 172], [500, 188], [535, 198], [572, 202], [608, 198], [640, 188]], lp: [555, 218], la: 'middle'
            },
            {
                id: 'mon_chicane', label: 'T10-T11', name: 'Nouvelle Chicane', type: 'corner',
                desc: 'Harbour chicane — 78 km/h, main overtaking spot after the tunnel',
                speeds: { mercedes: 78, ferrari: 82, mclaren: 72, redbull: 76 },
                pts: [[640, 188], [660, 210], [668, 238], [658, 268], [635, 288], [605, 295]], lp: [698, 248], la: 'start'
            },
            {
                id: 'mon_pool', label: 'T12-T15', name: 'Swimming Pool', type: 'corner',
                desc: 'Fast chicane by the harbour pool — 170 km/h, walls inches away',
                speeds: { mercedes: 172, ferrari: 165, mclaren: 160, redbull: 168 },
                pts: [[605, 295], [562, 305], [518, 308], [478, 302], [442, 288], [412, 268]], lp: [508, 328], la: 'middle'
            },
            {
                id: 'mon_rascasse', label: 'T16-T19', name: 'Rascasse/Anthony Noghes', type: 'corner',
                desc: 'Final tight section — 55 km/h Rascasse hairpin feeds onto pit straight',
                speeds: { mercedes: 58, ferrari: 62, mclaren: 52, redbull: 56 },
                pts: [[412, 268], [378, 242], [348, 215], [322, 188], [302, 158], [290, 132], [280, 120]], lp: [312, 238], la: 'end'
            },
        ]
    },

    bahrain: {
        name: 'Bahrain International Circuit', country: 'Bahrain',
        segments: [
            {
                id: 'bah_s1', label: 'S1', name: 'Start/Finish Straight', type: 'straight',
                desc: 'Pit straight under floodlights — DRS zone 1, 320+ km/h into heavy T1 braking',
                speeds: { mercedes: 318, ferrari: 322, mclaren: 328, redbull: 315 },
                pts: [[120, 200], [220, 200], [340, 198], [460, 195], [540, 192]], lp: [330, 178], la: 'middle'
            },
            {
                id: 'bah_t14', label: 'T1-T4', name: 'Sakhir Complex', type: 'corner',
                desc: 'Signature right-left-right-left complex — 90 km/h, biggest overtaking zone',
                speeds: { mercedes: 92, ferrari: 98, mclaren: 85, redbull: 90 },
                pts: [[540, 192], [575, 188], [600, 175], [612, 155], [608, 132], [590, 118], [565, 112], [538, 118], [520, 138], [515, 162]], lp: [640, 155], la: 'start'
            },
            {
                id: 'bah_t58', label: 'T5-T8', name: 'Middle Sector', type: 'corner',
                desc: 'Technical flowing section — aero balance critical, 180 km/h average',
                speeds: { mercedes: 185, ferrari: 178, mclaren: 172, redbull: 182 },
                pts: [[515, 162], [492, 148], [462, 142], [428, 148], [398, 162], [378, 185], [368, 212]], lp: [440, 125], la: 'middle'
            },
            {
                id: 'bah_s2', label: 'S2', name: 'Back Straight', type: 'straight',
                desc: 'DRS zone 2 — 315+ km/h, long run down to T11 braking',
                speeds: { mercedes: 315, ferrari: 318, mclaren: 322, redbull: 308 },
                pts: [[368, 212], [350, 248], [330, 288], [310, 325], [288, 358]], lp: [380, 288], la: 'middle'
            },
            {
                id: 'bah_t1113', label: 'T11-T13', name: 'Desert Complex', type: 'corner',
                desc: 'Tight left-right sequence — 82 km/h, traction-limited exit',
                speeds: { mercedes: 82, ferrari: 88, mclaren: 78, redbull: 85 },
                pts: [[288, 358], [268, 382], [252, 398], [242, 418], [248, 438], [268, 448], [295, 445], [318, 432]], lp: [215, 418], la: 'end'
            },
            {
                id: 'bah_t1415', label: 'T14-T15', name: 'Final Section', type: 'corner',
                desc: 'Sweeping entry to final straight — exit speed feeds the DRS zone',
                speeds: { mercedes: 195, ferrari: 188, mclaren: 182, redbull: 192 },
                pts: [[318, 432], [345, 412], [360, 385], [358, 352], [342, 325], [315, 305], [278, 292], [242, 275], [215, 252], [195, 225], [185, 200], [120, 200]], lp: [285, 305], la: 'end'
            },
        ]
    },

    spa: {
        name: 'Circuit de Spa-Francorchamps', country: 'Belgium',
        segments: [
            {
                id: 'spa_s1', label: 'S1', name: 'Start/Finish Straight', type: 'straight',
                desc: 'Short pit straight — 310 km/h up to La Source hairpin',
                speeds: { mercedes: 308, ferrari: 305, mclaren: 312, redbull: 302 },
                pts: [[350, 340], [420, 340], [490, 338], [560, 335]], lp: [455, 320], la: 'middle'
            },
            {
                id: 'spa_lasource', label: 'T1', name: 'La Source', type: 'corner',
                desc: 'Opening hairpin — 68 km/h, heavy braking, classic first-lap incident spot',
                speeds: { mercedes: 68, ferrari: 72, mclaren: 62, redbull: 66 },
                pts: [[560, 335], [588, 328], [608, 312], [612, 288], [600, 268], [575, 258]], lp: [638, 305], la: 'start'
            },
            {
                id: 'spa_kemmel', label: 'S2', name: 'Kemmel Straight', type: 'straight',
                desc: 'Downhill blast through Eau Rouge — DRS zone, 340+ km/h, longest full-throttle section',
                speeds: { mercedes: 338, ferrari: 342, mclaren: 348, redbull: 335 },
                pts: [[575, 258], [540, 248], [500, 238], [455, 225], [410, 210], [360, 195], [310, 182]], lp: [440, 208], la: 'middle'
            },
            {
                id: 'spa_raidillon', label: 'T2-T4', name: 'Eau Rouge/Raidillon', type: 'corner',
                desc: 'Iconic uphill sweep — 290 km/h compression, bravery corner of F1',
                speeds: { mercedes: 292, ferrari: 285, mclaren: 278, redbull: 288 },
                pts: [[310, 182], [278, 172], [248, 158], [225, 140], [210, 118]], lp: [262, 128], la: 'start'
            },
            {
                id: 'spa_les', label: 'T5-T9', name: 'Les Combes/Malmedy', type: 'corner',
                desc: 'Technical chicane complex — 145 km/h, key DRS activation point',
                speeds: { mercedes: 148, ferrari: 152, mclaren: 142, redbull: 146 },
                pts: [[210, 118], [195, 98], [175, 82], [152, 75], [128, 78], [108, 92], [98, 115]], lp: [155, 58], la: 'middle'
            },
            {
                id: 'spa_pouhon', label: 'T10-T11', name: 'Pouhon', type: 'corner',
                desc: 'Double-apex downhill left — 265 km/h, massive sustained lateral G',
                speeds: { mercedes: 268, ferrari: 258, mclaren: 252, redbull: 265 },
                pts: [[98, 115], [92, 148], [95, 182], [108, 215], [128, 242]], lp: [58, 182], la: 'end'
            },
            {
                id: 'spa_stavelot', label: 'T12-T15', name: 'Stavelot/Bus Stop', type: 'corner',
                desc: 'Final chicane sequence — 88 km/h Bus Stop, exit onto pit straight critical',
                speeds: { mercedes: 88, ferrari: 92, mclaren: 82, redbull: 86 },
                pts: [[128, 242], [155, 268], [188, 288], [225, 305], [268, 318], [310, 330], [350, 340]], lp: [218, 322], la: 'end'
            },
        ]
    },
    zandvoort: {
        name: 'Circuit Zandvoort', country: 'Netherlands',
        segments: [
            {
                id: 'zan_s1', label: 'S1', name: 'Main Straight', type: 'straight',
                desc: 'Short straight but high intensity — DRS zone 1, into Tarzan',
                speeds: { mercedes: 305, ferrari: 300, mclaren: 310, redbull: 312 },
                pts: [[100, 300], [200, 300], [300, 300]], lp: [200, 280], la: 'middle'
            },
            {
                id: 'zan_tarzan', label: 'T1', name: 'Tarzan', type: 'corner',
                desc: 'Iconic banked hairpin — 18-degree banking allows multiple lines',
                speeds: { mercedes: 98, ferrari: 105, mclaren: 95, redbull: 102 },
                pts: [[300, 300], [340, 290], [365, 260], [360, 225], [335, 205]], lp: [405, 260], la: 'start'
            },
            {
                id: 'zan_hug', label: 'T3', name: 'Hugenholtz', type: 'corner',
                desc: 'Steeply banked left — key for traction onto the upcoming flat-out section',
                speeds: { mercedes: 115, ferrari: 122, mclaren: 112, redbull: 118 },
                pts: [[335, 205], [300, 195], [260, 200], [235, 225], [230, 260]], lp: [205, 180], la: 'end'
            },
            {
                id: 'zan_scheivlak', label: 'T7', name: 'Scheivlak', type: 'corner',
                desc: 'Fast blind right-hander — high-speed commitment area',
                speeds: { mercedes: 235, ferrari: 228, mclaren: 220, redbull: 232 },
                pts: [[230, 260], [180, 240], [140, 210], [115, 175], [110, 140]], lp: [160, 160], la: 'middle'
            },
            {
                id: 'zan_final', label: 'T14', name: 'Arie Luyendyk', type: 'corner',
                desc: 'Final banked corner — DRS opens mid-corner, taken flat at 260 km/h',
                speeds: { mercedes: 265, ferrari: 258, mclaren: 252, redbull: 262 },
                pts: [[110, 140], [80, 160], [65, 200], [75, 250], [100, 300]], lp: [35, 200], la: 'end'
            },
        ]
    },
    interlagos: {
        name: 'Autódromo José Carlos Pace', country: 'Brazil',
        segments: [
            {
                id: 'int_s1', label: 'S1', name: 'Reta Oposta', type: 'straight',
                desc: 'Back straight — DRS zone 1, uphill run after the Senna S',
                speeds: { mercedes: 320, ferrari: 315, mclaren: 325, redbull: 312 },
                pts: [[100, 100], [200, 100], [300, 100], [400, 100]], lp: [250, 80], la: 'middle'
            },
            {
                id: 'int_senna', label: 'T1-T3', name: 'Senna S', type: 'corner',
                desc: 'Tight downhill complex — legendary first-turn sequence',
                speeds: { mercedes: 105, ferrari: 112, mclaren: 100, redbull: 108 },
                pts: [[400, 100], [440, 110], [465, 140], [460, 180], [430, 210], [380, 220], [330, 210]], lp: [500, 150], la: 'start'
            },
            {
                id: 'int_ferradura', label: 'T6-T7', name: 'Ferradura', type: 'corner',
                desc: 'Long high-speed right-hander — high lateral commitment',
                speeds: { mercedes: 245, ferrari: 238, mclaren: 232, redbull: 242 },
                pts: [[330, 210], [300, 240], [290, 280], [315, 320], [355, 345]], lp: [250, 280], la: 'middle'
            },
            {
                id: 'int_juncao', label: 'T12', name: 'Junção', type: 'corner',
                desc: 'Final slow corner — critical exit for the long climb to the finish line',
                speeds: { mercedes: 122, ferrari: 130, mclaren: 118, redbull: 125 },
                pts: [[355, 345], [320, 360], [280, 365], [240, 355], [210, 335]], lp: [280, 395], la: 'end'
            },
            {
                id: 'int_subida', label: 'S2', name: 'Subida dos Boxes', type: 'straight',
                desc: 'Uphill blast to the line — 310+ km/h, no braking until T1',
                speeds: { mercedes: 312, ferrari: 308, mclaren: 318, redbull: 305 },
                pts: [[210, 335], [160, 280], [120, 220], [100, 160], [100, 100]], lp: [70, 220], la: 'end'
            },
        ]
    },
};
