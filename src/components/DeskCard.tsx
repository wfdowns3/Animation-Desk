import Link from 'next/link'

interface DeskCardProps {
  name: string
  tagline: string
  priceRange: string
  description: string
  ctaLabel: string
  ctaHref: string
  accentLabel?: string
  features?: string[]
  variant?: 'default' | 'featured'
}

export default function DeskCard({
  name,
  tagline,
  priceRange,
  description,
  ctaLabel,
  ctaHref,
  accentLabel,
  features = [],
  variant = 'default',
}: DeskCardProps) {
  const isFeatured = variant === 'featured'

  return (
    <article
      className={`flex flex-col border transition-all duration-300 group hover:border-gold/50 ${
        isFeatured
          ? 'border-gold/60 bg-surface'
          : 'border-border bg-surface'
      }`}
    >
      {/* Image placeholder */}
      <div
        className="img-placeholder w-full relative overflow-hidden"
        style={{ aspectRatio: '4/3' }}
        aria-hidden="true"
      >
        {/* Subtle gradient layers to suggest depth/form */}
        <div className="absolute inset-0"
          style={{
            background: isFeatured
              ? 'radial-gradient(ellipse at 30% 40%, #2A2218 0%, #1C1916 40%, #0F0D0B 100%)'
              : 'radial-gradient(ellipse at 40% 35%, #1E1C1A 0%, #141414 50%, #0A0A0A 100%)',
          }}
        />
        {/* Desk silhouette hint */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3"
          style={{
            background: 'linear-gradient(to top, #0A0A0A 0%, transparent 100%)',
          }}
        />
        {/* Gold shimmer line on featured */}
        {isFeatured && (
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-px bg-gold/30 mx-auto mb-4" />
            <p className="text-muted/40 text-xs tracking-widest uppercase font-sans">
              Photography coming soon
            </p>
            <div className="w-16 h-px bg-gold/30 mx-auto mt-4" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-8">
        {accentLabel && (
          <p className="label-gold mb-4">{accentLabel}</p>
        )}

        <h3 className="font-serif text-2xl md:text-3xl font-light text-text mb-3 leading-tight">
          {name}
        </h3>

        <p className="text-muted text-sm italic font-sans mb-4 leading-relaxed">
          {tagline}
        </p>

        <p className="text-muted text-sm font-sans leading-relaxed mb-6">
          {description}
        </p>

        {features.length > 0 && (
          <ul className="space-y-2 mb-8">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-3 text-muted text-sm font-sans">
                <span className="w-1 h-1 rounded-full bg-gold mt-2 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto">
          <p className="text-gold text-lg font-serif font-light mb-5">{priceRange}</p>
          <Link
            href={ctaHref}
            className={isFeatured ? 'btn-gold w-full text-center block' : 'btn-outline w-full text-center block'}
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </article>
  )
}
