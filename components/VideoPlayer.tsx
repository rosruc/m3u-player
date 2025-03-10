'use client';

import { useEffect, useRef } from 'react';
// import shaka from 'shaka-player';
import shaka from 'shaka-player/dist/shaka-player.compiled';
import { PlaylistItem } from '@/types/types';

interface VideoPlayerProps {
    currentVideo: PlaylistItem | null;
}

export default function VideoPlayer({ currentVideo }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const playerRef = useRef<shaka.Player | null>(null);

    useEffect(() => {
        if (!videoRef.current) return;

        const initPlayer = async () => {
            if (playerRef.current) {
                await playerRef.current.destroy();
            }

            try {
                playerRef.current = new shaka.Player(videoRef.current);

                if (currentVideo?.key) {
                    const { key } = currentVideo;
                    if (key.license_type === 'clearkey' && key.license_key) {
                        playerRef.current.configure({
                            drm: {
                                servers: {
                                    'org.w3.clearkey': key.license_key
                                }
                            }
                        });
                    } else if (key.key_id && key.key) {
                        playerRef.current.configure({
                            drm: {
                                clearKeys: {
                                    [key.key_id]: key.key
                                }
                            }
                        });
                    }
                }

                if (currentVideo?.source) {
                    await playerRef.current.load(currentVideo.source);
                }
            } catch (error) {
                console.error('Error initializing player:', error);
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

    return (
        <video
            ref={videoRef}
            controls
            autoPlay
            className="w-full"
        />
    );
} 