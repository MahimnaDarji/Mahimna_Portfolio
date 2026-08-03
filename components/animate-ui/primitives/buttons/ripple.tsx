'use client';

import * as React from 'react';
import { motion, AnimatePresence, type HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/utils';

export interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

export interface RippleButtonProps extends HTMLMotionProps<'button'> {
  children?: React.ReactNode;
}

export function RippleButton({
  children,
  className,
  onClick,
  ...props
}: RippleButtonProps) {
  const [ripples, setRipples] = React.useState<Ripple[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple: Ripple = {
      id: Date.now(),
      x,
      y,
      size,
    };

    setRipples((prev) => [...prev, newRipple]);

    if (onClick) onClick(e);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={cn('relative overflow-hidden', className)}
      onClick={handleClick}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <RippleButtonRipples ripples={ripples} onComplete={(id) => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }} />
    </motion.button>
  );
}

export interface RippleButtonRipplesProps {
  ripples?: Ripple[];
  onComplete?: (id: number) => void;
  className?: string;
}

export function RippleButtonRipples({ ripples = [], onComplete, className }: RippleButtonRipplesProps) {
  return (
    <span className={cn('absolute inset-0 pointer-events-none overflow-hidden', className)}>
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            onAnimationComplete={() => onComplete?.(r.id)}
            style={{
              position: 'absolute',
              left: r.x,
              top: r.y,
              width: r.size,
              height: r.size,
              borderRadius: '50%',
              backgroundColor: 'var(--ripple-button-ripple-color, currentColor)',
            }}
          />
        ))}
      </AnimatePresence>
    </span>
  );
}
