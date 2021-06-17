/* eslint-disable prettier/prettier */

(function() {
    const select = document.querySelector('#estados')
    select.addEventListener('change', () => {
        buscaCidades(select.value);
    })
    fetch('/estados')
        .then(response => response.json())
        .then(json => {
            json.forEach(element => {
                var option = document.createElement('option')
                option.value = element
                option.text = element
                select.appendChild(option)
            });
        })
})();

function buscaCidades(estado) {
    const select = document.querySelector('#cidades')

    select.addEventListener('change', () => {
        const cidade = select.value
        const url = window.location.href.split('?')[0]
        window.location.href = `${url}?cidade=${cidade}`;
    })
    
    while(select.firstChild){
        select.removeChild(select.lastChild)
    }

    var option = document.createElement('option')
    option.disabled = true
    option.selected = true
    option.text =  'Escolha uma cidade'
    select.appendChild(option)

    fetch(`/cidades/${estado}`)
        .then(response => response.json())
        .then(json => {
            json.forEach(element => {
                var option = document.createElement('option')
                option.value = element
                option.text = element
                select.appendChild(option)
            });
        })
}