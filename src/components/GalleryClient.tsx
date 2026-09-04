'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Maximize2,
  Phone,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Filter,
  Check,
} from 'lucide-react';
import { Project, ProjectServiceType } from '@/lib/types';
import { PROJECTS, GALLERY_CATEGORIES } from '@/data/projects';
import { SITE } from '@/data/site';

export default function GalleryClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [beforeAfterOnly, setBeforeAfterOnly] = useState<boolean>(false);
  const [activeModalId, setActiveModalId] = useState<string | null>(null);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: PROJECTS.length };
    PROJECTS.forEach((p) => {
      counts[p.serviceType] = (counts[p.serviceType] || 0) + 1;
    });
    return counts;
  }, []);

  // Count before & after items
  const beforeAfterCount = useMemo(() => {
    return PROJECTS.filter((p) => p.isBeforeAfter).length;
  }, []);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      // Category filter
      if (selectedCategory !== 'all' && project.serviceType !== selectedCategory) {
        return false;
      }
      // Before & After filter
      if (beforeAfterOnly && !project.isBeforeAfter) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = project.title.toLowerCase().includes(q);
        const matchesLocation = project.location.toLowerCase().includes(q);
        const matchesDesc = project.description.toLowerCase().includes(q);
        const matchesService = project.serviceLabel.toLowerCase().includes(q);
        const matchesDetails = project.details?.some((d) => d.toLowerCase().includes(q));
        if (!matchesTitle && !matchesLocation && !matchesDesc && !matchesService && !matchesDetails) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, searchQuery, beforeAfterOnly]);

  // Active project modal item
  const activeProjectIndex = useMemo(() => {
    if (!activeModalId) return -1;
    return filteredProjects.findIndex((p) => p.id === activeModalId);
  }, [activeModalId, filteredProjects]);

  const activeProject = useMemo(() => {
    if (activeProjectIndex === -1) return null;
    return filteredProjects[activeProjectIndex];
  }, [activeProjectIndex, filteredProjects]);

  // Modal navigation handlers
  const handlePrevProject = useCallback(() => {
    if (activeProjectIndex > 0) {
      setActiveModalId(filteredProjects[activeProjectIndex - 1].id);
    } else if (filteredProjects.length > 0) {
      setActiveModalId(filteredProjects[filteredProjects.length - 1].id);
    }
  }, [activeProjectIndex, filteredProjects]);

  const handleNextProject = useCallback(() => {
    if (activeProjectIndex < filteredProjects.length - 1) {
      setActiveModalId(filteredProjects[activeProjectIndex + 1].id);
    } else if (filteredProjects.length > 0) {
      setActiveModalId(filteredProjects[0].id);
    }
  }, [activeProjectIndex, filteredProjects]);

  // Keyboard navigation for lightbox modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeModalId) return;
      if (e.key === 'Escape') {
        setActiveModalId(null);
      } else if (e.key === 'ArrowLeft') {
        handlePrevProject();
      } else if (e.key === 'ArrowRight') {
        handleNextProject();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalId, handlePrevProject, handleNextProject]);

  // Prevent background scroll when modal open
  useEffect(() => {
    if (activeModalId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeModalId]);

  return (
    <div className="min-h-screen bg-cream/40 pb-20 pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Controls Bar: Categories, Search & Filters */}
        <div className="mb-10 rounded-2xl border border-cream-line bg-white p-4 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            
            {/* Search Input */}
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by area, service, or keyword (e.g. Walker, mulch)..."
                className="w-full rounded-xl border border-cream-line bg-cream/30 py-2.5 pl-11 pr-10 font-archivo text-base text-midnight-moss placeholder-gray-400 focus:border-safety-orange focus:bg-white focus:outline-none focus:ring-2 focus:ring-safety-orange/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-cream hover:text-midnight-moss"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Before / After Toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setBeforeAfterOnly((v) => !v)}
                className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 font-archivo text-sm font-bold transition-all ${
                  beforeAfterOnly
                    ? 'border-safety-orange bg-safety-orange/10 text-safety-orange-deep shadow-sm'
                    : 'border-cream-line bg-cream/30 text-midnight-moss/80 hover:bg-cream hover:text-midnight-moss'
                }`}
              >
                <div
                  className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
                    beforeAfterOnly ? 'border-safety-orange bg-safety-orange text-midnight-moss' : 'border-gray-400'
                  }`}
                >
                  {beforeAfterOnly && <Check className="h-3 w-3 stroke-[3]" />}
                </div>
                <Sparkles className="h-4 w-4 text-safety-orange-deep" />
                <span>Before & After Only</span>
                <span className="ml-1 rounded-full bg-cream px-2 py-0.5 font-mono text-xs text-midnight-moss">
                  {beforeAfterCount}
                </span>
              </button>

              {(selectedCategory !== 'all' || searchQuery || beforeAfterOnly) && (
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                    setBeforeAfterOnly(false);
                  }}
                  className="font-archivo text-sm font-bold text-gray-500 hover:text-safety-orange-deep underline underline-offset-4"
                >
                  Reset All
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-cream-line pt-4">
            <span className="mr-1 hidden font-archivo text-xs font-bold uppercase tracking-wider text-midnight-moss/50 sm:inline-block">
              <Filter className="inline h-3.5 w-3.5 mr-1" />
              Filter By:
            </span>
            {GALLERY_CATEGORIES.map((cat) => {
              const count = categoryCounts[cat.id] || 0;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`group flex items-center gap-2 rounded-xl px-4 py-2 font-archivo text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-midnight-moss text-white shadow-md'
                      : 'bg-cream/60 text-midnight-moss/80 hover:bg-cream hover:text-midnight-moss'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-mono transition-colors ${
                      isActive
                        ? 'bg-safety-orange text-midnight-moss font-bold'
                        : 'bg-white text-midnight-moss/60 group-hover:bg-cream-line'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Header */}
        <div className="mb-6 flex items-center justify-between px-1">
          <p className="font-archivo text-sm font-bold text-midnight-moss/70">
            Showing <span className="text-midnight-moss font-extrabold">{filteredProjects.length}</span> {filteredProjects.length === 1 ? 'project' : 'projects'}
            {selectedCategory !== 'all' && (
              <span> in <span className="text-safety-orange-deep">{GALLERY_CATEGORIES.find((c) => c.id === selectedCategory)?.label}</span></span>
            )}
            {beforeAfterOnly && <span className="text-safety-orange-deep"> (Before & After Transformations)</span>}
          </p>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="my-12 rounded-2xl border border-cream-line bg-white p-12 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cream text-safety-orange-deep">
              <Search className="h-8 w-8" />
            </div>
            <h3 className="mb-2 font-anton text-2xl text-midnight-moss">No Projects Match Your Search</h3>
            <p className="mx-auto mb-6 max-w-md font-archivo text-base text-midnight-moss/70">
              We couldn&apos;t find any gallery items matching &quot;{searchQuery}&quot;. Try clearing filters or searching for another term like &quot;Walker&quot; or &quot;mulch&quot;.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setBeforeAfterOnly(false);
              }}
              className="rounded-xl bg-safety-orange px-6 py-3 font-archivo text-base font-bold text-midnight-moss shadow-md hover:bg-safety-orange/90"
            >
              Show All Projects
            </button>
          </div>
        )}

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveModalId(project.id)}
              className="group cursor-pointer break-inside-avoid overflow-hidden rounded-2xl border border-cream-line bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-safety-orange/40"
            >
              {/* Image Container */}
              <div className="relative w-full overflow-hidden bg-cream">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  width={600}
                  height={project.aspectRatio === 'tall' ? 800 : project.aspectRatio === 'square' ? 600 : 450}
                  className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Badges on Image */}
                <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                  <span className="rounded-lg bg-midnight-moss/90 px-2.5 py-1 font-archivo text-xs font-bold text-white backdrop-blur-sm shadow-sm">
                    {project.serviceLabel}
                  </span>
                  {project.isBeforeAfter && (
                    <span className="flex items-center gap-1 rounded-lg bg-safety-orange px-2.5 py-1 font-archivo text-xs font-extrabold uppercase tracking-wider text-midnight-moss shadow-sm">
                      <Sparkles className="h-3 w-3" />
                      Before / After
                    </span>
                  )}
                </div>

                <div className="absolute right-3 top-3">
                  <span className="flex items-center gap-1 rounded-lg bg-white/90 px-2.5 py-1 font-archivo text-xs font-bold text-midnight-moss backdrop-blur-sm shadow-sm">
                    <MapPin className="h-3 w-3 text-safety-orange-deep" />
                    {project.location}
                  </span>
                </div>

                {/* Hover overlay button */}
                <div className="absolute inset-0 flex items-center justify-center bg-midnight-moss/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 font-archivo text-sm font-bold text-midnight-moss shadow-lg transition-transform duration-300 group-hover:scale-105">
                    <Maximize2 className="h-4 w-4 text-safety-orange-deep" />
                    View Details
                  </span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 sm:p-5">
                <h3 className="mb-2 font-anton text-lg leading-snug tracking-wide text-midnight-moss group-hover:text-safety-orange-deep transition-colors">
                  {project.title}
                </h3>
                <p className="line-clamp-2 font-archivo text-sm text-midnight-moss/70 leading-relaxed">
                  {project.description}
                </p>

                {project.serviceSlug && (
                  <Link
                    href={`/services/${project.serviceSlug}`}
                    onClick={(event) => event.stopPropagation()}
                    className="mt-3 inline-flex items-center gap-1 font-archivo text-xs font-extrabold uppercase tracking-wide text-primary hover:text-safety-orange-deep hover:underline"
                  >
                    See {project.serviceLabel} service <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}

                <div className="mt-4 flex items-center justify-between border-t border-cream-line pt-3 font-archivo text-xs font-bold text-midnight-moss/60">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-sage" />
                    Photo from our work
                  </span>
                  <span className="text-safety-orange-deep font-extrabold group-hover:underline">
                    Expand &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox */}
        {activeProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-midnight-moss/80 p-4 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setActiveModalId(null)}
          >
            <div
              className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-cream-line bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Modal Controls Header */}
              <div className="flex items-center justify-between border-b border-cream-line bg-cream px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="rounded-lg bg-midnight-moss px-3 py-1 font-archivo text-xs font-bold text-white">
                    {activeProject.serviceLabel}
                  </span>
                  <span className="flex items-center gap-1 font-archivo text-xs font-bold text-midnight-moss/80">
                    <MapPin className="h-3.5 w-3.5 text-safety-orange-deep" />
                    {activeProject.location}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevProject}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-cream-line bg-white text-midnight-moss hover:bg-cream-line hover:text-safety-orange-deep transition-colors"
                    aria-label="Previous project"
                    title="Previous Project (Left Arrow)"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleNextProject}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-cream-line bg-white text-midnight-moss hover:bg-cream-line hover:text-safety-orange-deep transition-colors"
                    aria-label="Next project"
                    title="Next Project (Right Arrow)"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setActiveModalId(null)}
                    className="ml-2 flex h-9 w-9 items-center justify-center rounded-full bg-midnight-moss text-white hover:bg-safety-orange-deep transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="grid grid-cols-1 overflow-y-auto lg:grid-cols-12">
                
                {/* Modal Image Area */}
                <div className="relative bg-black/95 lg:col-span-7 flex items-center justify-center min-h-[300px] lg:min-h-[480px] p-2">
                  <Image
                    src={activeProject.image}
                    alt={activeProject.imageAlt}
                    width={1000}
                    height={800}
                    className="h-auto max-h-[70vh] w-full object-contain rounded-lg"
                    priority
                  />
                  {activeProject.isBeforeAfter && (
                    <div className="absolute left-4 top-4 rounded-lg bg-safety-orange px-3 py-1.5 font-archivo text-xs font-extrabold uppercase tracking-wider text-midnight-moss shadow-md">
                      Before & After Transformation
                    </div>
                  )}
                </div>

                {/* Modal Info Column */}
                <div className="flex flex-col justify-between p-6 lg:col-span-5 bg-white">
                  <div>
                    <h2 className="mb-3 font-anton text-2xl text-midnight-moss leading-tight">
                      {activeProject.title}
                    </h2>

                    <div className="mb-4 flex items-center gap-4 border-b border-cream-line pb-4 font-archivo text-xs text-midnight-moss/70">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-safety-orange-deep" />
                        {activeProject.location}
                      </span>
                      {activeProject.completedDate && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-sage" />
                          {new Date(activeProject.completedDate).toLocaleDateString('en-US', {
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      )}
                    </div>

                    <p className="mb-5 font-archivo text-sm text-midnight-moss/80 leading-relaxed">
                      {activeProject.description}
                    </p>

                    {activeProject.details && activeProject.details.length > 0 && (
                      <div className="mb-6 rounded-2xl border border-cream-line bg-cream/40 p-4">
                        <h4 className="mb-2.5 font-anton text-sm uppercase tracking-wider text-midnight-moss">
                          Work Completed:
                        </h4>
                        <ul className="space-y-2 font-archivo text-xs text-midnight-moss/90">
                          {activeProject.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-safety-orange-deep" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Modal CTA Buttons */}
                  <div className="space-y-2.5 border-t border-cream-line pt-4">
                    <Link
                      href={`/quote?service=${activeProject.serviceSlug || 'lawn-mowing'}`}
                      onClick={() => setActiveModalId(null)}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-safety-orange py-3.5 px-4 font-archivo text-sm font-extrabold uppercase tracking-wide text-midnight-moss shadow-md hover:bg-safety-orange/90 transition-all text-center"
                    >
                      Request a Similar Quote <ArrowRight className="h-4 w-4" />
                    </Link>

                    <a
                      href={SITE.phoneHref}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-cream-line bg-cream/50 py-3 px-4 font-archivo text-sm font-bold text-midnight-moss hover:bg-cream transition-colors text-center"
                    >
                      <Phone className="h-4 w-4 text-safety-orange-deep" /> Call {SITE.phone}
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
