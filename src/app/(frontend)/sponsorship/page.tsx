import type { Metadata } from 'next'
import { sponsorshipCss } from '@/content/styles'
import { getSite, getSponsorship } from '@/lib/content'
import { cssUrl, Lines, lines, src } from '@/lib/render'
import { BrandCredit, MenuScript } from '../shared'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSponsorship()
  return { title: seo?.metaTitle, description: seo?.metaDescription }
}

function formScript(recipient: string) {
  return `(function(){var f=document.getElementById('sponsorForm');if(!f)return;var recipient=${JSON.stringify(recipient)};f.addEventListener('submit',function(e){e.preventDefault();if(!recipient){document.getElementById('formStatus').textContent='Form prepared, but the athlete business email has not been configured. Please contact the athlete through a verified channel.';return}var v=function(id){return document.getElementById(id).value};var subject='Sponsorship enquiry — '+v('company');var body='Company: '+v('company')+'\\nContact: '+v('person')+'\\nEmail: '+v('email')+'\\nInterest: '+v('interest')+'\\n\\n'+v('message');location.href='mailto:'+recipient+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body)})})();`
}

export default async function SponsorshipPage() {
  const [c, site] = await Promise.all([getSponsorship(), getSite()])
  const { top, hero, numbers, partnership, collaborate, inquiry } = c
  const recipient = (inquiry?.recipientEmail || '').trim()
  const css = sponsorshipCss.replaceAll('__HERO_IMAGE__', cssUrl(src(hero?.background)))

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <header>
        <a href="/">
          <img alt={site.headerLogoAlt || ''} className="official-header-logo" src={src(site.headerLogo)} />
        </a>
        <a href="/">{top?.backLabel}</a>
      </header>
      <main>
        <div className="brand-ribbon" style={{ paddingTop: 115 }}>
          <span>{top?.ribbonLeft}</span>
          <span>{top?.ribbonRight}</span>
        </div>
        <section className="hero">
          <div className="eyebrow">{hero?.eyebrow}</div>
          <h1>
            <Lines text={hero?.heading} />
          </h1>
          <p>{hero?.text}</p>
          {hero?.buttonLabel && (
            <a className="btn" href="#inquiry">
              {hero.buttonLabel}
            </a>
          )}
          <div className="logos">
            {(hero?.logos || [])
              .filter((l) => src(l.image))
              .map((l, i) => (
                <img alt={l.alt || ''} key={i} src={src(l.image)} />
              ))}
            <small>{hero?.logosNote}</small>
          </div>
        </section>
        <div className="numbers">
          {(numbers?.items || []).map((n, i) => (
            <div key={i}>
              <b>{n.value}</b>
              <span>{n.label}</span>
            </div>
          ))}
        </div>
        <section className="section">
          <div className="eyebrow">{partnership?.eyebrow}</div>
          <h2>
            <Lines text={partnership?.heading} />
          </h2>
          <p>{partnership?.text}</p>
          <div className="tiers">
            {(partnership?.tiers || []).map((t, i) => (
              <article className={t.featured ? 'tier feature' : 'tier'} key={i}>
                <div className="eyebrow">{t.eyebrow}</div>
                <h3>{t.title}</h3>
                <ul>
                  {lines(t.points).map((p, pi) => (
                    <li key={pi}>{p}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="footnote">{partnership?.footnote}</p>
        </section>
        <section className="section">
          <div className="eyebrow">{collaborate?.eyebrow}</div>
          <h2>
            <Lines text={collaborate?.heading} />
          </h2>
          <p>{collaborate?.text}</p>
        </section>
        <section className="contact" id="inquiry">
          <div className="eyebrow">{inquiry?.eyebrow}</div>
          <h2>
            <Lines text={inquiry?.heading} />
          </h2>
          <p>{inquiry?.text}</p>
          <form id="sponsorForm">
            <div className="cols">
              <div>
                <label htmlFor="company">Company / Organization *</label>
                <input id="company" maxLength={120} required />
              </div>
              <div>
                <label htmlFor="person">Contact name *</label>
                <input id="person" maxLength={120} required />
              </div>
              <div>
                <label htmlFor="email">Business email *</label>
                <input id="email" required type="email" />
              </div>
              <div>
                <label htmlFor="interest">Partnership interest</label>
                <select id="interest">
                  {(inquiry?.interests || []).map((o, i) => (
                    <option key={i}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <label htmlFor="message">What would you like to achieve?</label>
            <textarea id="message" placeholder={inquiry?.messagePlaceholder || ''} />
            <button className="btn" type="submit">
              {inquiry?.buttonLabel || 'Prepare Sponsorship Enquiry ↗'}
            </button>
            <p className="footnote" id="formStatus" role="status">
              {recipient
                ? `Your email app will open with a prepared message addressed to ${recipient}.`
                : 'The enquiry email address has not been set yet.'}
            </p>
          </form>
        </section>
      </main>
      <footer>
        © <span id="year">{new Date().getFullYear()}</span> {c.footerText}
      </footer>
      <MenuScript />
      <script dangerouslySetInnerHTML={{ __html: formScript(recipient) }} />
      <BrandCredit site={site} />
    </>
  )
}
