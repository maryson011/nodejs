
function formatarData(dataString) {
    const data = new Date(dataString);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // O mês começa em 0
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

module.exports = formatarData;