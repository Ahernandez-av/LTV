const container = document.querySelector("#results");
const spinner = document.querySelector(".loading");
const title = document.querySelector(".results__title");
const subtitle = document.querySelector(".results__subtitle");
const result = document.querySelector(".result");

const e = document.createElement('div')

e.innerHTML = `
<div class="person d-flex">
  <div class="card__image">
    <div class="b-circle">
      <img src="./assets/images/icn_person.svg" alt="test">
    </div>
  </div>
  <div>
    <div class="card__header">
    </div>
    <div class="card__details d-flex flex-wrap">
      <div class="card__element">
        <h4>Address</h4>
        <p class="card__address__elements"></p>
      </div>
      <div class="card__element">
        <h4>Phone Numbers</h4>
        <ul class="card__numbers__elements">
        </ul>
      </div>
      <div class="card__element">
        <h4>Email</h4>
        <p class="card__email__elements"></p>
      </div>
      <div class="card__element">
        <h4>Relatives</h4>
        <ul class="card__relatives__elements">
        </ul>
      </div>
    </div>
  </div>
</div>
`

let searchQuery = localStorage.getItem("searchQuery");

setTimeout(() => searchEmail(searchQuery), 1000 )

function searchEmail(email){
  fetch(`https://ltv-data-api.herokuapp.com/api/v1/records.json?email=${email}`)
    .then(data => data.json())
    .then(res => {
      spinner.classList.add("hide")

      if(res.first_name){

        result.appendChild(e);

        document.querySelector('.card__header').innerHTML = `<h3>${res.first_name} ${res.last_name}</h3><p>${res.description}</p>`;
        document.querySelector('.card__address__elements').innerHTML = `${res.address}`;
        document.querySelector('.card__email__elements').innerHTML = `${res.email}`;

        res.phone_numbers.map(elm => {
          const nodeElement = document.createElement('li')
          const newNumber = `(${elm.substring(0,3)}) ${elm.substring(3,6)}-${elm.substring(6,10)}`
          nodeElement.innerHTML = `${newNumber}`
          document.querySelector('.card__numbers__elements').appendChild(nodeElement);
        })

        res.relatives.map(elm => {
          const nodeElement = document.createElement('li')
          nodeElement.innerHTML = `${elm}`
          document.querySelector('.card__relatives__elements').appendChild(nodeElement);
        })

        title.innerHTML = "1 result"
        subtitle.innerHTML = "Look at the result below to see the details of the person you're searched for."

      } else {
        
        title.innerHTML = "0 results"
        subtitle.innerHTML = "Try starting a new search below"
      }
    })
    .catch(err => console.log(err))
}