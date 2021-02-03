const form = document.querySelector('#search__form')
const input = document.querySelector('#form__input')
const error = document.querySelector('.form__error')

function showError(){
  input.classList.add('input--error');
  error.classList.add('show--error');
}

function handleForm(event){
  event.preventDefault();
  
  if(input.value != ""){
    //A regular expresion to validate a email address
    if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input.value)){
      //Storage the query in the storage object
      sessionStorage.setItem("searchQuery", input.value)
      window.location.replace("../../result.html");
    } else {
      showError();
    }
  } else {
    showError();
  }
}


form.addEventListener('submit', handleForm);