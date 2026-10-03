import React, { useRef, useState, useEffect, useCallback } from 'react';
import './VideoLoader.css';
import LoadPage from './LoadPage';


interface VideoLoaderProps {
  src: string;
  onComplete?: () => void;
  fadeDuration?: number;
  maxDuration?: number;
  isMobile?: boolean;
}

type Phase = 'buffering' | 'playing' | 'fading' | 'done';

export const VideoLoader: React.FC<VideoLoaderProps> = ({
  src,
  onComplete,
  fadeDuration = 900,
  maxDuration = 12000,
  isMobile = false,
}) => {

  if (isMobile) {
    return (
      <LoadPage
        onComplete={onComplete}
        fadeDuration={fadeDuration}
        maxDuration={maxDuration > 6000 ? 5000 : maxDuration}
        isMobile={true}
      />
    );
  }

  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<Phase>('buffering');
  const [progress, setProgress] = useState(0);
  const [videoOpacity, setVideoOpacity] = useState(1);

  /** How many seconds before the end the fade should start */
  const FADE_ZONE_S = 1.5;
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  /** Trigger the fade-out → done sequence */
  const finish = useCallback(() => {
    setPhase('fading');
    const t = setTimeout(() => {
      setPhase('done');
      onCompleteRef.current?.();
    }, fadeDuration);
    return () => clearTimeout(t);
  }, [fadeDuration]);

  useEffect(() => {
    // Respect prefers-reduced-motion: skip straight to done
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('done');
      onCompleteRef.current?.();
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    let hardTimeout: ReturnType<typeof setTimeout>;

    const onCanPlay = () => setPhase('playing');

    const onTimeUpdate = () => {
      if (video.duration && video.duration > 0) {
        setProgress(Math.min(100, Math.round((video.currentTime / video.duration) * 100)));

        // Fade out video opacity in the last FADE_ZONE_S seconds
        const remaining = video.duration - video.currentTime;
        if (remaining < FADE_ZONE_S) {
          setVideoOpacity(Math.max(0, remaining / FADE_ZONE_S));
        }
      }
    };

    const onEnded = () => finish();

    const onError = () => {
      // If video fails for any reason, skip to site immediately
      setPhase('done');
      onCompleteRef.current?.();
    };

    video.addEventListener('canplay', onCanPlay);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('ended', onEnded);
    video.addEventListener('error', onError);

    // Hard cap: never block the site more than maxDuration ms
    hardTimeout = setTimeout(() => finish(), maxDuration);

    return () => {
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('ended', onEnded);
      video.removeEventListener('error', onError);
      clearTimeout(hardTimeout);
    };
  }, [finish, maxDuration]);

  if (phase === 'done') return null;

  return (
    <div className={`vl-root${phase === 'fading' ? ' vl-fading' : ''}`}>
            {/* ── Video element ─────────────────────────────────────────── */}
      <video
        ref={videoRef}
        className="vl-video"
        src={src}
        autoPlay
        muted
        playsInline
        preload="auto"
        style={{ opacity: videoOpacity, transition: 'opacity 0.1s linear',objectFit: isMobile ? 'fill' : 'cover' }}
      />

      {/* ── Spinner while buffering ────────────────────────────────── */}
      {phase === 'buffering' && (
        <div className="vl-fallback-spinner">
          <div className="vl-fallback-ring" />
        </div>
      )}

      {/* ── Corner reticles ───────────────────────────────────────── */}
       <div className="vl-corner vl-corner-tl" />
       <div className="vl-corner vl-corner-tr" />
       <div className="vl-corner vl-corner-bl" />
      <div className="vl-corner vl-corner-br" />

      {/* ── Bottom status strip ───────────────────────────────────── */}
      <div className="vl-status">
        <div className="vl-status-bar">
          <div className="vl-status-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="vl-status-text">
          {phase === 'buffering' ? 'INITIALIZING...' : `HACKZ'26 // LOADING`}
        </span>
      </div>
    </div>
  );
};

export default VideoLoader;
