"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  Variants,
} from "framer-motion";
import { LuMenu, LuX, LuChevronRight } from "react-icons/lu";
import { IconType } from "react-icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaYoutube } from "react-icons/fa";
import { Button } from "@/components/ui/button";

// 👇 importa tus proyectos para leer categorías
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

// --- Data base (tu diseño original) ---
const baseNavLinks: NavLink[] = [
  { href: "/", label: "Inicio" },
  {
    href: "/servicios",
    label: "Servicios",
    subLinks: [
      { href: "/servicios/geologia", label: " Geológicos" },
      { href: "/servicios/geotecnia", label: " Geotécnicos" },
      { href: "/servicios/laboratorio-de-suelo", label: "Laboratorio de suelos" },
      { href: "/servicios/geofisica", label: " Geofísicos" },
      { href: "/servicios/hidrogeologia", label: " Hidrológicos e Hidrogeológicos" },
      { href: "/servicios/geomecanica", label: " Geomecánicos" },
      { href: "/servicios/ensayo-de-campo", label: "Ensayos de Campo" },
      { href: "/servicios/mecanica-de-suelos", label: "Mecánica de Suelos" },
      { href: "/servicios/control-de-calidad", label: "Control de Calidad en Obra" },
      { href: "/servicios/evaluacion-estructural", label: "Evaluación Estructural" },
    ],
  },
  { href: "/proyectos", label: "Proyectos", subLinks: [] }, // <- se rellena dinámicamente
  { href: "/calidad", label: "Gestion de calidad" },
  { href: "/nosotros", label: "Nosotros" },
];

const socialLinks: SocialLink[] = [
  { href: "https://www.facebook.com/profile.php?id=100077864046528&locale=es_LA", label: "Facebook", Icon: FaFacebook },
  { href: "https://www.linkedin.com/in/david-guerra-4a9b44385/", label: "LinkedIn", Icon: FaLinkedin },
  { href: "https://www.youtube.com/channel/UCIuOx9lfSBKoJ5QsRlQjA7Q", label: "YouTube", Icon: FaYoutube },
  { href: "https://www.instagram.com/casagrandegeotecnia/", label: "Instagram", Icon: FaInstagram },
  { href: "https://www.tiktok.com/@casagrandegeotecnia?lang=es-419", label: "TikTok", Icon: FaTiktok },
];

const contactInfo: ContactInfoItemProps[] = [
  { text: "Equipos", href: "/equipos" },
  { text: "Blog", href: "/blog" },
  { text: "Contacto", href: "/contacto" },
];

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

// --- Sub-Components (mismo look) ---
const ContactInfoItem = ({ text, href }: ContactInfoItemProps) => (
  <a
    href={href}
    className="flex items-center gap-2 text-xs hover:bg-white/5 py-3 rounded-2xl px-3 text-white transition-colors duration-200"
    rel="noopener noreferrer"
  >
    <span className="text-[15px] font-bold">{text}</span>
  </a>
);

const SocialLinks = ({ className = "text-white" }: { className?: string }) => (
  <div className="flex items-center gap-4 ">
    {socialLinks.map(({ href, label, Icon }) => (
      <a
        key={href}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={`transition-opacity hover:opacity-80 ${className}`}
      >
        <Icon className="h-5 w-5" />
      </a>
    ))}
  </div>
);

const TopBar = () => (
  <div className="hidden bg-[#182C45] text-white md:block py-2 ">
    <div className="container  flex h-10 items-center justify-between px-4 max-w-7xl 2xl:max-w-[1500px]   mx-auto">
      <SocialLinks />
      <div className="flex items-center gap-6">
        {contactInfo.map((item) => (
          <ContactInfoItem key={item.text} {...item} />
        ))}
      </div>
    </div>
  </div>
);

