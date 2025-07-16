document.addEventListener('DOMContentLoaded', () => {
  const whatsappBtn = document.getElementById('whatsappBtn');
  const counterEl = document.getElementById('counter');
  const submitBtn = document.getElementById('submitBtn');
  const form = document.getElementById('regForm');
  const finalMsg = document.getElementById('finalMsg');

  const COUNTER_KEY = 'whatsCount';
  const SUBMIT_KEY = 'hasSubmitted';
  
  let count = parseInt(localStorage.getItem(COUNTER_KEY)) || 0;
  counterEl.textContent = `Click count: ${count}/5`;

  if (localStorage.getItem(SUBMIT_KEY)) disableForm();

  whatsappBtn.addEventListener('click', () => {
    if (count < 5) {
      window.open(`https://wa.me/?text=${encodeURIComponent("Hey Buddy, Join Tech For Girls Community")}`, '_blank');
      count++;
      localStorage.setItem(COUNTER_KEY, count);
      counterEl.textContent = `Click count: ${count}/5`;
    }
    if (count >= 5) {
      counterEl.textContent = 'Sharing complete. Please continue.';
    }
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (count < 5) {
      alert('Please complete 5 shares before submitting.');
      return;
    }
    submitBtn.disabled = true;

    const data = new FormData();
     data.append('name', document.getElementById('name').value);
  data.append('phone', document.getElementById('phone').value);
  data.append('email', document.getElementById('email').value);
  data.append('college', document.getElementById('college').value);
  data.append('file', document.getElementById('fileLink').value);

    fetch('https://script.google.com/macros/s/AKfycbyUsb8n8RubsArxGESXHPbKN0bR116dmBF9S1y1vaPj3ll_fwLMJLIyvfwSGRNNwqxBmA/exec', {
      method: 'POST',
      mode: 'no-cors',
      body: data
    }).then(() => {
      localStorage.setItem(SUBMIT_KEY, 'true');
      disableForm();
      finalMsg.classList.remove('hidden');
    }).catch(err => {
      console.error(err);
      alert('Submission failed. Please try again.');
      submitBtn.disabled = false;
    });
  });

  function disableForm() {
    [...form.elements].forEach(el => el.disabled = true);
    whatsappBtn.disabled = true;
    submitBtn.disabled = true;
  }
});
