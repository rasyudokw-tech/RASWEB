(() => {
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const prefersReducedMotion = () => motionQuery.matches;

  /* ==========================================================================
     Language system (ID / EN)
     - Static text uses data-i18n="key" (plain text) or data-i18n-html="key"
       (trusted markup such as <span>/<br>). Attributes use
       data-i18n-attr="attr:key;attr2:key2".
     - The HTML ships in Indonesian (the default); English is applied by JS.
     - Brand names (RASWEB, RASDEV, RASGarage, RASBarber, RASCafe) are never
       part of the dictionary, so they can never change.
     ========================================================================== */
  const LANG_STORAGE_KEY = 'rasweb-lang';
  const DEFAULT_LANG = 'id';
  const SUPPORTED_LANGS = ['id', 'en'];
  const languageHooks = []; // callbacks for JS-generated text, run after each language change

  const TRANSLATIONS = {
    id: {
      'meta.title': 'RASWEB — Website dengan tujuan',
      'meta.description': 'RASWEB — pengembangan website dan portofolio oleh Rasyudo.',

      'nav.aria': 'Navigasi utama',
      'nav.brandAria': 'RASWEB beranda',
      'nav.home': 'Beranda',
      'nav.about': 'Tentang',
      'nav.journey': 'Perjalanan',
      'nav.projects': 'Proyek',
      'nav.services': 'Layanan',
      'nav.pricing': 'Harga',
      'nav.faq': 'FAQ',
      'nav.contact': 'Kontak',
      'nav.cta': 'Hubungi saya',
      'nav.open': 'Buka navigasi',
      'nav.close': 'Tutup navigasi',
      'lang.label': 'Pilih bahasa',

      'hero.eyebrow': 'DESAIN & PENGEMBANGAN WEB',
      'hero.title': 'Website yang mengubah idemu menjadi <span>sesuatu yang nyata.</span>',
      'hero.lead': 'Saya membuat website yang bersih dan responsif untuk individu maupun bisnis yang siap membangun kehadiran online.',
      'hero.cta': 'Ayo ngobrol',
      'hero.cta2': 'Lihat proyek',
      'hero.note': 'Desain yang dipikirkan matang.<br><b>Nyaman di semua layar.</b>',
      'hero.imgAlt': 'Foto pengembang RASWEB',
      'hero.label': 'RASWEB / WEB KREATIF',

      'about.eyebrow': 'SEDIKIT TENTANG SAYA',
      'about.title': 'Penuh rasa ingin tahu.<br><span>Membangun sambil belajar.</span>',
      'about.p1': 'Saya tertarik pada pengembangan web dan senang membangun website yang bermanfaat.',
      'about.p2': 'Saya sedang mempelajari HTML, CSS, JavaScript, dan Python sambil mengembangkan keterampilan membuat website.',
      'about.p3': 'Saya ingin terus bertumbuh sebagai developer dengan mengubah ide menjadi proyek dan belajar dari setiap prosesnya.',
      'about.m1': 'Saya terus memperdalam dasar-dasar pengembangan web dan meningkatkan kemampuan teknis saya.',
      'about.m2': 'Saya berlatih menggunakan HTML, CSS, JavaScript, dan Python dalam proyek-proyek saya.',
      'about.m3': 'Saya senang mengeksplorasi ide baru dan menerapkannya menjadi pengalaman web yang jelas dan mudah digunakan.',
      'about.m4': 'Setiap proyek membantu saya mengasah keterampilan, memecahkan masalah, dan memahami hal baru.',
      'about.m5': 'Tujuan saya adalah terus belajar dan membangun website yang bermanfaat, responsif, dan mudah digunakan.',
      'about.more': 'Baca selengkapnya',
      'about.less': 'Tampilkan lebih sedikit',
      'about.imgAlt': 'Foto yang dipakai di portofolio RASWEB',
      'about.stamp': 'BELAJAR<br>BUAT<br>ULANGI',

      'journey.eyebrow': 'PERJALANAN SAYA',
      'journey.title': 'Belajar <span>sambil praktik.</span>',
      'journey.lead': 'Perjalanan saya dalam belajar dan mengembangkan skill di dunia programming.',
      'journey.d1': 'JUNI 2026',
      'journey.t1': 'Mulai belajar struktur dasar website dan memahami cara kerja tag serta element.',
      'journey.d2': 'JULI 2026',
      'journey.t2': 'Belajar styling, layout, warna, dan responsive design.',
      'journey.d3': 'AGUSTUS 2026',
      'journey.t3': 'Membuat website lebih interaktif dengan DOM, event, dan animasi sederhana.',
      'journey.d4': 'SEPTEMBER 2026',
      'journey.t4': 'Sedang mempelajari logika pemrograman dan dasar backend.',
      'journey.d5': 'OKTOBER 2026',
      'journey.t5': 'Mulai mempelajari database dan SQL.',
      'journey.status6': 'SEDANG DIEKSPLORASI',
      'journey.title6': 'Dasar-Dasar Keamanan Siber',
      'journey.t6': 'Mempelajari dasar-dasar keamanan siber dan mengembangkan keterampilan keamanan yang etis.',

      'projects.eyebrow': 'KARYA PILIHAN',
      'projects.title': 'Dibuat dengan <span>rasa ingin tahu.</span>',
      'projects.lead': 'Beberapa proyek dari perjalanan saya sejauh ini.',
      'projects.carousel': 'Carousel proyek',
      'projects.openDev': 'Buka proyek RASDEV',
      'projects.openGarage': 'Detail proyek RASGarage',
      'projects.openBarber': 'Detail proyek RASBarber',
      'projects.openCafe': 'Detail proyek RASCafe',
      'projects.altDev': 'Tangkapan layar website RASDEV',
      'projects.altGarage': 'Tangkapan layar website RASGarage',
      'projects.altBarber': 'Tangkapan layar website RASBarber',
      'projects.altCafe': 'Tangkapan layar website RASCafe',
      'projects.fallback1': 'PROYEK 01',
      'projects.fallback2': 'PROYEK 02',
      'projects.fallback3': 'PROYEK 03',
      'projects.fallback4': 'PROYEK 04',
      'projects.cat1': '01 / PORTOFOLIO',
      'projects.cat2': '02 / OTOMOTIF',
      'projects.cat3': '03 / BARBERSHOP',
      'projects.cat4': '04 / KAFE',
      'projects.prev': 'Proyek sebelumnya',
      'projects.next': 'Proyek berikutnya',
      'projects.dots': 'Pilih proyek',
      'projects.show': 'Tampilkan proyek',

      'services.eyebrow': 'YANG BISA SAYA BANTU',
      'services.title': 'Dari ide awal sampai <span>website jadi.</span>',
      'services.lead': 'Layanan website praktis agar kamu tampil jelas dan meyakinkan di dunia online.',
      'services.s1t': 'Pembuatan website',
      'services.s1d': 'Website modern yang rapi, dibangun sesuai apa yang ingin kamu tampilkan atau tawarkan.',
      'services.s2t': 'Desain custom',
      'services.s2d': 'Tampilan dan nuansa yang dirancang khusus mengikuti konsep dan preferensimu.',
      'services.s3t': 'Website responsif',
      'services.s3d': 'Layout yang menyesuaikan diri agar nyaman dibuka di HP, tablet, maupun komputer.',
      'services.s4t': 'Website portofolio',
      'services.s4d': 'Tempat yang jelas untuk menampilkan profil, proyek, dan skill yang ingin kamu tunjukkan.',
      'services.s5t': 'Perbaikan website',
      'services.s5d': 'Bantuan menyempurnakan tampilan website dan membuatnya lebih nyaman digunakan.',
      'services.cta': 'Punya ide di kepala?',
      'services.ctaLink': 'Yuk diskusikan',

      'why.eyebrow': 'KENAPA RASWEB',
      'why.title': 'Detail kecil.<br><span>Tujuan yang jelas.</span>',
      'why.lead': 'Proses yang ramah dan penuh perhatian untuk mewujudkan ide websitemu.',
      'why.cta': 'Mulai percakapan',
      'why.w1t': 'Dirancang sesuai kebutuhanmu',
      'why.w1d': 'Struktur halaman dan arah visual bisa kita sesuaikan dengan idemu.',
      'why.w2t': 'Nyaman di setiap layar',
      'why.w2d': 'Layout responsif memudahkan pengunjung membuka website di ponsel maupun desktop.',
      'why.w3t': 'Mudah didiskusikan dan disempurnakan',
      'why.w3d': 'Sampaikan masukanmu langsung saat website mulai terbentuk.',
      'why.w4t': 'Pilihan untuk berbagai titik awal',
      'why.w4d': 'Pilih paket yang sesuai dengan cakupan proyek yang kamu bayangkan.',

      'price.eyebrow': 'HARGA SIMPEL DAN JELAS',
      'price.title': 'Pilih <span>titik awalmu.</span>',
      'price.lead': 'Setiap proyek berbeda. Mari bicarakan apa yang cocok untuk proyekmu.',
      'price.starter': 'Rp200.000',
      'price.business': 'Rp350.000',
      'price.premium': 'Rp500.000+',
      'price.starterSum': 'Landing page satu halaman yang fokus.',
      'price.businessSum': 'Company profile dengan fitur-fitur penting.',
      'price.premiumSum': 'Ruang lebih luas untuk ide dan fitur custom.',
      'price.badge': 'Nilai Terbaik',
      'price.l1': 'Landing Page',
      'price.l2': '1 Halaman',
      'price.l3': '3-5 Section',
      'price.l4': 'Desain Responsif',
      'price.l5': 'Tombol WhatsApp',
      'price.l6': 'Animasi Dasar',
      'price.l7x': 'Tanpa Hosting Gratis',
      'price.b1': 'Company Profile',
      'price.b3': '5-7 Section',
      'price.b4': 'Responsif',
      'price.b5': 'Form Kontak',
      'price.b6': 'SEO Dasar',
      'price.host': 'Hosting Gratis 1 Tahun',
      'price.p1': 'Website Custom',
      'price.p2': 'Desain Custom',
      'price.p3': 'Fitur Lanjutan',
      'price.p4': '1-3 Halaman',
      'price.p5': 'Section Lebih Banyak',
      'price.p6': 'Dukungan Prioritas',
      'price.cta': 'Mulai sekarang',
      'price.note': 'Punya proyek custom?',
      'price.noteLink': 'Yuk diskusikan',

      'faq.eyebrow': 'PERLU DIKETAHUI',
      'faq.title': 'Pertanyaan, <span>terjawab.</span>',
      'faq.lead': 'Jawaban singkat untuk pertanyaan yang paling sering ditanyakan.',
      'faq.q1': 'Berapa biaya pembuatan website?',
      'faq.a1': 'Biaya mengikuti paket yang dipilih: Starter Rp200.000, Business Rp350.000, dan Premium mulai dari Rp500.000+. Untuk kebutuhan di luar paket, hubungi RASWEB agar bisa didiskusikan lebih dulu.',
      'faq.q2': 'Berapa lama proses pembuatan website?',
      'faq.a2': 'Waktu pengerjaan bergantung pada kompleksitas proyek dan kelengkapan materi yang diberikan. Estimasi pengerjaan akan dibicarakan sebelum proyek dimulai.',
      'faq.q3': 'Apakah website bisa dibuka di HP dan tablet?',
      'faq.a3': 'Ya. Website dirancang responsif agar tampilannya menyesuaikan berbagai ukuran layar, termasuk desktop, tablet, dan smartphone.',
      'faq.q4': 'Apakah saya bisa meminta revisi?',
      'faq.a4': 'Ya. Revisi dapat dilakukan sesuai ketentuan dan kesepakatan yang ditetapkan sebelum pengerjaan dimulai.',
      'faq.q5': 'Apa saja yang perlu saya siapkan untuk memulai?',
      'faq.a5': 'Cukup ceritakan tujuan website-mu. Jika sudah ada, siapkan juga logo, foto, dan teks yang ingin ditampilkan. Kalau belum lengkap, kita bisa diskusikan bersama.',
      'faq.q6': 'Bagaimana alur kerja sama dengan RASWEB?',
      'faq.a6': 'Pertama kita diskusi kebutuhan dan memilih paket. Lalu website mulai dikerjakan, kamu bisa memberi masukan selama prosesnya, dan setelah semuanya sesuai website siap dipakai.',
      'faq.q7': 'Bagaimana cara memesan layanan RASWEB?',
      'faq.a7': 'Hubungi RASWEB melalui tombol WhatsApp yang tersedia di website. Sampaikan kebutuhan website yang ingin dibuat agar kita bisa mendiskusikan proyek lebih lanjut.',

      'contact.eyebrow': 'AYO BUAT SESUATU',
      'contact.title': 'Punya ide website?<br><span>Yuk ngobrol.</span>',
      'contact.text': 'Ceritakan sedikit tentang apa yang kamu butuhkan. Kita cari titik awal yang pas.',
      'contact.cta': 'Chat lewat WhatsApp',

      'footer.tagline': 'Website yang dibuat dengan sepenuh hati, satu ide pada satu waktu.',
      'footer.explore': 'Jelajahi',
      'footer.touch': 'Hubungi saya',
      'footer.top': 'Kembali ke atas',
      'footer.made': 'Dibuat dengan cinta'
    },

    en: {
      'meta.title': 'RASWEB — Websites with purpose',
      'meta.description': 'RASWEB — website development and portfolio by Rasyudo.',

      'nav.aria': 'Main navigation',
      'nav.brandAria': 'RASWEB home',
      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.journey': 'Journey',
      'nav.projects': 'Projects',
      'nav.services': 'Services',
      'nav.pricing': 'Pricing',
      'nav.faq': 'FAQ',
      'nav.contact': 'Contact',
      'nav.cta': 'Contact me',
      'nav.open': 'Open navigation',
      'nav.close': 'Close navigation',
      'lang.label': 'Choose language',

      'hero.eyebrow': 'WEB DESIGN & DEVELOPMENT',
      'hero.title': 'Websites that turn your ideas into <span>something real.</span>',
      'hero.lead': 'I create clean, responsive websites for people and businesses ready to build their presence online.',
      'hero.cta': 'Let’s talk',
      'hero.cta2': 'Explore projects',
      'hero.note': 'Thoughtful design.<br><b>Built for every screen.</b>',
      'hero.imgAlt': 'RASWEB developer portrait',
      'hero.label': 'RASWEB / CREATIVE WEB',

      'about.eyebrow': 'A LITTLE ABOUT ME',
      'about.title': 'Curious by nature.<br><span>Building as I learn.</span>',
      'about.p1': 'I am interested in web development and enjoy building useful websites.',
      'about.p2': 'I am learning HTML, CSS, JavaScript, and Python while developing my website-building skills.',
      'about.p3': 'My goal is to keep growing as a developer by turning ideas into projects and learning from each process.',
      'about.m1': 'I keep strengthening my web development foundations and improving my technical skills.',
      'about.m2': 'I practice using HTML, CSS, JavaScript, and Python in my projects.',
      'about.m3': 'I enjoy exploring new ideas and shaping them into clear, easy-to-use web experiences.',
      'about.m4': 'Each project helps me sharpen my skills, solve problems, and learn something new.',
      'about.m5': 'My goal is to keep learning and build useful, responsive, and easy-to-use websites.',
      'about.more': 'Read more',
      'about.less': 'Show less',
      'about.imgAlt': 'Portrait used on the RASWEB portfolio',
      'about.stamp': 'LEARN<br>MAKE<br>REPEAT',

      'journey.eyebrow': 'MY JOURNEY',
      'journey.title': 'Learning <span>by doing.</span>',
      'journey.lead': 'My journey in learning and growing my skills in the world of programming.',
      'journey.d1': 'JUNE 2026',
      'journey.t1': 'Started learning the basic structure of websites and how tags and elements work.',
      'journey.d2': 'JULY 2026',
      'journey.t2': 'Learned styling, layout, color, and responsive design.',
      'journey.d3': 'AUGUST 2026',
      'journey.t3': 'Made websites more interactive with the DOM, events, and simple animations.',
      'journey.d4': 'SEPTEMBER 2026',
      'journey.t4': 'Learning programming logic and the basics of backend.',
      'journey.d5': 'OCTOBER 2026',
      'journey.t5': 'Started learning databases and SQL.',
      'journey.status6': 'EXPLORING',
      'journey.title6': 'Cybersecurity Fundamentals',
      'journey.t6': 'Learning the fundamentals of cybersecurity and developing ethical security skills.',

      'projects.eyebrow': 'SELECTED WORK',
      'projects.title': 'Made with <span>curiosity.</span>',
      'projects.lead': 'A few projects from my journey so far.',
      'projects.carousel': 'Project carousel',
      'projects.openDev': 'Open RASDEV project',
      'projects.openGarage': 'RASGarage project details',
      'projects.openBarber': 'RASBarber project details',
      'projects.openCafe': 'RASCafe project details',
      'projects.altDev': 'RASDEV website screenshot',
      'projects.altGarage': 'RASGarage website screenshot',
      'projects.altBarber': 'RASBarber website screenshot',
      'projects.altCafe': 'RASCafe website screenshot',
      'projects.fallback1': 'PROJECT 01',
      'projects.fallback2': 'PROJECT 02',
      'projects.fallback3': 'PROJECT 03',
      'projects.fallback4': 'PROJECT 04',
      'projects.cat1': '01 / PORTFOLIO',
      'projects.cat2': '02 / AUTOMOTIVE',
      'projects.cat3': '03 / BARBERSHOP',
      'projects.cat4': '04 / CAFE',
      'projects.prev': 'Previous project',
      'projects.next': 'Next project',
      'projects.dots': 'Choose a project',
      'projects.show': 'Show project',

      'services.eyebrow': 'WHAT I CAN HELP WITH',
      'services.title': 'From first idea to <span>finished site.</span>',
      'services.lead': 'Practical website services to help you show up clearly and confidently online.',
      'services.s1t': 'Website development',
      'services.s1d': 'Clean, modern websites built around what you want to share or offer.',
      'services.s2t': 'Custom design',
      'services.s2d': 'A look and feel crafted around your concept and preferences.',
      'services.s3t': 'Responsive websites',
      'services.s3d': 'A layout that adapts for comfortable browsing on phones, tablets, and computers.',
      'services.s4t': 'Portfolio websites',
      'services.s4d': 'A clear home for your profile, projects, and the skills you want to show.',
      'services.s5t': 'Website improvement',
      'services.s5d': 'Help refining a website’s appearance and making it more comfortable to use.',
      'services.cta': 'Have an idea in mind?',
      'services.ctaLink': 'Let’s discuss it',

      'why.eyebrow': 'WHY RASWEB',
      'why.title': 'Small details.<br><span>Clear intentions.</span>',
      'why.lead': 'A friendly, thoughtful process for bringing your website idea to life.',
      'why.cta': 'Start a conversation',
      'why.w1t': 'Designed around your needs',
      'why.w1d': 'We can shape the page structure and visual direction around your idea.',
      'why.w2t': 'Comfortable on every screen',
      'why.w2d': 'Responsive layouts make it easier for visitors to browse on mobile and desktop.',
      'why.w3t': 'Easy to discuss and refine',
      'why.w3d': 'Share your feedback directly as the website takes shape.',
      'why.w4t': 'Options for different starting points',
      'why.w4d': 'Choose a package that fits the scope you have in mind.',

      'price.eyebrow': 'SIMPLE, CLEAR PRICING',
      'price.title': 'Choose your <span>starting point.</span>',
      'price.lead': 'Each project is different. Let’s talk about what works for yours.',
      'price.starter': '$15',
      'price.business': '$25',
      'price.premium': '$35+',
      'price.starterSum': 'A focused one-page landing page.',
      'price.businessSum': 'A company profile with the essentials.',
      'price.premiumSum': 'More room for custom ideas and features.',
      'price.badge': 'Best Value',
      'price.l1': 'Landing Page',
      'price.l2': '1 Page',
      'price.l3': '3-5 Sections',
      'price.l4': 'Responsive Design',
      'price.l5': 'WhatsApp Button',
      'price.l6': 'Basic Animation',
      'price.l7x': 'No Free Hosting',
      'price.b1': 'Company Profile',
      'price.b3': '5-7 Sections',
      'price.b4': 'Responsive',
      'price.b5': 'Contact Form',
      'price.b6': 'Basic SEO',
      'price.host': 'Free Hosting for 1 Year',
      'price.p1': 'Custom Website',
      'price.p2': 'Custom Design',
      'price.p3': 'Advanced Features',
      'price.p4': '1-3 Pages',
      'price.p5': 'More Sections',
      'price.p6': 'Priority Support',
      'price.cta': 'Get started',
      'price.note': 'Have a custom project?',
      'price.noteLink': 'Let’s discuss it',

      'faq.eyebrow': 'GOOD TO KNOW',
      'faq.title': 'Questions, <span>answered.</span>',
      'faq.lead': 'Quick answers to the questions I hear most often.',
      'faq.q1': 'How much does a website cost?',
      'faq.a1': 'The cost follows the package you choose: Starter $15, Business $25, and Premium from $35+. For needs outside the packages, contact RASWEB so we can discuss it first.',
      'faq.q2': 'How long does it take to build a website?',
      'faq.a2': 'The timeline depends on the complexity of the project and how complete the materials you provide are. We will talk about the estimate before the project starts.',
      'faq.q3': 'Can the website be opened on phones and tablets?',
      'faq.a3': 'Yes. Websites are designed to be responsive so they adapt to different screen sizes, including desktop, tablet, and smartphone.',
      'faq.q4': 'Can I ask for revisions?',
      'faq.a4': 'Yes. Revisions can be made according to the terms and agreement set before the work begins.',
      'faq.q5': 'What do I need to prepare to get started?',
      'faq.a5': 'Just tell me what your website is for. If you have them, also prepare the logo, photos, and text you want to show. If anything is missing, we can work it out together.',
      'faq.q6': 'How does working with RASWEB look like?',
      'faq.a6': 'First we discuss your needs and choose a package. Then the website gets built, you can give feedback along the way, and once everything looks right the website is ready to use.',
      'faq.q7': 'How do I order RASWEB’s services?',
      'faq.a7': 'Contact RASWEB through the WhatsApp button on the website. Tell me what kind of website you want so we can discuss the project further.',

      'contact.eyebrow': 'LET’S MAKE SOMETHING',
      'contact.title': 'Have a website idea?<br><span>Let’s talk.</span>',
      'contact.text': 'Tell me a little about what you need. We can figure out a good place to start.',
      'contact.cta': 'Chat on WhatsApp',

      'footer.tagline': 'Thoughtful websites, built one idea at a time.',
      'footer.explore': 'Explore',
      'footer.touch': 'Get in touch',
      'footer.top': 'Back to top',
      'footer.made': 'Made with love'
    }
  };

  let currentLang = readStoredLanguage();

  function readStoredLanguage() {
    try {
      const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
      return SUPPORTED_LANGS.includes(stored) ? stored : DEFAULT_LANG;
    } catch (error) {
      return DEFAULT_LANG;
    }
  }

  function t(key) {
    return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key])
      || TRANSLATIONS[DEFAULT_LANG][key]
      || key;
  }

  function applyLanguage(lang) {
    currentLang = SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;
    document.documentElement.lang = currentLang;

    document.querySelectorAll('[data-i18n]').forEach((element) => {
      element.textContent = t(element.dataset.i18n);
    });

    document.querySelectorAll('[data-i18n-html]').forEach((element) => {
      element.innerHTML = t(element.dataset.i18nHtml);
    });

    document.querySelectorAll('[data-i18n-attr]').forEach((element) => {
      element.dataset.i18nAttr.split(';').forEach((pair) => {
        const separator = pair.indexOf(':');
        if (separator < 1) return;
        element.setAttribute(pair.slice(0, separator).trim(), t(pair.slice(separator + 1).trim()));
      });
    });

    document.title = t('meta.title');
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.description'));

    document.querySelectorAll('.lang-btn').forEach((button) => {
      const isActive = button.dataset.lang === currentLang;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    languageHooks.forEach((hook) => hook());
  }

  function setLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang) || lang === currentLang) return;
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch (error) {
      /* storage unavailable: the language still switches for this visit */
    }
    applyLanguage(lang);
  }

  function initializeLanguage() {
    document.querySelectorAll('.lang-btn').forEach((button) => {
      button.addEventListener('click', () => setLanguage(button.dataset.lang));
    });
    applyLanguage(currentLang);
  }

  /* ========================================================================== */

  initializeLanguage();
  initializeNavigation();
  initializeAboutToggle();
  initializeProjectCarousel();
  initializeFaq();
  initializeBackToTop();
  initializeScrollReveal();

  function initializeNavigation() {
    const menuButton = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    function updateMenuLabel() {
      const isOpen = menuButton?.getAttribute('aria-expanded') === 'true';
      menuButton?.setAttribute('aria-label', t(isOpen ? 'nav.close' : 'nav.open'));
    }

    menuButton?.addEventListener('click', () => {
      const isOpening = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(isOpening));
      navLinks?.classList.toggle('is-open', isOpening);
      updateMenuLabel();
    });

    navLinks?.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        menuButton?.setAttribute('aria-expanded', 'false');
        updateMenuLabel();
      });
    });

    languageHooks.push(updateMenuLabel);
    updateMenuLabel();
  }

  function initializeAboutToggle() {
    const readMoreButton = document.getElementById('read-more');
    const moreAbout = document.getElementById('more-about');
    if (!readMoreButton || !moreAbout) return;

    const label = readMoreButton.querySelector('.rm-label');
    const icon = readMoreButton.querySelector('.rm-icon');

    function updateReadMore() {
      const isExpanded = readMoreButton.getAttribute('aria-expanded') === 'true';
      if (label) label.textContent = t(isExpanded ? 'about.less' : 'about.more');
      if (icon) icon.textContent = isExpanded ? '－' : '＋';
    }

    readMoreButton.addEventListener('click', () => {
      const isExpanded = readMoreButton.getAttribute('aria-expanded') !== 'true';
      readMoreButton.setAttribute('aria-expanded', String(isExpanded));
      moreAbout.hidden = !isExpanded;
      updateReadMore();
    });

    languageHooks.push(updateReadMore);
    updateReadMore();
  }

  function initializeProjectCarousel() {
    const cards = [...document.querySelectorAll('[data-project]')];
    const stage = document.querySelector('.project-stage');
    const dots = document.querySelector('.carousel-dots');
    const counter = document.querySelector('.carousel-count');

    if (!cards.length || !stage || !dots) return;

    const autoplayDelay = 4500;
    let activeIndex = 0;
    let autoplayTimer = null;
    let pointerStart = null;
    let isHovered = false;
    let isFocused = false;
    let isInteracting = false;
    let isPointerInput = false;
    let didSwipe = false;

    cards.forEach((card, index) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      dot.type = 'button';
      dot.addEventListener('click', () => navigateTo(index));
      dots.append(dot);
    });

    function labelDots() {
      [...dots.children].forEach((dot, index) => {
        dot.setAttribute('aria-label', t('projects.show') + ' ' + (index + 1));
      });
    }

    function render() {
      const previousIndex = (activeIndex - 1 + cards.length) % cards.length;
      const nextIndex = (activeIndex + 1) % cards.length;

      cards.forEach((card, index) => {
        const link = card.querySelector('.project-link');
        const isActive = index === activeIndex;

        card.classList.toggle('is-active', isActive);
        card.classList.toggle('is-prev', index === previousIndex);
        card.classList.toggle('is-next', index === nextIndex);
        card.setAttribute('aria-hidden', String(!isActive));

        if (link) {
          link.tabIndex = isActive ? 0 : -1;
          const destination = card.dataset.url.trim();
          link.href = destination || '#Contact';
        }

        dots.children[index]?.setAttribute('aria-current', String(isActive));
      });

      if (counter) {
        counter.textContent = String(activeIndex + 1).padStart(2, '0')
          + ' / ' + String(cards.length).padStart(2, '0');
      }
    }

    function show(index) {
      activeIndex = (index + cards.length) % cards.length;
      render();
    }

    function canAutoplay() {
      return !prefersReducedMotion()
        && !document.hidden
        && !isHovered
        && !isFocused
        && !isInteracting;
    }

    function stopAutoplay() {
      window.clearTimeout(autoplayTimer);
      autoplayTimer = null;
    }

    function scheduleAutoplay() {
      stopAutoplay();
      if (!canAutoplay()) return;

      autoplayTimer = window.setTimeout(() => {
        show(activeIndex + 1);
        scheduleAutoplay();
      }, autoplayDelay);
    }

    function navigateBy(offset) {
      show(activeIndex + offset);
      scheduleAutoplay();
    }

    function navigateTo(index) {
      show(index);
      scheduleAutoplay();
    }

    document.querySelector('[data-prev]')?.addEventListener('click', () => navigateBy(-1));
    document.querySelector('[data-next]')?.addEventListener('click', () => navigateBy(1));

    stage.addEventListener('pointerenter', (event) => {
      isHovered = event.pointerType !== 'touch';
      if (isHovered) stopAutoplay();
    });

    stage.addEventListener('pointerleave', () => {
      isHovered = false;
      scheduleAutoplay();
    });

    stage.addEventListener('focusin', () => {
      if (isPointerInput) return;
      isFocused = true;
      stopAutoplay();
    });

    stage.addEventListener('focusout', (event) => {
      if (isPointerInput) return;
      isFocused = stage.contains(event.relatedTarget);
      scheduleAutoplay();
    });

    document.addEventListener('keydown', (event) => {
      if (!['Tab', 'ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      isPointerInput = false;
      if (stage.contains(document.activeElement)) {
        isFocused = true;
        stopAutoplay();
      }
    }, true);

    stage.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      isPointerInput = true;
      isFocused = false;
      pointerStart = { x: event.clientX, y: event.clientY, id: event.pointerId };
      didSwipe = false;
      isInteracting = true;
      stopAutoplay();
    });

    window.addEventListener('pointerup', (event) => {
      if (!pointerStart || event.pointerId !== pointerStart.id) return;

      const deltaX = event.clientX - pointerStart.x;
      const deltaY = event.clientY - pointerStart.y;
      const isHorizontalSwipe = Math.abs(deltaX) > 45
        && Math.abs(deltaX) > Math.abs(deltaY);

      pointerStart = null;
      isInteracting = false;

      if (isHorizontalSwipe) {
        didSwipe = true;
        window.setTimeout(() => { didSwipe = false; }, 0);
        navigateBy(deltaX < 0 ? 1 : -1);
      } else {
        scheduleAutoplay();
      }
    });

    window.addEventListener('pointercancel', () => {
      pointerStart = null;
      isInteracting = false;
      scheduleAutoplay();
    });

    stage.addEventListener('click', (event) => {
      if (!didSwipe) return;
      event.preventDefault();
      event.stopPropagation();
      didSwipe = false;
    }, true);

    stage.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        navigateBy(1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        navigateBy(-1);
      }
    });

    document.addEventListener('visibilitychange', scheduleAutoplay);
    motionQuery.addEventListener?.('change', scheduleAutoplay);

    languageHooks.push(labelDots);
    labelDots();

    show(0);
    scheduleAutoplay();
  }

  function initializeFaq() {
    document.querySelectorAll('.faq-question').forEach((button) => {
      button.addEventListener('click', () => {
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', String(!isExpanded));

        const faqItem = button.closest('.faq-item');
        const panel = faqItem?.querySelector('.faq-answer');
        const controlledPanelId = button.getAttribute('aria-controls');

        if (!panel || panel.id !== controlledPanelId) return;
        panel.hidden = isExpanded;
      });
    });
  }

  function initializeBackToTop() {
    const topButton = document.getElementById('backToTop');
    if (!topButton) return;

    function updateVisibility() {
      topButton.classList.toggle('is-visible', window.scrollY > 500);
    }

    window.addEventListener('scroll', updateVisibility, { passive: true });
    topButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth'
      });
    });

    updateVisibility();
    document.getElementById('year').textContent = new Date().getFullYear();
  }

  function initializeScrollReveal() {
    const elements = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });

    elements.forEach((element) => observer.observe(element));
  }
})();