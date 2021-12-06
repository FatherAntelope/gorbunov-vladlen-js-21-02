const btn = document.getElementById('button');
const fieldText = document.getElementById('fieldText');
const outputText = document.getElementById('outputText');

btn.addEventListener('click', () => {
  if (fieldText.value) {
    outputText.innerText = fieldText.value;
  }
});
