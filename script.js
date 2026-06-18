const pasteBtn = document.querySelector('.paste')
const inputField = document.querySelector('.combine-input input')
const form = document.querySelector('.main-form')

pasteBtn.addEventListener('click', async () => {
  try {
    const text = await navigator.clipboard.readText()
    inputField.value = text
    pasteBtn.style.transform = 'scale(0.9)'
    setTimeout(() => pasteBtn.style.transform = 'scale(1)', 200)
  } catch {
    pasteBtn.style.background = '#d30000'
    setTimeout(() => pasteBtn.style.background = '#0082d3', 500)
  }
})

form.addEventListener('submit', async e => {
  e.preventDefault()
  const val = inputField.value.trim()
  if (!val) return;

  form.classList.add('submitting');

  try {
    const response = await fetch('https://downloader-backend-2c8z.onrender.com/get-video', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: val })
    });
    
    const data = await response.json();
    console.log(data); // هنا ستصلك بيانات الفيديو
    alert('تم جلب الفيديو: ' + data.title);
  } catch (error) {
    alert('حدث خطأ في الاتصال بالسيرفر');
  }
  
  form.classList.remove('submitting');
});

document.querySelectorAll('.nav-links').forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.transform = 'scale(1.15) rotate(3deg)'
  })
  link.addEventListener('mouseleave', () => {
    link.style.transform = 'scale(1) rotate(0deg)'
  })
})
