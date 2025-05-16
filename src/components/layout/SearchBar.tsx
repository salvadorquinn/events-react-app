import { Search } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="mb-8 max-w-md mx-auto bg-white/10 px-4 py-2 rounded-lg flex items-center">
      <Search size={18} className="mr-2" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name, year, branch, country..."
        className="bg-transparent outline-none w-full placeholder-white/70 text-white"
      />
    </div>
  );
}