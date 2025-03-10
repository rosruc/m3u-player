'use client';

import { useState } from 'react';
import VideoPlayer from '@/components/VideoPlayer';
import Playlist from '@/components/Playlist';
import M3uUrlInput from '@/components/M3uUrlInput';
import RecentPlayed from '@/components/RecentPlayed';
import { PlaylistItem } from '@/types/types';

export default function Home() {
    const [playlistItems, setPlaylistItems] = useState<PlaylistItem[]>([]);
    const [billedMsg, setBilledMsg] = useState<string>('');
    const [currentVideo, setCurrentVideo] = useState<PlaylistItem | null>(null);

    return (
        <div className="h-full w-full ">
            <div className="flex flex-col md:flex-row h-full justify-center">
                <div className="md:w-1/5 md:order-1">
                    <Playlist
                        items={playlistItems}
                        onItemSelect={setCurrentVideo}
                    />
                </div>

                <div className="md:w-10/12 md:order-2">
                    <div className="flex flex-col space-y-4">
                        <div className="order-2 md:order-1">
                            <M3uUrlInput
                                setPlaylistItems={setPlaylistItems}
                                setBilledMsg={setBilledMsg}
                            />
                        </div>

                        <div className="order-1 md:order-2">
                            <VideoPlayer
                                currentVideo={currentVideo}
                            />
                        </div>

                        <div className="order-3 mt-3">
                            <RecentPlayed
                                onItemSelect={setCurrentVideo}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {billedMsg && (
                <div className="fixed bottom-2 right-2 bg-gray-800 text-white px-3 py-1 rounded">{billedMsg}</div>
            )}
        </div>
    );
} 