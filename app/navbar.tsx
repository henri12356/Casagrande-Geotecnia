"use client";

import { Button } from "@/components/ui/button";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  Variants,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { IconType } from "react-icons";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import { LuChevronRight, LuMenu, LuX } from "react-icons/lu";

import proyectos from "@/app/data/proyectos.json";

// --- Tipos ---
interface NavLink {
  href: string;
  label: string;
  subLinks?: { href: string; label: string }[];
}

interface SocialLink {
  href: string;
  label: string;
  Icon: IconType;
}

interface ContactInfoItemProps {
  text: string;
  href: string;
}

type Proyecto = { categoria?: string };

// --- Data base ---
const baseNavLinks: NavLink[] = [
  { href: "/", label: "Inicio" },
  {
    href: "/servicios",
    label: "Servicios",
    subLinks: [
      { href: "/servicios/geologia", label: "Geología" },
      { href: "/servicios/geotecnia", label: "Geotecnia" },
      { href: "/servicios/geofisica", label: "Geofísica" },
      { href: "/servicios/geomecanica", label: "Geomecánica" },
      { href: "/servicios/ensayo-de-campo", label: "Ensayos de campo" },
      { href: "/servicios/mecanica-de-suelos", label: "Mecánica de suelos" },
      {
        href: "/servicios/evaluacion-estructural",
        label: "Evaluación estructural",
      },
      {
        href: "/servicios/hidrogeologia",
        label: "Hidrología e hidrogeología",
      },
      {
        href: "/servicios/control-de-calidad",
        label: "Control de calidad en obras",
      },
      {
        href: "/laboratorio/laboratorio-de-suelos",
        label: "Laboratorio de materiales",
      },
    ],
  },
  { href: "/proyectos", label: "Proyectos", subLinks: [] },
  { href: "/calidad", label: "Gestión de calidad" },
  { href: "/nosotros", label: "Nosotros" },
];

const socialLinks: SocialLink[] = [
  {
    href: "https://www.facebook.com/profile.php?id=100077864046528&locale=es_LA",
    label: "Facebook",
    Icon: FaFacebook,
  },
  {
    href: "https://www.linkedin.com/in/david-guerra-4a9b44385/",
    label: "LinkedIn",
    Icon: FaLinkedin,
  },
  {
    href: "https://www.youtube.com/channel/UCIuOx9lfSBKoJ5QsRlQjA7Q",
    label: "YouTube",
    Icon: FaYoutube,
  },
  {
    href: "https://www.instagram.com/casagrandegeotecnia/",
    label: "Instagram",
    Icon: FaInstagram,
  },
  {
    href: "https://www.tiktok.com/@casagrandegeotecnia?lang=es-419",
    label: "TikTok",
    Icon: FaTiktok,
  },
];

const contactInfo: ContactInfoItemProps[] = [
  { text: "Equipos", href: "/equipos" },
  { text: "Blog", href: "/blog" },
  { text: "Contacto", href: "/contacto" },
];

const whatsappLink =
  "https://api.whatsapp.com/send?phone=51962835652&text=Hola!%20Estoy%20interesado%20en%20sus%20servicios.";

// --- Validar página activa ---
const isHrefActive = (
  pathname: string,
  currentQuery: string,
  href: string
) => {
  if (href === "/") return pathname === "/";

  // Para links con query, por ejemplo: /proyectos?categoria=Geotecnia
  if (href.includes("?")) {
    const [hrefPath, hrefQuery] = href.split("?");

    if (pathname !== hrefPath) return false;

    const targetParams = new URLSearchParams(hrefQuery);
    const currentParams = new URLSearchParams(currentQuery);

    return Array.from(targetParams.entries()).every(
      ([key, value]) => currentParams.get(key) === value
    );
  }

  return pathname === href || pathname.startsWith(`${href}/`);
};

const isNavLinkActive = (
  pathname: string,
  currentQuery: string,
  link: NavLink
) => {
  const parentActive = isHrefActive(pathname, currentQuery, link.href);

  const childActive =
    link.subLinks?.some((subLink) =>
      isHrefActive(pathname, currentQuery, subLink.href)
    ) ?? false;

  return parentActive || childActive;
};

