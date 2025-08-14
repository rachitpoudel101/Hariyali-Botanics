const heroTexts = ["Ancient Wisdom.", "Botanical Beauty.", "Ayurvedic Healing."];
let heroIndex = 0, charIndex = 0, isDeleting = false;
const typingSpeed = 100, erasingSpeed = 50, delayBetween = 1500;
const heroTyping = document.getElementById('hero-typing');

function type() {
    const currentText = heroTexts[heroIndex];
    if (!isDeleting) {
        heroTyping.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, delayBetween);
        } else setTimeout(type, typingSpeed);
    } else {
        heroTyping.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            heroIndex = (heroIndex + 1) % heroTexts.length;
            setTimeout(type, typingSpeed);
        } else setTimeout(type, erasingSpeed);
    }
}

document.addEventListener("DOMContentLoaded", () => { if (heroTexts.length) type(); });


// ===== Product Slider Script =====
  (function() {
    const sliderRow = document.getElementById('horizontal-slider');
    const sliderViewport = sliderRow ? sliderRow.parentElement : null;
    const leftBtn = document.getElementById('slider-left');
    const rightBtn = document.getElementById('slider-right');
    if (sliderRow && sliderViewport && leftBtn && rightBtn) {
      // Show/hide arrows based on screen size
      function updateArrowVisibility() {
        if (window.innerWidth >= 768) {
          leftBtn.style.display = 'flex';
          rightBtn.style.display = 'flex';
        } else {
          leftBtn.style.display = 'none';
          rightBtn.style.display = 'none';
        }
      }
      updateArrowVisibility();
      window.addEventListener('resize', updateArrowVisibility);

      // Compute scroll step = card width + actual computed gap
      function getGap() {
        const styles = window.getComputedStyle(sliderRow);
        const gapVal = parseFloat(styles.columnGap || styles.gap || '0');
        return Number.isNaN(gapVal) ? 0 : gapVal;
      }
      function getCardWidth() {
        const card = sliderRow.querySelector('.product-card');
        return card ? card.offsetWidth + getGap() : sliderViewport.clientWidth;
      }

      leftBtn.addEventListener('click', () => {
        sliderViewport.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
      });
      rightBtn.addEventListener('click', () => {
        sliderViewport.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
      });
    }
  })();