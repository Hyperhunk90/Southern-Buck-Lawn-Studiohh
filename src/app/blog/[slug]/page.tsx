import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar, ArrowRight, ArrowLeft } from 'lucide-react';
import { POSTS, getPost } from '@/data/blog';
import { SITE } from '@/data/site';
import Breadcrumbs from '@/components/Breadcrumbs';

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.metaTitle,
      description: post.metaDescription,
      url: `${SITE.url}/blog/${post.slug}`,
      images: [{ url: post.heroImage }],
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    image: `${SITE.url}${post.heroImage}`,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Person', name: SITE.owner },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: `${SITE.url}/images/southern-buck-lawn-logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE.url}/blog/${post.slug}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      {/* Hero */}
      <header className="bg-midnight-moss px-4 pb-12 pt-28 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs trail={[{ name: 'Blog', href: '/blog' }, { name: post.title, href: `/blog/${post.slug}` }]} />
          <h1 className="mt-5 font-anton text-3xl uppercase leading-tight tracking-wide sm:text-4xl">{post.h1}</h1>
          <div className="mt-4 flex items-center gap-4 font-barlow text-sm text-white/70">
            <span className="flex items-center gap-1"><Calendar className="h-4 w-4 text-safety-orange" /> {post.dateLabel}</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4 text-safety-orange" /> {post.readMinutes} min read</span>
            <span>by {SITE.owner}</span>
          </div>
        </div>
      </header>

      {/* Hero image */}
      <div className="bg-midnight-moss px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl shadow-2xl">
          <Image src={post.heroImage} alt={post.heroAlt} width={1200} height={700} sizes="(max-width: 896px) 100vw, 896px" quality={60} className="h-auto w-full object-cover" priority />
        </div>
      </div>

      {/* Body */}
      <article className="bg-surface py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="mb-8 border-l-4 border-safety-orange pl-4 font-barlow text-xl italic leading-relaxed text-gray-700">
            {post.excerpt}
          </p>

          {post.sections.map((section, i) => (
            <section key={i} className="mb-8">
              {section.heading && (
                <h2 className="mb-3 font-anton text-2xl uppercase text-primary">{section.heading}</h2>
              )}
              {section.body.map((para, j) => (
                <p key={j} className="mb-4 font-barlow text-lg leading-relaxed text-gray-700">{para}</p>
              ))}
            </section>
          ))}

          {/* Related internal links */}
          <div className="mt-10 rounded-2xl border border-primary/10 bg-mist-green p-6">
            <p className="mb-3 font-anton text-lg uppercase text-primary">Keep Reading / Get Help</p>
            <ul className="space-y-2">
              {post.relatedLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="flex items-center gap-2 font-barlow text-base font-semibold text-midnight-moss hover:text-safety-orange-deep">
                    <ArrowRight className="h-4 w-4 text-safety-orange" /> {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>

      {/* More posts */}
      {others.length > 0 && (
        <section className="bg-mist-green py-14">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 font-anton text-2xl uppercase text-primary">More From the Field</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm transition-all hover:shadow-lg"
                >
                  <div className="relative h-28 w-28 flex-shrink-0">
                    <Image src={p.heroImage} alt={p.heroAlt} fill className="object-cover" sizes="112px" quality={60} />
                  </div>
                  <div className="flex flex-col justify-center p-4">
                    <h3 className="font-anton text-base uppercase leading-tight text-midnight-moss group-hover:text-safety-orange-deep">{p.title}</h3>
                    <span className="mt-1 font-barlow text-xs text-gray-500">{p.readMinutes} min read</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/blog" className="inline-flex items-center gap-2 font-barlow font-extrabold uppercase text-primary hover:text-safety-orange-deep">
                <ArrowLeft className="h-4 w-4" /> All posts
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