// ===== DesktopMenu (respeta tu diseño; solo añade categorías y arregla click) =====
const DesktopMenu = ({
  pathname,
  hoverVariants,
  openDropdown,
  setOpenDropdown,
  navLinksData,
}: {
  pathname: string;
  hoverVariants: Variants;
  openDropdown: string | null;
  setOpenDropdown: (label: string | null) => void;
  navLinksData: NavLink[];
}) => {
  const dropdownVariants: Variants = {
    hidden: { opacity: 0, y: 10, pointerEvents: "none", transition: { duration: 0.2 } },
    visible: { opacity: 1, y: 0, pointerEvents: "auto", transition: { duration: 0.2 } },
  };

  const wrapRef = useClickOutside<HTMLDivElement>(() => setOpenDropdown(null));

  return (
    <div ref={wrapRef}>
      <nav className="hidden items-center md:flex lg:flex ">
        {navLinksData.map((link) => (
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
                className={`relative px-6 py-2 font-semibold text-[#182C45] transition-colors duration-300 hover:bg-[#182C45]/5  rounded-2xl ${
                  pathname === link.href ? "font-bold text-[#182C45]" : "hover:text-sky-950"
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-1 left-0 h-0.5 w-full bg-[#182C45]"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                  />
                )}
              </Link>
            ) : (
              <>
                <button
                  onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                  className={`dropdown-toggle-button relative cursor-pointer flex items-center gap-1 px-4 py-2 font-semibold text-[#182C45] transition-colors duration-300  hover:bg-[#182C45]/5  rounded-2xl ${
                    openDropdown === link.label ? "font-bold text-[#182C45]" : "hover:text-sky-950"
                  } focus:outline-none`}
                >
                  {link.label}
                </button>

                <AnimatePresence>
                  {openDropdown === link.label && (
                    <motion.ul
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="absolute top-full left-0 mt-2 w-64 origin-top-left rounded-md bg-white p-2 shadow-lg"
                      onClickCapture={(e) => e.stopPropagation()} // <- evita cierre antes de navegar
                    >
                      <li>
                        <Link
                          href={link.href}
                          prefetch={false}
                          onClick={() => setTimeout(() => setOpenDropdown(null), 0)}
                          className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-[#182C45] hover:bg-[#182C45]/10"
                        >
                          Ver todos {link.label.toLowerCase()}
                        </Link>
                      </li>
                      <li className="my-1 h-px bg-gray-200" />
                      {link.subLinks.map((subLink) => (
                        <li key={subLink.href}>
                          <Link
                            href={subLink.href}
                            prefetch={false}
                            className={`block rounded-md px-3 py-2 text-sm ${
                              pathname === subLink.href
                                ? "font-semibold text-sky-900 bg-gray-100"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                            onClick={() => setTimeout(() => setOpenDropdown(null), 0)}
                          >
                            {subLink.label}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </>
            )}
          </motion.div>
        ))}
      </nav>
    </div>
  );
};

