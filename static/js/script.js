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




//quiz page

    let currentStep = 1
    let quizData = {
    name: "",
    age: "",
    skinType: "",
    concerns: [],
    routine: "",
    budget: "",
    }

    const products = {
    cleansers: [
        { name: "Gentle Cleansing Oil", price: 45, skinTypes: ["dry", "sensitive"], concerns: ["dryness"] },
        { name: "Purifying Foam Cleanser", price: 38, skinTypes: ["oily", "combination"], concerns: ["acne"] },
        { name: "Brightening Gel Cleanser", price: 42, skinTypes: ["all"], concerns: ["dullness", "pigmentation"] },
    ],
    serums: [
        {
        name: "Vitamin C Brightening Serum",
        price: 85,
        skinTypes: ["all"],
        concerns: ["dullness", "pigmentation", "aging"],
        },
        { name: "Hyaluronic Acid Serum", price: 65, skinTypes: ["dry", "sensitive"], concerns: ["dryness", "aging"] },
        { name: "Niacinamide Serum", price: 55, skinTypes: ["oily", "combination"], concerns: ["acne", "pigmentation"] },
        { name: "Retinol Renewal Serum", price: 95, skinTypes: ["all"], concerns: ["aging", "acne"] },
    ],
    moisturizers: [
        { name: "Hydrating Night Cream", price: 75, skinTypes: ["dry", "sensitive"], concerns: ["dryness", "aging"] },
        { name: "Lightweight Day Moisturizer", price: 58, skinTypes: ["oily", "combination"], concerns: ["acne"] },
        { name: "Anti-Aging Moisturizer", price: 88, skinTypes: ["all"], concerns: ["aging", "dryness"] },
    ],
    treatments: [
        { name: "Exfoliating Mask", price: 68, skinTypes: ["oily", "combination"], concerns: ["acne", "dullness"] },
        { name: "Hydrating Sheet Mask Set", price: 45, skinTypes: ["dry", "sensitive"], concerns: ["dryness"] },
        { name: "Brightening Treatment", price: 125, skinTypes: ["all"], concerns: ["pigmentation", "dullness"] },
    ],
    }

    function nextStep() {
    // Validate current step
    if (currentStep === 1) {
        const name = document.getElementById("userName").value
        const age = document.getElementById("userAge").value

        if (!name || !age) {
        alert("Please fill in all fields")
        return
        }

        quizData.name = name
        quizData.age = age
    }

    if (currentStep === 3 && quizData.concerns.length === 0) {
        alert("Please select at least one skin concern")
        return
    }

    // Hide current step
    document.getElementById(`step${currentStep}`).classList.add("hidden")

    // Show next step
    currentStep++
    if (currentStep <= 6) {
        document.getElementById(`step${currentStep}`).classList.remove("hidden")
        document.getElementById(`step${currentStep}`).classList.add("slide-in")

        // Update progress bar
        const progress = (currentStep / 6) * 100
        document.getElementById("progressBar").style.width = progress + "%"

        // Generate recommendations on final step
        if (currentStep === 6) {
        generateRecommendations()
        }
    }
    }

    function selectOption(category, value) {
    quizData[category] = value

    // Remove selected class from all options in this step
    const currentStepElement = document.getElementById(`step${currentStep}`)
    const options = currentStepElement.querySelectorAll(".quiz-option")
    options.forEach((option) => option.classList.remove("selected"))

    // Add selected class to clicked option
    event.target.closest(".quiz-option").classList.add("selected")

    // Auto-advance after selection (except for concerns step)
    if (category !== "concerns") {
        setTimeout(() => {
        nextStep()
        }, 500)
    }
    }

    function toggleConcern(concern) {
    const index = quizData.concerns.indexOf(concern)
    const option = event.target.closest(".quiz-option")

    if (index > -1) {
        quizData.concerns.splice(index, 1)
        option.classList.remove("selected")
    } else {
        quizData.concerns.push(concern)
        option.classList.add("selected")
    }
    }

    function generateRecommendations() {
    const recommendationsContainer = document.getElementById("recommendations")
    let recommendations = []

    // Get cleanser recommendation
    const cleanser =
        products.cleansers.find(
        (product) => product.skinTypes.includes(quizData.skinType) || product.skinTypes.includes("all"),
        ) || products.cleansers[0]

    // Get serum recommendation based on concerns
    const serum =
        products.serums.find((product) => product.concerns.some((concern) => quizData.concerns.includes(concern))) ||
        products.serums[0]

    // Get moisturizer recommendation
    const moisturizer =
        products.moisturizers.find(
        (product) => product.skinTypes.includes(quizData.skinType) || product.skinTypes.includes("all"),
        ) || products.moisturizers[0]

    // Get treatment recommendation based on budget and concerns
    let treatment = null
    if (quizData.budget !== "low") {
        treatment = products.treatments.find((product) =>
        product.concerns.some((concern) => quizData.concerns.includes(concern)),
        )
    }

    recommendations = [cleanser, serum, moisturizer]
    if (treatment) recommendations.push(treatment)

    // Filter by budget
    if (quizData.budget === "low") {
        recommendations = recommendations.filter((product) => product.price < 60)
    } else if (quizData.budget === "medium") {
        recommendations = recommendations.filter((product) => product.price < 100)
    }

    // Generate HTML
    let html = `<div class="bg-white bg-opacity-90 p-6 rounded-lg mb-6">
            <h3 class="text-xl font-medium mb-2">Hello ${quizData.name}!</h3>
            <p class="text-gray-600">Based on your ${quizData.skinType} skin type and concerns about ${quizData.concerns.join(", ")}, here's your personalized routine:</p>
        </div>`

    recommendations.forEach((product, index) => {
        html += `
                <div class="bg-white bg-opacity-90 p-6 rounded-lg border border-gray-200">
                    <div class="flex justify-between items-start mb-2">
                        <h4 class="font-medium text-lg">${product.name}</h4>
                        <span class="text-xl font-bold text-gray-800">$${product.price}</span>
                    </div>
                    <p class="text-sm text-gray-600 mb-4">Step ${index + 1} of your routine</p>
                    <button class="bg-gray-800 text-white px-6 py-2 text-sm font-medium hover:bg-gray-900 transition-colors">
                        ADD TO CART
                    </button>
                </div>
            `
    })

    const totalPrice = recommendations.reduce((sum, product) => sum + product.price, 0)
    html += `
            <div class="bg-gray-800 text-white p-6 rounded-lg text-center">
                <h4 class="text-xl font-medium mb-2">Complete Routine</h4>
                <p class="text-2xl font-bold mb-4">$${totalPrice}</p>
                <button class="bg-white text-gray-800 px-8 py-3 font-medium hover:bg-gray-100 transition-colors">
                    GET YOUR COMPLETE ROUTINE
                </button>
            </div>
        `

    recommendationsContainer.innerHTML = html
    }

    function restartQuiz() {
    currentStep = 1
    quizData = {
        name: "",
        age: "",
        skinType: "",
        concerns: [],
        routine: "",
        budget: "",
    }

    // Hide all steps
    for (let i = 1; i <= 6; i++) {
        document.getElementById(`step${i}`).classList.add("hidden")
    }

    // Show first step
    document.getElementById("step1").classList.remove("hidden")
    document.getElementById("progressBar").style.width = "16.67%"

    // Clear form
    document.getElementById("userName").value = ""
    document.getElementById("userAge").value = ""

    // Remove all selected classes
    document.querySelectorAll(".quiz-option").forEach((option) => {
        option.classList.remove("selected")
    })
    }

    // Close button functionality
    document.getElementById("closeBtn").addEventListener("click", () => {
    if (confirm("Are you sure you want to close the quiz?")) {
        window.close()
    }
    })

  // Mobile menu toggle
  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });
  }
  // Dropdown open/close logic
  document.querySelectorAll('.group > button').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const parent = btn.parentElement;
      document.querySelectorAll('.group .group-hover\\:block').forEach(el => {
        if (!parent.contains(el)) el.style.display = 'none';
      });
      const dropdown = parent.querySelector('.group-hover\\:block');
      if (dropdown) {
        dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
      }
    });
  });
  document.addEventListener('click', function(e) {
    document.querySelectorAll('.group .group-hover\\:block').forEach(el => {
      if (!el.contains(e.target) && !el.parentElement.contains(e.target)) {
        el.style.display = 'none';
      }
    });
  });