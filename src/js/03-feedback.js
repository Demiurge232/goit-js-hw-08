import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const CURRENTTEXT_KEY = 'feedback-form-state';
function onInputForm() {
  const savedMessage = formEl.message.value;
  const savedEmail = formEl.email.value;
  localStorage.setItem(
    CURRENTTEXT_KEY,
    JSON.stringify({ email: savedEmail, message: savedMessage })
  );
}

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  localStorage.removeItem(CURRENTTEXT_KEY);
}

function inputAfterReload() {
  const savedData = localStorage.getItem(CURRENTTEXT_KEY);
  const parseData = JSON.parse(savedData) || [];
  console.log(parseData);
  if (parseData.message) {
    formEl.message.value = parseData.message;
  }

  if (parseData.email) {
    formEl.email.value = parseData.email;
  }
}

formEl.addEventListener('submit', onFormSubmit);

formEl.addEventListener('input', throttle(onInputForm, 500));

inputAfterReload();
