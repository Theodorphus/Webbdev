import Image from 'next/image';
import type { CSSProperties } from 'react';
import { industries, palettes, styles, type Design } from './demo-model';
import css from './demo.module.css';

export default function DemoPreview({ design, mobile }: { design: Design; mobile: boolean }) {
  const industry = industries.find(item => item.id === design.industry) ?? industries[0];
  const style = styles.find(item => item.id === design.style) ?? styles[0];
  const palette = palettes.find(item => item.id === design.palette) ?? palettes[0];
  const dark = style.id === 'exclusive';
  const accent = dark ? palette.light : palette.color;
  const background = dark ? style.background : style.id === 'bold' ? palette.wash : style.background;
  const booking = design.needs.includes('Bokning');
  const shop = design.needs.includes('Webbshop');
  const variables = { '--preview-bg': background, '--preview-fg': style.foreground, '--preview-accent': accent, '--preview-button-text': dark ? '#19231f' : '#ffffff' } as CSSProperties;

  return (
    <div className={`${css.previewViewport} ${mobile ? css.phone : ''}`} data-testid="demo-preview" data-industry={industry.id} data-style={style.id} data-palette={palette.id} style={variables}>
      <article className={`${css.previewPage} ${css[style.id]}`} aria-label={`Stilexempel för ${design.company.trim() || industry.label}`}>
        <div className={css.previewNav}>
          <span className={css.brand}><span className={css.brandMark} aria-hidden="true">{industry.symbol}</span>{design.company.trim() || 'Ditt företag'}</span>
          <span className={css.previewNavLinks} aria-hidden="true">Upptäck oss <span>Vårt erbjudande</span></span>
          <span className={css.previewNavCta}>Kontakt ↗</span>
        </div>
        <div className={css.hero} key={industry.id}>
          <div className={css.heroCopy}>
            <p className={css.eyebrow}>{industry.eyebrow}</p>
            <h3>{industry.title}</h3>
            <p className={css.intro}>{industry.intro}</p>
            <span className={css.mockButton}>{booking ? 'Boka en tid' : industry.cta} <span aria-hidden="true">↗</span></span>
            <p className={css.heroNote}>Välkommen till {design.company.trim() || 'ditt nästa kapitel'}</p>
          </div>
          <div className={css.heroImage}>
            <Image src={industry.image} alt={industry.alt} fill sizes="(max-width: 700px) 90vw, 650px" priority />
            <span className={css.imageCaption}>En känsla att komma hem till.</span>
          </div>
        </div>
        <section className={css.services}>
          <div className={css.sectionHeading}><p className={css.eyebrow}>{shop ? 'Ett utvalt sortiment' : 'Med omsorg om helheten'}</p><h3>{shop ? 'Hitta dina nya favoriter.' : industry.section}</h3></div>
          <div className={css.serviceGrid}>{industry.items.map((item, index) => <div key={item} className={css.serviceCard}><span className={css.serviceNumber}>0{index + 1} <span aria-hidden="true">↗</span></span><h4>{item}</h4><p>{industry.descriptions[index]}</p>{shop && <span className={css.productLabel}>Utforska sortimentet →</span>}</div>)}</div>
        </section>
        {design.needs.includes('Bildgalleri') && <section className={css.gallery} aria-label="Exempel på bildgalleri"><div className={css.galleryImage}><Image src={industry.image} alt="Exempelbild i ditt galleri" fill sizes="400px" /></div><div><p className={css.eyebrow}>En närmare titt</p><h3>Detaljerna berättar historien.</h3><p>Här får dina egna bilder, projekt och miljöer ta plats.</p></div></section>}
        <section className={css.contact}>
          <p className={css.eyebrow}>Ett första hej</p><h3>{industry.contact}</h3><p>{industry.contactText}</p>
          {design.needs.includes('Kontaktformulär') && <div className={css.mockFields} aria-label="Illustration av kontaktformulär"><span>Ditt namn</span><span>Din e-post</span><span>Vad kan vi hjälpa dig med?</span></div>}
          <span className={css.mockButton}>{booking ? 'Hitta en tid som passar' : 'Kontakta oss'} ↗</span>
        </section>
        <div className={css.previewFooter}><span>{design.company.trim() || 'Ditt företag'}</span><span>Designkoncept · Webbdev Studio</span></div>
      </article>
    </div>
  );
}
