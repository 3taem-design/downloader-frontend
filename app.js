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

form.addEventListener('submit', e => {
  e.preventDefault()
  const val = inputField.value.trim()
  if (!val) {
    inputField.style.border = '2px solid #d30000'
    setTimeout(() => inputField.style.border = 'none', 600)
    return
  }
  form.classList.add('submitting')
  form.style.transform = 'scale(0.97)'
  setTimeout(() => {
    form.style.transform = 'scale(1)'
    form.classList.remove('submitting')
    inputField.value = ''
  }, 800)
})

document.querySelectorAll('.nav-links').forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.transform = 'scale(1.15) rotate(3deg)'
  })
  link.addEventListener('mouseleave', () => {
    link.style.transform = 'scale(1) rotate(0deg)'
  })
})