// --- Mobile (sin cambios visuales) ---
const MobileMenuButton = ({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) => (
  <motion.button
    className="z-[100] rounded-md p-2 text-[#182C45] transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-[#373737] md:hidden"
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

// --- Navbar principal ---
const Navbar = () => {
  const pathname = usePathname() || "";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // 👇 genera subLinks de Proyectos a partir de categorías del JSON (dinámico)
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

    return baseNavLinks.map((l) =>
      l.label === "Proyectos" ? { ...l, subLinks: subLinksProyectos } : l
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
  }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  const navbarVariants: Variants = {
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 20 } },
    hidden: { y: "-100%", opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  };
  const mobileMenuContainerVariants: Variants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30, when: "beforeChildren", staggerChildren: 0.08 } },
    closed: { x: "100%", transition: { duration: 0.3, ease: "easeInOut", when: "afterChildren" } },
  };
  const mobileMenuItemVariants: Variants = {
    open: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  };
  const mobileSubmenuVariants: Variants = {
    closed: { height: 0, opacity: 0, marginTop: 0, transition: { duration: 0.2 } },
    open: { height: "auto", opacity: 1, marginTop: "8px", transition: { duration: 0.2 } },
  };
  const linkHoverVariants: Variants = { hover: { scale: 1.05 }, initial: { scale: 1 } };
  const overlayVariants: Variants = { visible: { opacity: 1 }, hidden: { opacity: 0 } };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50  bg-white shadow-sm backdrop-blur-md"
        variants={navbarVariants}
        animate={isVisible ? "visible" : "hidden"}
        initial="hidden"
      >
        <TopBar />
        <div className="  max-w-7xl 2xl:max-w-[1500px]   container mx-auto flex h-20 items-center justify-between  md:h-[110px]">
          <Link href="/" className="flex items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
              <Image src="/logocasagrande.svg" alt="Logo de Casagrande Geotecnia" width={100} height={48} className="h-11 w-auto md:h-13 max-md:px-2" />
            </motion.div>
          </Link>

          {/* Menú de escritorio (tu diseño) */}
          <DesktopMenu
            pathname={pathname}
            hoverVariants={linkHoverVariants}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            navLinksData={navLinksData}
          />

          {/* Botones (sin cambios) */}
          <div className="hidden items-center space-x-4 md:flex lg:flex">
            <a href="https://api.whatsapp.com/send?phone=51962835652&text=Hola!%20Estoy%20interesado%20en%20sus%20servicios." target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white border cursor-pointer border-[#182C45] text-[#182C45] font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-[#182C45] hover:text-white">
                ASESORÍA TÉCNICA
              </Button>
            </a>
            <a href="https://api.whatsapp.com/send?phone=51945513323&text=Hola!%20Estoy%20interesado%20en%20sus%20servicios." target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#182C45] cursor-pointer text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 border-2 ease-in-out hover:bg-white hover:text-[#182C45] hover:border-[#182C45] border-[#182C45]">
                ¡COTIZAR AHORA!
              </Button>
            </a>
          </div>

          {/* Botón menú móvil */}
          <MobileMenuButton isOpen={mobileMenuOpen} toggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
        </div>
      </motion.header>

      {/* Menú móvil (mismo diseño) */}
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
              className="fixed top-0 right-0 z-50 flex h-full w-4/5 max-w-sm flex-col bg-white shadow-xl"
            >
              <div className="flex items-center justify-between border-b p-4">
                <span className="font-bold text-[#182C45]">Menú</span>
                <button onClick={() => setMobileMenuOpen(false)} aria-label="Cerrar menú" className="rounded-md p-1 text-[#182C4E] transition-colors cursor-pointer hover:bg-gray-100 hover:text-[#373737]">
                  <LuX className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex-grow space-y-2 overflow-y-auto p-4">
                {navLinksData.map((link) => (
                  <motion.div key={link.label} variants={mobileMenuItemVariants}>
                    {!link.subLinks || link.subLinks.length === 0 ? (
                      <Link
                        href={link.href}
                        className={`block rounded-lg px-4 py-3 text-base font-bold transition-colors ${
                          pathname === link.href ? "bg-gray-300 text-black" : "text-[#182C45] hover:bg-gray-100"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <MobileAccordion
                        link={link}
                        pathname={pathname}
                        onNavigate={() => setMobileMenuOpen(false)}
                        mobileSubmenuVariants={mobileSubmenuVariants}
                      />
                    )}
                  </motion.div>
                ))}
                <div className="space-y-5">
                  {contactInfo.map((item) => (
                    <a key={item.text} href={item.href} className="flex font-bold pl-4  items-center gap-3 text-[#182C45] transition-colors hover:text-red-600">
                      <span>{item.text}</span>
                    </a>
                  ))}
                </div>
              </nav>

              <div className="space-y-4 border-t p-4 pb-20 text-sm">
                <div className="w-full space-y-2 text-4xl">
                  <a href="https://api.whatsapp.com/send?phone=51962835652&text=Hola!%20Estoy%20interesado%20en%20sus%20servicios." target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="w-full bg-white border border-[#182C45] text-[#182C45] font-semibold rounded-lg transition duration-300 ease-in-out cursor-pointer hover:bg-[#182C45] hover:text-white">
                      ASESORÍA TÉCNICA
                    </Button>
                  </a>
                  <a href="https://api.whatsapp.com/send?phone=51945513323&text=Hola!%20Estoy%20interesado%20en%20sus%20servicios." target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="w-full bg-[#182C45] cursor-pointer text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-[#373737]">
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

// --- Acordeón móvil (mismo look & feel) ---
function MobileAccordion({
  link,
  pathname,
  onNavigate,
  mobileSubmenuVariants,
}: {
  link: NavLink;
  pathname: string;
  onNavigate: () => void;
  mobileSubmenuVariants: Variants;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-lg border">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-bold ${
          open ? "text-sky-900" : "text-[#182C45] hover:bg-gray-100"
        }`}
      >
        <span>{link.label}</span>
        <LuChevronRight className={`h-5 w-5 transition-transform ${open ? "rotate-90" : ""}`} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial="closed" animate="open" exit="closed" variants={mobileSubmenuVariants} className="overflow-hidden">
            <div className="flex flex-col border-t">
              <Link href={link.href} className="block px-5 py-3 text-[15px] font-medium text-sky-800 hover:bg-sky-50" onClick={onNavigate}>
                Ver todos {link.label.toLowerCase()}
              </Link>
              {link.subLinks?.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className={`block px-5 py-3 text-[15px] ${pathname === s.href ? "bg-gray-100 text-sky-900 font-medium" : "text-[#182C45] hover:bg-gray-50"}`}
                  onClick={onNavigate}
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;
