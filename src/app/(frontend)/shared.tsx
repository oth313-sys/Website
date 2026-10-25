import type { SiteContent } from '@/lib/content'
import { src } from '@/lib/render'

/** Mobile menu toggle and footer year, as on the original site. */
export function MenuScript() {
  const js = `document.querySelectorAll('#year').forEach(function(e){e.textContent=new Date().getFullYear()});var m=document.querySelector('.menu'),n=document.querySelector('nav');if(m&&n){m.addEventListener('click',function(){var o=n.classList.toggle('open');m.setAttribute('aria-expanded',o)});n.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){n.classList.remove('open');m.setAttribute('aria-expanded','false')})})}`
  return <script dangerouslySetInnerHTML={{ __html: js }} />
}

export function BrandCredit({ site }: { site: SiteContent }) {
  const credit = site.brandCredit
  if (!credit?.text && !credit?.linkLabel) return null
  const href = src(credit.document)
  return (
    <div className="brand-credit">
      {credit.text}{' '}
      {credit.linkLabel && href && (
        <a href={href} rel="noopener" target="_blank">
          {credit.linkLabel}
        </a>
      )}
      {credit.suffix}
    </div>
  )
}
