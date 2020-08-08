
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})



const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const firstMessage = document.querySelector('#message-1')
const secondMessage = document.querySelector('#message-2')

weatherform.addEventListener('submit',(e) => {

    const location = search.value

    firstMessage.textContent='Loading...'
    secondMessage.textContent = ''

    fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if(data.error){
            firstMessage.textContent = data.error;
        } else{
            secondMessage.textContent = data.forecast
            firstMessage.textContent = data.location
        }
    })
    
})

    e.preventDefault()
})