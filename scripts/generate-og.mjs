import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load font
const fontPath = path.join(__dirname, '../node_modules/@fontsource/noto-serif/files/noto-serif-latin-400-normal.woff');
const fontBoldPath = path.join(__dirname, '../node_modules/@fontsource/noto-serif/files/noto-serif-latin-500-normal.woff');

const fontData = fs.readFileSync(fontPath);
const fontBoldData = fs.readFileSync(fontBoldPath);

const svg = await satori(
  {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        backgroundColor: '#faf9f6',
        fontFamily: 'Noto Serif',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#4a4a4a',
              marginBottom: '24px',
            },
            children: '[FOCUS/AI]',
          },
        },
        {
          type: 'h1',
          props: {
            style: {
              fontSize: '64px',
              fontWeight: 500,
              color: '#161616',
              marginBottom: '32px',
              lineHeight: 1.1,
            },
            children: 'Distill The Signal From The Noise',
          },
        },
        {
          type: 'p',
          props: {
            style: {
              fontSize: '24px',
              color: '#4a4a4a',
              lineHeight: 1.5,
              maxWidth: '900px',
            },
            children: 'AI is moving fast—and it can feel overwhelming to know where to start. Whether you\'re modernizing a legacy system, building something new, or figuring out your first step, we help you cut through the noise. We\'re an AI-first engineering and design studio that builds what matters and teaches you along the way.',
          },
        },
      ],
    },
  },
  {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Noto Serif',
        data: fontData,
        weight: 400,
        style: 'normal',
      },
      {
        name: 'Noto Serif',
        data: fontBoldData,
        weight: 500,
        style: 'normal',
      },
    ],
  }
);

const resvg = new Resvg(svg, {
  fitTo: {
    mode: 'width',
    value: 1200,
  },
});

const pngData = resvg.render();
const pngBuffer = pngData.asPng();

const outputPath = path.join(__dirname, '../public/og.png');
fs.writeFileSync(outputPath, pngBuffer);

console.log('✓ Generated og.png at public/og.png');
