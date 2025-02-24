'use client';
import React from 'react';

export function CategoryMenu() {
  const categories = [
    'All Collections',
    'Kitchen',
    'Living',
    'Dining',
    'Bedroom',
    'Lighting',
    'Bath',
    'Outdoor',
  ];

  return (
    <div className="flex items-center justify-center gap-4">
      {categories.map((cat, idx) => (
        <React.Fragment key={cat}>
          {/* Insert a thin vertical line before each category (except the first) */}
          {idx > 0 && <span className="block h-5 w-px bg-gray-300" />}
          <span className="text-gray-800">{cat}</span>
        </React.Fragment>
      ))}
    </div>
  );
}
