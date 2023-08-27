window.addEventListener('load', () => {
  todo = JSON.parse(localStorage.getItem('todos')) || [];
});
