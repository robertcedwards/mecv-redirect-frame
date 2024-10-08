import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';
import { generateImage } from '../generateImage';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (!isValid) {
    return new NextResponse('Message not valid', { status: 500 });
  }

  const text = message.input || '';
  let state = {
    page: 0,
  };
  try {
    state = JSON.parse(decodeURIComponent(message.state?.serialized));
  } catch (e) {
    console.error(e);
  }

  /**
   * Redirect to a URL with the user's input appended
   */
  if (message?.button === 3) {
    const redirectUrl = `https://mecvapp.netlify.app/user/${encodeURIComponent(text)}`;

    return NextResponse.redirect(redirectUrl, { status: 302 });
  }

  const imageBuffer = await generateImage(encodeURIComponent(text));
  const imageUrl = `data:image/png;base64,${imageBuffer.toString('base64')}`;

  return new NextResponse(

    getFrameHtmlResponse({
      
      buttons: [
        {
          label: `State: ${state?.page || 0}`,
        },
        {
          action: 'link',
          label: 'Mint my Profile Pass ✋',
          target: 'https://farcaster.manifold.xyz/frame/3823839472'
        },
        {
          action: 'link',
          label: 'Claim my Profile',
          target: 'https://mecvapp.netlify.app/user/'+`${encodeURIComponent(text)}`,
        },
  
      ],
      image: {
        src: imageUrl,
      },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
      state: {
        page: state?.page + 1,
        time: new Date().toISOString(),
      },
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';