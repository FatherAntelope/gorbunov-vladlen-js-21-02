const btn = document.getElementById('button');
const fieldText = document.getElementById('fieldText');
const outputText = document.getElementById('outputText');

const BASE_URL = 'http://127.0.0.1:3000/api';
const API_POINT_TEXT = '/text';

const handleLoadDocument = async () => {
  const response = await fetch(BASE_URL + API_POINT_TEXT);
  const json = await response.json();
  if (response.ok) {
    outputText.innerText = json.data.text;
  } else {
    outputText.innerText = `Error ${json.status}: ${json.message}`;
  }
};

const handleClickButtonForSendTest = async () => {
  if (fieldText.value) {
    const response = await fetch(BASE_URL + API_POINT_TEXT, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      method: 'POST',
      body: JSON.stringify({ text: fieldText.value })
    });
    const json = await response.json();

    if (response.ok) {
      outputText.innerText = json.data.text;
    } else {
      outputText.innerText = `Error ${json.status}: ${json.message}`;
    }
    fieldText.value = '';
  }
};

window.addEventListener('load', handleLoadDocument);

btn.addEventListener('click', handleClickButtonForSendTest);
