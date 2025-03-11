'use client';

import { useEffect, useRef } from 'react';
import Plyr from 'plyr';
import Hls from 'hls.js';
import { PlaylistItem } from '@/types/types';
import 'plyr/dist/plyr.css';

interface PlyrVideoPlayerProps {
    currentVideo: PlaylistItem | null;
}

export default function PlyrVideoPlayer({ currentVideo }: PlyrVideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const plyrInstance = useRef<Plyr>(null);



    useEffect(() => {
        if (!currentVideo?.source || !videoRef.current) return;
        const video = videoRef.current;
        if (!videoRef.current) return;

        // 初始化 Plyr
        plyrInstance.current = new Plyr(videoRef.current);

        // 检查是否支持 HLS
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(currentVideo.source);
            hls.attachMedia(video);
            console.log("HLS支持", video, plyrInstance);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video.play().catch((error) => {
                    console.log("播放失败:", error);
                });
            });
            // 清理函数
            return () => {
                hls.destroy();
            };
        }
        // 对于原生支持 HLS 的浏览器（如 Safari）
        else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = currentVideo.source;
            video.addEventListener('loadedmetadata', () => {
                video.play().catch((error) => {
                    console.log("播放失败:", error);
                });
            });
        }
        return () => {
            plyrInstance.current?.destroy();
        };
    }, [currentVideo]);

    return (
        <div className="plyr-container h-full w-full relative z-30">
            <video
                ref={videoRef}
                // crossOrigin="anonymous"
                className="w-full h-full object-contain"
                controls
                playsInline
            >
                <source src={currentVideo?.source} type="application/x-mpegURL" />
            </video>
        </div>
    );
} 