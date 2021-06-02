/* eslint-disable prettier/prettier */
/* eslint-disable handle-callback-err */
function requisitarAdocao(event) {
    event.preventDefault();
    const url = event.target.href;
    fetch(url)
        .then(response => response.json())
        .then(json => {
            if(json.status === 'fail') {
                Swal.fire({
                    title: json.message,
                    icon: "error",
                    confirmButtonText: "Ok",
                })
            }else{
                window.location.href = '/adocaos/listAdocoes';
            }
        })
}

Array.from(document.querySelectorAll('a[data-action="adotar"]'))
    .forEach(link => {
        link.addEventListener('click', e => requisitarAdocao(e));
    });