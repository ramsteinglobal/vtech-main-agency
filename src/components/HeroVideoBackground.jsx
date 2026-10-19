import { useEffect, useRef } from 'react';

const STREAM_URL = 'https://stream.mux.com/UPLwXPEouIr01DS8MFLe5Ct02VRDkvCG00s.m3u8';
const POSTER_URL = 'https://image.mux.com/UPLwXPEouIr01DS8MFLe5Ct02VRDkvCG00s/thumbnail.jpg?time=0';

export default function HeroVideoBackground() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    let hls;
    let cancelled = false;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.loop = true;
    video.setAttribute('muted', '');

    const startPlayback = () => {
      if (cancelled) return;
      video.play().catch((error) => {
        console.warn('Hero background autoplay was blocked by the browser.', error);
      });
    };
    ['canplay', 'loadeddata'].forEach((eventName) => video.addEventListener(eventName, startPlayback));

    const setupStream = async () => {
      const { default: Hls } = await import('hls.js');
      if (cancelled) return;

      if (Hls.isSupported()) {
        hls = new Hls({ enableWorker: true, lowLatencyMode: true, maxBufferLength: 15 });
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          hls.autoLevelCapping = Math.min(2, hls.levels.length - 1);
          startPlayback();
        });
        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (!data.fatal) return;
          console.error('Hero background HLS playback error.', data);
          if (data.type === Hls.ErrorTypes.MEDIA_ERROR) hls.recoverMediaError();
          else if (data.type === Hls.ErrorTypes.NETWORK_ERROR) hls.startLoad();
        });
        hls.on(Hls.Events.MEDIA_ATTACHED, () => hls.loadSource(STREAM_URL));
        hls.attachMedia(video);
        return;
      }

      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.addEventListener('loadedmetadata', startPlayback);
        video.src = STREAM_URL;
        video.load();
        return;
      }

      console.error('This browser cannot play HLS video.');
    };

    setupStream().catch((error) => {
      console.error('Hero background HLS setup failed.', error);
    });

    return () => {
      cancelled = true;
      video.removeEventListener('loadedmetadata', startPlayback);
      ['canplay', 'loadeddata'].forEach((eventName) => video.removeEventListener(eventName, startPlayback));
      hls?.destroy();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 z-0 h-full w-full object-cover object-center opacity-100"
      autoPlay
      muted
      playsInline
      preload="auto"
      poster={POSTER_URL}
      aria-hidden="true"
    />
  );
}