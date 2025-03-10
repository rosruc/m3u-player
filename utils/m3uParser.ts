import { PlaylistItem, ParsedM3U } from '@/types/types';

export function parseM3U(content: string): ParsedM3U {
    const lines = content.split('\n');
    const items: PlaylistItem[] = [];
    let currentItem: PlaylistItem | null = null;
    let billedMsg = '';

    for (let line of lines) {
        line = line.trim();

        if (line.startsWith('#EXTM3U')) {
            const billedMsgMatch = line.match(/billed-msg="([^"]+)"/);
            if (billedMsgMatch) {
                billedMsg = billedMsgMatch[1];
            }
        } else if (line.startsWith('#EXTINF:')) {
            currentItem = {
                name: '',
                tvgName: '',
                tvgLogo: '',
                groupTitle: '',
                source: '',
                key: null
            };

            const name = line.split(',')[1].trim();
            if (name) {
                currentItem.name = name;
            }

            const tvgIdMatch = line.match(/tvg-id="([^"]+)"/);
            if (tvgIdMatch) {
                currentItem.tvgId = tvgIdMatch[1];
            }

            const groupTitleMatch = line.match(/group-title="([^"]+)"/);
            if (groupTitleMatch) {
                currentItem.groupTitle = groupTitleMatch[1];
            }

            const tvgNameMatch = line.match(/tvg-name="([^"]+)"/);
            if (tvgNameMatch) {
                currentItem.tvgName = tvgNameMatch[1];
            } else {
                const lastCommaIndex = line.lastIndexOf(",");
                if (lastCommaIndex !== -1) {
                    currentItem.tvgName = line.substring(lastCommaIndex + 1).trim();
                }
            }

            const tvgLogoMatch = line.match(/tvg-logo="([^"]+)"/);
            if (tvgLogoMatch) {
                currentItem.tvgLogo = convertToHttps(tvgLogoMatch[1]);
            }
        } else if (line.startsWith('#KODIPROP:')) {
            if (currentItem) {
                const keyInfo = extractKey(line);
                if (keyInfo) {
                    if (!currentItem.key) currentItem.key = {};
                    Object.assign(currentItem.key, keyInfo);
                }
            }
        } else if (line.length > 0 && !line.startsWith('#')) {
            if (currentItem) {
                currentItem.source = convertToHttps(line);
                items.push(currentItem);
                currentItem = null;
            }
        }
    }

    return { items, billedMsg };
}

function convertToHttps(url: string): string {
    return url;
    // return url.replace(/^http:/, 'https:');
}

function extractKey(line: string): Record<string, string> | null {
    if (line.includes('inputstream.adaptive.license_type=')) {
        return { license_type: line.split('=')[1].trim() };
    } else if (line.includes('inputstream.adaptive.license_key=')) {
        const keyValue = line.split('=')[1].trim();

        if (keyValue.startsWith('http')) {
            return { license_key: keyValue };
        }

        const keyParts = keyValue.split(':');
        if (keyParts.length === 2) {
            return {
                key_id: keyParts[0],
                key: keyParts[1]
            };
        }

        try {
            const json = JSON.parse(keyValue);
            if (json && json.keys && json.keys.length > 0) {
                return {
                    key_id: base64ToHex(json.keys[0].kid),
                    key: base64ToHex(json.keys[0].k)
                };
            }
        } catch (error) {
            return { raw_key: keyValue };
        }
    }
    return null;
}

function base64ToHex(base64: string): string {
    if (base64.length === 0) return base64;

    const binary = atob(base64);
    let hex = '';
    for (let i = 0; i < binary.length; i++) {
        let char = binary.charCodeAt(i).toString(16);
        hex += (char.length === 1 ? '0' : '') + char;
    }
    return hex;
} 