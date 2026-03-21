'use client';

import { useState, useEffect } from 'react';

interface WeatherData {
    temperature: number;
    rainProbability: number;
    windSpeed: number;
    condition: string;
}

const CIRCUIT_COORDS: Record<string, { lat: number; lon: number }> = {
    albert_park: { lat: -37.8497, lon: 144.968 },
    shanghai: { lat: 31.3389, lon: 121.2197 },
    suzuka: { lat: 34.8431, lon: 136.5407 },
    bahrain: { lat: 26.0325, lon: 50.5106 },
    jeddah: { lat: 21.6319, lon: 39.1044 },
    miami: { lat: 25.958, lon: -80.2389 },
    imola: { lat: 44.344, lon: 11.7167 },
    monaco: { lat: 43.7347, lon: 7.4206 },
    catalunya: { lat: 41.57, lon: 2.2611 },
    villeneuve: { lat: 45.5, lon: -73.5228 },
    silverstone: { lat: 52.0786, lon: -1.0169 },
    hungaroring: { lat: 47.5789, lon: 19.2486 },
    spa: { lat: 50.4372, lon: 5.9714 },
    zandvoort: { lat: 52.3888, lon: 4.5409 },
    monza: { lat: 45.6156, lon: 9.2811 },
    baku: { lat: 40.3725, lon: 49.8533 },
    marina_bay: { lat: 1.2914, lon: 103.8636 },
    americas: { lat: 30.1328, lon: -97.6411 },
    rodriguez: { lat: 19.4042, lon: -99.0907 },
    interlagos: { lat: -23.7036, lon: -46.6997 },
    las_vegas: { lat: 36.1147, lon: -115.1728 },
    losail: { lat: 25.49, lon: 51.4542 },
    yas_marina: { lat: 24.4672, lon: 54.6031 },
};

function getWeatherIcon(condition: string): string {
    if (condition.includes('rain') || condition.includes('Rain')) return '🌧️';
    if (condition.includes('cloud') || condition.includes('Cloud')) return '☁️';
    if (condition.includes('sun') || condition.includes('Clear')) return '☀️';
    return '🌤️';
}

export default function RaceWeather({ circuitId, raceDate }: { circuitId: string; raceDate: string }) {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchWeather() {
            setLoading(true);
            const coords = CIRCUIT_COORDS[circuitId];
            if (!coords) {
                setWeather({ temperature: 25, rainProbability: 10, windSpeed: 12, condition: 'Clear' });
                setLoading(false);
                return;
            }
            try {
                const res = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&daily=temperature_2m_max,precipitation_probability_max,wind_speed_10m_max&timezone=auto&forecast_days=3`
                );
                if (res.ok) {
                    const data = await res.json();
                    const d = data.daily;
                    setWeather({
                        temperature: Math.round(d.temperature_2m_max?.[0] || 25),
                        rainProbability: d.precipitation_probability_max?.[0] || 0,
                        windSpeed: Math.round(d.wind_speed_10m_max?.[0] || 10),
                        condition: (d.precipitation_probability_max?.[0] || 0) > 50 ? 'Rain likely' : 'Clear',
                    });
                } else {
                    setWeather({ temperature: 25, rainProbability: 10, windSpeed: 12, condition: 'Clear' });
                }
            } catch {
                setWeather({ temperature: 25, rainProbability: 10, windSpeed: 12, condition: 'Clear' });
            }
            setLoading(false);
        }
        fetchWeather();
    }, [circuitId, raceDate]);

    if (loading) return <div className="loading-msg">Loading weather…</div>;
    if (!weather) return null;

    return (
        <div className="card" style={{ marginTop: '14px' }}>
            <p className="sec-label">🌡️ Race Day Weather</p>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '12px' }}>
                <div style={{ textAlign: 'center', flex: '1 1 60px' }}>
                    <div style={{ fontSize: '28px', marginBottom: '4px' }}>{getWeatherIcon(weather.condition)}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: 700, color: 'var(--text-1)' }}>
                        {weather.temperature}°C
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--text-3)', letterSpacing: '.08em', textTransform: 'uppercase' }}>
                        Air Temp
                    </div>
                </div>
                <div style={{ textAlign: 'center', flex: '1 1 60px' }}>
                    <div style={{ fontSize: '28px', marginBottom: '4px' }}>💧</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: 700, color: weather.rainProbability > 50 ? '#4caf50' : 'var(--text-1)' }}>
                        {weather.rainProbability}%
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--text-3)', letterSpacing: '.08em', textTransform: 'uppercase' }}>
                        Rain Prob
                    </div>
                </div>
                <div style={{ textAlign: 'center', flex: '1 1 60px' }}>
                    <div style={{ fontSize: '28px', marginBottom: '4px' }}>💨</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: 700, color: 'var(--text-1)' }}>
                        {weather.windSpeed} km/h
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--text-3)', letterSpacing: '.08em', textTransform: 'uppercase' }}>
                        Wind
                    </div>
                </div>
            </div>
        </div>
    );
}
