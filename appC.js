let notaModal = document.querySelector('#notaModal')
let bodyModal = document.querySelector('#bodyModal')

notaModal.addEventListener('focus', buscarAluno) 

function buscarAluno(){
    const url = 'https://pwetec-a6ce1-default-rtdb.firebaseio.com/atividade.json'
    const options = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'content-type': 'application/json:charset=utf-8'
        }
    }
    let linha = ''

    fetch(url,options).then(
        response => response.json()
    ).then(
        dados =>{
            if (dados) {
                linha = '<h5> Aluno: '+ dados.aluno + ' Nota:'+ dados.nota +  '</h5>'
            } else {
                linha = '<h5> Aluno: não encontrado </h5>'
            }
            bodyModal.innerHTML = linha;

        }

    )
}