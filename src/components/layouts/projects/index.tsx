import AnimatedGradientTextWithoutBorder from "@/components/ui/animated-gradient-text-without-border";
import { BorderBeam } from "@/components/ui/border-beam";
import { cn } from "@/lib/utils";
import { ProjectType } from "@/types/ProjectType";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaGithub, FaLink, FaExternalLinkAlt } from "react-icons/fa";
import { RiCloseLargeFill } from "react-icons/ri";
import { HiOutlineEye } from "react-icons/hi";
import useSWR from "swr";

export default function ProjectsLayout() {
  // FETCH PROJECTS DATA ⚽
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR("/api/project", fetcher);
  useEffect(() => {
    if (data) {
      setProjects(data.data.filter((item: ProjectType) => item.show));
    }
  }, [data]);
  // FETCH PROJECTS DATA ⚽

  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [activeImage, setActiveImage] = useState<string>("");
  const [detailProject, setDetailProject] = useState<ProjectType | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModal(false);
        setActiveImage("");
        setDetailProject(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeModal || detailProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeModal, detailProject]);

  return (
    <div id="projects" className="pt-6 mt-10">
      <AnimatedGradientTextWithoutBorder className="">
        <span
          className={cn(
            `text-3xl sm:text-4xl md:text-6xl py-1.5 font-poppins font-bold inline animate-gradient bg-gradient-to-r from-color-1 via-color-2 to-color-1 bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
          )}
        >
          My Projects
        </span>
      </AnimatedGradientTextWithoutBorder>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 md:gap-12 justify-stretch px-6 md:px-16 mt-5 overflow-hidden">
        {projects.map((item, idx) => (
          <ProjectCard
            key={idx}
            item={item}
            onImageClick={(img) => {
              setActiveModal(true);
              setActiveImage(img);
            }}
            onDetailClick={() => setDetailProject(item)}
          />
        ))}
      </div>

      {/* IMAGE ZOOM MODAL */}
      <div
        onClick={() => {
          setActiveModal(false);
          setActiveImage("");
        }}
        role="dialog"
        aria-modal="true"
        className={`flex justify-center items-center backdrop-blur-sm fixed inset-0 duration-100 overflow-hidden ${
          activeModal ? "opacity-100 z-[60]" : "opacity-0 -z-10"
        }`}
      >
        {activeImage && (
          <Image
            onClick={(event) => event.stopPropagation()}
            className={`${
              activeModal ? "scale-100" : "scale-0"
            } w-[90%] h-auto sm:w-auto sm:h-[80%] md:h-[90%] object-cover md:w-auto duration-300 ease-in-out border border-gray-950`}
            style={{ boxShadow: "0 0 10px 5px rgba(0,0,0,0.5)" }}
            src={activeImage}
            alt="zoom-image"
            width={500}
            height={500}
          />
        )}
        <button
          className="p-3 text-white absolute top-2 right-2 md:top-4 md:right-4 cursor-pointer text-2xl md:text-base"
          onClick={() => {
            setActiveModal(false);
            setActiveImage("");
          }}
        >
          <RiCloseLargeFill />
        </button>
      </div>

      {/* PROJECT DETAIL MODAL */}
      <ProjectDetailModal
        project={detailProject}
        onClose={() => setDetailProject(null)}
        onImageClick={(img) => {
          setActiveModal(true);
          setActiveImage(img);
        }}
      />
    </div>
  );
}

// ─── TECH STACK WITH 2-ROW CLAMP ─────────────────────────────────────────────
function ClampedTechStack({ techStack }: { techStack: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const [visibleCount, setVisibleCount] = useState(techStack.length);

  const calculateVisible = useCallback(() => {
    const container = containerRef.current;
    const badge = badgeRef.current;
    if (!container) return;

    const pills = Array.from(container.children).filter(
      (el) => el !== badgeRef.current,
    ) as HTMLElement[];

    if (pills.length === 0) return;

    // 1. Reset tampilan
    pills.forEach((p) => {
      p.style.display = '';
      p.classList.remove('!hidden');
    });
    if (badge) badge.style.display = "none";

    // 2. Cek apakah semua muat dalam 2 baris tanpa badge
    const rowTops = new Set<number>();
    pills.forEach((p) => rowTops.add(p.offsetTop));

    if (rowTops.size <= 2) {
      setVisibleCount(pills.length);
      return;
    }

    // We need to clamp. Show the badge so it occupies space.
    if (badge) badge.style.display = "";

    let lo = 0;
    let hi = pills.length;
    let best = 0;

    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);

      // Tampilkan mid pill pertama, sembunyikan sisanya
      pills.forEach((p, i) => {
        if (i < mid) {
          p.style.display = '';
          p.classList.remove('!hidden');
        } else {
          p.style.display = 'none';
          p.classList.add('!hidden');
        }
      });

      // Hitung jumlah baris dari elemen yang terlihat (pills + badge)
      const visibleElements = [
        ...pills.slice(0, mid),
        badgeRef.current!,
      ].filter(Boolean) as HTMLElement[];

      const tops = new Set(visibleElements.map((el) => el.offsetTop));

      if (tops.size <= 2) {
        best = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }

    // 4. Kembalikan tampilan asli (React akan handle via className)
    pills.forEach((p) => {
      p.style.display = '';
      p.classList.remove('!hidden');
    });
    if (badge) badge.style.display = "";

    setVisibleCount(best-1);
  }, [techStack]);

  useEffect(() => {
    // Delay pertama agar layout selesai render
    const timer = setTimeout(calculateVisible, 0);

    window.addEventListener('resize', calculateVisible);
    return () => {
      window.removeEventListener('resize', calculateVisible);
      clearTimeout(timer);
    };
  }, [calculateVisible]);

  const hiddenCount = techStack.length - visibleCount;

  return (
    <div
      ref={containerRef}
      className="flex flex-wrap gap-1 md:gap-2 font-light pr-8"
    >
      {techStack.map((tech, idx) => (
        <span
          key={tech} // lebih baik pakai value unik jika ada
          className={`bg-[#272729] text-slate-300 text-xs font-medium px-3 py-1 rounded-full border border-gray-600 ${
            idx >= visibleCount ? 'hidden' : ''
          }`}
        >
          {tech}
        </span>
      ))}

      {hiddenCount > 0 && (
        <span
          ref={badgeRef}
          className="bg-transparent text-slate-500 text-xs font-medium px-2 py-1 rounded-full border border-gray-700 border-dashed"
        >
          +{hiddenCount} more
        </span>
      )}
    </div>
  );
}

// ─── PROJECT CARD ────────────────────────────────────────────────────────────
function ProjectCard({
  item,
  onImageClick,
  onDetailClick,
}: {
  item: ProjectType;
  onImageClick: (img: string) => void;
  onDetailClick: () => void;
}) {
  return (
    <div
      className="h-[30rem] md:h-full md:aspect-square relative overflow-hidden border border-gray-700 pt-8 pl-8"
      style={{ borderRadius: "0 2rem 0 2rem" }}
    >
      <h1 className="font-urbanist font-bold text-2xl md:text-4xl text-slate-200 w-full inline-block">
        {item.title}
      </h1>
      <p className="font-urbanist text-slate-500 text-sm md:text-base mt-1 md:mt-2 pr-8 line-clamp-2">
        {item.description}
      </p>
      <div className="mt-2 sm:mt-1 md:mt-4">
        <ClampedTechStack techStack={item.techStack} />
      </div>

      {/* View Detail CTA */}
      <div className="flex justify-end pr-8 mt-3 md:mt-4">
        <button
          onClick={onDetailClick}
          className="z-10 relative flex items-center gap-2 text-sm font-urbanist text-slate-600 hover:text-white border border-gray-800 hover:border-color-1 rounded-full px-4 py-1.5 transition-all duration-300 cursor-pointer group"
        >
          <HiOutlineEye className="text-base group-hover:text-color-1 transition-colors" />
          View Detail
        </button>
      </div>

      <div className="absolute top-0 w-full h-[30rem] md:h-[33rem]">
        <a
          className="text-white text-3xl bottom-7 md:bottom-2 right-16 md:right-14 absolute hover:text-color-1 duration-300"
          href={item.url}
        >
          <FaLink />
        </a>
        <a
          className="text-white text-3xl bottom-7 md:bottom-2 right-28 md:right-[6.5rem] absolute hover:text-color-2 duration-300"
          href={item.githubLink}
        >
          <FaGithub />
        </a>

        <div
          className={`absolute w-fit bottom-24 md:bottom-16 right-12 md:right-14 cursor-pointer ${
            item.webViewImage ? "block" : "hidden"
          }`}
          onClick={() => onImageClick(item.webViewImage)}
        >
          <div className="relative mx-auto border-[#3C3C3D] bg-[#3C3C3D] border-[5px] md:border-[8px] rounded-t-xl h-[115px] max-w-[201px] md:h-[172px] md:max-w-[301px]">
            <div className="rounded-lg overflow-hidden h-[104px] md:h-[156px] bg-[#3C3C3D]">
              <Image
                width={500}
                height={500}
                src={item.webViewImage}
                className="h-[104px] md:h-[156px] w-full rounded-lg object-cover"
                alt=""
              />
            </div>
          </div>
          <div className="relative mx-auto bg-[#1e1e1e] rounded-b-xl rounded-t-sm h-[11px] md:h-[17px] w-[234px] md:w-[351px]">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[37px] md:w-[56px] h-[3px] md:h-[5px] bg-[#3C3C3D]"></div>
          </div>
        </div>

        <div
          className={`absolute w-fit -left-1 md:left-5 bottom-16 md:bottom-2 cursor-pointer ${
            item.mobileViewImage ? "block" : "hidden"
          }`}
          onClick={() => onImageClick(item.mobileViewImage)}
        >
          <div className="relative border-[#3C3C3D] bg-[#3C3C3D] border-[4.5px] md:border-[7px] rounded-[1rem] h-[200px] md:h-[300px] w-[100px] md:w-[150px] shadow-xl">
            <div className="h-[6px] w-[49px] md:h-[9px] md:w-[74px] bg-[#3C3C3D] top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
            <div className="h-[15px] w-[1px] md:h-[23px] md:w-[1.5px] bg-[#3C3C3D] absolute -start-[6px] md:-start-[8px] top-[41px] md:top-[62px] rounded-s-lg"></div>
            <div className="h-[15px] w-[1px] md:h-[23px] md:w-[1.5px] bg-[#3C3C3D] absolute -start-[6px] md:-start-[8px] top-[59px] md:top-[89px] rounded-s-lg"></div>
            <div className="h-[20px] w-[1px] md:h-[32px] md:w-[1.5px] bg-[#3C3C3D] absolute -end-[6px] md:-end-[8px] top-[47px] md:top-[71px] rounded-e-lg"></div>
            <div className="rounded-[.6rem] overflow-hidden w-[91px] h-[191px] md:w-[136px] md:h-[286px] bg-white dark:bg-[#3C3C3D]">
              <Image
                height={500}
                width={500}
                src={item.mobileViewImage}
                className="w-[91px] h-[191px] md:w-[136px] md:h-[286px] duration-300 object-cover"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <BorderBeam
        colorFrom="#FF00AA"
        colorTo="#00FFF1"
        size={250}
        duration={12}
        delay={9}
      />
      <BorderBeam
        colorFrom="#FF00AA"
        colorTo="#00FFF1"
        size={250}
        duration={12}
        delay={27}
      />
    </div>
  );
}

// ─── PROJECT DETAIL MODAL ────────────────────────────────────────────────────
function ProjectDetailModal({
  project,
  onClose,
  onImageClick,
}: {
  project: ProjectType | null;
  onClose: () => void;
  onImageClick: (img: string) => void;
}) {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center backdrop-blur-md bg-black/60 p-0 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#1a1a1a] border border-gray-700 rounded-t-2xl sm:rounded-2xl w-full sm:w-[92%] max-w-3xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-700"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="sticky float-right top-5 right-5 text-gray-400"
        >
          <RiCloseLargeFill className="text-lg" />
        </button>

        {/* Header */}
        <div className="p-5 pb-0 sm:p-6 sm:pb-0 md:p-8 md:pb-0 clear-both">
          <h2 className="font-urbanist font-bold text-xl sm:text-2xl md:text-3xl text-white">
            {project.title}
          </h2>
          <p className="font-urbanist text-slate-400 text-sm md:text-base mt-2 sm:mt-3 leading-relaxed">
            {project.description}
          </p>

          {/* Links */}
          <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-urbanist text-slate-300 bg-white/5 hover:bg-white/10 border border-gray-600 hover:border-color-1 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-300"
              >
                <FaExternalLinkAlt className="text-[10px] sm:text-xs text-color-1" />
                Live Demo
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-urbanist text-slate-300 bg-white/5 hover:bg-white/10 border border-gray-600 hover:border-color-2 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-300"
              >
                <FaGithub className="text-xs sm:text-sm text-color-2" />
                Source Code
              </a>
            )}
          </div>
        </div>

        {/* Tech Stack - Full list */}
        <div className="px-5 sm:px-6 md:px-8 mt-4 sm:mt-5">
          <h3 className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 font-urbanist mb-2 sm:mb-3">
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="bg-white/5 text-slate-300 text-[11px] sm:text-xs font-medium px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-gray-600"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Screenshots */}
        {(project.webViewImage || project.mobileViewImage) && (
          <div className="px-5 sm:px-6 md:px-8 mt-5 sm:mt-6">
            <h3 className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 font-urbanist mb-2 sm:mb-3">
              Screenshots
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start">
              {project.webViewImage && (
                <div
                  className="flex-1 w-full cursor-pointer group rounded-xl overflow-hidden border border-gray-700 hover:border-gray-500 transition-colors"
                  onClick={() => {
                    onClose();
                    setTimeout(() => onImageClick(project.webViewImage), 150);
                  }}
                >
                  <div className="relative">
                    <Image
                      src={project.webViewImage}
                      alt={`${project.title} - Web View`}
                      width={800}
                      height={500}
                      className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <HiOutlineEye className="text-white text-xl sm:text-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-urbanist px-3 py-1.5 sm:py-2">
                    Desktop View
                  </p>
                </div>
              )}
              {project.mobileViewImage && (
                <div
                  className="w-28 sm:w-32 md:w-40 cursor-pointer group rounded-xl overflow-hidden border border-gray-700 hover:border-gray-500 transition-colors flex-shrink-0"
                  onClick={() => {
                    onClose();
                    setTimeout(
                      () => onImageClick(project.mobileViewImage),
                      150,
                    );
                  }}
                >
                  <div className="relative">
                    <Image
                      src={project.mobileViewImage}
                      alt={`${project.title} - Mobile View`}
                      width={300}
                      height={600}
                      className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <HiOutlineEye className="text-white text-xl sm:text-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-urbanist px-3 py-1.5 sm:py-2">
                    Mobile View
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bottom spacing */}
        <div className="h-5 sm:h-6 md:h-8" />
      </div>
    </div>
  );
}
