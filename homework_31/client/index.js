const btn = document.getElementById('button');
const fieldText = document.getElementById('fieldText');
const outputText = document.getElementById('outputText');
const outputError = document.getElementById('outputError');

const BASE_URL = 'http://127.0.0.1:3000/api';
const API_POINT_TEXT = '/text';

const optionsPostRequest = {
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  method: 'POST'
};

const renderAlerts = (response, json) => {
  if (response.ok) {
    outputText.style.display = 'block';
    outputText.innerText = json.data.text;
    outputError.style.display = 'none';
  } else {
    outputError.style.display = 'block';
    outputError.innerText = `Error ${json.status}: ${json.message}`;
    outputText.style.display = 'none';
  }
};

const sendRequest = async (options = undefined) => {
  fieldText.setAttribute('disabled', 'disabled');
  btn.setAttribute('disabled', 'disabled');
  let response = '';
  if (options !== undefined) {
    if (fieldText.value && fieldText.value !== outputText.innerText) {
      response = await fetch(BASE_URL + API_POINT_TEXT, {
        ...options,
        body: JSON.stringify({ text: fieldText.value })
      });
      fieldText.value = '';
    }
  } else {
    response = await fetch(BASE_URL + API_POINT_TEXT);
  }
  const json = await response.json();
  renderAlerts(response, json);
  fieldText.removeAttribute('disabled');
  btn.removeAttribute('disabled');
};

window.addEventListener('load', () => sendRequest());

btn.addEventListener('click', () => sendRequest(optionsPostRequest));
