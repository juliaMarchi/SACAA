/* eslint-disable handle-callback-err */
/* eslint-disable prettier/prettier */
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
            }
        })
        .catch(error => {
            Swal.fire({
                title: 'Houve um erro de conexão.',
                text: 'Tente novamente mais tarde.',
                icon: "error",
                confirmButtonText: "Ok",
            })
        })
}

Array.from(document.querySelectorAll('a[data-action="adotar"]'))
    .forEach(link => {
        link.addEventListener('click', e => requisitarAdocao(e));
    });