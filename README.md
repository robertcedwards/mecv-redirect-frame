<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/Zizzamia/a-frame-in-100-lines/blob/main/public/park-4.png">
    <img alt="OnchainKit logo vibes" src="https://github.com/Zizzamia/a-frame-in-100-lines/blob/main/public/park-4.png" width="auto">
  </picture>
</p>

# A Frame in 100 lines (or less)

Farcaster Frames in less than 100 lines, and ready to be deployed to Vercel.

To test a **deployed** Frame, use: https://warpcast.com/~/developers/frames.

To test a **localhost** Frame, use: [Framegear](https://onchainkit.xyz/frame/framegear).
A simple tool that allows you to run and test your frames locally:

- without publishing
- without casting
- without spending warps

And let us know what you build by either mentioning @zizzamia on [Warpcast](https://warpcast.com/zizzamia) or [X](https://twitter.com/Zizzamia).

<br />

Have fun! ⛵️

<br />

## App Routing files

- app/
  - [config.ts](https://github.com/Zizzamia/a-frame-in-100-lines?tab=readme-ov-file#appconfigts)
  - [layout.tsx](https://github.com/Zizzamia/a-frame-in-100-lines?tab=readme-ov-file#applayouttsx)
  - [page.tsx](https://github.com/Zizzamia/a-frame-in-100-lines?tab=readme-ov-file#apppagetsx)
- api/
  - frame/
    - [route.ts](https://github.com/Zizzamia/a-frame-in-100-lines?tab=readme-ov-file#appapiframeroutets)

<br />

### `app/page.tsx`

```tsx
import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Story time',
    },
    {
      action: 'tx',
      label: 'Send Base Sepolia',
      target: `${NEXT_PUBLIC_URL}/api/tx`,
      postUrl: `${NEXT_PUBLIC_URL}/api/tx-success`,
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/park-3.png`,
    aspectRatio: '1:1',
  },
  input: {
    text: 'Tell me a story',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'zizzamia.xyz',
  description: 'LFG',
  openGraph: {
    title: 'zizzamia.xyz',
    description: 'LFG',
    images: [`${NEXT_PUBLIC_URL}/park-1.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>zizzamia.xyz</h1>
    </>
  );
}
```

### `app/layout.tsx`

```tsx
export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### `app/config.ts`

```ts
export const NEXT_PUBLIC_URL = 'https://zizzamia.xyz';
```

### `app/api/frame/route.ts`

```ts
import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';

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

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: `State: ${state?.page || 0}`,
        },
        {
          action: 'link',
          label: 'OnchainKit',
          target: 'https://onchainkit.xyz',
        },
        {
          action: 'post_redirect',
          label: 'Dog pictures',
        },
      ],
      image: {
        src: `${NEXT_PUBLIC_URL}/park-1.png`,
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
```

<br />

## Resources

- [Official Farcaster Frames documentation](https://docs.farcaster.xyz/learn/what-is-farcaster/frames)
- [Official Farcaster Frame specification](https://docs.farcaster.xyz/reference/frames/spec)
- [OnchainKit documentation](https://onchainkit.xyz)

<br />

## Community ☁️ 🌁 ☁️

Check out the following places for more OnchainKit-related content:

- Follow @zizzamia ([X](https://twitter.com/zizzamia), [Farcaster](https://warpcast.com/zizzamia)) for project updates
- Join the discussions on our [OnchainKit warpcast channel](https://warpcast.com/~/channel/onchainkit)

## Authors

- [@zizzamia](https://github.com/zizzamia.png) ([X](https://twitter.com/Zizzamia))
- [@cnasc](https://github.com/cnasc.png) ([warpcast](https://warpcast.com/cnasc))

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details