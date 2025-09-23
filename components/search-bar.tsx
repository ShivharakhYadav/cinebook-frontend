'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  placeholder?: string;
  fetchSuggestions?: (query: string) => Promise<string[]>;
}

export function SearchBar({
  placeholder = 'Search...',
  fetchSuggestions,
}: SearchBarProps) {
  const [value, setValue] = useState('');
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 🔹 Fetch server suggestions
  useEffect(() => {
    if (!query || !fetchSuggestions) {
      setSuggestions([]);
      return;
    }
    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const result = await fetchSuggestions(query);
        setSuggestions(result);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [query, fetchSuggestions]);

  // 🔹 Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (item: string) => {
    setValue(item);
    setQuery('');
    setOpen(false);

    setRecent((prev) => {
      const newList = [item, ...prev.filter((x) => x !== item)];
      return newList.slice(0, 5);
    });
  };

  const handleClear = () => {
    setValue('');
    setQuery('');
    setOpen(false);
  };

  return (
    <div
      className='relative max-w-md mx-auto'
      ref={containerRef}
    >
      {/* Input */}
      <div className='relative'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4' />
        <Input
          type='text'
          value={query || value}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setValue('');
            setOpen(true);
          }}
          placeholder={placeholder}
          className='pl-10 pr-10 h-12 text-base'
        />
        {(value || query) && (
          <button
            title='clear'
            type='button'
            onClick={handleClear}
            className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
          >
            <X className='w-4 h-4' />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {open && (recent.length > 0 || suggestions.length > 0 || loading) && (
        <div className='absolute mt-1 w-full rounded-md border bg-background shadow-md z-10'>
          <ul className='max-h-60 overflow-y-auto text-sm'>
            {/* Recent */}
            {!query && recent.length > 0 && (
              <>
                <li className='px-3 py-1 text-xs text-muted-foreground'>
                  Recent
                </li>
                {recent.map((item) => (
                  <li
                    key={item}
                    onClick={() => handleSelect(item)}
                    className='cursor-pointer px-3 py-2 hover:bg-accent hover:text-accent-foreground'
                  >
                    {item}
                  </li>
                ))}
                <hr className='my-1 border-border' />
              </>
            )}

            {/* Suggestions */}
            {query && (
              <>
                <li className='px-3 py-1 text-xs text-muted-foreground'>
                  Suggestions
                </li>
                {loading ? (
                  <li className='px-3 py-2 text-muted-foreground'>
                    Loading...
                  </li>
                ) : suggestions.length > 0 ? (
                  suggestions.map((item) => (
                    <li
                      key={item}
                      onClick={() => handleSelect(item)}
                      className='cursor-pointer px-3 py-2 hover:bg-accent hover:text-accent-foreground'
                    >
                      {item}
                    </li>
                  ))
                ) : (
                  <li className='px-3 py-2 text-muted-foreground'>
                    No results
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
