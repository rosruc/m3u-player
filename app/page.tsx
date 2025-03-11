'use client';

import { useState } from 'react';
import VideoPlayer from '@/components/VideoPlayer';
import DVideoPlayer from '@/components/DVideoPlayer';
import Playlist from '@/components/Playlist';
import M3uUrlInput from '@/components/M3uUrlInput';
import RecentPlayed from '@/components/RecentPlayed';
import { PlaylistItem } from '@/types/types';
import ArtPlayer from '@/components/ArtPlayer';
import PlyrVideoPlayer from '@/components/PlyrVideoPlayer';

export default function Home() {
    const [playlistItems, setPlaylistItems] = useState<PlaylistItem[]>([]);
    const [billedMsg, setBilledMsg] = useState<string>('');
    const [currentVideo, setCurrentVideo] = useState<PlaylistItem | null>(null);
    const [playerType, setPlayerType] = useState<'hls' | 'artplayer' | 'plyr'>('hls');

    return (
        <div className="h-full w-full">
            <div className="flex flex-col md:flex-row h-full justify-center">
                <div className="md:w-1/5 md:order-1 overflow-y-auto scrollbar-hide">
                    <M3uUrlInput
                        setPlaylistItems={setPlaylistItems}
                        setBilledMsg={setBilledMsg}
                    />
                    <Playlist
                        items={playlistItems}
                        onItemSelect={setCurrentVideo}
                    />
                </div>

                <div className="flex flex-col flex-1">
                    <div className="order-2 md:order-1 py-3 px-2">
                        <div className="flex items-center justify-between">
                            <div className="text-xl font-semibold">
                                {currentVideo && (
                                    currentVideo.name || currentVideo.tvgName || 'Untitled Stream'
                                )}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    className={`px-4 py-2 rounded ${playerType === 'hls' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                    onClick={() => setPlayerType('hls')}
                                >
                                    HLS
                                </button>
                                <button
                                    className={`px-4 py-2 rounded ${playerType === 'artplayer' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                    onClick={() => setPlayerType('artplayer')}
                                >
                                    ArtPlayer
                                </button>
                                <button
                                    className={`px-4 py-2 rounded ${playerType === 'plyr' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                    onClick={() => setPlayerType('plyr')}
                                >
                                    Plyr
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 md:order-2">
                        {playerType === 'hls' ? (
                            <VideoPlayer currentVideo={currentVideo} />
                        ) : playerType === 'artplayer' ? (
                            <ArtPlayer currentVideo={currentVideo} />
                        ) : playerType === 'plyr' ? (
                            <PlyrVideoPlayer currentVideo={currentVideo} />
                        ) : (
                            <VideoPlayer currentVideo={currentVideo} />
                        )}
                    </div>

                    <div className="order-3 mt-3">
                        <RecentPlayed onItemSelect={setCurrentVideo} />
                    </div>
                </div>
            </div>

            {billedMsg && (
                <div className="fixed bottom-2 right-2 bg-gray-800 text-white px-3 py-1 rounded">
                    {billedMsg}
                </div>
            )}
        </div>
    );
} 