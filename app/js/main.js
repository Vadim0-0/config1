document.addEventListener('DOMContentLoaded', function() {
  if (window.innerWidth >= 1024) {
    // Переменные для управления скроллингом
    let currentScroll = window.scrollY || window.pageYOffset;
    let targetScroll = currentScroll;
    let scrollOffset = 0;
    let scrollEasing = 0.04; // Коэффициент плавности (чем меньше, тем плавнее)
    let isScrolling = false;

    // Обработчик событий скролла
    window.addEventListener('scroll', function(e) {
        // Отменяем стандартное поведение скролла
        e.preventDefault();
    }, { passive: false });

    // Функция плавного скроллинга
    function smoothScroll() {
        // Вычисляем разницу между текущей и целевой позицией
        let diff = targetScroll - currentScroll;

        // Если разница достаточно большая, продолжаем анимацию
        if (Math.abs(diff) > 0.5) {
            isScrolling = true;

            // Применяем эффект инерции - чем больше скорость, тем больше "разгон"
            let speed = diff * scrollEasing;
            currentScroll += speed;

            // Ограничиваем максимальную скорость для плавности
            speed = Math.max(Math.min(speed, 30), -30);
            currentScroll += speed;

            window.scrollTo(0, currentScroll);
            requestAnimationFrame(smoothScroll);
        } else {
            isScrolling = false;
            currentScroll = targetScroll;
            window.scrollTo(0, currentScroll);
        }
    }

    // Обработчик колеса мыши/тачпада
    window.addEventListener('wheel', function(e) {
        // Обновляем целевую позицию скролла
        targetScroll += e.deltaY;

        // Ограничиваем скролл в пределах страницы
        targetScroll = Math.max(0, Math.min(targetScroll, document.body.scrollHeight - window.innerHeight));

        // Если анимация не запущена, запускаем
        if (!isScrolling) {
            requestAnimationFrame(smoothScroll);
        }

        // Предотвращаем стандартное поведение скролла
        e.preventDefault();
    }, { passive: false });

    // Обработчик касаний для мобильных устройств
    let touchStartY = 0;
    window.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    }, { passive: false });

    window.addEventListener('touchmove', function(e) {
        let touchY = e.touches[0].clientY;
        let touchDiff = touchStartY - touchY;

        // Обновляем целевую позицию с учетом скорости касания
        targetScroll += touchDiff * 2;
        targetScroll = Math.max(0, Math.min(targetScroll, document.body.scrollHeight - window.innerHeight));

        if (!isScrolling) {
            requestAnimationFrame(smoothScroll);
        }

        touchStartY = touchY;
        e.preventDefault();
    }, { passive: false });
  }
});

