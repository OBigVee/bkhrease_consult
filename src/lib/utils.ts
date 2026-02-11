import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Extracts plain text from Strapi Blocks JSON format
 * @param blocks - The blocks JSON object or array
 * @returns Plain text string
 */
export function extractTextFromBlocks(blocks: any): string {
  if (!blocks) return '';

  // If it's already a string, return it (backward compatibility)
  if (typeof blocks === 'string') return blocks;

  // If it's an array of blocks
  if (Array.isArray(blocks)) {
    return blocks
      .map((block: any) => {
        if (block.type === 'paragraph' || block.type === 'heading') {
          return block.children
            ?.map((child: any) => child.text)
            .join(' ');
        }
        return '';
      })
      .join(' ')
      .trim();
  }

  return '';
}
