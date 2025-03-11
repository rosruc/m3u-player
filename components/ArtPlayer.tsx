'use client';

import { useEffect, useRef } from 'react';
import Artplayer from 'artplayer';
import Hls from 'hls.js';
import { PlaylistItem } from '@/types/types';

interface ArtPlayerProps {
    currentVideo: PlaylistItem | null;
}

export default function ArtPlayer({ currentVideo }: ArtPlayerProps) {
    const artRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<Artplayer | null>(null);

    useEffect(() => {
        if (!artRef.current || !currentVideo?.source) return;

        // 销毁之前的播放器实例
        if (playerRef.current) {
            playerRef.current.destroy();
        }

        const initPlayer = async () => {
            try {
                // 创建新的播放器实例
                playerRef.current = new Artplayer({
                    container: artRef.current as HTMLDivElement,
                    url: currentVideo.source,
                    volume: localStorage.getItem('videoVolume')
                        ? parseFloat(localStorage.getItem('videoVolume')!)
                        : 0.5,
                    muted: false,
                    autoplay: true,
                    pip: true,
                    autoSize: true,
                    autoMini: true,
                    screenshot: true,
                    setting: true,
                    playbackRate: true,
                    aspectRatio: true,
                    fullscreen: true,
                    fullscreenWeb: true,
                    subtitleOffset: true,
                    miniProgressBar: true,
                    mutex: true,
                    backdrop: true,
                    playsInline: true,
                    lock: true,
                    fastForward: true,
                    theme: '#23ade5',
                    customType: {
                        m3u8: function (video: HTMLVideoElement, url: string) {
                            if (Hls.isSupported()) {
                                const hls = new Hls();
                                hls.loadSource(url);
                                hls.attachMedia(video);

                                // 清理函数
                                playerRef.current?.on('destroy', () => {
                                    hls.destroy();
                                });
                            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                                video.src = url;
                            } else {
                                console.log('您的浏览器不支持 m3u8 播放');
                            }
                        },
                    },
                });
            } catch (error) {
                console.error('Error initializing Artplayer:', error);
            }
        };

        initPlayer();

        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
            }
        };
    }, [currentVideo]);

    if (!currentVideo) return null;

    return <div ref={artRef} className="w-full aspect-video" />;
} 