// ===== utilidad: click-outside sin romper clicks internos =====
function useClickOutside<T extends HTMLElement>(onOutside: () => void) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) onOutside();
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [onOutside]);

  return ref;
}

// --- Sub-Components ---
const ContactInfoItem = ({ text, href }: ContactInfoItemProps) => (
  <a
    href={href}
    className="flex items-center gap-2 rounded-2xl px-3 py-3 text-xs text-white transition-all duration-300 hover:bg-[#b79770] hover:text-[#182C45]"
    rel="noopener noreferrer"
  >
    <span className="text-[15px] font-bold">{text}</span>
  </a>
);

const SocialLinks = ({ className = "text-white" }: { className?: string }) => (
  <div className="flex items-center gap-4">
    {socialLinks.map(({ href, label, Icon }) => (
      <a
        key={href}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={`
          group flex h-9 w-9 items-center justify-center rounded-full
          transition-all duration-300 ease-out
          hover:-translate-y-1 hover:scale-110 hover:bg-[#b79770] hover:shadow-[0_8px_20px_rgba(183,151,112,0.35)]
          ${className}
        `}
      >
        <Icon className="h-5 w-5 transition-all duration-300 group-hover:rotate-6 group-hover:text-[#182C45]" />
      </a>
    ))}
  </div>
);

const WhatsAppNumber = ({ mobile = false }: { mobile?: boolean }) => (
  <a
    href={whatsappLink}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Escribir por WhatsApp al 962 835 652"
    className={`flex items-center gap-2 font-bold transition-all duration-300 ${
      mobile
        ? "w-full justify-center rounded-xl bg-[#25D366] px-4 py-3 text-base text-white shadow-md hover:bg-[#1ebe5d]"
        : "rounded-2xl bg-white/10 px-3 py-2 text-sm text-white hover:bg-[#25D366] hover:text-white"
    }`}
  >
    <FaWhatsapp className={mobile ? "h-5 w-5" : "h-4 w-4"} />
    <span>{mobile ? "WhatsApp: 962 835 652" : "962 835 652"}</span>
  </a>
);

const TopBar = () => (
  <div className="hidden bg-[#182C45] py-2 text-white md:block">
    <div className="container mx-auto flex h-10 max-w-7xl items-center justify-between px-4 2xl:max-w-[1500px]">
      <SocialLinks />

      <div className="flex items-center gap-4">
        {contactInfo.map((item) => (
          <ContactInfoItem key={item.text} {...item} />
        ))}
        <WhatsAppNumber />
      </div>
    </div>
  </div>
);

// --- Línea activa del menú ---
const NavUnderline = ({ active }: { active: boolean }) => (
  <span
    className={`
      absolute left-1/2 -bottom-1 h-[3px] -translate-x-1/2 rounded-full bg-[#b79770]
      shadow-[0_0_12px_rgba(183,151,112,0.65)]
      transition-all duration-300 ease-out
      ${
        active
          ? "w-9 opacity-100"
          : "w-0 opacity-0 group-hover:w-9 group-hover:opacity-100"
      }
    `}
  />
);

