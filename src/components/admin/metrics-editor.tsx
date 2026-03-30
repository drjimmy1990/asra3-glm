'use client';

import React, { useCallback } from 'react';
import { X, Plus, Users, Clock, DollarSign, BarChart3, TrendingUp, Zap, Target, Award, MessageCircle, Globe, Server, Heart, Settings, ShieldCheck, Layers, Rocket, Star, Percent, Activity, Package, Mail, ThumbsUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface MetricItem {
  icon: string;
  value: string;
  label: string;
}

const metricIcons = [
  { value: 'Users', label: 'Users', icon: Users },
  { value: 'Clock', label: 'Clock', icon: Clock },
  { value: 'DollarSign', label: 'Dollar', icon: DollarSign },
  { value: 'BarChart3', label: 'Chart', icon: BarChart3 },
  { value: 'TrendingUp', label: 'Trending', icon: TrendingUp },
  { value: 'Zap', label: 'Zap', icon: Zap },
  { value: 'Target', label: 'Target', icon: Target },
  { value: 'Award', label: 'Award', icon: Award },
  { value: 'MessageCircle', label: 'Message', icon: MessageCircle },
  { value: 'Globe', label: 'Globe', icon: Globe },
  { value: 'Server', label: 'Server', icon: Server },
  { value: 'Heart', label: 'Heart', icon: Heart },
  { value: 'Settings', label: 'Settings', icon: Settings },
  { value: 'ShieldCheck', label: 'Shield', icon: ShieldCheck },
  { value: 'Layers', label: 'Layers', icon: Layers },
  { value: 'Rocket', label: 'Rocket', icon: Rocket },
  { value: 'Star', label: 'Star', icon: Star },
  { value: 'Percent', label: 'Percent', icon: Percent },
  { value: 'Activity', label: 'Activity', icon: Activity },
  { value: 'Package', label: 'Package', icon: Package },
  { value: 'Mail', label: 'Mail', icon: Mail },
  { value: 'ThumbsUp', label: 'Like', icon: ThumbsUp },
];

interface MetricsEditorProps {
  value: string;
  onChange: (jsonString: string) => void;
}

/**
 * Visual editor for project metrics.
 * Replaces raw JSON editing with structured icon/value/label fields.
 */
export function MetricsEditor({ value, onChange }: MetricsEditorProps) {
  const metrics: MetricItem[] = (() => {
    try {
      const parsed = JSON.parse(value || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  })();

  const update = useCallback((updated: MetricItem[]) => {
    onChange(JSON.stringify(updated));
  }, [onChange]);

  const addMetric = () => {
    update([...metrics, { icon: 'BarChart3', value: '', label: '' }]);
  };

  const removeMetric = (index: number) => {
    update(metrics.filter((_, i) => i !== index));
  };

  const updateMetric = (index: number, field: keyof MetricItem, val: string) => {
    const updated = metrics.map((m, i) => (i === index ? { ...m, [field]: val } : m));
    update(updated);
  };

  return (
    <div className="space-y-3">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="flex items-start gap-2 rounded-lg border border-border/60 bg-muted/30 p-3 transition-colors hover:border-border"
        >
          <Select
            value={metric.icon}
            onValueChange={(v) => updateMetric(index, 'icon', v)}
          >
            <SelectTrigger className="w-[110px] h-9 bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-[240px]">
              {metricIcons.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  <span className="flex items-center gap-1.5">
                    <opt.icon className="size-3.5" />
                    <span className="text-xs">{opt.label}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            value={metric.value}
            onChange={(e) => updateMetric(index, 'value', e.target.value)}
            placeholder="3x"
            className="flex-1 h-9 bg-background"
          />
          <Input
            value={metric.label}
            onChange={(e) => updateMetric(index, 'label', e.target.value)}
            placeholder="Growth"
            className="flex-1 h-9 bg-background"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-9 shrink-0 text-muted-foreground hover:text-destructive"
            onClick={() => removeMetric(index)}
          >
            <X className="size-3.5" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full border-dashed"
        onClick={addMetric}
      >
        <Plus className="size-3.5 me-1.5" />
        Add Metric
      </Button>
    </div>
  );
}
