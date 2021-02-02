const container = document.querySelector("#results");
const spinner = document.querySelector(".loading");
const title = document.querySelector(".results__title");
const subtitle = document.querySelector(".results__subtitle");
const result = document.querySelector(".result");

const e = document.createElement('div')

e.innerHTML = `
<div>
  <div>
    <img src="./assets/images/icn_person.svg" alt="test">
  </div>
  <div>
    <div class="card__header">
    </div>
    <div class="card__details">
      <div class="card__address">
        <h4>Address</h4>
      </div>
      <div class="card__numbers">
        <h4>Phone Numbers</h4>
        <ul class="card__numbers__elements">
        </ul>
      </div>
      <div class="card__Email">
        <h4>Email</h4>
      </div>
      <div class="card__relatives">
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
      console.log(res)
      if(res){

        result.appendChild(e);

        document.querySelector('.card__header').innerHTML = `<h2>${res.first_name} ${res.last_name}</h2><p>${res.description}</p>`;
        document.querySelector('.card__address').innerHTML = `<p>${res.address}</p>`;
        document.querySelector('.card__email').innerHTML = `<p>${res.email}</p>`;

        res.phone_numbers.map(elm => {
          const nodeElement = document.createElement('li')
          nodeElement.innerHTML = `${elm}`
          document.querySelector('.card__numbers__elements').appendChild(nodeElement);
        })

        res.relatives.map(elm => {
          const nodeElement = document.createElement('li')
          nodeElement.innerHTML = `${elm}`
          document.querySelector('.card__relatives__elements').appendChild(nodeElement);
        })

      } else {
        
        title.innerHTML = "0 results"
        subtitle.innerHTML = "Try strating a new search below"
      }
    })
    .catch(err => console.log(err))
}