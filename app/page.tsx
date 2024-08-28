import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Claim mine',
    },
    {
      action: 'mint',
      label: 'Mint mine',
      target: `eip155:8453:0x7a33eb3c8c2e137b7780cb175119ecb78c092448:1`
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/park-3.png`,
    aspectRatio: '1:1',
  },
  input: {
    text: 'Enter Github Username',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'MeCV',
  description: 'LFG',
  openGraph: {
    title: 'MeCV',
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
      <h1>MeCV</h1>
    </>
  );
}
