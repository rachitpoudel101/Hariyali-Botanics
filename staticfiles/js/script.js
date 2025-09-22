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

document.addEventListener("DOMContentLoaded", () => {
    if (heroTyping) type();  // Add check for heroTyping
});


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

 // ===== Chatbot Script =====
  // Remove DOMContentLoaded so the script runs immediately after elements are loaded

   const chatbotBtn = document.getElementById('chatbot-btn');

  const chatbotPopup = document.getElementById('chatbot-popup');
  const chatbotForm = document.getElementById('chatbot-form');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotMessages = document.getElementById('chatbot-messages');

  if (chatbotBtn && chatbotPopup) {
    chatbotBtn.addEventListener('click', () => {
      // Always show the popup when clicked
      chatbotPopup.style.display = 'block';
      chatbotMessages.innerHTML = '';
      chatbotInput.value = '';
      chatbotInput.focus();
    });
  }

  if (chatbotForm && chatbotMessages && chatbotInput) {
    chatbotForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const userMsg = chatbotInput.value.trim();
      if (userMsg) {
        chatbotMessages.innerHTML = `
          <div class="mb-2"><span class="font-semibold text-[#18382c]">You:</span> ${userMsg}</div>
          <div class="mb-2"><span class="font-semibold text-[#18382c]">Bot:</span> Hello customer, we are Hariyali Botanic.<br>
          For more details, contact us on WhatsApp.</div>
          <a href="https://wa.me/9766626737" target="_blank" class="inline-block bg-[#25D366] text-white px-3 py-1 rounded mt-2 font-semibold text-xs hover:bg-[#128C7E] transition">
            WhatsApp Chat
          </a>
        `;
        chatbotInput.value = '';
      }
    });
  }

  // Optional: Close popup when clicking outside
  document.addEventListener('click', function(e) {
    if (
      chatbotPopup &&
      !chatbotPopup.contains(e.target) &&
      !chatbotBtn.contains(e.target)
    ) {
      chatbotPopup.style.display = 'none';
    }
  });


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

//     let currentStep = 1;
//     let quizData = {
//     quizId: null,
//     name: "",
//     age: "",
//     skinType: "",
//     skinTypeId: null,
//     concerns: [],
//     concernId: null,
//     routine: "",
//     budget: "",
//     priceRange: ""
// };

// function nextStep() {
//     if (currentStep === 1) {
//         const name = document.getElementById("userName").value;
//         const age = document.getElementById("userAge").value;
//         if (!name || !age) {
//             alert("Please fill in all fields");
//             return;
//         }
//         quizData.name = name;
//         quizData.age = age;
//         // AJAX to create quiz log
//         fetch("/quiz-create/", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/x-www-form-urlencoded",
//                 "X-CSRFToken": getCookie("csrftoken"),
//             },
//             body: `name=${encodeURIComponent(name)}&age_range=${encodeURIComponent(age)}`
//         })
//         .then(res => res.json())
//         .then(data => {
//             quizData.quizId = data.quiz_id;
//             loadSkinTypes();
//             showNextStep();
//         });
//         return;
//     }
//     if (currentStep === 2) {
//         // Wait for skin type selection
//         if (!quizData.skinTypeId) {
//             alert("Please select a skin type");
//             return;
//         }
//         fetch("/quiz-update-skin-type/", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/x-www-form-urlencoded",
//                 "X-CSRFToken": getCookie("csrftoken"),
//             },
//             body: `quiz_id=${quizData.quizId}&skin_type_id=${quizData.skinTypeId}`
//         })
//         .then(() => {
//             loadSkinConcerns();
//             showNextStep();
//         });
//         return;
//     }
//     if (currentStep === 3) {
//         if (!quizData.concernId) {
//             alert("Please select a skin concern");
//             return;
//         }
//         fetch("/quiz-update-skin-concern/", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/x-www-form-urlencoded",
//                 "X-CSRFToken": getCookie("csrftoken"),
//             },
//             body: `quiz_id=${quizData.quizId}&skin_concern_id=${quizData.concernId}`
//         })
//         .then(() => showNextStep());
//         return;
//     }
//     if (currentStep === 4) {
//         if (!quizData.routine) {
//             alert("Please select your routine time");
//             return;
//         }
//         showNextStep();
//         return;
//     }
//     if (currentStep === 5) {
//         if (!quizData.priceRange) {
//             alert("Please select a budget");
//             return;
//         }
//         fetch("/quiz-update-price-range/", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/x-www-form-urlencoded",
//                 "X-CSRFToken": getCookie("csrftoken"),
//             },
//             body: `quiz_id=${quizData.quizId}&price_range=${quizData.priceRange}`
//         })
//         .then(() => showNextStep());
//         return;
//     }
//     showNextStep();
// }

// function showNextStep() {
//     document.getElementById(`step${currentStep}`).classList.add("hidden");
//     currentStep++;
//     if (currentStep <= 6) {
//         document.getElementById(`step${currentStep}`).classList.remove("hidden");
//         document.getElementById(`step${currentStep}`).classList.add("slide-in");
//         const progress = (currentStep / 6) * 100;
//         document.getElementById("progressBar").style.width = progress + "%";
//         // Dynamically load price choices when step 5 is shown
//         if (currentStep === 5) {
//             loadPriceChoices();
//         }
//         if (currentStep === 6) {
//             generateRecommendations();
//         }
//     }
// }

