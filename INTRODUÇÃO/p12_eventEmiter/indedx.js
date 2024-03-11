const EventEmiter = require('events')
const eventEmiter = new EventEmiter();

eventEmiter.on('start', ()=>{
    console.log('Durante')
})

console.log('Antes da execução')
eventEmiter.emit('start')
console.log('Depois da execução')