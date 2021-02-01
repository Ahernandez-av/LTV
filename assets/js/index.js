const form = document.querySelector('#search__form')
const input = document.querySelector('#form__input')
const error = document.querySelector('.form__error')

function showError(event){
  event.preventDefault();
  input.classList.add('input--error');
  error.classList.add('show');
}

function handleForm(event){
  if(input.value != ""){
    if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input.value)){
      return true;
    } else {
      showError(event);
    }
  } else {
    showError(event);
  }
}


form.addEventListener('submit', handleForm);