// function loadSkinTypes() {
//     fetch("/get-skin-types/")
//     .then(res => res.json())
//     .then(data => {
//         const container = document.getElementById("step2");
//         const grid = container.querySelector(".grid");
//         grid.innerHTML = data.skin_types.map(st =>
//             `<button type="button" class="quiz-option w-full bg-[#fdfaf6] border border-gray-200 rounded-lg py-4 px-6 text-left hover:border-[#18382c]" onclick="selectSkinType('${st.id}', '${st.name}')">
//                 <span class="font-medium">${st.name}</span>
//             </button>`
//         ).join('');
//     });
// }

// function selectSkinType(id, name) {
//     quizData.skinTypeId = id;
//     quizData.skinType = name;
//     document.querySelectorAll("#step2 .quiz-option").forEach(opt => opt.classList.remove("selected"));
//     event.target.closest(".quiz-option").classList.add("selected");
//     setTimeout(() => nextStep(), 500);
// }

// function loadSkinConcerns() {
//     fetch("/get-skin-concerns/")
//     .then(res => res.json())
//     .then(data => {
//         const container = document.getElementById("step3");
//         const grid = container.querySelector(".grid");
//         grid.innerHTML = data.concerns.map(c =>
//             `<button type="button" class="quiz-option w-full bg-[#fdfaf6] border border-gray-200 rounded-lg py-4 px-6 text-left hover:border-[#18382c]" onclick="selectSkinConcern('${c.id}', '${c.name}')">
//                 ${c.name}
//             </button>`
//         ).join('');
//     });
// }

// function selectSkinConcern(id, name) {
//     quizData.concernId = id;
//     quizData.concerns = [name];
//     document.querySelectorAll("#step3 .quiz-option").forEach(opt => opt.classList.remove("selected"));
//     event.target.closest(".quiz-option").classList.add("selected");
//     setTimeout(() => nextStep(), 500);
// }

// // Add this function to handle routine selection
// function selectOption(type, value) {
//     if (type === 'routine') {
//         quizData.routine = value;
//         document.querySelectorAll("#step4 .quiz-option").forEach(opt => opt.classList.remove("selected"));
//         event.target.closest(".quiz-option").classList.add("selected");
//     }
// }

// function loadPriceChoices() {
//     fetch("/get-price-choices/")
//     .then(res => res.json())
//     .then(data => {
//         const container = document.getElementById("step5");
//         const grid = container.querySelector(".grid");
//         grid.innerHTML = data.price_choices.map(pc =>
//             `<button type="button" class="quiz-option w-full bg-[#fdfaf6] border border-gray-200 rounded-lg py-4 px-6 text-left hover:border-[#18382c]" onclick="selectBudget('${pc.value}')">
//                 ${pc.label}
//             </button>`
//         ).join('');
//     });
// }

// function selectBudget(value) {
//     quizData.priceRange = value;
//     document.querySelectorAll("#step5 .quiz-option").forEach(opt => opt.classList.remove("selected"));
//     event.target.closest(".quiz-option").classList.add("selected");
//     setTimeout(() => nextStep(), 500);
// }

// function generateRecommendations() {
//     const recommendationsContainer = document.getElementById("recommendations");
//     fetch(`/quiz-recommendations/?quiz_id=${quizData.quizId}`)
//     .then(response => response.json())
//     .then data => {
//         let html = `<div class="bg-white bg-opacity-90 p-6 rounded-lg mb-6">
//             <h3 class="text-xl font-medium mb-2">Hello ${quizData.name}!</h3>
//             <p class="text-gray-600">Based on your ${quizData.skinType} skin type and concerns about ${quizData.concerns.join(", ")}, here's your personalized routine:</p>
//         </div>`;
//         data.recommendations.forEach((product, index) => {
//             html += `
//                 <div class="bg-white bg-opacity-90 p-6 rounded-lg border border-gray-200">
//                     <div class="flex justify-between items-start mb-2">
//                         <h4 class="font-medium text-lg">${product.name}</h4>
//                         <span class="text-xl font-bold text-gray-800">$${product.price}</span>
//                     </div>
//                     <p class="text-sm text-gray-600 mb-4">Step ${product.step} of your routine</p>
//                     <a href="/product-details/${product.id}/" class="bg-gray-800 text-white px-6 py-2 text-sm font-medium hover:bg-gray-900 transition-colors block text-center" style="text-decoration:none;">
//                         View Product
//                     </a>
//                 </div>
//             `;
//         });
//         recommendationsContainer.innerHTML = html;
//     });
// }

