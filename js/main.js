/**
 * Viaggi Uzbekistan - Main Interactive Controller
 * Personalized for Tashkent Private Tours with Sardor (Official Guide)
 */

document.addEventListener('DOMContentLoaded', () => {
  let currentLang = localStorage.getItem('viaggi_lang') || 'it';
  const SARDOR_WHATSAPP = "998938850309"; // Official WhatsApp: +998 93 885 03 09

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

    updateWhatsAppCustomLink();
  }

  // Language button clicks
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
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

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-active');
      });
    });
  }

  // 4. Tour Inclusions Accordions
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');
  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const content = trigger.nextElementSibling;
      const isOpen = trigger.classList.contains('active');

      if (isOpen) {
        trigger.classList.remove('active');
        content.classList.remove('active');
      } else {
        trigger.classList.add('active');
        content.classList.add('active');
      }
    });
  });

  // 5. Interactive Custom Tour Link Generator
  const whatsappCustomBtn = document.getElementById('btn-whatsapp-custom');

  function updateWhatsAppCustomLink() {
    if (!whatsappCustomBtn) return;

    const selectedDuration = document.querySelector('input[name="tour_duration"]:checked');
    const durVal = selectedDuration ? selectedDuration.parentElement.textContent.trim() : '1 Giorno Intero';

    const selectedFocus = document.querySelector('input[name="tour_focus"]:checked');
    const focusVal = selectedFocus ? selectedFocus.parentElement.textContent.trim() : 'Centro Civiltà Islamica & Storia';

    const selectedGroup = document.querySelector('input[name="travelers_group"]:checked');
    const groupVal = selectedGroup ? selectedGroup.parentElement.textContent.trim() : 'Coppia';

    let selectedExps = [];
    document.querySelectorAll('input[name="tour_experiences"]:checked').forEach(exp => {
      selectedExps.push(exp.parentElement.textContent.trim());
    });
    const expText = selectedExps.length > 0 ? selectedExps.join(', ') : 'Itinerario standard';

    let msg = '';
    if (currentLang === 'it') {
      msg = `Buongiorno! Vorrei richiedere informazioni e un preventivo per un tour a Tashkent:\n` +
            `• Durata: ${durVal}\n` +
            `• Preferenza: ${focusVal}\n` +
            `• Partecipanti: ${groupVal}\n` +
            `• Esperienze desiderate: ${expText}\n` +
            `Potete inviarmi la disponibilità e i dettagli? Grazie!`;
    } else {
      msg = `Hello! I would like to inquire about a private guided tour in Tashkent:\n` +
            `• Duration: ${durVal}\n` +
            `• Preferred Focus: ${focusVal}\n` +
            `• Party: ${groupVal}\n` +
            `• Selected Experiences: ${expText}\n` +
            `Could you please send me availability and a personalized quote? Thank you!`;
    }

    const encoded = encodeURIComponent(msg);
    whatsappCustomBtn.href = `https://wa.me/${SARDOR_WHATSAPP}?text=${encoded}`;
  }

  // Add listeners for custom tour options
  document.querySelectorAll('.custom-builder-card input').forEach(input => {
    input.addEventListener('change', updateWhatsAppCustomLink);
  });

  // 6. FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });

  // 7. Contact Form Submission
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

      let whatsappText = '';
      if (currentLang === 'it') {
        whatsappText = `Richiesta Tour a Tashkent:\nNome: ${name}\nEmail: ${email}\nTel: ${phone}\nTour: ${tour}\nDate: ${dates}\nNote: ${notes}`;
      } else {
        whatsappText = `Tashkent Tour Inquiry:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nTour: ${tour}\nDates: ${dates}\nNotes: ${notes}`;
      }

      const waUrl = `https://wa.me/${SARDOR_WHATSAPP}?text=${encodeURIComponent(whatsappText)}`;

      if (formSuccess) {
        formSuccess.style.display = 'block';
      }

      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 800);

      contactForm.reset();
    });
  }

  // 8. Initial Language Render
  applyLanguage(currentLang);
});
