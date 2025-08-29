document.addEventListener('DOMContentLoaded', function() {
  let questions = [];
  let current = 0;
  let answers = [];
  const quizId = document.querySelector('h1').textContent; // Or pass quiz id via template context
  const questionsDiv = document.getElementById('quiz-questions');
  const resultDiv = document.getElementById('quiz-result');
  const progressBar = document.getElementById('progressBar');

  fetch(`/quiz-questions/?quiz_id=1`)
    .then(res => res.json())
    .then(data => {
      questions = data.questions;
      showQuestion();
    });

  function showQuestion() {
    if (current >= questions.length) {
      showResult();
      return;
    }
    const q = questions[current];
    let html = `<h2 class="text-xl font-semibold mb-6">${q.text}</h2><div class="grid gap-4">`;
    q.options.forEach(opt => {
      html += `<button class="quiz-option w-full bg-[#fdfaf6] border border-gray-200 rounded-lg py-4 px-6 text-left hover:border-[#18382c]" data-value="${opt.value}">${opt.text}</button>`;
    });
    html += `</div>`;
    questionsDiv.innerHTML = html;
    progressBar.style.width = ((current+1)/questions.length*100) + '%';
    document.querySelectorAll('.quiz-option').forEach(btn => {
      btn.onclick = function() {
        answers.push(btn.getAttribute('data-value'));
        current++;
        showQuestion();
      };
    });
  }

  function showResult() {
    questionsDiv.innerHTML = '';
    fetch('/quiz-recommendations/', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded', 'X-CSRFToken': getCookie('csrftoken')},
      body: answers.map(a => `answers[]=${encodeURIComponent(a)}`).join('&')
    })
    .then(res => res.json())
    .then(data => {
      let html = `<h2 class="text-2xl font-semibold mb-4">Your Personalized Skincare Ritual</h2>`;
      data.products.forEach((p, i) => {
        html += `
          <div class="bg-white p-6 rounded-lg border mb-4 flex items-center gap-4">
            <img src="${p.image}" alt="${p.name}" class="w-20 h-20 object-cover rounded-md"/>
            <div>
              <h4 class="font-medium text-lg">${p.name}</h4>
              <span class="text-xl font-bold text-gray-800">$${p.price}</span>
              <a href="${p.link}" class="ml-4 bg-[#18382c] text-white px-4 py-1 rounded text-xs hover:bg-[#285c44] transition">View</a>
            </div>
          </div>
        `;
      });
      resultDiv.innerHTML = html;
      resultDiv.classList.remove('hidden');
    });
  }

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
});
