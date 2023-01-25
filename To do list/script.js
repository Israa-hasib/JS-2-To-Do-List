
const form = document.querySelector('.card form');
const output = document.querySelector('#output')
output.innerHTML = ''

let items = [
  // {
  //   id: crypto.randomUUID(),
  //   name: 'Mjölk',
  //   complete: true
  // },
  // {
  //   id: crypto.randomUUID(),
  //   name: 'Bröd',
  //   complete: false
  // },
]




// OM vi vill kunna ta bort en eventListener så "måste" vi skriva funktionen utanför
// const test = (e) => {
// asdfsfasfasf
// }
// form.addEventListener('submit', test)
// form.removeEventListener('submit', test)

// const buttons = document.querySelectorAll('.item button')

// buttons.forEach(btn => {
//   btn.addEventListener('click', () => {
//     btn.parentElement.remove()
//   })
// })

document.querySelector('#output').addEventListener('click', e => {
  if(e.target.innerText === 'delete'){
    e.target.parentElement.remove()
    items = items.filter(item => item.id !== e.target.id)
    localStorage.setItem('itemList', JSON.stringify(items))
  }
  if(e.target.innerText === 'edit'){

  }

  if(e.target.nodeName === 'P') {
    e.target.style.textDecoration = 'line-through'
  }
  if(e.target.nodeName === 'DIV') {
    // e.target.style.textDecoration = 'line-through'
    // console.log(e.target.firstElementChild)
    e.target.querySelector('p').classList.toggle('completed')
  }
})

const createItemElement = (inputValue, id) => {

  const item = document.createElement('div')
  item.classList.add('item')

  const p = document.createElement('p')
  p.innerText = inputValue

  const button = document.createElement('button')
  button.innerText = 'delete'
  button.id = id

  // button.addEventListener('click', () => {
  //   button.parentElement.remove()
  // })


  item.appendChild(p)
  item.appendChild(button)


  // document.querySelector('#output').appendChild(item)

  return item
}



form.addEventListener('submit', e => {
  e.preventDefault();
  const input = form.querySelector('input[type=text]');
  const inputValue = input.value;

  if(inputValue.trim() === '') {
    return
  }

  const newItem = {
    id: crypto.randomUUID(),
    name: inputValue,
    complete: false
  }
  items.push(newItem)

  const item = createItemElement(inputValue, newItem.id);
  document.querySelector('#output').appendChild(item);
  localStorage.setItem('itemList', JSON.stringify(items))


  // input.value = '';
  form.reset()

})



const loadItems = () => {
  const storedItems = JSON.parse(localStorage.getItem('itemList'))
  
  items = []
  if(storedItems) {
    items = storedItems
  }
  
  items.forEach(item => {
    output.appendChild(createItemElement(item.name, item.id));
  })
}

loadItems()