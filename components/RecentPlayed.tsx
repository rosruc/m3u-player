'use client';

import { useEffect, useState } from 'react';
import { PlaylistItem } from '@/types/types';

interface RecentPlayedProps {
    onItemSelect: (item: PlaylistItem) => void;
}

export default function RecentPlayed({ onItemSelect }: RecentPlayedProps) {
    const [recentItems, setRecentItems] = useState<PlaylistItem[]>([]);

    useEffect(() => {
        loadRecentPlayed();
    }, []);

    const loadRecentPlayed = () => {
        const saved = localStorage.getItem('recentPlayed');
        if (saved) {
            setRecentItems(JSON.parse(saved));
        }
    };

    if (recentItems.length === 0) {
        return null;
    }

    return (
        <div>
            <div className="text-lg font-medium">Continue Watching</div>
            <div className="flex overflow-x-auto bg-black/5 p-3 rounded-xl mt-2 mb-3">
                {recentItems.map((item, index) => (
                    <div
                        key={item.tvgId || index}
                        className="flex flex-col p-3 cursor-pointer hover:shadow-lg transition-shadow duration-300"
                        onClick={() => onItemSelect(item)}
                    >
                        <span>{item.tvgName}</span>
                        {item.tvgLogo && (
                            <img
                                src={item.tvgLogo}
                                alt={item.tvgName}
                                className="w-24 h-auto"
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
} 