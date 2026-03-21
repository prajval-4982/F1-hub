/* app/api/f1/[...slug]/route.ts — Proxy to Jolpica API (avoids CORS, adds server cache) */
import { NextRequest, NextResponse } from 'next/server';

const UPSTREAM = 'https://api.jolpi.ca/ergast/f1';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string[] }> }
) {
    const { slug } = await params;
    const path = slug.join('/');
    const qs = request.nextUrl.search; // preserve ?limit=100 etc.
    const url = `${UPSTREAM}/${path}${qs}`;

    try {
        const upstream = await fetch(url, { next: { revalidate: 300 } }); // 5-min cache
        if (!upstream.ok) {
            return NextResponse.json(
                { error: `Upstream ${upstream.status}` },
                { status: upstream.status }
            );
        }
        const json = await upstream.json();
        return NextResponse.json(json);
    } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        return NextResponse.json({ error: msg }, { status: 502 });
    }
}
