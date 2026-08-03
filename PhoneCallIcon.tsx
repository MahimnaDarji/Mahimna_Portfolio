'use client';

import * as React from 'react';
import { motion, type SVGMotionProps } from 'motion/react';

export interface PhoneCallProps extends SVGMotionProps<SVGSVGElement> {
  size?: number;
  animateOnHover?: boolean;
}

export function PhoneCall({ size = 24, className, ...props }: PhoneCallProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Inner Wave */}
      <motion.path
        d="M13 6a5 5 0 0 1 5 5"
        animate={
          isHovered
            ? { opacity: [1, 0, 1], scale: [1, 0, 1] }
            : { opacity: 1, scale: 1 }
        }
        transition={{ duration: 0.4, ease: 'easeInOut', delay: 0 }}
      />
      {/* Outer Wave */}
      <motion.path
        d="M13 2a9 9 0 0 1 9 9"
        animate={
          isHovered
            ? { opacity: [1, 0, 1], scale: [1, 0, 1] }
            : { opacity: 1, scale: 1 }
        }
        transition={{ duration: 0.4, ease: 'easeInOut', delay: 0.2 }}
      />
      {/* Phone body */}
      <motion.path
        d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"
      />
    </motion.svg>
  );
}

export { PhoneCall as PhoneCallIcon };
