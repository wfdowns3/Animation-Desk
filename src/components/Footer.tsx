import Link from 'next/link'

const footerLinks = {
  explore: [
    { href: '/story', label: 'The Story' },
    { href: '/desks', label: 'The Desks' },
    { href: '/craft', label: 'Materials & Craft' },
    { href: '/founders-edition', label: "Founder's Edition" },
  ],
  connect: [
    { href: '/institutions', label: 'Schools & Studios' },
    { href: '/about', label: 'About' },
    { href: '/survey', label: 'Tell Us Your Vision' },
    { href: '/#waitlist', label: 'Join the Waitlist' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="container-luxury py-16 md:py-20">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="font-serif text-2xl text-text hover:text-gold transition-colors duration-200 block mb-4"
            >
              Animation Desk
            </Link>
            <p className="text-muted text-sm leading-relaxed max-w-sm mb-6">
              A limited line of premium studio furniture for the artists,
              collectors, and studios keeping hand-drawn animation alive.
            </p>
            <p className="text-muted text-xs leading-relaxed max-w-sm italic">
              A note on honesty: these desks are in development. We have not
              built a production unit yet. Your interest on the waitlist costs
              nothing and helps us decide what to build. The Founder&apos;s
              Edition deposit is fully refundable until you confirm production.
            </p>
          </div>

          {/* Explore */}
          <div>
            <p className="label-gold mb-5">Explore</p>
            <ul className="space-y-3">
              {footerLinks.explore.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-muted text-sm hover:text-text transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="label-gold mb-5">Connect</p>
            <ul className="space-y-3">
              {footerLinks.connect.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-muted text-sm hover:text-text transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-border">
              <a
                href="mailto:hello@animationdesk.com"
                className="text-muted text-sm hover:text-gold transition-colors duration-200"
              >
                hello@animationdesk.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-muted text-xs">
            &copy; {new Date().getFullYear()} Animation Desk. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.legal.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-muted text-xs hover:text-text transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
