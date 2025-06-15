import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export function formatDate(date: Date | string): string {
//   if (typeof date === 'string') {
//     date = new Date(date);
//   }
//   return date.toLocaleDateString('en-US', {
//     month: 'short',
//     day: 'numeric',
//     year: 'numeric',
//   });
// }

// export function formatTime(date: Date | string): string {
//   if (typeof date === 'string') {
//     date = new Date(date);
//   }
//   return date.toLocaleTimeString('en-US', {
//     hour: '2-digit',
//     minute: '2-digit',
//   });
// }

export function formatDate(date?: Date | string): string {
  if (!date) return 'N/A';

  const parsed = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(parsed.getTime())) return 'Invalid Date';

  return parsed.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatTime(date?: Date | string): string {
  if (!date) return 'N/A';

  const parsed = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(parsed.getTime())) return 'Invalid Time';

  return parsed.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function generateAvatarUrl(name: string): string {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0EA5E9&color=fff&size=128`;
}