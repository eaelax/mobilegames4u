'use client';

import React, { useState, useEffect } from 'react';

interface LiveOnlineBadgeProps {
  className?: string;
}

export function LiveOnlineBadge({ className = '' }: LiveOnlineBadgeProps) {
  // Bound strictly under 150
  const [onlineCount, setOnlineCount] = useState<number>(134);

  useEffect(() => {
    // Generate organic fluctuations every 4 seconds, strictly under 150
    const interval = setInterval(() => {
      setOnlineCount((prev) => {
        const delta = Math.floor(Math.random() * 7) - 3;
        let next = prev + (delta === 0 ? 1 : delta);

        // Keep strictly under 150 (bounded between 112 and 147)
        if (next >= 148) {
          next = 139 - Math.floor(Math.random() * 6);
        } else if (next <= 110) {
          next = 118 + Math.floor(Math.random() * 6);
        }

        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E5E7EB] shadow-xs select-none ${className}`}
      title="Active users currently online"
    >
      {/* Simple solid green live dot #10B981 */}
      <span className="w-2 h-2 rounded-full bg-[#10B981] shrink-0" />

      {/* Text: "ONLINE:" in #6B7280, numbers in bold #111827 */}
      <div className="flex items-center gap-1.5 text-xs sm:text-[13px] tracking-tight">
        <span className="text-[#6B7280] font-medium">ONLINE:</span>
        <span className="font-mono font-bold text-[#111827] tabular-nums">
          {onlineCount}
        </span>
      </div>
    </div>
  );
}
