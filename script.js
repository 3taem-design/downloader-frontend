const pasteBtn = document.querySelector('.paste');
const inputField = document.querySelector('.combine-input input');
const form = document.querySelector('.main-form');

// إضافة حاوية للنتائج في الصفحة
const resultContainer = document.createElement('div');
resultContainer.id = 'result-container';
document.body.appendChild(resultContainer);

pasteBtn.addEventListener('click', async () => {
  try {
    const text = await navigator.clipboard.readText();
    inputField.value = text;
    pasteBtn.style.transform = 'scale(0.9)';
    setTimeout(() => pasteBtn.style.transform = 'scale(1)', 200);
  } catch {
    pasteBtn.style.background = '#d30000';
    setTimeout(() => pasteBtn.style.background = '#0082d3', 500);
  }
});

form.addEventListener('submit', async e => {
  e.preventDefault();
  const val = inputField.value.trim();
  if (!val) return;

  // 1. إظهار حالة التحميل
  form.classList.add('submitting');
  resultContainer.innerHTML = `<div class="loader">جاري المعالجة...</div>`;

  try {
    const response = await fetch('https://downloader-backend-2c8z.onrender.com/get-video', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: val })
    });
    
    const data = await response.json();
    
    // 2. عرض النتيجة
    resultContainer.innerHTML = `
        <div class="result-card">
            <h3>${data.title}</h3>
            <img src="${data.thumbnail}" class="video-thumb">
            <a href="${data.url}" target="_blank" class="download-btn">تحميل الفيديو</a>
        </div>
    `;
  } catch (error) {
    resultContainer.innerHTML = `<p style="color:red">خطأ: تأكد من الرابط وحاول مجدداً</p>`;
  }
  
  form.classList.remove('submitting');
});


document.querySelectorAll('.nav-links').forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.transform = 'scale(1.15) rotate(3deg)';
  });
  link.addEventListener('mouseleave', () => {
    link.style.transform = 'scale(1) rotate(0deg)';
  });
});
