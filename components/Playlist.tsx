'use client';

import { useState, useRef } from 'react';
import { PlaylistItem } from '@/types/types';
import SearchBar from './SearchBar';

interface PlaylistProps {
    items: PlaylistItem[];
    onItemSelect: (item: PlaylistItem) => void;
}

export default function Playlist({ items, onItemSelect }: PlaylistProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
    const [heights, setHeights] = useState<{ [key: string]: number }>({});
    const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    const filteredItems = items.filter(item =>
        item.tvgName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 对项目进行分组
    const groupedItems = filteredItems.reduce((groups: { [key: string]: PlaylistItem[] }, item) => {
        const groupName = item.tvgName || 'Ungrouped';
        if (!groups[groupName]) {
            groups[groupName] = [];
        }
        groups[groupName].push(item);
        return groups;
    }, {});

    const toggleGroup = (groupName: string) => {
        if (!expandedGroups.includes(groupName)) {
            // 展开时立即测量内容高度
            const height = contentRefs.current[groupName]?.scrollHeight || 0;
            setHeights(prev => ({ ...prev, [groupName]: height }));
        }
        setExpandedGroups(prev =>
            prev.includes(groupName)
                ? prev.filter(name => name !== groupName)
                : [...prev, groupName]
        );
    };

    return (
        <div className="h-[calc(100vh-3rem)] py-1 bg-gray-50 px-4 overflow-y-auto scrollbar-hide">
            <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
            />

            {Object.keys(groupedItems).length === 0 && (
                <div className="flex items-center text-gray-500 mt-4">
                    No channel found
                </div>
            )}

            <div className="flex flex-col">
                {Object.entries(groupedItems).map(([groupName, groupItems]) => (
                    <div key={groupName} className="border-b border-gray-200">
                        <div
                            className="flex items-center p-3 cursor-pointer hover:bg-gray-100"
                            onClick={() => toggleGroup(groupName)}
                        >
                            <span className="flex-1 font-medium">{groupName}</span>
                            <span className="text-gray-500 transition-transform duration-300"
                                style={{
                                    transform: expandedGroups.includes(groupName)
                                        ? 'rotate(180deg)'
                                        : 'rotate(90deg)'
                                }}>
                                ▶
                            </span>
                        </div>
                        <div
                            ref={(el: HTMLDivElement | null) => {
                                if (el) contentRefs.current[groupName] = el;
                            }}
                            className="pl-4 overflow-hidden transition-[height] duration-300 ease-in-out"
                            style={{
                                height: expandedGroups.includes(groupName)
                                    ? `${heights[groupName]}px`
                                    : '0px'
                            }}
                        >
                            {groupItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex flex-row justify-between gap-2 h-24 p-3 cursor-pointer hover:shadow-lg transition-shadow duration-300"
                                    onClick={() => onItemSelect(item)}
                                >
                                    <span className="text-ellipsis overflow-hidden">
                                        {item.name || item.tvgName || `Stream ${index + 1}`}
                                    </span>
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
                ))}
            </div>
        </div>
    );
} 