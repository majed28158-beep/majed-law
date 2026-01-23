document.addEventListener('DOMContentLoaded', function () {
  const WHATSAPP_NUMBER_INTL = "966539493424"; // بدون +
  const EMAIL_TO = "majed-1394@hotmail.com";
  const EMAIL_SUBJECT = "طلب استشارة قانونية - من الموقع";

  // ===== Menu =====
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      navLinks.classList.toggle('active');
      menuToggle.innerHTML = navLinks.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });

    document.querySelectorAll('.nav-links a').forEach(a => {
      a.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
      });
    });
  }

  // ===== Year =====
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== Smooth Scroll =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      window.scrollTo({ top: el.offsetTop - 90, behavior: 'smooth' });
    });
  });

  // ===== Notification =====
  const notifyBox = document.getElementById('notify');
  function notify(message, type = 'success') {
    if (!notifyBox) return;

    notifyBox.className = 'notification';
    notifyBox.innerHTML = `
      <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle'}"></i>
      <span>${message}</span>
      <button class="close" aria-label="إغلاق"><i class="fas fa-times"></i></button>
    `;

    if (type === 'error') notifyBox.classList.add('error');
    setTimeout(() => notifyBox.classList.add('show'), 10);

    const closeBtn = notifyBox.querySelector('.close');
    closeBtn.addEventListener('click', () => notifyBox.classList.remove('show'));

    setTimeout(() => notifyBox.classList.remove('show'), 5500);
  }

  // ===== Form Channel Handling (بديل آمن عن e.submitter) =====
  const channelInput = document.getElementById('sendChannel');
  const btnWhatsApp = document.getElementById('btnWhatsApp');
  const btnEmail = document.getElementById('btnEmail');

  if (btnWhatsApp && channelInput) {
    btnWhatsApp.addEventListener('click', () => channelInput.value = 'whatsapp');
  }
  if (btnEmail && channelInput) {
    btnEmail.addEventListener('click', () => channelInput.value = 'email');
  }

  // ===== Form Submit =====
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const channel = (channelInput?.value || 'whatsapp').toLowerCase();
      const name = (document.getElementById('name')?.value || '').trim();
      const phone = (document.getElementById('phone')?.value || '').trim();
      const email = (document.getElementById('email')?.value || '').trim();
      const message = (document.getElementById('message')?.value || '').trim();

      if (!name || !phone || !message) {
        notify('يرجى تعبئة الاسم ورقم الهاتف وملخص الموضوع.', 'error');
        return;
      }

      const pageUrl = window.location.href;

      const bodyText =
`طلب استشارة قانونية
الاسم: ${name}
الهاتف: ${phone}
البريد: ${email || '-'}
الموضوع: ${message}
الرابط: ${pageUrl}`;

      if (channel === 'email') {
        const mailto =
          `mailto:${encodeURIComponent(EMAIL_TO)}` +
          `?subject=${encodeURIComponent(EMAIL_SUBJECT)}` +
          `&body=${encodeURIComponent(bodyText)}`;

        window.location.href = mailto;
        notify('تم فتح البريد لإرسال الرسالة. إذا لم يفتح، استخدم زر واتساب.', 'success');
        form.reset();
        return;
      }

      const waUrl = `https://wa.me/${WHATSAPP_NUMBER_INTL}?text=${encodeURIComponent(bodyText)}`;
      window.open(waUrl, '_blank', 'noopener');
      notify('تم فتح واتساب برسالة جاهزة. اضغط إرسال داخل واتساب.', 'success');
      form.reset();
    });
  }
});
