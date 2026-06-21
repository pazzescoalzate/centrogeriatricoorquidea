import { useState, useEffect, useCallback } from 'react';
import { galleryImages, faqs } from './data.js';

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [lbOpen, setLbOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  // El primer FAQ inicia abierto, igual que en el original (faqs:[true,false,...])
  const [openFaqs, setOpenFaqs] = useState([true, false, false, false, false, false]);

  const toggleNav = () => setNavOpen((v) => !v);
  const closeNav = () => setNavOpen(false);

  const openLb = (i) => {
    setIdx(i);
    setLbOpen(true);
    document.body.style.overflow = 'hidden';
  };
  const closeLb = useCallback(() => {
    setLbOpen(false);
    document.body.style.overflow = '';
  }, []);
  const next = useCallback(
    () => setIdx((i) => (i + 1) % galleryImages.length),
    []
  );
  const prev = useCallback(
    () => setIdx((i) => (i - 1 + galleryImages.length) % galleryImages.length),
    []
  );

  const toggleFaq = (i) =>
    setOpenFaqs((arr) => arr.map((v, j) => (j === i ? !v : v)));

  // Navegación por teclado en el lightbox (igual que componentDidMount original)
  useEffect(() => {
    const onKey = (ev) => {
      if (!lbOpen) return;
      if (ev.key === 'Escape') closeLb();
      else if (ev.key === 'ArrowRight') next();
      else if (ev.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lbOpen, closeLb, next, prev]);

  const cur = galleryImages[idx] || galleryImages[0];

  return (
    <div className="font-sans text-ink bg-white antialiased overflow-x-hidden selection:bg-orchid-pale">

      {/* ============ HEADER ============ */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/85 backdrop-blur-xl border-b border-orchid-mist/60">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between gap-6">
          <a href="#inicio" className="flex items-center shrink-0" aria-label="Fundación Centro Geriátrico Orquídea - Inicio">
            <img src="assets/logo-orquidea.svg" alt="Fundación Centro Geriátrico Orquídea" className="h-12 w-auto" width="200" height="63" />
          </a>
          <nav className="hidden lg:flex items-center gap-9" aria-label="Menú principal">
            <a href="#por-que" className="text-[15px] font-medium text-ink/70 hover:text-wine transition-colors">Por qué elegirnos</a>
            <a href="#servicios" className="text-[15px] font-medium text-ink/70 hover:text-wine transition-colors">Servicios</a>
            <a href="#instalaciones" className="text-[15px] font-medium text-ink/70 hover:text-wine transition-colors">Instalaciones</a>
            <a href="#ubicacion" className="text-[15px] font-medium text-ink/70 hover:text-wine transition-colors">Ubicación</a>
            <a href="#preguntas" className="text-[15px] font-medium text-ink/70 hover:text-wine transition-colors">Preguntas</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="tel:+573100000000" className="flex sm:hidden items-center gap-2 text-[15px] font-semibold text-wine hover:text-wine-dark transition-colors">
              <i className="fas fa-phone-alt text-sm"></i><span className="hidden">310 000 0000</span>
            </a>
            <a href="https://wa.me/573100000000?text=Hola,%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20la%20Fundaci%C3%B3n%20Centro%20Geri%C3%A1trico%20Orqu%C3%ADdea%20en%20Pereira" target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center gap-2 bg-teal hover:bg-teal-deep text-white text-[14px] font-semibold px-5 py-2.5 rounded-full transition-colors shadow-soft">
              <i className="fab fa-whatsapp text-base"></i> Escríbenos
            </a>
            <button onClick={toggleNav} className="lg:hidden h-10 w-10 grid place-items-center rounded-full text-wine hover:bg-orchid-pale/40 transition-colors" aria-label="Abrir menú">
              <i className="fas fa-bars text-lg"></i>
            </button>
          </div>
        </div>
      </header>

      {/* ============ MOBILE NAV ============ */}
      {navOpen && (
        <div className="fixed inset-0 z-[60] bg-wine-deep text-white flex flex-col items-center justify-center gap-8 lg:hidden">
          <button onClick={closeNav} className="absolute top-6 right-6 h-11 w-11 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 transition-colors" aria-label="Cerrar menú">
            <i className="fas fa-times text-xl"></i>
          </button>
          <a href="#por-que" onClick={closeNav} className="text-2xl font-semibold">Por qué elegirnos</a>
          <a href="#servicios" onClick={closeNav} className="text-2xl font-semibold">Servicios</a>
          <a href="#instalaciones" onClick={closeNav} className="text-2xl font-semibold">Instalaciones</a>
          <a href="#ubicacion" onClick={closeNav} className="text-2xl font-semibold">Ubicación</a>
          <a href="#preguntas" onClick={closeNav} className="text-2xl font-semibold">Preguntas</a>
          <a href="https://wa.me/573100000000" target="_blank" rel="noopener noreferrer" onClick={closeNav} className="mt-2 inline-flex items-center gap-2 bg-teal hover:bg-teal-deep text-white font-semibold px-7 py-3.5 rounded-full transition-colors">
            <i className="fab fa-whatsapp text-lg"></i> WhatsApp
          </a>
        </div>
      )}

      {/* ============ HERO ============ */}
      <section id="inicio" className="relative pt-28 lg:pt-36 pb-20 lg:pb-28 overflow-hidden">
        <div className="pointer-events-none absolute -top-32 -right-24 h-[480px] w-[480px] rounded-full bg-orchid-pale/50 blur-[120px]"></div>
        <div className="pointer-events-none absolute top-40 -left-32 h-[420px] w-[420px] rounded-full bg-teal/25 blur-[120px]"></div>
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="reveal-load">
            <span className="inline-flex items-center gap-2 bg-wine/8 text-wine text-[13px] font-semibold tracking-wide px-4 py-1.5 rounded-full ring-1 ring-wine/10">
              <i className="fas fa-map-marker-alt"></i> Pereira, Risaralda · Cra 18 #23-45
            </span>
            <h1 className="mt-6 text-[2.6rem] sm:text-6xl lg:text-[4rem] font-extrabold leading-[1.05] tracking-tight text-ink">
              Tu ser querido merece el mejor <span className="text-teal-deep">cuidado y amor</span>
            </h1>
            <p className="mt-6 text-lg text-ink/65 max-w-xl leading-relaxed">
              En Fundación Centro Geriátrico Orquídea cuidamos a los adultos mayores como si fueran familia. Atención 24/7, enfermería especializada y un equipo que los hace sentir en casa, en el corazón de Pereira.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="https://wa.me/573100000000?text=Hola,%20quiero%20saber%20m%C3%A1s%20sobre%20la%20Fundaci%C3%B3n%20Centro%20Geri%C3%A1trico%20Orqu%C3%ADdea%20en%20Pereira" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 bg-teal hover:bg-teal-deep text-white text-base font-semibold px-7 py-4 rounded-full shadow-soft hover:shadow-lift transition-all hover:-translate-y-0.5">
                <i className="fab fa-whatsapp text-xl"></i> Escribir por WhatsApp
              </a>
              <a href="tel:+573100000000" className="inline-flex sm:hidden items-center gap-2.5 text-base font-semibold text-teal-deep px-6 py-4 rounded-full ring-1.5 ring-teal/40 hover:bg-teal/10 transition-colors">
                <i className="fas fa-phone-alt"></i> Llamar ahora
              </a>
            </div>
          </div>
          <div className="reveal-load delay relative pt-4 pb-4">

            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              <div className="relative rounded-[1.4rem] overflow-hidden ring-1 ring-orchid-mist/60 shadow-soft aspect-[4/5] mt-6">
                <img src="https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=500&q=80" alt="Adulto mayor sonriente atendido en la Fundación Centro Geriátrico Orquídea, Pereira" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="relative rounded-[1.4rem] overflow-hidden ring-1 ring-orchid-mist/60 shadow-soft aspect-[4/5]">
                <img src="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=500&q=80" alt="Adulta mayor feliz disfrutando de actividades en centro geriátrico de Pereira" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="relative rounded-[1.4rem] overflow-hidden ring-1 ring-orchid-mist/60 shadow-soft aspect-[4/5]">
                <img src="https://images.unsplash.com/photo-1559963110-71b394e7494d?auto=format&fit=crop&w=500&q=80" alt="Enfermera acompañando con cariño a una adulta mayor en la Fundación Orquídea" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="relative rounded-[1.4rem] overflow-hidden ring-1 ring-orchid-mist/60 shadow-soft aspect-[4/5] -mt-6">
                <img src="https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?auto=format&fit=crop&w=500&q=80" alt="Adulto mayor activo y saludable en el centro geriátrico de Pereira, Risaralda" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>

            {/* badges flotantes individuales */}
            <div className="floaty absolute top-[3%] -left-4 sm:-left-8 z-20 bg-white rounded-2xl shadow-lift ring-1 ring-orchid-mist/60 pl-3 pr-4 py-2.5 flex items-center gap-2.5">
              <div className="h-9 w-9 shrink-0 grid place-items-center rounded-full bg-orchid-pale/50 text-wine text-sm"><i className="fas fa-clock"></i></div>
              <div className="leading-tight"><strong className="block text-[13px] font-bold text-ink">Atención 24/7</strong><span className="text-[11px] text-ink/55">Todos los días del año</span></div>
            </div>

            <div className="floaty absolute top-[6%] right-2 sm:-right-4 z-20 bg-white rounded-2xl shadow-lift ring-1 ring-orchid-mist/60 pl-3 pr-4 py-2.5 flex items-center gap-2.5" style={{ animationDelay: '0.8s' }}>
              <div className="h-9 w-9 shrink-0 grid place-items-center rounded-full bg-orchid-pale/50 text-wine text-sm"><i className="fas fa-user-md"></i></div>
              <div className="leading-tight"><strong className="block text-[13px] font-bold text-ink">Personal especializado</strong><span className="text-[11px] text-ink/55">Enfermeros y fisioterapeutas</span></div>
            </div>

            <div className="floaty absolute bottom-[3%] -right-3 sm:-right-8 z-20 bg-white rounded-2xl shadow-lift ring-1 ring-orchid-mist/60 pl-3 pr-4 py-2.5 flex items-center gap-2.5" style={{ animationDelay: '1.6s' }}>
              <div className="h-9 w-9 shrink-0 grid place-items-center rounded-full bg-orchid-pale/50 text-wine text-sm"><i className="fas fa-heart"></i></div>
              <div className="leading-tight"><strong className="block text-[13px] font-bold text-ink">Trato familiar</strong><span className="text-[11px] text-ink/55">Como en casa</span></div>
            </div>

            <div className="floaty absolute bottom-[2%] left-4 sm:-left-6 z-20 bg-white rounded-2xl shadow-lift ring-1 ring-orchid-mist/60 pl-3 pr-4 py-2.5 flex items-center gap-2.5" style={{ animationDelay: '2.2s' }}>
              <div className="h-9 w-9 shrink-0 grid place-items-center rounded-full bg-orchid-pale/50 text-wine text-sm"><i className="fas fa-shield-alt"></i></div>
              <div className="leading-tight"><strong className="block text-[13px] font-bold text-ink">Supervisión constante</strong><span className="text-[11px] text-ink/55">Vigilancia las 24 horas</span></div>
            </div>
          </div>
        </div>
      </section>
      {/* ============ POR QUÉ ELEGIRNOS ============ */}
      <section id="por-que" className="py-20 lg:py-28 bg-[#FAF7FA]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="reveal max-w-2xl mx-auto text-center mb-14">
            <span className="inline-block text-[13px] font-bold uppercase tracking-[0.14em] text-teal-deep mb-3">Nuestra promesa</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.7rem] font-extrabold tracking-tight text-ink leading-tight">¿Por qué elegirnos para cuidar a tu familia?</h2>
            <p className="mt-4 text-lg text-ink/60">Entendemos lo difícil que es tomar esta decisión. Por eso, hacemos todo para que sientas confianza desde el primer día.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="reveal group bg-white rounded-3xl p-8 ring-1 ring-orchid-mist/60 hover:ring-orchid hover:shadow-lift transition-all hover:-translate-y-1.5">
              <div className="h-14 w-14 grid place-items-center rounded-2xl bg-orchid-pale/40 text-wine text-xl mb-5 group-hover:bg-wine group-hover:text-white transition-colors"><i className="fas fa-history"></i></div>
              <h3 className="text-lg font-bold text-ink mb-2">Experiencia en el Sector</h3>
              <p className="text-[15px] text-ink/60 leading-relaxed">Años de experiencia en el cuidado de adultos mayores respaldan cada decisión que tomamos. Sabemos qué funciona.</p>
            </div>
            <div className="reveal group bg-white rounded-3xl p-8 ring-1 ring-orchid-mist/60 hover:ring-orchid hover:shadow-lift transition-all hover:-translate-y-1.5">
              <div className="h-14 w-14 grid place-items-center rounded-2xl bg-orchid-pale/40 text-wine text-xl mb-5 group-hover:bg-wine group-hover:text-white transition-colors"><i className="fas fa-hands-helping"></i></div>
              <h3 className="text-lg font-bold text-ink mb-2">Atención Personalizada</h3>
              <p className="text-[15px] text-ink/60 leading-relaxed">Cada adulto mayor es único. Diseñamos un plan de cuidado individual adaptado a sus necesidades, gustos y salud.</p>
            </div>
            <div className="reveal group bg-white rounded-3xl p-8 ring-1 ring-orchid-mist/60 hover:ring-orchid hover:shadow-lift transition-all hover:-translate-y-1.5">
              <div className="h-14 w-14 grid place-items-center rounded-2xl bg-orchid-pale/40 text-wine text-xl mb-5 group-hover:bg-wine group-hover:text-white transition-colors"><i className="fas fa-eye"></i></div>
              <h3 className="text-lg font-bold text-ink mb-2">Supervisión Constante</h3>
              <p className="text-[15px] text-ink/60 leading-relaxed">Vigilancia las 24 horas. Nuestro equipo está presente siempre para atender cualquier situación con rapidez.</p>
            </div>
            <div className="reveal group bg-white rounded-3xl p-8 ring-1 ring-orchid-mist/60 hover:ring-orchid hover:shadow-lift transition-all hover:-translate-y-1.5">
              <div className="h-14 w-14 grid place-items-center rounded-2xl bg-orchid-pale/40 text-wine text-xl mb-5 group-hover:bg-wine group-hover:text-white transition-colors"><i className="fas fa-mobile-alt"></i></div>
              <h3 className="text-lg font-bold text-ink mb-2">Comunicación con la Familia</h3>
              <p className="text-[15px] text-ink/60 leading-relaxed">Te mantenemos informado del estado de tu ser querido. Fotos, llamadas y actualizaciones regulares.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SERVICIOS ============ */}
      <section id="servicios" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="reveal max-w-2xl mx-auto text-center mb-14">
            <span className="inline-block text-[13px] font-bold uppercase tracking-[0.14em] text-teal-deep mb-3">Lo que ofrecemos</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.7rem] font-extrabold tracking-tight text-ink leading-tight">Servicios para el bienestar de tu adulto mayor en Pereira</h2>
            <p className="mt-4 text-lg text-ink/60">Todo lo que necesitas en un solo lugar, en nuestra sede en la Cra 18 #23-45, Pereira.</p>
          </div>
          <div className="flex flex-col gap-16 lg:gap-24">

            {/* Servicio 1 */}
            <div className="reveal grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="relative rounded-[2rem] overflow-hidden ring-1 ring-orchid-mist/60 shadow-soft aspect-[4/3] lg:h-[440px]">
                <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80" alt="Enfermera administrando medicamentos a adulto mayor en la Fundación Centro Geriátrico Orquídea Pereira" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
              </div>
              <div>
                <span className="inline-flex items-center gap-2 bg-orchid-pale/40 text-wine text-[12px] font-bold uppercase tracking-[0.12em] px-3.5 py-1.5 rounded-full"><i className="fas fa-pills"></i> Atención médica</span>
                <h3 className="mt-5 text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight text-ink leading-[1.1]">Enfermería y Administración de Medicamentos</h3>
                <p className="mt-5 text-lg text-ink/60 leading-relaxed">Enfermeros profesionales administran los medicamentos de forma puntual y segura, siguiendo las indicaciones médicas de cada residente.</p>
                <a href="https://wa.me/573100000000?text=Quiero%20informaci%C3%B3n%20sobre%20enfermer%C3%ADa%20en%20la%20Fundaci%C3%B3n%20Centro%20Geri%C3%A1trico%20Orqu%C3%ADdea" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2.5 bg-teal hover:bg-teal-deep text-white font-semibold px-6 py-3.5 rounded-full transition-colors shadow-soft"><i className="fab fa-whatsapp text-lg"></i> Más información</a>
              </div>
            </div>

            {/* Servicio 2 */}
            <div className="reveal grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="relative rounded-[2rem] overflow-hidden ring-1 ring-orchid-mist/60 shadow-soft aspect-[4/3] lg:h-[440px] lg:order-2">
                <img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=900&q=80" alt="Sesión de fisioterapia para adulto mayor en centro geriátrico Pereira" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="lg:order-1">
                <span className="inline-flex items-center gap-2 bg-orchid-pale/40 text-wine text-[12px] font-bold uppercase tracking-[0.12em] px-3.5 py-1.5 rounded-full"><i className="fas fa-walking"></i> Movilidad</span>
                <h3 className="mt-5 text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight text-ink leading-[1.1]">Fisioterapia Especializada</h3>
                <p className="mt-5 text-lg text-ink/60 leading-relaxed">Sesiones de fisioterapia para mejorar la movilidad, reducir el dolor y mantener la independencia de cada adulto mayor por el mayor tiempo posible.</p>
                <a href="https://wa.me/573100000000?text=Quiero%20informaci%C3%B3n%20sobre%20fisioterapia%20en%20la%20Fundaci%C3%B3n%20Centro%20Geri%C3%A1trico%20Orqu%C3%ADdea" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2.5 bg-teal hover:bg-teal-deep text-white font-semibold px-6 py-3.5 rounded-full transition-colors shadow-soft"><i className="fab fa-whatsapp text-lg"></i> Más información</a>
              </div>
            </div>

            {/* Servicio 3 */}
            <div className="reveal grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="relative rounded-[2rem] overflow-hidden ring-1 ring-orchid-mist/60 shadow-soft aspect-[4/3] lg:h-[440px]">
                <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80" alt="Adulto mayor en entrenamiento físico y cognitivo en centro geriátrico Pereira" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
              </div>
              <div>
                <span className="inline-flex items-center gap-2 bg-orchid-pale/40 text-wine text-[12px] font-bold uppercase tracking-[0.12em] px-3.5 py-1.5 rounded-full"><i className="fas fa-brain"></i> Cuerpo y mente</span>
                <h3 className="mt-5 text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight text-ink leading-[1.1]">Entrenamiento Físico y Cognitivo</h3>
                <p className="mt-5 text-lg text-ink/60 leading-relaxed">Ejercicios dirigidos para cuerpo y mente. Estimulación cognitiva que previene el deterioro y mejora la calidad de vida.</p>
                <a href="https://wa.me/573100000000?text=Quiero%20informaci%C3%B3n%20sobre%20entrenamiento%20f%C3%ADsico%20y%20cognitivo%20en%20la%20Fundaci%C3%B3n%20Orqu%C3%ADdea" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2.5 bg-teal hover:bg-teal-deep text-white font-semibold px-6 py-3.5 rounded-full transition-colors shadow-soft"><i className="fab fa-whatsapp text-lg"></i> Más información</a>
              </div>
            </div>

            {/* Servicio 4 */}
            <div className="reveal grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="relative rounded-[2rem] overflow-hidden ring-1 ring-orchid-mist/60 shadow-soft aspect-[4/3] lg:h-[440px] lg:order-2">
                <img src="https://images.unsplash.com/photo-1593529467220-9d721ceb9a78?auto=format&fit=crop&w=900&q=80" alt="Actividades recreativas y sociales en la Fundación Centro Geriátrico Orquídea Pereira" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="lg:order-1">
                <span className="inline-flex items-center gap-2 bg-orchid-pale/40 text-wine text-[12px] font-bold uppercase tracking-[0.12em] px-3.5 py-1.5 rounded-full"><i className="fas fa-paint-brush"></i> Vida social</span>
                <h3 className="mt-5 text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight text-ink leading-[1.1]">Actividades Recreativas</h3>
                <p className="mt-5 text-lg text-ink/60 leading-relaxed">Música, manualidades, cine, juegos de mesa y salidas. Cada día tiene algo especial. La alegría es parte del cuidado.</p>
                <a href="https://wa.me/573100000000?text=Quiero%20informaci%C3%B3n%20sobre%20actividades%20recreativas%20en%20la%20Fundaci%C3%B3n%20Orqu%C3%ADdea" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2.5 bg-teal hover:bg-teal-deep text-white font-semibold px-6 py-3.5 rounded-full transition-colors shadow-soft"><i className="fab fa-whatsapp text-lg"></i> Más información</a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============ CTA STRIP 1 ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-wine-deep via-wine to-wine-dark py-16">
        <div className="pointer-events-none absolute -top-20 right-10 h-72 w-72 rounded-full bg-orchid/30 blur-[100px]"></div>
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-teal/30 blur-[100px]"></div>
        <div className="relative max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">¿Listo para dar el primer paso?</h2>
          <p className="mt-3 text-lg text-white/80">Agenda una visita sin compromiso y conoce nuestras instalaciones en Pereira.</p>
          <div className="mt-7 flex justify-center">
            <a href="https://wa.me/573100000000?text=Quiero%20agendar%20una%20visita%20a%20la%20Fundaci%C3%B3n%20Centro%20Geri%C3%A1trico%20Orqu%C3%ADdea%20en%20Pereira" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 bg-white text-wine hover:bg-gray-100 text-base font-semibold px-7 py-4 rounded-full shadow-lift transition-colors hover:-translate-y-0.5">
              <i className="fab fa-whatsapp text-xl"></i> Agendar visita por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ============ MODALIDADES ============ */}
      <section id="modalidades" className="py-20 lg:py-28 bg-[#FAF7FA]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="reveal max-w-2xl mx-auto text-center mb-14">
            <span className="inline-block text-[13px] font-bold uppercase tracking-[0.14em] text-teal-deep mb-3">Modalidades de cuidado</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.7rem] font-extrabold tracking-tight text-ink leading-tight">Elige la modalidad que se adapta a tu familia</h2>
            <p className="mt-4 text-lg text-ink/60">Ofrecemos tres tipos de cuidado para que siempre encuentres la solución ideal.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-7">
            <div className="reveal bg-white rounded-[1.75rem] overflow-hidden ring-1 ring-orchid-mist/60 shadow-soft hover:shadow-lift transition-all hover:-translate-y-1.5">
              <div className="relative h-52 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=700&q=80" alt="Adulto mayor residente en la Fundación Centro Geriátrico Orquídea Pereira, descansando en su habitación" className="w-full h-full object-cover" loading="lazy" />
                <span className="absolute top-4 left-4 bg-wine text-white text-[11px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-full">Más popular</span>
              </div>
              <div className="p-7">
                <h3 className="text-xl font-extrabold text-ink mb-2">Internado Permanente</h3>
                <p className="text-[15px] text-ink/60 leading-relaxed mb-5">Tu ser querido vive con nosotros de forma completa. Habitación, alimentación, cuidado médico y actividades incluidas.</p>
                <ul className="flex flex-col gap-2.5">
                  <li className="flex items-center gap-2.5 text-[14px] text-ink/70"><i className="fas fa-check-circle text-wine"></i> Habitaciones privadas o compartidas</li>
                  <li className="flex items-center gap-2.5 text-[14px] text-ink/70"><i className="fas fa-check-circle text-wine"></i> 3 comidas + meriendas</li>
                  <li className="flex items-center gap-2.5 text-[14px] text-ink/70"><i className="fas fa-check-circle text-wine"></i> Enfermería 24 horas</li>
                  <li className="flex items-center gap-2.5 text-[14px] text-ink/70"><i className="fas fa-check-circle text-wine"></i> Actividades diarias</li>
                  <li className="flex items-center gap-2.5 text-[14px] text-ink/70"><i className="fas fa-check-circle text-wine"></i> Reportes a la familia</li>
                </ul>
              </div>
            </div>
            <div className="reveal bg-white rounded-[1.75rem] overflow-hidden ring-1 ring-orchid-mist/60 shadow-soft hover:shadow-lift transition-all hover:-translate-y-1.5">
              <div className="relative h-52 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=700&q=80" alt="Adulto mayor en estancia temporal en centro geriátrico Pereira Risaralda" className="w-full h-full object-cover" loading="lazy" />
                <span className="absolute top-4 left-4 bg-teal-deep text-white text-[11px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-full">Flexible</span>
              </div>
              <div className="p-7">
                <h3 className="text-xl font-extrabold text-ink mb-2">Estancia Temporal</h3>
                <p className="text-[15px] text-ink/60 leading-relaxed mb-5">Ideal para recuperaciones postoperatorias o cuando la familia necesita un descanso. Días, semanas o el tiempo que necesites.</p>
                <ul className="flex flex-col gap-2.5">
                  <li className="flex items-center gap-2.5 text-[14px] text-ink/70"><i className="fas fa-check-circle text-wine"></i> Mínimo 1 semana</li>
                  <li className="flex items-center gap-2.5 text-[14px] text-ink/70"><i className="fas fa-check-circle text-wine"></i> Cuidado completo</li>
                  <li className="flex items-center gap-2.5 text-[14px] text-ink/70"><i className="fas fa-check-circle text-wine"></i> Plan de recuperación</li>
                  <li className="flex items-center gap-2.5 text-[14px] text-ink/70"><i className="fas fa-check-circle text-wine"></i> Fisioterapia incluida</li>
                  <li className="flex items-center gap-2.5 text-[14px] text-ink/70"><i className="fas fa-check-circle text-wine"></i> Sin compromisos a largo plazo</li>
                </ul>
              </div>
            </div>
            <div className="reveal bg-white rounded-[1.75rem] overflow-hidden ring-1 ring-orchid-mist/60 shadow-soft hover:shadow-lift transition-all hover:-translate-y-1.5">
              <div className="relative h-52 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=700&q=80" alt="Adulto mayor en actividades de día en centro geriátrico Pereira" className="w-full h-full object-cover" loading="lazy" />
                <span className="absolute top-4 left-4 bg-orchid text-white text-[11px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-full">Por horas</span>
              </div>
              <div className="p-7">
                <h3 className="text-xl font-extrabold text-ink mb-2">Cuidado por Día</h3>
                <p className="text-[15px] text-ink/60 leading-relaxed mb-5">Cuida a tu familiar mientras trabajas. Lo recibimos en la mañana y lo entregamos en la tarde, lleno de energía y bienestar.</p>
                <ul className="flex flex-col gap-2.5">
                  <li className="flex items-center gap-2.5 text-[14px] text-ink/70"><i className="fas fa-check-circle text-wine"></i> Lunes a sábado</li>
                  <li className="flex items-center gap-2.5 text-[14px] text-ink/70"><i className="fas fa-check-circle text-wine"></i> Alimentación incluida</li>
                  <li className="flex items-center gap-2.5 text-[14px] text-ink/70"><i className="fas fa-check-circle text-wine"></i> Actividades recreativas</li>
                  <li className="flex items-center gap-2.5 text-[14px] text-ink/70"><i className="fas fa-check-circle text-wine"></i> Ejercicio y estimulación</li>
                  <li className="flex items-center gap-2.5 text-[14px] text-ink/70"><i className="fas fa-check-circle text-wine"></i> Transporte opcional</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ============ INSTALACIONES / GALERÍA ============ */}
      <section id="instalaciones" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="reveal max-w-2xl mx-auto text-center mb-14">
            <span className="inline-block text-[13px] font-bold uppercase tracking-[0.14em] text-teal-deep mb-3">Nuestro espacio</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.7rem] font-extrabold tracking-tight text-ink leading-tight">Instalaciones diseñadas para el bienestar</h2>
            <p className="mt-4 text-lg text-ink/60">Espacios luminosos, tranquilos y seguros. Infraestructura nueva en el corazón de Pereira. <span className="text-wine font-semibold">Haz clic en una foto para verla en grande.</span></p>
          </div>
          <div className="reveal grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
            <button onClick={() => openLb(0)} className="group relative col-span-2 row-span-2 rounded-3xl overflow-hidden ring-1 ring-orchid-mist/60 cursor-pointer text-left">
              <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80" alt="Sala común luminosa de la Fundación Centro Geriátrico Orquídea en Pereira Risaralda" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-wine-deep/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                <span className="text-white font-semibold flex items-center gap-2"><i className="fas fa-expand"></i> Sala principal luminosa</span>
              </div>
            </button>
            <button onClick={() => openLb(1)} className="group relative rounded-3xl overflow-hidden ring-1 ring-orchid-mist/60 cursor-pointer text-left">
              <img src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=500&q=80" alt="Jardín exterior tranquilo de la Fundación Centro Geriátrico Orquídea Pereira" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-wine-deep/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4"><span className="text-white text-sm font-semibold flex items-center gap-2"><i className="fas fa-expand"></i> Jardín y áreas verdes</span></div>
            </button>
            <button onClick={() => openLb(2)} className="group relative rounded-3xl overflow-hidden ring-1 ring-orchid-mist/60 cursor-pointer text-left">
              <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=500&q=80" alt="Personal de enfermería acompañando adulto mayor en Fundación Centro Geriátrico Orquídea" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-wine-deep/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4"><span className="text-white text-sm font-semibold flex items-center gap-2"><i className="fas fa-expand"></i> Atención personalizada</span></div>
            </button>
            <button onClick={() => openLb(3)} className="group relative rounded-3xl overflow-hidden ring-1 ring-orchid-mist/60 cursor-pointer text-left">
              <img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=500&q=80" alt="Sesión de fisioterapia para adulto mayor en centro geriátrico Pereira" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-wine-deep/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4"><span className="text-white text-sm font-semibold flex items-center gap-2"><i className="fas fa-expand"></i> Sala de fisioterapia</span></div>
            </button>
            <button onClick={() => openLb(4)} className="group relative rounded-3xl overflow-hidden ring-1 ring-orchid-mist/60 cursor-pointer text-left">
              <img src="https://images.unsplash.com/photo-1593529467220-9d721ceb9a78?auto=format&fit=crop&w=500&q=80" alt="Actividades recreativas y sociales en la Fundación Centro Geriátrico Orquídea Pereira" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-wine-deep/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4"><span className="text-white text-sm font-semibold flex items-center gap-2"><i className="fas fa-expand"></i> Actividades recreativas</span></div>
            </button>
          </div>
        </div>
      </section>

      {/* ============ CTA STRIP 2 ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-deep via-teal to-teal-deep py-14">
        <div className="pointer-events-none absolute -top-16 left-1/4 h-64 w-64 rounded-full bg-white/15 blur-[90px]"></div>
        <div className="relative max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">¿Tienes dudas? Estamos para ayudarte.</h2>
          <p className="mt-3 text-lg text-white/85">Nuestro equipo en Pereira responde todas tus preguntas sin compromiso.</p>
          <div className="mt-6 flex justify-center">
            <a href="https://wa.me/573100000000?text=Tengo%20dudas%20sobre%20la%20Fundaci%C3%B3n%20Centro%20Geri%C3%A1trico%20Orqu%C3%ADdea%20Pereira" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 bg-white text-teal-deep hover:bg-gray-100 text-base font-semibold px-7 py-4 rounded-full shadow-lift transition-colors hover:-translate-y-0.5">
              <i className="fab fa-whatsapp text-xl"></i> Resolver mis dudas
            </a>
          </div>
        </div>
      </section>

      {/* ============ UBICACIÓN ============ */}
      <section id="ubicacion" className="py-20 lg:py-28 bg-[#FAF7FA]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="reveal">
            <span className="inline-block text-[13px] font-bold uppercase tracking-[0.14em] text-teal-deep mb-3">Ubicación</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink leading-tight">Encuéntranos en Pereira, Risaralda</h2>
            <p className="mt-4 text-lg text-ink/60 leading-relaxed">Estamos ubicados en el corazón de Pereira, en un espacio de fácil acceso para las familias de toda la región.</p>
            <address className="not-italic mt-8 flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 shrink-0 grid place-items-center rounded-2xl bg-orchid-pale/40 text-wine text-lg"><i className="fas fa-map-marker-alt"></i></div>
                <div><strong className="block text-[12px] font-bold uppercase tracking-wider text-ink/45 mb-0.5">Dirección</strong><span className="text-[15px] font-semibold text-ink">Cra 18 #23-45, Pereira, Risaralda, Colombia</span></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 shrink-0 grid place-items-center rounded-2xl bg-orchid-pale/40 text-wine text-lg"><i className="fas fa-phone-alt"></i></div>
                <div><strong className="block text-[12px] font-bold uppercase tracking-wider text-ink/45 mb-0.5">Teléfono</strong><a href="tel:+573100000000" className="text-[15px] font-semibold text-ink hover:text-wine transition-colors">310 000 0000</a></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 shrink-0 grid place-items-center rounded-2xl bg-orchid-pale/40 text-wine text-lg"><i className="fab fa-whatsapp"></i></div>
                <div><strong className="block text-[12px] font-bold uppercase tracking-wider text-ink/45 mb-0.5">WhatsApp</strong><a href="https://wa.me/573100000000" target="_blank" rel="noopener noreferrer" className="text-[15px] font-semibold text-ink hover:text-wine transition-colors">310 000 0000 — Escribir ahora</a></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 shrink-0 grid place-items-center rounded-2xl bg-orchid-pale/40 text-wine text-lg"><i className="fas fa-clock"></i></div>
                <div><strong className="block text-[12px] font-bold uppercase tracking-wider text-ink/45 mb-0.5">Atención</strong><span className="text-[15px] font-semibold text-ink">Lunes a domingo, 24 horas del día</span></div>
              </div>
            </address>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://wa.me/573100000000?text=Quiero%20visitar%20la%20Fundaci%C3%B3n%20Centro%20Geri%C3%A1trico%20Orqu%C3%ADdea%20en%20Pereira" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 bg-teal hover:bg-teal-deep text-white font-semibold px-6 py-3.5 rounded-full transition-colors shadow-soft"><i className="fab fa-whatsapp text-lg"></i> Agendar visita</a>
              <a href="https://maps.google.com/?q=Cra+18+%2323-45,+Pereira,+Risaralda" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-teal-deep font-semibold px-6 py-3.5 rounded-full ring-1.5 ring-teal/40 hover:bg-teal/10 transition-colors"><i className="fas fa-directions"></i> Cómo llegar</a>
            </div>
          </div>
          <div className="reveal rounded-3xl overflow-hidden shadow-lift ring-1 ring-orchid-mist/60">
            <iframe title="Mapa de ubicación de la Fundación Centro Geriátrico Orquídea en Pereira, Risaralda" src="https://maps.google.com/maps?q=Pereira,+Risaralda,+Colombia&t=m&z=14&output=embed&iwloc=near" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" className="w-full h-[460px] block border-0"></iframe>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section id="preguntas" className="py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <div className="reveal text-center mb-12">
            <span className="inline-block text-[13px] font-bold uppercase tracking-[0.14em] text-teal-deep mb-3">Respondemos tus dudas</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink leading-tight">Preguntas frecuentes sobre nuestro hogar geriátrico en Pereira</h2>
            <p className="mt-4 text-lg text-ink/60">Las preguntas más comunes de las familias antes de tomar la decisión.</p>
          </div>
          <div className="flex flex-col gap-3.5">
            {faqs.map((item, i) => (
              <div key={i} className="reveal bg-[#FAF7FA] rounded-2xl ring-1 ring-orchid-mist/60 overflow-hidden">
                <button onClick={() => toggleFaq(i)} className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 font-bold text-ink hover:text-wine transition-colors">
                  <span>{item.q}</span>
                  <span className="h-8 w-8 shrink-0 grid place-items-center rounded-full bg-wine text-white text-sm transition-transform duration-300" style={{ transform: openFaqs[i] ? 'rotate(45deg)' : 'rotate(0deg)' }}><i className="fas fa-plus"></i></span>
                </button>
                {openFaqs[i] && (
                  <div className="px-6 pb-5 text-[15px] text-ink/65 leading-relaxed border-t border-orchid-mist/60 pt-4">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-wine-deep text-white/75 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr] gap-10 lg:gap-12 mb-12">
            <div>
              <img src="assets/logo-orquidea-white.png" alt="Fundación Centro Geriátrico Orquídea" className="h-12 w-auto mb-5" width="220" height="69" />
              <p className="text-[15px] text-white/65 leading-relaxed max-w-md">Cuidamos a los adultos mayores con amor, profesionalismo y dedicación en el corazón de Pereira, Risaralda. Somos más que un centro geriátrico: somos un hogar.</p>
              <div className="flex items-start gap-2.5 mt-5 text-[14px] text-white/60"><i className="fas fa-map-marker-alt text-orchid-pale mt-0.5"></i><span>Cra 18 #23-45, Pereira, Risaralda, Colombia</span></div>
            </div>
            <div>
              <h4 className="text-[12px] font-bold uppercase tracking-[0.12em] text-orchid-pale mb-4">Navegación</h4>
              <ul className="flex flex-col gap-2.5 text-[15px]">
                <li><a href="#inicio" className="text-white/70 hover:text-orchid-pale transition-colors flex items-center gap-2"><i className="fas fa-chevron-right text-[10px] text-orchid-pale"></i> Inicio</a></li>
                <li><a href="#por-que" className="text-white/70 hover:text-orchid-pale transition-colors flex items-center gap-2"><i className="fas fa-chevron-right text-[10px] text-orchid-pale"></i> Por qué elegirnos</a></li>
                <li><a href="#servicios" className="text-white/70 hover:text-orchid-pale transition-colors flex items-center gap-2"><i className="fas fa-chevron-right text-[10px] text-orchid-pale"></i> Servicios</a></li>
                <li><a href="#modalidades" className="text-white/70 hover:text-orchid-pale transition-colors flex items-center gap-2"><i className="fas fa-chevron-right text-[10px] text-orchid-pale"></i> Modalidades</a></li>
                <li><a href="#instalaciones" className="text-white/70 hover:text-orchid-pale transition-colors flex items-center gap-2"><i className="fas fa-chevron-right text-[10px] text-orchid-pale"></i> Instalaciones</a></li>
                <li><a href="#ubicacion" className="text-white/70 hover:text-orchid-pale transition-colors flex items-center gap-2"><i className="fas fa-chevron-right text-[10px] text-orchid-pale"></i> Ubicación</a></li>
                <li><a href="#preguntas" className="text-white/70 hover:text-orchid-pale transition-colors flex items-center gap-2"><i className="fas fa-chevron-right text-[10px] text-orchid-pale"></i> Preguntas</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[12px] font-bold uppercase tracking-[0.12em] text-orchid-pale mb-4">Contacto</h4>
              <div className="flex sm:hidden items-center gap-3 mb-3 text-[15px]"><i className="fas fa-phone-alt text-orchid-pale w-4"></i><a href="tel:+573100000000" className="text-white/80 hover:text-white transition-colors">310 000 0000</a></div>
              <div className="flex items-center gap-3 mb-3 text-[15px]"><i className="fab fa-whatsapp text-orchid-pale w-4"></i><a href="https://wa.me/573100000000" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">Escríbenos por WhatsApp</a></div>
              <div className="flex items-center gap-3 mb-3 text-[15px]"><i className="fas fa-map-marker-alt text-orchid-pale w-4"></i><span className="text-white/80">Cra 18 #23-45, Pereira</span></div>
              <div className="flex items-center gap-3 mb-5 text-[15px]"><i className="fas fa-clock text-orchid-pale w-4"></i><span className="text-white/80">24 horas · 7 días</span></div>
              <a href="https://wa.me/573100000000" target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center gap-2 bg-teal hover:bg-teal-deep text-white font-semibold px-5 py-3 rounded-full transition-colors"><i className="fab fa-whatsapp text-lg"></i> Escríbenos ya</a>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-[13px] text-white/45 text-center">
            <span>&copy; 2025 Fundación Centro Geriátrico Orquídea · Pereira, Risaralda, Colombia</span>
            <span>Cra 18 #23-45, Pereira, Risaralda, Colombia</span>
          </div>
        </div>
      </footer>

      {/* ============ LIGHTBOX / GALERÍA MODAL ============ */}
      {lbOpen && (
        <div className="fixed inset-0 z-[80] bg-wine-deep/95 backdrop-blur-md flex flex-col">
          <div className="flex items-center justify-between px-5 sm:px-8 py-5 text-white">
            <span className="text-sm font-semibold tracking-wide text-white/80">{(idx + 1) + ' / ' + galleryImages.length}</span>
            <button onClick={closeLb} className="h-11 w-11 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 transition-colors" aria-label="Cerrar galería"><i className="fas fa-times text-xl"></i></button>
          </div>
          <div className="flex-1 flex items-center justify-center px-4 sm:px-16 pb-4 min-h-0">
            <button onClick={prev} className="absolute left-3 sm:left-6 z-10 h-12 w-12 grid place-items-center rounded-full bg-white/10 hover:bg-white text-white hover:text-wine transition-colors" aria-label="Anterior"><i className="fas fa-chevron-left text-xl"></i></button>
            <img src={cur.src} alt={cur.alt} className="lb-enter max-h-full max-w-full object-contain rounded-2xl shadow-lift" />
            <button onClick={next} className="absolute right-3 sm:right-6 z-10 h-12 w-12 grid place-items-center rounded-full bg-white/10 hover:bg-white text-white hover:text-wine transition-colors" aria-label="Siguiente"><i className="fas fa-chevron-right text-xl"></i></button>
          </div>
          <div className="text-center pb-8 px-6"><p className="text-white font-semibold text-lg">{cur.cap}</p></div>
        </div>
      )}

      {/* ============ FLOATING WHATSAPP ============ */}
      <a href="https://wa.me/573100000000?text=Hola,%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20la%20Fundaci%C3%B3n%20Centro%20Geri%C3%A1trico%20Orqu%C3%ADdea%20en%20Pereira" target="_blank" rel="noopener noreferrer" aria-label="Escríbenos por WhatsApp" className="fixed bottom-7 right-6 z-50 h-[60px] w-[60px] grid place-items-center rounded-full bg-[#25D366] hover:bg-[#1DA851] text-white text-3xl shadow-[0_8px_28px_rgba(37,211,102,0.5)] hover:scale-110 transition-transform">
        <i className="fab fa-whatsapp"></i>
      </a>

    </div>
  );
}