// // Helper to get CSRF token
// function getCookie(name) {
//     let cookieValue = null;
//     if (document.cookie && document.cookie !== '') {
//         const cookies = document.cookie.split(';');
//         for (let i = 0; i < cookies.length; i++) {
//             const cookie = cookies[i].trim();
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
// }

    // Quiz logic for dynamic steps
    let currentStep = 1;
    let totalSteps = 0; // Will be set dynamically
    let quizData = {
        name: "",
        age_ranges: [],  // Array for multi-select
        email: "",
        phone: "",
        selections: [], // Array to store selected choices for each step
        types: [] // Array to store body types
    };

    document.addEventListener("DOMContentLoaded", () => {
        // Set total steps from the number of steps in the DOM (excluding final)
        totalSteps = document.querySelectorAll('.quiz-step').length - 1; // Final step is separate
        if (totalSteps < 1) totalSteps = 1; // Fallback for no dynamic questions
    });

    // Function to handle next step
    function nextStep() {
        const currentStepEl = document.getElementById(`step${currentStep}`);
        let canProceed = false;

        if (currentStep === 1) {
            // Validate all fields for first step
            const name = document.getElementById("userName").value.trim();
            const ageSelect = document.getElementById("userAge");
            const selectedAges = Array.from(ageSelect.selectedOptions).map(option => option.value);
            const email = document.getElementById("userEmail").value.trim();
            const phone = document.getElementById("userPhone").value.trim();
            if (!name || selectedAges.length === 0 || !email || !phone) {
                alert("Please fill in all fields and select at least one age range.");
                return;
            }
            quizData.name = name;
            quizData.age_ranges = selectedAges;
            quizData.email = email;
            quizData.phone = phone;
            canProceed = true;
        } else if (currentStepEl.querySelector('input[type="text"]')) {
            const input = currentStepEl.querySelector('input[type="text"]');
            if (input.value.trim()) {
                quizData.selections.push(input.value.trim());
                canProceed = true;
            } else {
                alert("Please enter your response.");
                return;
            }
        } else if (currentStepEl.querySelector('select')) {
            const select = currentStepEl.querySelector('select');
            if (select.value) {
                quizData.selections.push(select.value);
                canProceed = true;
            } else {
                alert("Please select an option.");
                return;
            }
        } else {
            // For button selections
            const selected = currentStepEl.querySelector('.quiz-option.selected');
            if (selected) {
                const choiceId = selected.getAttribute('data-choice-id');
                quizData.selections.push(choiceId);
                canProceed = true;
            } else {
                alert("Please select an option.");
                return;
            }
        }

        if (canProceed) {
            showNextStep();
        }
    }

    // Function to show next step
    function showNextStep() {
        document.getElementById(`step${currentStep}`).classList.add("hidden");
        currentStep++;
        if (currentStep <= totalSteps) {
            document.getElementById(`step${currentStep}`).classList.remove("hidden");
            updateProgress();
        } else {
            // Show final step (recommendations)
            const finalStepId = totalSteps + 1;
            const finalStep = document.getElementById(`step${finalStepId}`);
            if (finalStep) {
                finalStep.classList.remove("hidden");
                // Determine and display body type
                const bodyType = determineBodyType();
                document.getElementById('bodyType').textContent = bodyType;
            }
            updateProgress();
            // Save quiz data to DB
            saveQuizData();
            // Here you can add logic to generate recommendations based on quizData
        }
    }

    // Function to update progress bar
    function updateProgress() {
        const progress = (currentStep / (totalSteps + 1)) * 100; // +1 for final step
        const progressBar = document.getElementById("progressBar");
        if (progressBar) {
            progressBar.style.width = progress + "%";
        }
    }

    // Function to save quiz data
    function saveQuizData() {
        const bodyType = determineBodyType();
        const formData = new FormData();
        formData.append('name', quizData.name);
        formData.append('age_ranges', quizData.age_ranges.join(','));  // Comma-separated
        formData.append('email', quizData.email);
        formData.append('phone', quizData.phone);
        formData.append('body_type', bodyType);  // Determined body type
        formData.append('selected_choices', quizData.selections.join(','));  // Assuming IDs

        fetch('/quiz/', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            }
        }).then(response => {
            if (response.ok) {
                console.log('Quiz data saved');
            } else {
                console.error('Failed to save quiz data');
            }
        });
    }

    // Function to select option (for button types)
    function selectOption(questionId, choiceId) {
        const stepEl = document.getElementById(`step${currentStep}`);
        stepEl.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
        const selectedBtn = event.target.closest('.quiz-option');
        selectedBtn.classList.add('selected');
        selectedBtn.setAttribute('data-choice-id', choiceId);
        // Collect body type
        const type = selectedBtn.getAttribute('data-type');
        if (type && type !== 'neutral') {
            quizData.types.push(type);
        }
    }

    // Function to determine body type
    function determineBodyType() {
        const typeCount = { vata: 0, pitta: 0, kapha: 0 };
        quizData.types.forEach(type => {
            if (typeCount[type] !== undefined) {
                typeCount[type]++;
            }
        });
        let maxType = 'vata';
        let maxCount = 0;
        for (const [type, count] of Object.entries(typeCount)) {
            if (count > maxCount) {
                maxCount = count;
                maxType = type;
            }
        }
        return maxType.charAt(0).toUpperCase() + maxType.slice(1); // Capitalize
    }

    // Helper to get CSRF token
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
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