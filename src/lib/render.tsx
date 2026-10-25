import { Fragment, type ReactNode } from 'react'

type ImageValue = { file?: unknown; path?: string | null } | null | undefined

/** The address of a CMS image: the uploaded file if there is one, otherwise the built-in file. */
export function src(image: ImageValue): string {
  const file = image?.file as { url?: string | null } | null | undefined
  if (file && typeof file === 'object' && file.url) return file.url
  return image?.path || ''
}

/** Makes an address safe to drop into CSS url("..."). */
export function cssUrl(url: string): string {
  return url.replace(/["\\\n\r()]/g, (c) => encodeURIComponent(c))
}

/** Splits text on new lines, keeping the line breaks. */
export function Lines({ text }: { text?: string | null }): ReactNode {
  const lines = (text || '').split(/\r?\n/)
  return lines.map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ))
}

/** Text where **words** become bold. */
export function Rich({ text }: { text?: string | null }): ReactNode {
  const parts = (text || '').split(/\*\*(.+?)\*\*/g)
  return parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>))
}

/** One item per non-empty line. */
export function lines(text?: string | null): string[] {
  return (text || '')
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
}

/** Links to other websites open in a new tab, like the original site. */
export function linkProps(url?: string | null) {
  const href = url || '#'
  const external = /^https?:\/\//i.test(href)
  return external ? { href, target: '_blank', rel: 'noopener noreferrer' } : { href }
}

const INSTAGRAM_POST = /^https:\/\/(www\.)?instagram\.com\/(p|reel)\/[A-Za-z0-9_-]+\/?(?:\?.*)?$/

export function isInstagramPost(url?: string | null): boolean {
  return INSTAGRAM_POST.test((url || '').trim())
}
