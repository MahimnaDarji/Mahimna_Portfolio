'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/utils';

export interface LiquidButtonProps extends HTMLMotionProps<'button'> {
  children?: React.ReactNode;
}

export function LiquidButton({
  children,
  className,
  ...props
}: LiquidButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'relative inline-flex items-center justify-center overflow-hidden rounded-md font-medium transition-colors duration-300',
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
