import { NextRequest, NextResponse } from 'next/server';
import { ImageResponse } from '@vercel/og';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title');
    const description = searchParams.get('description');
    const img = searchParams.get('img');

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            padding: '40px',
            background: 'linear-gradient(135deg, #06b6d4 10%, #3813c2 100%)',
          }}
        >
          <img
            src={
              img
                ? decodeURIComponent(img)
                : 'https://nuflakbrr.github.io/static/favicons/android-chrome-512x512.png'
            }
            alt={title || 'Naufal Akbar Nugroho'}
            width={200}
            height={200}
            style={{
              objectFit: 'contain',
            }}
            tw="rounded-full"
          />
          <h1 tw="mt-8 text-6xl font-bold text-white">
            {title ? title : 'Naufal Akbar Nugroho'}
          </h1>
          <p tw="max-w-3xl text-2xl font-normal text-center text-white">
            {description
              ? description
              : 'Saya bersemangat membuat kontribusi untuk memberikan pengetahuan teknologi kepada semua orang!'}
          </p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (error) {
    return NextResponse.json(
      { success: 0, message: 'Internal server error!' },
      { status: 500 },
    );
  }
}
