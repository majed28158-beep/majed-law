[file name]: script.js
[file content begin]
// JavaScript for Modern Lawyer Website

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
            
            // Add animation to menu items
            if (navLinks.classList.contains('active')) {
                const menuItems = document.querySelectorAll('.nav-links li');
                menuItems.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(20px)';
                    
                    setTimeout(() => {
                        item.style.transition = 'all 0.4s ease ' + (index * 0.1) + 's';
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, 50);
                });
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Form validation
            if (!name || !phone || !message) {
                showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual AJAX call)
            setTimeout(() => {
                // Success simulation
                showNotification(`شكراً ${name}، تم استلام رسالتك بنجاح. سوف نتصل بك على الرقم ${phone} في أقرب وقت ممكن.`, 'success');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Notification function
    function showNotification(message, type) {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            notification.remove();
        });
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Auto-remove after 5 seconds
        const autoRemove = setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
        
        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            clearTimeout(autoRemove);
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
    }
    
    // Add notification styles
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
            padding: 20px;
            min-width: 300px;
            max-width: 400px;
            transform: translateX(150%);
            transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            z-index: 9999;
            border-right: 5px solid #38a169;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .notification.error {
            border-right-color: #e53e3e;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .notification-content i {
            font-size: 1.5rem;
            color: #38a169;
        }
        
        .notification.error .notification-content i {
            color: #e53e3e;
        }
        
        .notification-content span {
            font-weight: 500;
            color: #333;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: #999;
            cursor: pointer;
            font-size: 1rem;
            transition: color 0.3s ease;
            padding: 5px;
            margin-right: 10px;
        }
        
        .notification-close:hover {
            color: #333;
        }
    `;
    document.head.appendChild(notificationStyles);
    
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
    
    // Navbar background change on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to nav links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let scrollY = window.pageYOffset;
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        navLinksAll.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active-link');
            }
        });
    });
    
    // Add active-link style to CSS
    const activeLinkStyle = document.createElement('style');
    activeLinkStyle.textContent = `
        .active-link {
            color: var(--primary-color) !important;
            font-weight: 700;
        }
        .active-link:after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(activeLinkStyle);
    
    // Service cards animation on scroll
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe service cards and features
    document.querySelectorAll('.service-card, .feature, .team-member, .contact-item').forEach(el => {
        observer.observe(el);
    });
    
    // Add animation styles
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        .service-card, .feature, .team-member, .contact-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .service-card.animate-in,
        .feature.animate-in,
        .team-member.animate-in,
        .contact-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .service-card:nth-child(1) { transition-delay: 0.1s; }
        .service-card:nth-child(2) { transition-delay: 0.2s; }
        .service-card:nth-child(3) { transition-delay: 0.3s; }
        .service-card:nth-child(4) { transition-delay: 0.4s; }
        .service-card:nth-child(5) { transition-delay: 0.5s; }
        .service-card:nth-child(6) { transition-delay: 0.6s; }
        
        .feature:nth-child(1) { transition-delay: 0.1s; }
        .feature:nth-child(2) { transition-delay: 0.2s; }
        .feature:nth-child(3) { transition-delay: 0.3s; }
    `;
    document.head.appendChild(animationStyles);
    
    // Initialize the page with some default behaviors
    function init() {
        // Close mobile menu if open on page load (for direct anchor links)
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (menuToggle) {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
        
        // Add loading animation to page
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
        
        // Animate hero elements on load
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-buttons');
        heroElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                el.style.transition = 'all 0.8s ease ' + (index * 0.2) + 's';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 300);
        });
    }
    
    // Run initialization
    init();
    
    // Counter animation for statistics (if needed in future)
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16); // 60fps
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + '+';
            }
        }, 16);
    }
});
document.addEventListener('DOMContentLoaded', function () {
  // === إعدادات الاتصال ===
  const WHATSAPP_NUMBER_INTL = "966539493424"; // واتساب (بدون +)
  const EMAIL_TO = "majed-1394@hotmail.com";
  const EMAIL_SUBJECT = "طلب استشارة قانونية - من الموقع";

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      navLinks.classList.toggle('active');
      this.innerHTML = navLinks.classList.contains('active')
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

  // سنة الفوتر
  const yearElement = document.getElementById('currentYear');
  if (yearElement) yearElement.textContent = new Date().getFullYear();

  // Navbar scroll style
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    if (!navbar) return;
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      e.preventDefault();
      window.scrollTo({ top: targetElement.offsetTop - 90, behavior: 'smooth' });
    });
  });

  // Notifications
  function showNotification(message, type) {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const div = document.createElement('div');
    div.className = `notification ${type || 'success'}`;
    div.innerHTML = `
      <div class="notification-content">
        <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle'}"></i>
        <span>${message}</span>
      </div>
      <button class="notification-close" aria-label="إغلاق"><i class="fas fa-times"></i></button>
    `;

    document.body.appendChild(div);
    setTimeout(() => div.classList.add('show'), 10);

    const closeBtn = div.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => div.remove());

    setTimeout(() => {
      if (div && div.parentNode) div.remove();
    }, 6000);
  }

  // Form submit: WhatsApp / Email
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const submitter = e.submitter; // الزر الذي ضغطه المستخدم
      const channel = submitter?.dataset?.channel || 'whatsapp';

      const name = (document.getElementById('name')?.value || '').trim();
      const phone = (document.getElementById('phone')?.value || '').trim();
      const email = (document.getElementById('email')?.value || '').trim();
      const message = (document.getElementById('message')?.value || '').trim();

      if (!name || !phone || !message) {
        showNotification('يرجى تعبئة الاسم ورقم الهاتف وملخص الموضوع.', 'error');
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
        // mailto (يفتح برنامج البريد عند العميل)
        const mailto = `mailto:${encodeURIComponent(EMAIL_TO)}?subject=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(bodyText)}`;
        window.location.href = mailto;
        showNotification('تم فتح البريد لإرسال الرسالة. إذا لم يفتح، استخدم زر واتساب.', 'success');
        contactForm.reset();
        return;
      }

      // WhatsApp
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER_INTL}?text=${encodeURIComponent(bodyText)}`;
      window.open(waUrl, '_blank', 'noopener');
      showNotification('تم فتح واتساب برسالة جاهزة. اضغط إرسال داخل واتساب.', 'success');
      contactForm.reset();
    });
  }

  // إضافة CSS للإشعارات
  const notificationStyles = document.createElement('style');
  notificationStyles.textContent = `
    .notification{
      position:fixed; top:100px; right:20px;
      background:#fff; border-radius:12px;
      box-shadow:0 12px 30px rgba(0,0,0,.15);
      padding:16px 16px; min-width:280px; max-width:420px;
      transform:translateX(150%); transition:transform .45s ease;
      z-index:9999; border-right:6px solid #38a169;
      display:flex; align-items:center; justify-content:space-between;
    }
    .notification.error{border-right-color:#e53e3e;}
    .notification.show{transform:translateX(0);}
    .notification-content{display:flex; align-items:center; gap:10px;}
    .notification-content i{font-size:1.4rem; color:#38a169;}
    .notification.error .notification-content i{color:#e53e3e;}
    .notification-content span{font-weight:600; color:#222; line-height:1.6;}
    .notification-close{background:none;border:none;color:#888;cursor:pointer;font-size:1rem;padding:8px;}
  `;
  document.head.appendChild(notificationStyles);
});

[file content end]