import React from 'react';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-wasm';
export async function generateImage(text: string): Promise<Buffer> {
  const svg = await satori(
    React.createElement(
      'div',
      {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '1200px',
          height: '630px',
          backgroundColor: 'white',
        },
      },
      React.createElement('h1', {
        style: {
          fontSize: '48px',
          color: 'black',
        },
        children: `Hello`,
      })
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Arial',
          data: await fetch('https://example.com/arial.ttf').then((res) => res.arrayBuffer()),
          weight: 400,
          style: 'normal',
        },
      ],
    }
  );

  const resvg = new Resvg(svg);
  const pngData = resvg.render().asPng();
  return Buffer.from(pngData);
}