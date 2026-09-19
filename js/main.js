/**
 * Viaggi Uzbekistan - Main Interactive Controller
 * Personalized for Sardor (Official Guide in Tashkent)
 * Handles bilingual switching (IT / EN), train ticket booking concierge,
 * Tashkent highlights tabs, interactive calculator, and WhatsApp booking.
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

    // Re-calculate custom tour quote in current language
    updateCustomTourPrice();
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

    // Close mobile nav when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-active');
      });
    });
  }

  // 4. Interactive Tashkent Sights Tabs
  const sightTabs = document.querySelectorAll('.sight-tab');
  const sightCards = document.querySelectorAll('.sight-display-card');

  sightTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const sightId = tab.getAttribute('data-sight');
      
      sightTabs.forEach(t => t.classList.remove('active'));
      sightCards.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const targetCard = document.getElementById(`sight-${sightId}`);
      if (targetCard) {
        targetCard.classList.add('active');
      }
    });
  });

  // 5. Tour Inclusions Accordions
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

  // 6. Interactive Custom Tour Price Calculator
  const durationInputs = document.querySelectorAll('input[name="tour_duration"]');
  const trainInputs = document.querySelectorAll('input[name="train_service"]');
  const experienceInputs = document.querySelectorAll('input[name="tour_experiences"]');
  const priceDisplay = document.getElementById('calc-price-display');
  const whatsappCustomBtn = document.getElementById('btn-whatsapp-custom');

  function updateCustomTourPrice() {
    if (!priceDisplay) return;

    let basePrice = 85; // Default 1 full day in Tashkent

    // Duration
    const selectedDuration = document.querySelector('input[name="tour_duration"]:checked');
    if (selectedDuration) {
      if (selectedDuration.value === 'half') basePrice = 60;
      if (selectedDuration.value === 'full') basePrice = 85;
      if (selectedDuration.value === 'two') basePrice = 150;
    }

    // High-Speed Train Add-on
    let trainCost = 0;
    const selectedTrain = document.querySelector('input[name="train_service"]:checked');
    if (selectedTrain) {
      if (selectedTrain.value === 'afrosiyob') trainCost = 40;
      if (selectedTrain.value === 'manguberdi') trainCost = 45;
    }

    // Experiences add-on
    let expAddon = 0;
    experienceInputs.forEach(exp => {
      if (exp.checked) {
        expAddon += parseInt(exp.getAttribute('data-cost') || '0', 10);
      }
    });

    const totalPerPerson = Math.round(basePrice + trainCost + expAddon);
    priceDisplay.textContent = `€ ${totalPerPerson}`;

    // Update WhatsApp link with pre-filled message
    updateWhatsAppCustomLink(totalPerPerson);
  }

  function updateWhatsAppCustomLink(price) {
    if (!whatsappCustomBtn) return;

    const selectedDuration = document.querySelector('input[name="tour_duration"]:checked');
    const durVal = selectedDuration ? selectedDuration.parentElement.textContent.trim() : '1 Giorno';

    const selectedTrain = document.querySelector('input[name="train_service"]:checked');
    const trainVal = selectedTrain ? selectedTrain.parentElement.textContent.trim() : 'Solo tour';

    const selectedGroup = document.querySelector('input[name="travelers_group"]:checked');
    const groupVal = selectedGroup ? selectedGroup.parentElement.textContent.trim() : 'Coppia';

    let msg = '';
    if (currentLang === 'it') {
      msg = `Buongiorno Sardor! Vorrei informazioni per un tour a Tashkent e assistenza treni:\n` +
            `• Durata: ${durVal}\n` +
            `• Biglietti treni: ${trainVal}\n` +
            `• Partecipanti: ${groupVal}\n` +
            `• Budget indicativo stimato: circa € ${price} / persona.\n` +
            `Potete inviarmi la disponibilità e i dettagli? Grazie!`;
    } else {
      msg = `Hello Sardor! I would like details for a guided tour in Tashkent and train tickets:\n` +
            `• Duration: ${durVal}\n` +
            `• Train Service: ${trainVal}\n` +
            `• Guests: ${groupVal}\n` +
            `• Estimated Budget: approx € ${price} / person.\n` +
            `Could you please send me availability and details? Thank you!`;
    }

    const encoded = encodeURIComponent(msg);
    whatsappCustomBtn.href = `https://wa.me/${SARDOR_WHATSAPP}?text=${encoded}`;
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

      let whatsappText = '';
      if (currentLang === 'it') {
        whatsappText = `Richiesta Tour a Tashkent per Sardor:\nNome: ${name}\nEmail: ${email}\nTel: ${phone}\nServizio: ${tour}\nDate: ${dates}\nNote: ${notes}`;
      } else {
        whatsappText = `Tashkent Tour Inquiry for Sardor:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${tour}\nDates: ${dates}\nNotes: ${notes}`;
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

  // 9. Initial Language Render
  applyLanguage(currentLang);
});
