'use client';

import { useState, useEffect } from 'react';
import { parseM3U } from '@/utils/m3uParser';
import { PlaylistItem } from '@/types/types';

interface M3uUrlInputProps {
    setPlaylistItems: (items: PlaylistItem[]) => void;
    setBilledMsg: (msg: string) => void;
}

export default function M3uUrlInput({ setPlaylistItems, setBilledMsg }: M3uUrlInputProps) {
    const [url, setUrl] = useState('');

    useEffect(() => {
        const savedUrl = localStorage.getItem('m3uPlaylistURL');
        if (savedUrl) {
            setUrl(savedUrl);
            loadPlaylist(savedUrl);
        }
    }, []);

    const loadPlaylist = async (playlistUrl: string) => {
        try {
            const response = await fetch(playlistUrl);
            const data = await response.text();
            const { items, billedMsg } = parseM3U(data);
            setPlaylistItems(items);
            setBilledMsg(billedMsg);
            localStorage.setItem('m3uPlaylistURL', playlistUrl);
        } catch (error) {
            console.error('Error loading playlist:', error);
        }
    };

    return (
        <div className="flex my-3">
            <input
                type="text"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter M3U URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => loadPlaylist(url)}
            >
                Go
            </button>
        </div>
    );
} 