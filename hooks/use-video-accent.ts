import { type RefObject, useEffect, useState } from "react";

type Rgb = {
  r: number;
  g: number;
  b: number;
};

type UseVideoAccentOptions = {
  defaultAccent?: string;
  defaultContrastColor?: string;
  sampleInterval?: number;
};

const SAMPLE_SIZE = 24;
const SAMPLE_STEP = 16;
const BUCKET_STEP = 32;
const MIN_ALPHA = 160;

function clampChannel(value: number) {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function toRgbString(color: Rgb) {
  return `${color.r},${color.g},${color.b}`;
}

function toBucket(value: number) {
  return clampChannel(Math.round(value / BUCKET_STEP) * BUCKET_STEP);
}

function getLuminance(color: Rgb) {
  return 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;
}

function getDistance(a: Rgb, b: Rgb) {
  return Math.sqrt(
    (a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2,
  );
}

function getFallbackContrast(color: Rgb): Rgb {
  return getLuminance(color) > 160
    ? { r: 17, g: 24, b: 39 }
    : { r: 255, g: 255, b: 255 };
}

function extractPalette(data: Uint8ClampedArray) {
  const buckets = new Map<
    string,
    { count: number; red: number; green: number; blue: number }
  >();

  for (let index = 0; index < data.length; index += SAMPLE_STEP) {
    const alpha = data[index + 3];
    if (alpha < MIN_ALPHA) {
      continue;
    }

    const red = data[index];
    const green = data[index + 1];
    const blue = data[index + 2];
    const key = `${toBucket(red)}-${toBucket(green)}-${toBucket(blue)}`;
    const existing = buckets.get(key) ?? {
      count: 0,
      red: 0,
      green: 0,
      blue: 0,
    };

    existing.count += 1;
    existing.red += red;
    existing.green += green;
    existing.blue += blue;

    buckets.set(key, existing);
  }

  const colors = Array.from(buckets.values())
    .map((bucket) => ({
      count: bucket.count,
      color: {
        r: clampChannel(bucket.red / bucket.count),
        g: clampChannel(bucket.green / bucket.count),
        b: clampChannel(bucket.blue / bucket.count),
      },
    }))
    .sort((left, right) => right.count - left.count);

  if (colors.length === 0) {
    return null;
  }

  const accentSamples = colors.slice(0, Math.min(3, colors.length));
  const totalWeight = accentSamples.reduce((sum, sample) => sum + sample.count, 0);
  const accent = accentSamples.reduce(
    (sum, sample) => ({
      r: sum.r + sample.color.r * sample.count,
      g: sum.g + sample.color.g * sample.count,
      b: sum.b + sample.color.b * sample.count,
    }),
    { r: 0, g: 0, b: 0 },
  );
  const dominant = {
    r: clampChannel(accent.r / totalWeight),
    g: clampChannel(accent.g / totalWeight),
    b: clampChannel(accent.b / totalWeight),
  };

  const contrastCandidate = colors.reduce((best, sample) => {
    const bestScore =
      getDistance(dominant, best.color) +
      Math.abs(getLuminance(dominant) - getLuminance(best.color)) * 0.8;
    const sampleScore =
      getDistance(dominant, sample.color) +
      Math.abs(getLuminance(dominant) - getLuminance(sample.color)) * 0.8;

    return sampleScore > bestScore ? sample : best;
  }, colors[0]);

  return {
    accent: dominant,
    contrast:
      getDistance(dominant, contrastCandidate.color) < 90
        ? getFallbackContrast(dominant)
        : contrastCandidate.color,
  };
}

export function useVideoAccent(
  videoRef: RefObject<HTMLVideoElement | null>,
  {
    defaultAccent = "10,10,10",
    defaultContrastColor = "255,255,255",
    sampleInterval = 600,
  }: UseVideoAccentOptions = {},
) {
  const [accent, setAccent] = useState(defaultAccent);
  const [contrastColor, setContrastColor] = useState(defaultContrastColor);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = SAMPLE_SIZE;
    canvas.height = SAMPLE_SIZE;

    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) {
      return;
    }

    let intervalId: number | null = null;

    const stopSampling = () => {
      if (intervalId !== null) {
        window.clearInterval(intervalId);
        intervalId = null;
      }
    };

    const sampleFrame = () => {
      const currentVideo = videoRef.current;
      if (
        !currentVideo ||
        currentVideo.readyState < 2 ||
        currentVideo.videoWidth === 0 ||
        currentVideo.videoHeight === 0
      ) {
        return;
      }

      try {
        context.drawImage(currentVideo, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
        const imageData = context.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
        const palette = extractPalette(imageData.data);

        if (!palette) {
          return;
        }

        const nextAccent = toRgbString(palette.accent);
        const nextContrast = toRgbString(palette.contrast);

        setAccent((current) =>
          current === nextAccent ? current : nextAccent,
        );
        setContrastColor((current) =>
          current === nextContrast ? current : nextContrast,
        );
      } catch {
        stopSampling();
      }
    };

    const startSampling = () => {
      sampleFrame();
      if (intervalId === null) {
        intervalId = window.setInterval(sampleFrame, sampleInterval);
      }
    };

    const handlePlay = () => startSampling();
    const handlePause = () => stopSampling();
    const handleLoadedData = () => startSampling();
    const handleSeeked = () => sampleFrame();

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("seeked", handleSeeked);

    if (video.readyState >= 2) {
      startSampling();
    }

    return () => {
      stopSampling();
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("seeked", handleSeeked);
    };
  }, [defaultAccent, defaultContrastColor, sampleInterval, videoRef]);

  return { accent, contrastColor };
}