import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Google Drive's uc?export=view URL follows a 303 redirect.
// The final URL (drive.usercontent.google.com) is more reliable for Audio elements.
export function fixDriveUrl(url: string | null | undefined): string | null {
  if (!url) return null
  const match = url.match(/[?&]id=([A-Za-z0-9_-]+)/)
  if (match && url.includes('drive.google.com')) {
    return `https://drive.usercontent.google.com/download?id=${match[1]}&export=view`
  }
  return url
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
