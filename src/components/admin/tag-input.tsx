'use client';

import React, { useState, useRef, useCallback, KeyboardEvent } from 'react';
import { X, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface TagInputProps {
  /** The JSON string of tags, e.g. '["Next.js","React"]' */
  value: string;
  /** Called with the updated JSON string */
  onChange: (jsonString: string) => void;
  placeholder?: string;
  dir?: 'ltr' | 'rtl';
  label?: string;
}

/**
 * A user-friendly tag/chip input that replaces raw JSON editing.
 * Accepts JSON array string, renders chips, and outputs JSON array string.
 */
export function TagInput({ value, onChange, placeholder = 'Type and press Enter', dir = 'ltr', label }: TagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const tags: string[] = (() => {
    try {
      const parsed = JSON.parse(value || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  })();

  const addTag = useCallback((tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    const updated = [...tags, trimmed];
    onChange(JSON.stringify(updated));
    setInputValue('');
  }, [tags, onChange]);

  const removeTag = useCallback((index: number) => {
    const updated = tags.filter((_, i) => i !== index);
    onChange(JSON.stringify(updated));
  }, [tags, onChange]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  return (
    <div className="space-y-2">
      {label && <span className="text-sm font-medium">{label}</span>}
      <div
        className="flex flex-wrap gap-1.5 rounded-md border border-input bg-background px-3 py-2 min-h-[38px] cursor-text transition-colors focus-within:ring-1 focus-within:ring-ring"
        onClick={() => inputRef.current?.focus()}
      >
        {tags.map((tag, i) => (
          <Badge
            key={`${tag}-${i}`}
            variant="secondary"
            className="gap-1 px-2 py-0.5 text-xs font-normal bg-primary/10 text-primary hover:bg-primary/15 transition-colors"
          >
            {tag}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(i);
              }}
              className="ms-0.5 rounded-full hover:bg-primary/20 p-0.5 transition-colors"
            >
              <X className="size-2.5" />
            </button>
          </Badge>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ''}
          dir={dir}
          className="flex-1 min-w-[120px] bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
      {inputValue && (
        <button
          type="button"
          onClick={() => addTag(inputValue)}
          className="text-xs text-primary hover:underline flex items-center gap-1"
        >
          <Plus className="size-3" />
          Add &quot;{inputValue}&quot;
        </button>
      )}
    </div>
  );
}
