import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/e677eb62-79aa-4d95-8eff-5099a1456205/files/c54a2934-ab33-4a05-adc9-a332ed22cee9.jpg";
const TEAM_IMAGE = "https://cdn.poehali.dev/projects/e677eb62-79aa-4d95-8eff-5099a1456205/files/e34693a2-2633-4dc8-a884-872e832646d6.jpg";

const NAV_LINKS = [
  { label: "ГЛАВНАЯ", href: "#hero" },
  { label: "О КОМПАНИИ", href: "#about" },
  { label: "ПРОЕКТЫ", href: "#projects" },
  { label: "НОВОСТИ", href: "#news" },
  { label: "КОНТАКТЫ", href: "#contacts" },
  { label: "СТАТЬИ", href: "#news" },
];

const HERO_BULLETS = [
  "Работаем с 2006 года",
  "Более 800 успешно завершённых проектов",
  "Индивидуальные условия для каждого заказчика",
];

const FEATURES = [
  {
    icon: "FlaskConical",
    title: "НАУЧНАЯ БАЗА РЕШЕНИЙ",
    desc: "Научно-исследовательские работы для оптимальных решений для сложных природных условий",
  },
  {
    icon: "Settings",
    title: "ШИРОКИЙ СПЕКТР УСЛУГ",
    desc: "Реализация проектов «под ключ»",
  },
  {
    icon: "Award",
    title: "ДОПУСКИ И СЕРТИФИКАТЫ",
    desc: "Для государственных и частных контрактов",
  },
  {
    icon: "MapPin",
    title: "РАБОТА ПО ВСЕЙ СТРАНЕ",
    desc: "Оформляем проекты в любом регионе страны без ограничений",
  },
];

const ACTIVITIES = [
  {
    num: "01",
    text: "Проектирование и строительство берегозащитных, речных и морских гидротехнических сооружений, проектирование противопаводковых мероприятий",
  },
  {
    num: "02",
    text: "Инженерные изыскания для строительства (геодезические, гидрометеорологические и др.)",
  },
  {
    num: "03",
    text: "Разработка мероприятий по предотвращению и снижению негативного воздействия работ и выполнение расчётов причинённого ущерба объектам живого мира",
  },
  {
    num: "04",
    text: "Подготовка и сопровождение документов при прохождении государственной экологической экспертизы",
  },
  {
    num: "05",
    text: "Выполнение работ по расчистке русел рек, в т.ч. в целях предупреждения и ликвидации последствий ЧС",
  },
  {
    num: "06",
    text: "Научно-исследовательские и опытно-конструкторские работы",
  },
];

const PROJECTS = [
  { tag: "Краснодарский край", title: "Укрепление берега реки Кубань", type: "Берегоукрепление", year: "2023" },
  { tag: "Черноморское побережье", title: "Противооползневая защита склона в районе Сочи", type: "Противооползневые работы", year: "2022" },
  { tag: "Азовское море", title: "Берегозащитные сооружения в Ейском районе", type: "Гидротехника", year: "2023" },
  { tag: "Республика Крым", title: "Дренажная система на оползнеопасном склоне", type: "Водопонижение", year: "2021" },
  { tag: "Ростовская область", title: "Берегоукрепление р. Дон в г. Ростов-на-Дону", type: "Берегоукрепление", year: "2022" },
  { tag: "Ставропольский край", title: "Противопаводковые мероприятия на р. Кума", type: "Гидротехника", year: "2023" },
];

const LICENSES = [
  { icon: "Award", title: "Допуск СРО", desc: "Свидетельство о допуске к работам, влияющим на безопасность объектов капитального строительства" },
  { icon: "Shield", title: "Лицензия Минобороны", desc: "Допуск к проведению работ на объектах оборонного значения" },
  { icon: "FileCheck", title: "ИГИ и ГТИ", desc: "Лицензии на проведение инженерно-геологических и гидротехнических изысканий" },
  { icon: "Star", title: "Члены НОИЗ", desc: "Действующий член Национального объединения изыскателей и проектировщиков" },
];