// ===== DesktopMenu =====
const DesktopMenu = ({
  pathname,
  currentQuery,
  hoverVariants,
  openDropdown,
  setOpenDropdown,
  navLinksData,
}: {
  pathname: string;
  currentQuery: string;
  hoverVariants: Variants;
  openDropdown: string | null;
  setOpenDropdown: (label: string | null) => void;
  navLinksData: NavLink[];
}) => {
  const dropdownVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 10,
      pointerEvents: "none",
      transition: { duration: 0.2 },
    },
    visible: {
      opacity: 1,
      y: 0,
      pointerEvents: "auto",
      transition: { duration: 0.2 },
    },
  };

  const wrapRef = useClickOutside<HTMLDivElement>(() => setOpenDropdown(null));

  return (
    <div ref={wrapRef}>
      <nav className="hidden items-center md:flex lg:flex">
        {navLinksData.map((link) => {
          const active = isNavLinkActive(pathname, currentQuery, link);
          const dropdownActive = openDropdown === link.label || active;

          return (
            <motion.div
              key={link.label}
              initial="initial"
              whileHover="hover"
              variants={hoverVariants}
              className="relative"
            >
              {!link.subLinks || link.subLinks.length === 0 ? (
                <Link
                  href={link.href}
                  className={`
                    group relative rounded-2xl px-6 py-2 font-semibold transition-all duration-300
                    hover:bg-[#182C45]/5 hover:text-[#b79770]
                    ${active ? "font-bold text-[#182C45]" : "text-[#182C45]"}
                  `}
                >
                  {link.label}
                  <NavUnderline active={active} />
                </Link>
              ) : (
                <>
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === link.label ? null : link.label
                      )
                    }
                    className={`
                      dropdown-toggle-button group relative flex cursor-pointer items-center gap-1 rounded-2xl px-4 py-2
                      font-semibold transition-all duration-300 hover:bg-[#182C45]/5 hover:text-[#b79770] focus:outline-none
                      ${
                        dropdownActive
                          ? "font-bold text-[#182C45]"
                          : "text-[#182C45]"
                      }
                    `}
                  >
                    {link.label}
                    <NavUnderline active={active} />
                  </button>

                  <AnimatePresence>
                    {openDropdown === link.label && (
                      <motion.ul
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="absolute left-0 top-full z-50 mt-3 w-72 origin-top-left rounded-2xl border border-[#182C45]/10 bg-white p-2 shadow-[0_18px_45px_rgba(24,44,69,0.18)]"
                        onClickCapture={(e) => e.stopPropagation()}
                      >
                        <li>
                          <Link
                            href={link.href}
                            prefetch={false}
                            onClick={() =>
                              setTimeout(() => setOpenDropdown(null), 0)
                            }
                            className={`
                              block w-full rounded-xl px-4 py-3 text-left text-sm font-bold transition-all duration-300
                              ${
                                isHrefActive(pathname, currentQuery, link.href)
                                  ? "bg-[#b79770]/15 text-[#182C45]"
                                  : "text-[#182C45] hover:bg-[#b79770]/15 hover:text-[#182C45]"
                              }
                            `}
                          >
                            Ver todos {link.label.toLowerCase()}
                          </Link>
                        </li>

                        <li className="my-2 h-px bg-[#182C45]/10" />

                        {link.subLinks.map((subLink) => {
                          const subActive = isHrefActive(
                            pathname,
                            currentQuery,
                            subLink.href
                          );

                          return (
                            <li key={subLink.href}>
                              <Link
                                href={subLink.href}
                                prefetch={false}
                                className={`
                                  block rounded-xl px-4 py-2.5 text-sm transition-all duration-300
                                  ${
                                    subActive
                                      ? "bg-[#b79770]/15 font-semibold text-[#182C45]"
                                      : "text-gray-700 hover:bg-[#182C45]/5 hover:text-[#b79770]"
                                  }
                                `}
                                onClick={() =>
                                  setTimeout(() => setOpenDropdown(null), 0)
                                }
                              >
                                {subLink.label}
                              </Link>
                            </li>
                          );
                        })}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </>
              )}
            </motion.div>
          );
        })}
      </nav>
    </div>
  );
};

const MobileMenuButton = ({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}) => (
  <motion.button
    className="z-[100] rounded-md p-2 text-[#182C45] transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b79770] md:hidden"
    onClick={toggle}
    aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
    whileTap={{ scale: 0.9 }}
  >
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={isOpen ? "x" : "menu"}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {isOpen ? <LuX className="h-7 w-7" /> : <LuMenu className="h-7 w-7" />}
      </motion.div>
    </AnimatePresence>
  </motion.button>
);

