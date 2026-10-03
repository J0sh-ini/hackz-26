import React, { useRef, useState, useEffect, useCallback } from 'react';
import './VideoLoader.css';
import LoadPage from './LoadPage';
// import TerminalSimulator from '../ambient/TerminalSimulator';

// const TOP_TERMINAL_LOGS = [
//   "> INITIALIZING HACKZ'26 CORE SYSTEM...",
//   "> KERNEL: Linux 6.8.0-hackz-v26 x86_64",
//   "> MOUNTING VIRTUAL FILESYSTEMS...",
//   "> [OK] Mounted /dev/nvme0n1p1 on /boot",
//   "> [OK] Started Network Time Synchronization",
//   "> LOADING NEURAL MESH INTERFACE...",
//   "> CONNECTING TO QUANTUM NODE #0492...",
//   "> SECURE HANDSHAKE ESTABLISHED [256-BIT CHACHA20]",
//   "> ALLOCATING MEMORY BUFFERS: 64GB HEAP OK",
//   "> COMPILING SHADERS: WebGL2 / Vulkan Backend...",
//   "> INTEGRITY CHECK: PASS (0 ERRORS, 0 WARNINGS)",
//   "> INITIATING MATRIX SCAN SEQUENCE...",
//   "> FETCHING COMPETITOR TELEMETRY...",
//   "> SYSTEM STATUS: OPTIMAL // READY FOR DEPLOYMENT"
// ];

// const BOTTOM_TERMINAL_LOGS = [
//   "0x0000FF42: 48 89 5c 24 08 48 89 6c 24 10 48 89 74 24 18 57",
//   "0x0000FF52: 48 83 ec 20 41 8b e9 49 8b f8 8c c6 48 8b d9 00",
//   "> DB_PING: 1.2ms [cluster-east-1.hackz.io]",
//   "> AGENT_BUS: Listening on wss://daemon.hackz.org/stream",
//   "> SYNC_STATE: ACTIVE | PACKETS_IN: 142091 | PACKETS_OUT: 98124",
//   "> MEM_USAGE: [██████████████░░░░░░░░] 58.4%",
//   "> CPU_LOAD:  [██████████████████░░░] 74.1%",
//   "> GPU_TEMP:  42°C | FAN_SPEED: 1800 RPM",
//   "> LATENCY: 8ms | BANDWIDTH: 10 Gbps FIBER",
//   "> RECV SIGNAL: 0x994FA1B2 [CIPHER ENCRYPTED]",
//   "> DECRYPTING PACKET STREAM... 100% COMPLETE",
//   "> HACKZ'26 ENGINE RUNTIME: STABLE"
// ];

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
      {/* ── Ambient Terminal Simulators (Top & Bottom behind loader UI) ── */}
      {/* <div className="vl-terminal-wrapper vl-terminal-top">
        <TerminalSimulator lines={TOP_TERMINAL_LOGS} speed={45} loop={true} />
      </div>

      <div className="vl-terminal-wrapper vl-terminal-bottom">
        <TerminalSimulator lines={BOTTOM_TERMINAL_LOGS} speed={65} loop={true} />
      </div> */}

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
