'use client';

import { useState } from 'react';
import { PlaylistItem } from '@/types/types';
import SearchBar from './SearchBar';

interface PlaylistProps {
    items: PlaylistItem[];
    onItemSelect: (item: PlaylistItem) => void;
}

export default function Playlist({ items, onItemSelect }: PlaylistProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = items.filter(item =>
        item.tvgName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="h-full bg-gray-50 p-4 overflow-y-auto">
            <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
            />

            {filteredItems.length === 0 && (
                <div className="flex items-center text-gray-500 mt-4">
                    No channel found
                </div>
            )}

            <div className="flex flex-wrap md:flex-col">
                {filteredItems.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-row justify-between gap-2 h-24 p-3 cursor-pointer hover:shadow-lg transition-shadow duration-300"
                        onClick={() => onItemSelect(item)}
                    >
                        <span className="text-ellipsis overflow-hidden">{item.name || item.tvgName || `Stream ${index + 1}`}</span>
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