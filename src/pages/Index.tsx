import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/e677eb62-79aa-4d95-8eff-5099a1456205/files/5c7a9eb5-ffa0-4801-9014-d59f9f498c45.jpg";
const TEAM_IMAGE = "https://cdn.poehali.dev/projects/e677eb62-79aa-4d95-8eff-5099a1456205/files/e34693a2-2633-4dc8-a884-872e832646d6.jpg";

const NAV_LINKS = [
  { label: "О компании", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Проекты", href: "#projects" },
  { label: "Лицензии", href: "#licenses" },
  { label: "Новости", href: "#news" },
  { label: "Контакты", href: "#contacts" },
];

const STATS = [
  { value: "20", suffix: "+", label: "лет на рынке" },
  { value: "800", suffix: "+", label: "завершённых проектов" },
  { value: "2006", suffix: "", label: "год основания" },
  { value: "100", suffix: "%", label: "регионов России" },
];

const SERVICES = [
  {
    icon: "Waves",
    title: "Защита берегов",
    desc: "Комплексная защита берегов рек, морей и водохранилищ от размыва и разрушения. Проектирование берегоукрепительных сооружений.",
  },
  {
    icon: "Mountain",
    title: "Противооползневые решения",
    desc: "Инженерные решения по стабилизации склонов, предотвращению оползней и обрушений на сложном рельефе.",
  },
  {
    icon: "Droplets",
    title: "Водопонижение и водоотведение",
    desc: "Проектирование систем водопонижения, дренажа и организации водоотведения на подтапливаемых территориях.",
  },
  {
    icon: "Building2",
    title: "Гидротехнические сооружения",
    desc: "Разработка проектной документации для плотин, набережных, портовой инфраструктуры и искусственных территорий.",
  },
  {
    icon: "FlaskConical",
    title: "Изыскания и исследования",
    desc: "Инженерно-геологические, гидрологические и гидроморфологические изыскания для объектов берегозащиты.",
  },
  {
    icon: "Map",
    title: "Искусственные пляжи и порты",
    desc: "Проектирование искусственных пляжей, намывных территорий и объектов портовой инфраструктуры на побережье.",
  },
];

const PROJECTS = [
  {
    tag: "Краснодарский край",
    title: "Укрепление берега реки Кубань",
    type: "Берегоукрепление",
    year: "2023",
  },
  {
    tag: "Черноморское побережье",
    title: "Противооползневая защита склона в районе Сочи",
    type: "Противооползневые работы",
    year: "2022",
  },
  {
    tag: "Азовское море",
    title: "Берегозащитные сооружения в Ейском районе",
    type: "Гидротехника",
    year: "2023",
  },
  {
    tag: "Республика Крым",
    title: "Дренажная система на оползнеопасном склоне",
    type: "Водопонижение",
    year: "2021",
  },
];

const LICENSES = [
  { icon: "Award", title: "Допуск СРО", desc: "Свидетельство о допуске к работам, влияющим на безопасность объектов капитального строительства" },
  { icon: "Shield", title: "Лицензия Минобороны", desc: "Допуск к проведению работ на объектах оборонного значения" },
  { icon: "FileCheck", title: "ИГИ и ГТИ", desc: "Лицензии на проведение инженерно-геологических и гидротехнических изысканий" },
  { icon: "Star", title: "Члены НОИЗ", desc: "Действующий член Национального объединения изыскателей и проектировщиков" },
];

const NEWS = [
  {
    date: "12 марта 2026",
    tag: "Новость",
    title: "Завершён проект берегоукрепления на р. Белая в Республике Адыгея",
    desc: "Специалисты компании успешно завершили разработку рабочей документации для берегозащитных сооружений протяжённостью 1,2 км.",
  },
  {
    date: "05 февраля 2026",
    tag: "Статья",
    title: "Современные методы защиты берегов от размыва: опыт Черноморского побережья",
    desc: "Обзорная статья по актуальным технологиям берегоукрепления с анализом практики на объектах Азово-Черноморского побережья.",
  },
  {
    date: "20 января 2026",
    tag: "Новость",
    title: "НПЦ «Берегозащита» получила новый крупный контракт в 2026 году",
    desc: "Подписан договор на комплексное проектирование противооползневой защиты территории площадью 45 га в Краснодарском крае.",
  },
];

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ value, suffix, label }: { value: string; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const numVal = parseInt(value);
  const count = useCountUp(numVal, 1800, started);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="stat-card">
      <span className="stat-value">{count}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="site-root">
      {/* NAV */}
      <header className={`site-nav ${scrolled ? "nav-scrolled" : ""}`}>
        <div className="nav-inner">
          <a className="nav-logo" href="#hero" onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}>
            <span className="logo-mark">БЗ</span>
            <div className="logo-text">
              <span className="logo-main">НПЦ «Берегозащита»</span>
              <span className="logo-sub">инженерная защита территорий</span>
            </div>
          </a>
          <nav className="nav-links">
            {NAV_LINKS.map((l) => (
              <button key={l.href} onClick={() => scrollTo(l.href)} className="nav-link">
                {l.label}
              </button>
            ))}
          </nav>
          <button className="nav-cta" onClick={() => scrollTo("#contacts")}>
            Связаться
          </button>
          <button className="nav-burger" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="mobile-menu">
            {NAV_LINKS.map((l) => (
              <button key={l.href} onClick={() => scrollTo(l.href)} className="mobile-link">
                {l.label}
              </button>
            ))}
            <button className="mobile-cta" onClick={() => scrollTo("#contacts")}>
              Связаться с нами
            </button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="hero-section">
        <div className="hero-bg">
          <img src={HERO_IMAGE} alt="Берегозащита" className="hero-img" />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content">
          <div className="hero-badge">Основана в 2006 году · Азово-Черноморское побережье</div>
          <h1 className="hero-title">
            Инженерная защита<br />
            <em>берегов и территорий</em>
          </h1>
          <p className="hero-desc">
            Научно-проектная компания полного цикла — от изысканий до рабочей документации.
            Защищаем берега рек, морей и водохранилищ по всей России.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => scrollTo("#projects")}>
              Наши проекты
            </button>
            <button className="btn-outline" onClick={() => scrollTo("#contacts")}>
              Получить консультацию
            </button>
          </div>
        </div>
        <div className="hero-scroll">
          <Icon name="ChevronDown" size={20} />
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        {STATS.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </section>

      {/* ABOUT */}
      <section id="about" className="about-section">
        <div className="section-container about-grid">
          <div className="about-text">
            <div className="section-tag">О компании</div>
            <h2 className="section-title">
              20 лет на страже<br />
              <em>прибрежных территорий</em>
            </h2>
            <p className="body-text">
              ООО «НПЦ «Берегозащита» основана в 2006 году на базе профильного подразделения «Краснодарберегозащита».
              Компания сохранила и приумножила уникальный опыт работ на Азово-Черноморском побережье — одном из
              наиболее динамичных и сложных с инженерной точки зрения регионов страны.
            </p>
            <p className="body-text">
              Мы выполняем полный цикл работ: инженерные изыскания, научные исследования, разработку проектной
              и рабочей документации для гидротехнических сооружений, систем водопонижения, противооползневых
              комплексов и искусственных территорий.
            </p>
            <div className="about-highlights">
              <div className="highlight-item">
                <Icon name="CheckCircle2" size={18} />
                <span>Работа по всей России</span>
              </div>
              <div className="highlight-item">
                <Icon name="CheckCircle2" size={18} />
                <span>Полный цикл проектирования</span>
              </div>
              <div className="highlight-item">
                <Icon name="CheckCircle2" size={18} />
                <span>Уникальный опыт на побережье</span>
              </div>
              <div className="highlight-item">
                <Icon name="CheckCircle2" size={18} />
                <span>Научный подход к каждому объекту</span>
              </div>
            </div>
          </div>
          <div className="about-image-wrap">
            <img src={TEAM_IMAGE} alt="Специалисты Берегозащита" className="about-img" />
            <div className="about-img-badge">
              <span className="badge-num">800+</span>
              <span className="badge-txt">завершённых<br />проектов</span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="services-section">
        <div className="section-container">
          <div className="section-header">
            <div className="section-tag">Направления работ</div>
            <h2 className="section-title">Полный спектр<br /><em>инженерных решений</em></h2>
          </div>
          <div className="services-grid">
            {SERVICES.map((s) => (
              <div key={s.title} className="service-card">
                <div className="service-icon">
                  <Icon name={s.icon} size={26} />
                </div>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="projects-section">
        <div className="section-container">
          <div className="section-header">
            <div className="section-tag light">Портфолио</div>
            <h2 className="section-title light">Реализованные<br /><em>проекты</em></h2>
          </div>
          <div className="projects-grid">
            {PROJECTS.map((p) => (
              <div key={p.title} className="project-card">
                <div className="project-top">
                  <span className="project-tag">{p.tag}</span>
                  <span className="project-year">{p.year}</span>
                </div>
                <h3 className="project-title">{p.title}</h3>
                <div className="project-type">
                  <Icon name="Layers" size={14} />
                  {p.type}
                </div>
              </div>
            ))}
          </div>
          <div className="projects-cta">
            <button className="btn-outline-light">
              Смотреть все проекты
              <Icon name="ArrowRight" size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* LICENSES */}
      <section id="licenses" className="licenses-section">
        <div className="section-container">
          <div className="section-header">
            <div className="section-tag">Лицензии и сертификаты</div>
            <h2 className="section-title">Подтверждённая<br /><em>квалификация</em></h2>
            <p className="section-desc">
              Компания располагает всеми необходимыми допусками и лицензиями для ведения
              проектных и изыскательских работ в области гидротехники и берегозащиты.
            </p>
          </div>
          <div className="licenses-grid">
            {LICENSES.map((l) => (
              <div key={l.title} className="license-card">
                <div className="license-icon">
                  <Icon name={l.icon} size={28} />
                </div>
                <div className="license-body">
                  <h3 className="license-title">{l.title}</h3>
                  <p className="license-desc">{l.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="licenses-note">
            <Icon name="Info" size={16} />
            <span>Копии лицензий и сертификатов предоставляются по запросу</span>
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section id="news" className="news-section">
        <div className="section-container">
          <div className="section-header">
            <div className="section-tag">Новости и статьи</div>
            <h2 className="section-title">Актуальные<br /><em>материалы</em></h2>
          </div>
          <div className="news-grid">
            {NEWS.map((n) => (
              <article key={n.title} className="news-card">
                <div className="news-top">
                  <span className="news-tag">{n.tag}</span>
                  <span className="news-date">{n.date}</span>
                </div>
                <h3 className="news-title">{n.title}</h3>
                <p className="news-desc">{n.desc}</p>
                <button className="news-link">
                  Читать далее <Icon name="ArrowRight" size={14} />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="contacts-section">
        <div className="section-container contacts-grid">
          <div className="contacts-info">
            <div className="section-tag light">Контакты</div>
            <h2 className="section-title light">Обсудим ваш<br /><em>проект</em></h2>
            <p className="body-text light">
              Свяжитесь с нами для получения консультации или направьте запрос —
              ответим в течение рабочего дня.
            </p>
            <div className="contact-items">
              <div className="contact-item">
                <Icon name="MapPin" size={18} />
                <span>г. Краснодар, ул. Северная, 479</span>
              </div>
              <div className="contact-item">
                <Icon name="Phone" size={18} />
                <span>+7 (861) 000-00-00</span>
              </div>
              <div className="contact-item">
                <Icon name="Mail" size={18} />
                <span>info@beregozhita.ru</span>
              </div>
              <div className="contact-item">
                <Icon name="Clock" size={18} />
                <span>Пн–Пт: 9:00 – 18:00</span>
              </div>
            </div>
          </div>
          <div className="contact-form-wrap">
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <h3 className="form-title">Оставить заявку</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Имя</label>
                  <input type="text" placeholder="Иван Иванов" />
                </div>
                <div className="form-group">
                  <label>Телефон</label>
                  <input type="tel" placeholder="+7 (900) 000-00-00" />
                </div>
              </div>
              <div className="form-group">
                <label>Организация</label>
                <input type="text" placeholder="Название компании" />
              </div>
              <div className="form-group">
                <label>Описание задачи</label>
                <textarea rows={4} placeholder="Опишите объект и задачу..." />
              </div>
              <button type="submit" className="btn-primary full-width">
                Отправить заявку
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="logo-mark sm">БЗ</span>
            <div>
              <div className="footer-name">ООО «НПЦ «Берегозащита»</div>
              <div className="footer-inn">ИНН: 0000000000 · ОГРН: 0000000000000</div>
            </div>
          </div>
          <div className="footer-links">
            {NAV_LINKS.map((l) => (
              <button key={l.href} onClick={() => scrollTo(l.href)} className="footer-link">
                {l.label}
              </button>
            ))}
          </div>
          <div className="footer-copy">© 2006–2026 НПЦ «Берегозащита». Все права защищены.</div>
        </div>
      </footer>
    </div>
  );
}