// --- Navbar interno que usa useSearchParams ---
const NavbarContent = () => {
  const pathname = usePathname() || "";
  const searchParams = useSearchParams();
  const currentQuery = searchParams.toString();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navLinksData = useMemo(() => {
    const categorias = Array.from(
      new Set(
        (proyectos as Proyecto[])
          .map((p) => (p.categoria ?? "").trim())
          .filter(Boolean)
      )
    ).sort((a, b) => a.localeCompare(b, "es"));

    const subLinksProyectos = categorias.map((cat) => ({
      href: `/proyectos?categoria=${encodeURIComponent(cat)}`,
      label: cat,
    }));

    return baseNavLinks.map((link) =>
      link.label === "Proyectos"
        ? { ...link, subLinks: subLinksProyectos }
        : link
    );
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (mobileMenuOpen) return;

    const isAtTop = latest < 50;
    const isScrollingUp = latest < prevScrollY;

    setIsVisible(isAtTop || isScrollingUp);
    setPrevScrollY(latest);
  });

  useEffect(() => setIsVisible(true), []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname, currentQuery]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  const navbarVariants: Variants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120, damping: 20 },
    },
    hidden: {
      y: "-100%",
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const mobileMenuContainerVariants: Variants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "beforeChildren",
        staggerChildren: 0.08,
      },
    },
    closed: {
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "afterChildren",
      },
    },
  };

  const mobileMenuItemVariants: Variants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 },
    },
  };

  const mobileSubmenuVariants: Variants = {
    closed: {
      height: 0,
      opacity: 0,
      marginTop: 0,
      transition: { duration: 0.2 },
    },
    open: {
      height: "auto",
      opacity: 1,
      marginTop: "8px",
      transition: { duration: 0.2 },
    },
  };

  const linkHoverVariants: Variants = {
    hover: { scale: 1.04 },
    initial: { scale: 1 },
  };

  const overlayVariants: Variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  return (
    <>
      <motion.header
        className="fixed left-0 right-0 top-0 z-50 bg-white shadow-sm backdrop-blur-md"
        variants={navbarVariants}
        animate={isVisible ? "visible" : "hidden"}
        initial="hidden"
      >
        <TopBar />

        <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between md:h-[110px] 2xl:max-w-[1500px]">
          <Link href="/" className="flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Image
                src="/logocasagrande.svg"
                alt="Logo de Casagrande Geotecnia"
                width={100}
                height={48}
                className="h-11 w-auto max-md:px-2 md:h-14"
              />
            </motion.div>
          </Link>

          <DesktopMenu
            pathname={pathname}
            currentQuery={currentQuery}
            hoverVariants={linkHoverVariants}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            navLinksData={navLinksData}
          />

          <div className="hidden items-center space-x-4 md:flex lg:flex">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="cursor-pointer rounded-lg border border-[#182C45] bg-white px-4 py-2 font-bold text-[#182C45] shadow-md transition duration-300 ease-in-out hover:bg-[#b79770] hover:text-[#182C45]"
              >
                ASESORÍA TÉCNICA
              </Button>
            </a>

            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="cursor-pointer rounded-lg border-2 border-[#182C45] bg-[#182C45] px-4 py-2 font-bold text-white shadow-md transition duration-300 ease-in-out hover:bg-white hover:text-[#182C45]"
              >
                ¡COTIZAR AHORA!
              </Button>
            </a>
          </div>

          <MobileMenuButton
            isOpen={mobileMenuOpen}
            toggle={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              variants={mobileMenuContainerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed right-0 top-0 z-50 flex h-full w-4/5 max-w-sm flex-col bg-white shadow-xl"
            >
              <div className="flex items-center justify-between border-b p-4">
                <span className="font-bold text-[#182C45]">Menú</span>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Cerrar menú"
                  className="cursor-pointer rounded-md p-1 text-[#182C4E] transition-colors hover:bg-gray-100 hover:text-[#373737]"
                >
                  <LuX className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex-grow space-y-2 overflow-y-auto p-4">
                {navLinksData.map((link) => {
                  const active = isNavLinkActive(pathname, currentQuery, link);

                  return (
                    <motion.div
                      key={link.label}
                      variants={mobileMenuItemVariants}
                    >
                      {!link.subLinks || link.subLinks.length === 0 ? (
                        <Link
                          href={link.href}
                          className={`
                            block rounded-lg border-l-4 px-4 py-3 text-base font-bold transition-all duration-300
                            ${
                              active
                                ? "border-[#b79770] bg-[#b79770]/15 text-[#182C45]"
                                : "border-transparent text-[#182C45] hover:bg-gray-100"
                            }
                          `}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <MobileAccordion
                          link={link}
                          pathname={pathname}
                          currentQuery={currentQuery}
                          onNavigate={() => setMobileMenuOpen(false)}
                          mobileSubmenuVariants={mobileSubmenuVariants}
                        />
                      )}
                    </motion.div>
                  );
                })}

                <div className="space-y-5 pt-2">
                  {contactInfo.map((item) => (
                    <a
                      key={item.text}
                      href={item.href}
                      className="flex items-center gap-3 pl-4 font-bold text-[#182C45] transition-colors hover:text-[#b79770]"
                    >
                      <span>{item.text}</span>
                    </a>
                  ))}
                </div>
              </nav>

              <div className="space-y-4 border-t p-4 pb-20 text-sm">
                <div className="w-full space-y-2">
                  <WhatsAppNumber mobile />

                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <Button
                      size="lg"
                      className="w-full cursor-pointer rounded-lg border border-[#182C45] bg-white font-semibold text-[#182C45] transition duration-300 ease-in-out hover:bg-[#182C45] hover:text-white"
                    >
                      ASESORÍA TÉCNICA
                    </Button>
                  </a>

                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <Button
                      size="lg"
                      className="w-full cursor-pointer rounded-lg bg-[#182C45] font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-[#373737]"
                    >
                      ¡COTIZAR AHORA!
                    </Button>
                  </a>
                </div>

                <div className="border-t pt-4">
                  <SocialLinks className="text-[#182C45]" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// --- Acordeón móvil ---
function MobileAccordion({
  link,
  pathname,
  currentQuery,
  onNavigate,
  mobileSubmenuVariants,
}: {
  link: NavLink;
  pathname: string;
  currentQuery: string;
  onNavigate: () => void;
  mobileSubmenuVariants: Variants;
}) {
  const parentActive = isNavLinkActive(pathname, currentQuery, link);
  const [open, setOpen] = useState(parentActive);

  useEffect(() => {
    if (parentActive) setOpen(true);
  }, [parentActive]);

  return (
    <div
      className={`
        rounded-lg border transition-all duration-300
        ${
          parentActive
            ? "border-[#b79770]/40 bg-[#b79770]/10"
            : "border-gray-200"
        }
      `}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={`
          flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-bold transition-all duration-300
          ${
            parentActive
              ? "text-[#182C45]"
              : "text-[#182C45] hover:bg-gray-100"
          }
        `}
      >
        <span>{link.label}</span>
        <LuChevronRight
          className={`h-5 w-5 transition-transform duration-300 ${
            open ? "rotate-90 text-[#b79770]" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileSubmenuVariants}
            className="overflow-hidden"
          >
            <div className="flex flex-col border-t">
              <Link
                href={link.href}
                className={`
                  block px-5 py-3 text-[15px] font-medium transition-all duration-300
                  ${
                    isHrefActive(pathname, currentQuery, link.href)
                      ? "bg-[#b79770]/15 text-[#182C45]"
                      : "text-[#182C45] hover:bg-[#b79770]/10"
                  }
                `}
                onClick={onNavigate}
              >
                Ver todos {link.label.toLowerCase()}
              </Link>

              {link.subLinks?.map((subLink) => {
                const subActive = isHrefActive(
                  pathname,
                  currentQuery,
                  subLink.href
                );

                return (
                  <Link
                    key={subLink.href}
                    href={subLink.href}
                    className={`
                      block px-5 py-3 text-[15px] transition-all duration-300
                      ${
                        subActive
                          ? "bg-[#b79770]/15 font-semibold text-[#182C45]"
                          : "text-[#182C45] hover:bg-gray-50 hover:text-[#b79770]"
                      }
                    `}
                    onClick={onNavigate}
                  >
                    {subLink.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Export corregido con Suspense ---
export default function Navbar() {
  return (
    <Suspense fallback={null}>
      <NavbarContent />
    </Suspense>
  );
}