const NEWS = [
  {
    date: "12.03.2026",
    tag: "Новость",
    title: "Завершён проект берегоукрепления на р. Белая в Республике Адыгея",
    desc: "Специалисты компании успешно завершили разработку рабочей документации для берегозащитных сооружений протяжённостью 1,2 км.",
  },
  {
    date: "05.02.2026",
    tag: "Статья",
    title: "Современные методы защиты берегов от размыва: опыт Черноморского побережья",
    desc: "Обзорная статья по актуальным технологиям берегоукрепления с анализом практики на объектах Азово-Черноморского побережья.",
  },
  {
    date: "20.01.2026",
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

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [yearsStarted, setYearsStarted] = useState(false);
  const yearsRef = useRef<HTMLDivElement>(null);
  const years = useCountUp(20, 1600, yearsStarted);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setYearsStarted(true); },
      { threshold: 0.5 }
    );
    if (yearsRef.current) observer.observe(yearsRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    if (href === "#hero") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="v2-root">
      {/* TOP BAR */}
      <div className="v2-topbar">
        <div className="v2-topbar-inner">
          <div className="v2-topbar-contacts">
            <span className="v2-topbar-item">
              <Icon name="MapPin" size={13} />
              Краснодарский край, г. Краснодар, ул. Чапаева, 127
            </span>
            <span className="v2-topbar-item">
              <Icon name="Clock" size={13} />
              Пн–Пт: 9:00 – 18:00
            </span>
          </div>
          <div className="v2-topbar-right">
            <a href="tel:+78612511234" className="v2-topbar-phone">
              +7 (861) 251-93-59
            </a>
            <button className="v2-callback-btn">Заказать обратный звонок</button>
            <a href="mailto:bz@kuban-bz.ru" className="v2-topbar-email">
              <Icon name="Mail" size={13} />
              bz@kuban-bz.ru
            </a>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className={`v2-header ${scrolled ? "v2-header-shadow" : ""}`}>
        <div className="v2-header-inner">
          <div className="v2-logo">
            <div className="v2-logo-icon">
              <span>Б</span>
            </div>
            <div className="v2-logo-text">
              <span className="v2-logo-name">БЕРЕГОЗАЩИТА</span>
              <span className="v2-logo-sub">НАУЧНЫЙ И ПРОЕКТНЫЙ ЦЕНТР</span>
            </div>
          </div>
          <nav className="v2-nav">
            {NAV_LINKS.map((l) => (
              <button key={l.label} onClick={() => scrollTo(l.href)} className="v2-nav-link">
                {l.label}
              </button>
            ))}
          </nav>
          <div className="v2-search">
            <input type="text" placeholder="" className="v2-search-input" />
            <Icon name="Search" size={16} />
          </div>
          <button className="v2-burger" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="v2-mobile-menu">
            {NAV_LINKS.map((l) => (
              <button key={l.label} onClick={() => scrollTo(l.href)} className="v2-mobile-link">
                {l.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="v2-hero">
        <div className="v2-hero-left">
          <h1 className="v2-hero-title">
            Инженерные решения по берегозащите, гидротехническому строительству
          </h1>
          <ul className="v2-hero-list">
            {HERO_BULLETS.map((b) => (
              <li key={b} className="v2-hero-bullet">
                <span className="v2-bullet-dot" />
                {b}
              </li>
            ))}
          </ul>
          <button className="v2-hero-btn" onClick={() => scrollTo("#contacts")}>
            Связаться
          </button>
        </div>
        <div className="v2-hero-right">
          <img src={HERO_IMAGE} alt="Берегозащита" className="v2-hero-img" />
        </div>
      </section>

      {/* YEARS + FEATURES */}
      <section className="v2-features-section">
        <div className="v2-features-inner">
          <div className="v2-years-block" ref={yearsRef}>
            <div className="v2-years-num">{years}</div>
            <div className="v2-years-label">лет<br />опыта</div>
            <p className="v2-years-desc">
              в разработке проектов и технических решений для укрепления береговых линий,
              предотвращения эрозии, защиты от размыва и других рисков
            </p>
          </div>
          <div className="v2-features-grid">
            {FEATURES.map((f) => (
              <div key={f.title} className="v2-feature-card">
                <div className="v2-feature-icon">
                  <Icon name={f.icon} size={28} />
                </div>
                <h3 className="v2-feature-title">{f.title}</h3>
                <p className="v2-feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACTIVITIES */}
      <section id="about" className="v2-activities-section">
        <div className="v2-section-container">
          <h2 className="v2-section-heading">ОСНОВНЫЕ ВИДЫ ДЕЯТЕЛЬНОСТИ</h2>
          <div className="v2-activities-grid">
            {ACTIVITIES.map((a) => (
              <div key={a.num} className="v2-activity-item">
                <span className="v2-activity-num">{a.num}</span>
                <p className="v2-activity-text">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="v2-projects-section">
        <div className="v2-section-container">
          <h2 className="v2-section-heading">РЕАЛИЗОВАННЫЕ ПРОЕКТЫ</h2>
          <div className="v2-projects-grid">
            {PROJECTS.map((p) => (
              <div key={p.title} className="v2-project-card">
                <div className="v2-project-top">
                  <span className="v2-project-tag">{p.tag}</span>
                  <span className="v2-project-year">{p.year}</span>
                </div>
                <h3 className="v2-project-title">{p.title}</h3>
                <div className="v2-project-type">
                  <Icon name="Layers" size={13} />
                  {p.type}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <button className="v2-more-btn">Смотреть все проекты</button>
          </div>
        </div>
      </section>

      {/* LICENSES */}
      <section id="licenses" className="v2-licenses-section">
        <div className="v2-section-container">
          <h2 className="v2-section-heading">ЛИЦЕНЗИИ И СЕРТИФИКАТЫ</h2>
          <div className="v2-licenses-grid">
            {LICENSES.map((l) => (
              <div key={l.title} className="v2-license-card">
                <div className="v2-license-icon">
                  <Icon name={l.icon} size={26} />
                </div>
                <div>
                  <h3 className="v2-license-title">{l.title}</h3>
                  <p className="v2-license-desc">{l.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="v2-licenses-note">
            <Icon name="Info" size={14} />
            Копии лицензий и сертификатов предоставляются по запросу
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section id="news" className="v2-news-section">
        <div className="v2-section-container">
          <h2 className="v2-section-heading">НОВОСТИ И СТАТЬИ</h2>
          <div className="v2-news-grid">
            {NEWS.map((n) => (
              <article key={n.title} className="v2-news-card">
                <div className="v2-news-top">
                  <span className="v2-news-tag">{n.tag}</span>
                  <span className="v2-news-date">{n.date}</span>
                </div>
                <h3 className="v2-news-title">{n.title}</h3>
                <p className="v2-news-desc">{n.desc}</p>
                <button className="v2-news-more">Читать далее →</button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="v2-contacts-section">
        <div className="v2-section-container v2-contacts-grid">
          <div className="v2-contacts-info">
            <h2 className="v2-section-heading white">КОНТАКТЫ</h2>
            <div className="v2-contact-list">
              <div className="v2-contact-row">
                <Icon name="MapPin" size={16} />
                <span>г. Краснодар, ул. Чапаева, 127</span>
              </div>
              <div className="v2-contact-row">
                <Icon name="Phone" size={16} />
                <span>+7 (861) 251-93-59</span>
              </div>
              <div className="v2-contact-row">
                <Icon name="Mail" size={16} />
                <span>bz@kuban-bz.ru</span>
              </div>
              <div className="v2-contact-row">
                <Icon name="Clock" size={16} />
                <span>Пн–Пт: 9:00 – 18:00</span>
              </div>
            </div>
          </div>
          <form className="v2-contact-form" onSubmit={(e) => e.preventDefault()}>
            <h3 className="v2-form-title">Оставить заявку</h3>
            <div className="v2-form-row">
              <div className="v2-form-group">
                <label>Имя</label>
                <input type="text" placeholder="Иван Иванов" />
              </div>
              <div className="v2-form-group">
                <label>Телефон</label>
                <input type="tel" placeholder="+7 (900) 000-00-00" />
              </div>
            </div>
            <div className="v2-form-group">
              <label>Организация</label>
              <input type="text" placeholder="Название компании" />
            </div>
            <div className="v2-form-group">
              <label>Описание задачи</label>
              <textarea rows={4} placeholder="Опишите объект и задачу..." />
            </div>
            <button type="submit" className="v2-submit-btn">Отправить заявку</button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="v2-footer">
        <div className="v2-footer-inner">
          <div className="v2-footer-left">
            <div className="v2-footer-logo">
              <div className="v2-logo-icon sm"><span>Б</span></div>
              <div>
                <div className="v2-footer-name">ООО «НПЦ «Берегозащита»</div>
                <div className="v2-footer-inn">ИНН: 0000000000 · ОГРН: 0000000000000</div>
              </div>
            </div>
          </div>
          <nav className="v2-footer-nav">
            {NAV_LINKS.map((l) => (
              <button key={l.label} onClick={() => scrollTo(l.href)} className="v2-footer-link">
                {l.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="v2-footer-copy">
          © 2006–2026 ООО «НПЦ «Берегозащита». Все права защищены.
        </div>
      </footer>
    </div>
  );
}
