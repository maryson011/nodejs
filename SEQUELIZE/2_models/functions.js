
function dateFormate(dataString) {
    const data = new Date(dataString);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // O mês começa em 0
    const ano = data.getFullYear();
    const hora = data.getHours();
    const minuto = data.getMinutes();
    const segundos = data.getSeconds();
    return `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundos}`;
}
function dateTimeFormate(dataString) {
    const data = new Date(dataString);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // O mês começa em 0
    const ano = data.getFullYear();
    const hora = data.getHours();
    const minuto = data.getMinutes();
    const segundos = data.getSeconds();
    return `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundos}`;
}

// module.exports = dateFormate;
module.exports = dateTimeFormate;