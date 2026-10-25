import type { Metadata } from 'next'
import { Fragment } from 'react'
import { homeCss } from '@/content/styles'
import { homeDefaults } from '@/content/defaults'
import { getHome, getSite } from '@/lib/content'
import { getLatestPosts, postDate, postLabel, postTitle } from '@/lib/instagram'
import { cssUrl, isInstagramPost, Lines, lines, linkProps, Rich, src } from '@/lib/render'
import { BrandCredit, MenuScript } from './shared'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getHome()
  return { title: seo?.metaTitle, description: seo?.metaDescription }
}

const pad = (n: number) => String(n).padStart(2, '0')

export default async function HomePage() {
  const [c, site] = await Promise.all([getHome(), getSite()])
  const { hero, highlights, about, achievements, record, journey, quote, press, sponsorBanner, gallery, featured, contact } = c

  const css = homeCss
    .replaceAll('__HERO_IMAGE__', cssUrl(src(hero?.background)))
    .replaceAll('__ABOUT_IMAGE__', cssUrl(src(about?.photo)))

  const groups = record?.groups || []
  const leftGroups = groups.filter((g) => g.column !== 'right')
  const rightGroups = groups.filter((g) => g.column === 'right')
  const profile = featured?.profileUrl || 'https://www.instagram.com/othmanboularas/'
  const cards = featured?.cards || []
  const live = await getLatestPosts()
  const moments = live
    ? live.map((post) => ({
        key: post.id,
        href: post.permalink,
        image: `/ig-image/${post.id}`,
        alt: post.caption ? `Instagram post: ${postTitle(post.caption)}` : 'Othman Boularas Instagram post',
        category: postLabel(post.mediaType),
        title: postTitle(post.caption),
        text: postDate(post.timestamp),
        linkLabel: 'View on Instagram ↗',
        ariaLabel: `Open Instagram post: ${postTitle(post.caption)}`,
      }))
    : cards.map((card, i) => {
        const hasPost = isInstagramPost(card.postUrl)
        return {
          key: String(i),
          href: hasPost ? card.postUrl.trim() : profile,
          image: src(card.image),
          alt: `Othman Boularas competition photograph — ${card.title}`,
          category: card.category,
          title: card.title,
          text: card.text,
          linkLabel: hasPost ? 'View Instagram post ↗' : 'Explore Instagram ↗',
          ariaLabel: hasPost ? `Open Instagram post: ${card.title}` : 'Visit Othman Boularas Instagram profile',
        }
      })
  const mail = `mailto:${contact?.email || ''}${contact?.emailSubject ? `?subject=${encodeURIComponent(contact.emailSubject)}` : ''}`

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <header>
        <a aria-label="Othman Boularas home" className="logo" href="#home">
          <img alt={site.headerLogoAlt || ''} className="official-header-logo" src={src(site.headerLogo)} />
        </a>
        <button aria-expanded="false" aria-label="Toggle navigation" className="menu">
          ☰
        </button>
        <nav id="nav">
          {(site.nav || []).map((item, i) => (
            <a key={i} className={item.highlight ? 'navcta' : undefined} {...linkProps(item.link)}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>
      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            {src(hero?.signature) && (
              <img alt={hero?.signatureAlt || ''} className="hero-signature" src={src(hero.signature)} />
            )}
            <div className="brand-line">{hero?.brandLine}</div>
            <div className="eyebrow">{hero?.eyebrow}</div>
            <h1>
              {hero?.firstName}
              <br />
              <span>{hero?.lastName}</span>
            </h1>
            <p>{hero?.intro}</p>
            <div className="actions">
              {hero?.primaryButton?.label && (
                <a className="btn" {...linkProps(hero.primaryButton.link)}>
                  {hero.primaryButton.label}
                </a>
              )}
              {hero?.secondaryButton?.label && (
                <a className="btn outline" {...linkProps(hero.secondaryButton.link)}>
                  {hero.secondaryButton.label}
                </a>
              )}
            </div>
          </div>
          <div className="hero-vertical">{hero?.sideText}</div>
        </section>

        <div className="brand-ribbon">
          {(highlights?.ribbon || []).map((r, i) => (
            <span key={i}>{r.word}</span>
          ))}
        </div>
        <div className="strip">
          {(highlights?.stats || []).map((s, i) => (
            <div className="stat" key={i}>
              <strong>{s.value}</strong>
              <small>{s.label}</small>
            </div>
          ))}
        </div>

        <section aria-label="Sporting organizations" className="affiliations">
          <p>{highlights?.affiliationsTitle}</p>
          <div>
            {(highlights?.affiliations || []).map((a, i) => (
              <a key={i} href={a.url || '#'} rel="noopener" target="_blank">
                {src(a.logo) && <img alt={a.logoAlt || ''} src={src(a.logo)} />}
                <span>{a.name}</span>
              </a>
            ))}
          </div>
          <small>{highlights?.affiliationsNote}</small>
        </section>

        <section className="section bio" id="about">
          <div className="visual">
            <div className="symbol">OB</div>
            <div className="caption">{about?.caption}</div>
          </div>
          <div>
            <div className="eyebrow">{about?.eyebrow}</div>
            <h2>
              <Lines text={about?.heading} />
            </h2>
            {(about?.paragraphs || []).map((p, i) => (
              <p key={i}>
                <Rich text={p.text} />
              </p>
            ))}
            <div className="bio-details">
              {(about?.details || []).map((d, i) => (
                <div key={i}>
                  <small>{d.label}</small>
                  <b>{d.value}</b>
                </div>
              ))}
            </div>
            {about?.buttonLabel && (
              <a className="btn outline" {...linkProps(about.buttonLink)}>
                {about.buttonLabel}
              </a>
            )}
          </div>
        </section>

        <section className="section achievements" id="achievements">
          <div className="section-head">
            <div>
              <div className="eyebrow">{achievements?.eyebrow}</div>
              <h2>
                <Lines text={achievements?.heading} />
              </h2>
            </div>
            <p className="section-intro">{achievements?.intro}</p>
          </div>
          <div className="cards">
            {(achievements?.cards || []).map((card, i) => (
              <article className={card.featured ? 'card feature' : 'card'} key={i}>
                <span className="tag">{card.tag}</span>
                <div>
                  <div className="year">{card.year}</div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section record" id="official-record">
          <div className="eyebrow">{record?.eyebrow}</div>
          <h2>
            <Lines text={record?.heading} />
          </h2>
          <p className="section-intro">{record?.intro}</p>
          <div className="record-grid">
            {[leftGroups, rightGroups].map((column, ci) => (
              <div key={ci}>
                {column.map((g, gi) => (
                  <Fragment key={gi}>
                    <h3>{g.title}</h3>
                    <ul>
                      {lines(g.results).map((line, li) => (
                        <li key={li}>{line}</li>
                      ))}
                    </ul>
                  </Fragment>
                ))}
              </div>
            ))}
          </div>
          <div className="document-links">
            {(record?.documents || []).map((d, i) => (
              <a className="btn outline" href={src(d.document) || '#'} key={i} target="_blank">
                {d.label}
              </a>
            ))}
          </div>
          <p className="note">{record?.note}</p>
        </section>

        <section className="section" id="journey">
          <div className="eyebrow">{journey?.eyebrow}</div>
          <h2>
            <Lines text={journey?.heading} />
          </h2>
          <div className="timeline">
            {(journey?.events || []).map((e, i) => (
              <div className="event" key={i}>
                <time>{e.time}</time>
                <h3>{e.title}</h3>
                <p>{e.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="quote">
          <p>{quote?.kicker}</p>
          <p>{quote?.label}</p>
          <blockquote>
            <Lines text={quote?.quote} />
          </blockquote>
          <p>{quote?.attribution}</p>
        </section>

        <section className="section" id="press">
          <div className="eyebrow">{press?.eyebrow}</div>
          <h2>
            <Lines text={press?.heading} />
          </h2>
          <div className="press">
            {(press?.items || []).map((item, i) => (
              <a key={i} {...linkProps(item.url)}>
                <small>{item.source}</small>
                <b>{item.title}</b>
              </a>
            ))}
          </div>
          <p className="note">{press?.note}</p>
        </section>

        <section className="section sponsor-banner">
          <div className="eyebrow">{sponsorBanner?.eyebrow}</div>
          <h2>
            <Lines text={sponsorBanner?.heading} />
          </h2>
          <p>{sponsorBanner?.text}</p>
          {sponsorBanner?.buttonLabel && (
            <a className="btn" {...linkProps(sponsorBanner.buttonLink)}>
              {sponsorBanner.buttonLabel}
            </a>
          )}
        </section>

        <section className="section" id="gallery">
          <div className="eyebrow">{gallery?.eyebrow}</div>
          <h2>
            <Lines text={gallery?.heading} />
          </h2>
          <p className="section-intro">{gallery?.intro}</p>
          <div className="gallery-grid">
            {(gallery?.photos || [])
              .filter((p) => src(p.image))
              .map((p, i) => (
                <figure key={i}>
                  <img alt={p.alt || ''} loading="lazy" src={src(p.image)} />
                  <figcaption>{p.caption}</figcaption>
                </figure>
              ))}
          </div>
        </section>

        <section className="section insta-section" id="instagram">
          <div className="insta-head">
            <div>
              <div className="eyebrow">{featured?.eyebrow}</div>
              <h2>
                <Lines text={featured?.heading} />
              </h2>
              <p className="section-intro">
                {live ? featured?.liveIntro || homeDefaults.featured.liveIntro : featured?.intro}
              </p>
            </div>
            {featured?.buttonLabel && (
              <a className="btn" href={profile} rel="noopener noreferrer" target="_blank">
                {featured.buttonLabel}
              </a>
            )}
          </div>
          <div className="featured-instagram-grid">
            {moments.map((m, i) => (
              <article className="featured-post" key={m.key}>
                <a aria-label={m.ariaLabel} className="featured-image" href={m.href} rel="noopener noreferrer" target="_blank">
                  {m.image && <img alt={m.alt} loading="lazy" src={m.image} />}
                  <span className="featured-index">{`${pad(i + 1)} / ${pad(moments.length)}`}</span>
                </a>
                <div className="featured-copy">
                  <span className="featured-category">{m.category}</span>
                  <h3 dir="auto">{m.title}</h3>
                  <p dir="auto">{m.text}</p>
                  <a className="featured-link" href={m.href} rel="noopener noreferrer" target="_blank">
                    {m.linkLabel}
                  </a>
                </div>
              </article>
            ))}
          </div>
          <p className="insta-note">{live ? featured?.liveNote || homeDefaults.featured.liveNote : featured?.note}</p>
        </section>

        <section className="section contact" id="contact">
          <div className="eyebrow">{contact?.eyebrow}</div>
          <h2>
            <Lines text={contact?.heading} />
          </h2>
          <p>{contact?.text}</p>
          {contact?.buttonLabel && (
            <a className="btn" href={mail}>
              {contact.buttonLabel}
            </a>
          )}
          <div className="socials">
            {(contact?.socials || []).map((s, i) => (
              <a key={i} {...linkProps(s.url)}>
                {s.label}
              </a>
            ))}
          </div>
          <p className="note">{contact?.note}</p>
        </section>
      </main>
      <footer>
        <span>
          © <span id="year">{new Date().getFullYear()}</span> {site.copyrightName}. All rights reserved.
        </span>
        <span>{site.footerTagline}</span>
      </footer>
      <MenuScript />
      <BrandCredit site={site} />
    </>
  )
}
