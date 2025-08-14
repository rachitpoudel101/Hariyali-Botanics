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



//product detauils page 


 // Mobile menu toggle code can be removed from here as it's now in navigation.js
  
  // Footer forms
  document.getElementById('footer-message-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('footer-name').value = '';
    document.getElementById('footer-message').value = '';
    document.getElementById('footer-message-success').classList.remove('hidden');
    setTimeout(() => {
      document.getElementById('footer-message-success').classList.add('hidden');
    }, 3000);
  });
  // ===== Product Review Form Script =====
  document.getElementById('review-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('review-name').value.trim();
    const rating = document.getElementById('review-rating').value;
    const text = document.getElementById('review-text').value.trim();
    if (name && rating && text) {
      const reviewsList = document.getElementById('reviews-list');
      const reviewDiv = document.createElement('div');
      reviewDiv.className = "bg-white rounded-lg shadow p-4";
      reviewDiv.innerHTML = `
        <div class="flex items-center gap-2 mb-1">
          <span class="font-semibold text-[#18382c]">${name}</span>
          <span class="text-yellow-400 text-sm">${'★'.repeat(rating)}${'☆'.repeat(5-rating)}</span>
        </div>
        <p class="text-gray-700 text-sm">${text}</p>
      `;
      reviewsList.appendChild(reviewDiv);
      document.getElementById('review-form').reset();
      document.getElementById('review-success').classList.remove('hidden');
      setTimeout(() => {
        document.getElementById('review-success').classList.add('hidden');
      }, 2500);
    }
  });
  const slider = document.getElementById('similar-slider');
  const leftBtn = document.getElementById('similar-arrow-left');
  const rightBtn = document.getElementById('similar-arrow-right');
  let similarScroll = 0;
  const cardWidth = 240; // card width + gap

  // Render cards
  if (slider) {
    slider.innerHTML = similarProducts.map(p => `
      <div class="min-w-[220px] bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col items-center">
        <img src="${p.img}" alt="${p.name}" class="w-32 h-32 object-cover rounded-md mb-3">
        <a href="${p.link}" class="font-semibold text-lg text-[#18382c] hover:underline mb-1">${p.name}</a>
        <span class="text-[#333] text-sm font-medium mb-1">${p.price}</span>
        <button class="bg-[#18382c] text-white px-4 py-1 rounded text-xs hover:bg-[#285c44] transition">View</button>
      </div>
    `).join('');
  }

  // Slider navigation
  function updateSlider() {
    if (slider) {
      slider.style.transform = `translateX(-${similarScroll}px)`;
    }
    // Show/hide arrows
    if (leftBtn) leftBtn.style.display = similarScroll > 0 ? 'block' : 'none';
    if (rightBtn) rightBtn.style.display = (similarScroll < (cardWidth * (similarProducts.length - 2))) ? 'block' : 'none';
  }

  if (leftBtn) {
    leftBtn.addEventListener('click', () => {
      similarScroll = Math.max(0, similarScroll - cardWidth);
      updateSlider();
    });
  }
  if (rightBtn) {
    rightBtn.addEventListener('click', () => {
      similarScroll = Math.min(cardWidth * (similarProducts.length - 2), similarScroll + cardWidth);
      updateSlider();
    });
  }

  // Initial state
  updateSlider();