// hero - Анимация logo
document.addEventListener('DOMContentLoaded', function() {
  const firstBlock = document.getElementById('firstBlock');
  if (!firstBlock) return;

  let isAnimating = false; // Флаг, чтобы избежать повторных запусков

  firstBlock.addEventListener('mouseenter', () => {
    if (isAnimating) return; // Если анимация уже идёт — игнорируем

    isAnimating = true;
    firstBlock.classList.add('animate');

    setTimeout(() => {
      firstBlock.classList.remove('animate');
      isAnimating = false; // Разблокируем анимацию после завершения
    }, 3500);
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const firstBlock = document.getElementById('secondBlock');
  if (!firstBlock) return;

  let isAnimating = false; // Флаг, чтобы избежать повторных запусков

  firstBlock.addEventListener('mouseenter', () => {
    if (isAnimating) return; // Если анимация уже идёт — игнорируем

    isAnimating = true;
    firstBlock.classList.add('animate');

    setTimeout(() => {
      firstBlock.classList.remove('animate');
      isAnimating = false; // Разблокируем анимацию после завершения
    }, 5000);
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const firstBlock = document.getElementById('threedBlock');
  if (!firstBlock) return;

  let isAnimating = false; // Флаг, чтобы избежать повторных запусков

  firstBlock.addEventListener('mouseenter', () => {
    if (isAnimating) return; // Если анимация уже идёт — игнорируем

    isAnimating = true;
    firstBlock.classList.add('animate');

    setTimeout(() => {
      firstBlock.classList.remove('animate');
      isAnimating = false; // Разблокируем анимацию после завершения
    }, 3000);
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const firstBlock = document.getElementById('fourthBlock');
  if (!firstBlock) return;

  let isAnimating = false; // Флаг, чтобы избежать повторных запусков

  firstBlock.addEventListener('mouseenter', () => {
    if (isAnimating) return; // Если анимация уже идёт — игнорируем

    isAnimating = true;
    firstBlock.classList.add('animate');

    setTimeout(() => {
      firstBlock.classList.remove('animate');
      isAnimating = false; // Разблокируем анимацию после завершения
    }, 2000);
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const firstBlock = document.getElementById('fifthBlock');
  if (!firstBlock) return;

  let isAnimating = false; // Флаг, чтобы избежать повторных запусков

  firstBlock.addEventListener('mouseenter', () => {
    if (isAnimating) return; // Если анимация уже идёт — игнорируем

    isAnimating = true;
    firstBlock.classList.add('animate');

    setTimeout(() => {
      firstBlock.classList.remove('animate');
      isAnimating = false; // Разблокируем анимацию после завершения
    }, 4000);
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const firstBlock = document.getElementById('sixthBlock');
  if (!firstBlock) return;

  let isAnimating = false; // Флаг, чтобы избежать повторных запусков

  firstBlock.addEventListener('mouseenter', () => {
    if (isAnimating) return; // Если анимация уже идёт — игнорируем

    isAnimating = true;
    firstBlock.classList.add('animate');

    setTimeout(() => {
      firstBlock.classList.remove('animate');
      isAnimating = false; // Разблокируем анимацию после завершения
    }, 3000);
  });
});

// hero - скольжение изображения
document.addEventListener('DOMContentLoaded', function() {
  const image = document.querySelector('.main-hero__img');
  const imageContainer = document.querySelector('.main-hero__img');

  function handleScroll() {
    const scrollPosition = window.scrollY;
    const containerTop = imageContainer.offsetTop;
    const containerHeight = imageContainer.offsetHeight;
    const windowHeight = window.innerHeight;
    const imageHeight = image.offsetHeight;

    // Начало и конец анимации
    const scrollStart = containerTop - windowHeight;
    const scrollEnd = containerTop + containerHeight;

    // Прогресс скролла от 0 до 1
    let progress = (scrollPosition - scrollStart) / (scrollEnd - scrollStart);
    progress = Math.min(1, Math.max(0, progress));

    // Плавное замедление
    const easedProgress = easeInOutCubic(progress);

    // Начальное и конечное смещение в пикселях
    const startOffset = 100; // Начальное смещение
    const endOffset = -200;   // Конечное смещение

    // Вычисляем текущее смещение
    const translateY = startOffset + (endOffset - startOffset) * easedProgress;
    image.style.transform = `translateY(${translateY}px)`;
  }

  // Функция плавности
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  // Оптимизированный скролл
  window.addEventListener('scroll', function() {
    requestAnimationFrame(handleScroll);
  });

  // Инициализация
  handleScroll();
});

// sponsors - Увеличение блоков
document.addEventListener('DOMContentLoaded', function() {
  const sponsorItems = document.querySelectorAll('.sponsors-list__item');

  if (sponsorItems.length === 0) return;

  sponsorItems.forEach(block => {
    block.addEventListener('mousemove', (e) => {
      const rect = block.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // 3D эффект наклона
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const relX = (x - centerX) / centerX;
      const relY = (y - centerY) / centerY;

      block.style.transform = `
        perspective(500px)
        rotateX(${-relY * 10}deg)
        rotateY(${relX * 10}deg)
        scale(1.05)
      `;
    });

    block.addEventListener('mouseleave', () => {
      block.style.transform = `
        perspective(500px)
        rotateX(0)
        rotateY(0)
        scale(1)
      `;
    });
  });
});
