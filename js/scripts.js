document.addEventListener('DOMContentLoaded', () => {
  // === Carousel de testimonios ===
  const testimonials = document.querySelectorAll('.testimonial');
  const carousel = document.querySelector('.carousel');
  let currentIndex = 0;

  if (carousel && testimonials.length > 0) {
    setInterval(() => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }, 3000);
  }

  // === Formulario de contacto ===
  const form = document.getElementById('formulario-contacto');
  const modal = document.getElementById('form-contacto-modal');
  const cerrarModal = document.getElementById('cerrar-modal');
  const submitBtn = form?.querySelector('button');
  const spinner = submitBtn?.querySelector('.form-contacto-spinner');

  if (form && modal && cerrarModal && submitBtn && spinner) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      setTimeout(() => {
        form.reset();
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        modal.style.display = 'flex';
      }, 2000);
    });

    cerrarModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  // === Toggle precios mensual/anual ===
  const toggle = document.getElementById("toggle-precios");
  const precios = document.querySelectorAll(".precios-precio");

  if (toggle && precios.length > 0) {
    const actualizarPrecios = () => {
      precios.forEach(precio => {
        precio.textContent = toggle.checked
          ? precio.dataset.anual
          : precio.dataset.mensual;
      });
    };

    toggle.addEventListener("change", actualizarPrecios);
    actualizarPrecios(); // Actualiza al cargar
  }

  // === Scroll Reveal para posts del blog ===
  const posts = document.querySelectorAll('.blog-fitness-post');

  const revealOnScroll = () => {
    posts.forEach(post => {
      const rect = post.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        post.classList.add('blog-fitness-visible');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Llamada inicial

  // === Modo noche toggle con ícono 🌙 / 🌞 ===
  const toggleNoche = document.getElementById('toggle-noche');
  const iconoNoche = document.getElementById('icono-noche');

  function actualizarIconoNoche(activado) {
    iconoNoche.textContent = activado ? '🌞' : '🌙';
  }

  const nocheGuardado = localStorage.getItem('modoNoche') === 'true';

  if (nocheGuardado) {
    toggleNoche.checked = true;
    document.body.classList.add('noche');
  }

  actualizarIconoNoche(nocheGuardado);

  toggleNoche?.addEventListener('change', () => {
    const activado = toggleNoche.checked;
    document.body.classList.toggle('noche', activado);
    localStorage.setItem('modoNoche', activado);
    actualizarIconoNoche(activado);
  });
});