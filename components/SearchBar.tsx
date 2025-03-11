interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <input
            type="text"
            className="w-full sticky top-0 bg-white px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search Channel"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
} 