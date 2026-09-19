/**
 * Viaggi Uzbekistan - Main Interactive Controller
 * Handles multilingual switching, route navigation, tour builder calculator,
 * accordions, and direct WhatsApp booking.
 */

document.addEventListener('DOMContentLoaded', () => {
  let currentLang = localStorage.getItem('viaggi_lang') || 'it';

  // 1. Language Initialization & Translation Engine
  function applyLanguage(lang) {
    if (!translations[lang]) lang = 'it';
    currentLang = lang;
    localStorage.setItem('viaggi_lang', lang);
    document.documentElement.lang = lang;

    // Update text elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    // Update HTML elements with data-i18n-html
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });

    // Update input placeholders
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      if (translations[lang][key]) {
        el.setAttribute('placeholder', translations[lang][key]);
      }
    });

    // Update language toggle buttons state
    document.querySelectorAll('.lang-btn').forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Re-calculate custom tour quote in current language
    updateCustomTourPrice();
  }

  // Language button clicks
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selected = btn.getAttribute('data-lang');
      applyLanguage(selected);
    });
  });

  // 2. Header Scroll Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 3. Mobile Navigation Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-active');
    });

    // Close mobile nav when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-active');
      });
    });
  }

  // 4. Interactive Silk Road Route Map Tabs
  const routeTabs = document.querySelectorAll('.route-tab');
  const routeCards = document.querySelectorAll('.route-city-card');

  routeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const cityId = tab.getAttribute('data-city');
      
      routeTabs.forEach(t => t.classList.remove('active'));
      routeCards.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const targetCard = document.getElementById(`city-${cityId}`);
      if (targetCard) {
        targetCard.classList.add('active');
      }
    });
  });

  // 5. Tour Inclusions & Day-by-Day Accordions
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');
  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const content = trigger.nextElementSibling;
      const isOpen = trigger.classList.contains('active');

      // Toggle current
      if (isOpen) {
        trigger.classList.remove('active');
        content.classList.remove('active');
      } else {
        trigger.classList.add('active');
        content.classList.add('active');
      }
    });
  });

  // 6. Interactive Custom Tour Price Calculator
  const durationInputs = document.querySelectorAll('input[name="tour_duration"]');
  const hotelInputs = document.querySelectorAll('input[name="hotel_tier"]');
  const experienceInputs = document.querySelectorAll('input[name="tour_experiences"]');
  const priceDisplay = document.getElementById('calc-price-display');
  const whatsappCustomBtn = document.getElementById('btn-whatsapp-custom');

  function updateCustomTourPrice() {
    if (!priceDisplay) return;

    let basePrice = 890; // Default base 7-8 days

    // Duration
    const selectedDuration = document.querySelector('input[name="tour_duration"]:checked');
    if (selectedDuration) {
      if (selectedDuration.value === 'mid') basePrice = 1180;
      if (selectedDuration.value === 'long') basePrice = 1520;
    }

    // Hotel tier multiplier
    let hotelMultiplier = 1.0;
    const selectedHotel = document.querySelector('input[name="hotel_tier"]:checked');
    if (selectedHotel) {
      if (selectedHotel.value === '4star') hotelMultiplier = 1.15;
      if (selectedHotel.value === '5star') hotelMultiplier = 1.45;
    }

    // Experiences add-on
    let expAddon = 0;
    experienceInputs.forEach(exp => {
      if (exp.checked) {
        expAddon += parseInt(exp.getAttribute('data-cost') || '0', 10);
      }
    });

    const totalPerPerson = Math.round((basePrice * hotelMultiplier) + expAddon);
    priceDisplay.textContent = `€ ${totalPerPerson.toLocaleString()}`;

    // Update WhatsApp link with pre-filled message
    updateWhatsAppCustomLink(totalPerPerson);
  }

  function updateWhatsAppCustomLink(price) {
    if (!whatsappCustomBtn) return;

    const selectedDuration = document.querySelector('input[name="tour_duration"]:checked');
    const durVal = selectedDuration ? selectedDuration.parentElement.textContent.trim() : '7-8 Giorni';

    const selectedHotel = document.querySelector('input[name="hotel_tier"]:checked');
    const hotelVal = selectedHotel ? selectedHotel.parentElement.textContent.trim() : 'Boutique Hotel';

    const selectedGroup = document.querySelector('input[name="travelers_group"]:checked');
    const groupVal = selectedGroup ? selectedGroup.parentElement.textContent.trim() : 'Coppia';

    let msg = '';
    if (currentLang === 'it') {
      msg = `Buongiorno Farrukh! Vorrei informazioni per un tour su misura in Uzbekistan:\n` +
            `• Durata: ${durVal}\n` +
            `• Alloggio: ${hotelVal}\n` +
            `• Viaggiatori: ${groupVal}\n` +
            `• Preventivo stimato: circa € ${price} / persona.\n` +
            `Potete inviarmi una proposta dettagliata? Grazie!`;
    } else {
      msg = `Здравствуйте, Фаррух! Хочу заказать индивидуальный тур в Узбекистан:\n` +
            `• Длительность: ${durVal}\n` +
            `• Отели: ${hotelVal}\n` +
            `• Состав группы: ${groupVal}\n` +
            `• Ориентировочный бюджет: около € ${price} на человека.\n` +
            `Отправьте, пожалуйста, подробную программу. Спасибо!`;
    }

    const whatsappNumber = "998901234567"; // Can be updated with user's official phone
    const encoded = encodeURIComponent(msg);
    whatsappCustomBtn.href = `https://wa.me/${whatsappNumber}?text=${encoded}`;
  }

  // Add listeners for custom tour options
  document.querySelectorAll('.custom-builder-card input').forEach(input => {
    input.addEventListener('change', updateCustomTourPrice);
  });

  // 7. FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains('active');

      // Close all others
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });

  // 8. Contact Form Submission
  const contactForm = document.getElementById('tour-contact-form');
  const formSuccess = document.getElementById('form-success-alert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('input-name').value;
      const email = document.getElementById('input-email').value;
      const phone = document.getElementById('input-phone').value;
      const tour = document.getElementById('input-tour').value;
      const dates = document.getElementById('input-dates').value;
      const notes = document.getElementById('input-notes').value;

      // Generate WhatsApp bridge as well
      let whatsappText = '';
      if (currentLang === 'it') {
        whatsappText = `Richiesta Preventivo dal Sito:\nNome: ${name}\nEmail: ${email}\nTel: ${phone}\nTour: ${tour}\nPeriodo: ${dates}\nNote: ${notes}`;
      } else {
        whatsappText = `Заявка с сайта:\nИмя: ${name}\nEmail: ${email}\nТел: ${phone}\nТур: ${tour}\nДаты: ${dates}\nПожелания: ${notes}`;
      }

      const whatsappNumber = "998901234567";
      const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

      // Show success
      if (formSuccess) {
        formSuccess.style.display = 'block';
      }

      // Also give user option to open WhatsApp directly with all data filled
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 800);

      contactForm.reset();
    });
  }

  // 9. Initial Language Render
  applyLanguage(currentLang);
});
