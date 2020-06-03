function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => {
      for (let state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      }
    })
}

populateUFs();

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]")
  const stateInput = document.querySelector("input[name=state]")

  const ufValue = event.target.value

  const indexOfSelectStates = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectStates].text


  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  citySelect.innerHTML = "<option value>Selecionar a Cidade</option>"
  citySelect.disabled = true

  fetch(url)
    .then(res => res.json())
    .then(cities => {
      for (let city of cities) {
        citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
      }
      citySelect.disabled = false
    })

}


document.querySelector("select[name=uf]").addEventListener("change", getCities)


//itens a coleta
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (let item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem)
}

let selectItems = []
function handleSelectedItem(event) {
  const itemLi = event.target

  itemLi.classList.toggle("selected")

  const itemId = itemLi.dataset.id

  const alreadySelected = selectItems.findIndex(item => {
    const itemFound = item == itemId
    return itemFound
  })
  if (alreadySelected >= 0) {
    const filteredItems = selectItems.filter(item => {
      const itemsDifferent = item != itemId
      return itemsDifferent
    })

    selectItems = filteredItems

  } else {
    selectItems.push(itemId)
  }
  console.log(selectItems);



}









