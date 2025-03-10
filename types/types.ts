export interface PlaylistItem {
    name: string;
    tvgName: string;
    tvgLogo: string;
    tvgId?: string;
    groupTitle: string;
    source: string;
    key: {
        license_type?: string;
        license_key?: string;
        key_id?: string;
        key?: string;
        raw_key?: string;
    } | null;
}

export interface ParsedM3U {
    items: PlaylistItem[];
    billedMsg: string;
} 