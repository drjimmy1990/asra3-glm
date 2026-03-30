import { useEffect, useState } from 'react';
import { useMotionValue, useSpring, useInView } from 'framer-motion';

export function useCounter(value: string, ref: React.RefObject<Element | null>) {
  const [displayValue, setDisplayValue] = useState(value);
  const [mounted, setMounted] = useState(false);
  
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Parse the input string: e.g. "$2.5M+" -> prefix "$", number "2.5", suffix "M+"
  const parsed = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
    mass: 1
  });

  useEffect(() => {
    if (mounted && isInView && parsed) {
      const target = parseFloat(parsed[2]);
      motionValue.set(target);
    }
  }, [mounted, isInView, parsed, motionValue]);

  useEffect(() => {
    if (!parsed || !mounted) return;
    
    return springValue.on("change", (latest) => {
      // Intelligently format decimals (only if target has them)
      const targetHasDecimals = parsed[2].includes('.');
      const formatted = targetHasDecimals ? latest.toFixed(1) : Math.round(latest).toString();
      setDisplayValue(`${parsed[1]}${formatted}${parsed[3]}`);
    });
  }, [springValue, parsed, mounted]);

  // Before hydration, render the raw value to avoid mismatch
  if (!mounted) return value;
  
  // Return animated string if parsable, else original value
  return parsed ? displayValue : value;
}

