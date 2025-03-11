'use client';

import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { PlaylistItem } from '@/types/types';

interface VideoPlayerProps {
    currentVideo: PlaylistItem | null;
}

export default function VideoPlayer({ currentVideo }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<Hls | null>(null);

    useEffect(() => {
        if (!videoRef.current || !currentVideo?.source) return;

        const initPlayer = async () => {
            // 清理现有的 HLS 实例
            if (hlsRef.current) {
                hlsRef.current.destroy();
            }

            // 检查浏览器是否支持 HLS
            if (Hls.isSupported()) {
                try {
                    const hls = new Hls();
                    hlsRef.current = hls;

                    hls.loadSource(currentVideo.source);
                    hls.attachMedia(videoRef.current as HTMLMediaElement);

                    hls.on(Hls.Events.MANIFEST_PARSED, () => {
                        videoRef.current?.play();
                    });

                    hls.on(Hls.Events.ERROR, (event, data) => {
                        console.error('HLS error:', data);
                    });
                } catch (error) {
                    console.error('Error initializing HLS:', error);
                }
            } else if (videoRef.current?.canPlayType('application/vnd.apple.mpegurl')) {
                // 对于原生支持 HLS 的浏览器（如 Safari）
                videoRef.current.src = currentVideo.source;
            }
        };

        initPlayer();

        return () => {
            if (hlsRef.current) {
                hlsRef.current.destroy();
            }
        };
    }, [currentVideo]);

    if (!currentVideo) return null;

    return (
        <video
            ref={videoRef}
            controls
            autoPlay
            className="w-full"
            controlsList="nodownload"
            playsInline
            muted={false}
        />
    );
} 