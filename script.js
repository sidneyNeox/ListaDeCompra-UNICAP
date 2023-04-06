const inputProduct = document.querySelector('#inputProduct');
const inputQuantity = document.querySelector('#inputQuantity');
const inputPrice = document.querySelector('#inputPrice');
const tbody = document.querySelector('#tableClient tbody');
const btAdd = document.querySelector('#save-form');


const openModal = () => document.querySelector('#modal')
    .classList.add('active');

const closeModal = () => { 
    clearInputs()
    document.querySelector('#modal').classList.remove('active');
}


let listItens = [];

const clearInputs = () =>{
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
}

const validationInputs = () => {
    let item = {
        description: inputProduct.value,
        quantity: inputQuantity.value,
        price: inputPrice.value
    }
    if (!item.description){
        alert("Por favor digite um valor no campo de produtos")
    }
    else if (!item.quantity){
        alert("Por favor digite um valor no campo quantidade")
    }
    else if (!item.price){
        alert("Por favor digite o valor do produto.")
    }
    else {
        listItens.push(item);
        addItemOnTable();
        console.log(item.price)
        console.log(typeof item.price)
    }
}

//adicionar a tabela
const addItemOnTable = () =>{
    tbody.innerHTML = "";
    for (let index = 0; index <listItens.length; index++){
        let total = 0
        total = Number(listItens[index].quantity) * Number(listItens[index].price)
        const newRow = document.createElement('tr')
        newRow.innerHTML = `
            <td>${listItens[index].description}</td>
            <td>${Number(listItens[index].quantity)}</td>
            <td> ${Number(listItens[index].price).toLocaleString("pt-BR", {style:"currency", currency:"BRL"}).trim()}</td>
            <td class="total">${Number(total).toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}</td>
        `

        document.querySelector('#tableClient>tbody').appendChild(newRow)
       
        const totalTds = document.querySelectorAll('.total');
        console.log(totalTds)
        let totalPrice = 0;
        
        totalTds.forEach(td => {
          totalPrice += parseFloat(td.textContent.replace(/[^\d,]+/g, ""));
        });

        console.log(totalPrice)
        const result = document.querySelector('#result');
        result.innerHTML = `Valor total dos produtos: ${totalPrice.toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}`
    };
    clearInputs();
    closeModal()
}

const clearTable = () => {
    tbody.innerHTML = "";
    listItens = [];
    result.innerHTML = `Valor total dos produtos: R$ 0,00`
}

btAdd.onclick = validationInputs

document.querySelector('#register')
    .addEventListener('click', openModal)

document.querySelector('#modalClose')
    .addEventListener('click', closeModal)

document.querySelector('#cancel-form')
    .addEventListener('click', closeModal)

document.querySelector('#clearTable')
    .addEventListener('click', clearTable)




/* Rever codigo para manutenção */




/* 
    function mascaraMoeda(event) {
  const onlyDigits = event.target.value
    .split("")
    .filter(s => /\d/.test(s))
    .join("")
    .padStart(3, "0")
  const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2)
  event.target.value = maskCurrency(digitsFloat)
}

function maskCurrency(valor, locale = 'pt-BR', currency = 'BRL') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(valor)
} */