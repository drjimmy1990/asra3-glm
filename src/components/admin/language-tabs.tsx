'use client';

import { cn } from '@/lib/utils';

interface LanguageTabsProps {
  activeTab: 'en' | 'ar';
  onTabChange: (tab: 'en' | 'ar') => void;
  labels?: { en: string; ar: string };
}

export function LanguageTabs({ activeTab, onTabChange, labels }: LanguageTabsProps) {
  return (
    <div className="flex gap-1 p-1 rounded-lg bg-muted w-fit">
      <button
        type="button"
        onClick={() => onTabChange('en')}
        className={cn(
          'px-3 py-1.5 text-xs font-medium rounded-md transition-colors',
          activeTab === 'en'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        {labels?.en || 'English'}
      </button>
      <button
        type="button"
        onClick={() => onTabChange('ar')}
        className={cn(
          'px-3 py-1.5 text-xs font-medium rounded-md transition-colors',
          activeTab === 'ar'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        {labels?.ar || 'العربية'}
      </button>
    </div>
  );
}
