const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
})

readline.question('Qual é sua linguagem de programação favorita?', (language)=>{
    console.log(`Sua linguagem é ${language}`)

    readline.close()
})


// fazer uma integração com IA aqui seria algo interessante para treinar. Bora codar...