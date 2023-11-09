//selecionando os elementos do documento HTML//
const button = document.querySelector(".botao")
const input = document.querySelector(".inserir")
const lista = document.querySelector(".list")

//array das tarefas//
let tarefas = []

//função para adicionar as tarefas, pega o valor do input//
function addtarefa() {
    if (input.value == "") { //se o campo estiver vazio, um alert será mostrado na tela pedindo para digitar uma tarefa//
        alert("Por favor, digite uma tarefa")
        return false 
    } else {
        // Verificar se a tarefa já existe no array
        var taskexist = tarefas.some(function(tarefa) { //"some" testa o elemento do array, se encontrar a condição vai retornar true que existe e false se não - "function(tarefa)" função callback anônima definida no local de uso, vai comparar "task" com o valor do input//
            return tarefa.task === input.value
        })
    }
    if (taskexist) {
        alert("Essa tarefa já existe")
    } else {
        tarefas.push({ //"push" vai adicionar o item ao array//
            task: input.value, //tarefa a ser adicionada//
            conclusao: false  //campo "false" tarefa não concluida ao ser criada//
        })
    }
    input.value = "" //limpar o campo após adicionar a tarefa//

    tasks()
}


//clique do botão-"AddEventListener" e "click" reconhece quando o botão for clicado e chama a função addtarefa//
button.addEventListener("click", addtarefa)


//função que vai mostrar os itens na tela//
function tasks() {
    let nova = "" //vai ser a nova tarefa//

    tarefas.forEach((tarefa, posicao) => {    //"ForEach" vai ler item por item em um array "task"//
        //utilizei "+=" para não sobrepor o item já adicionado e ir adicionando com o que já existe//
        nova += ` 

        <li class="box ${tarefa.conclusao && "feito"}">
            <img src="https://img.icons8.com/sf-regular/20/228BE6/checked-2.png" onclick="concluir(${posicao})">
              ${tarefa.task}
            <img src="https://img.icons8.com/material-rounded/20/228BE6/filled-trash.png" onclick="deletar(${posicao})">
        </li>
        
         `
        //com o uso da crase é possível utilizar variáveis dentro da <li>//
        //"${}" permite que insira expressões JavaScript dentro de strings//
        //"tarefa.conclusao && "feito" - verificação se(&&) "task" ser "true" verdadeiro, adiciona a classe "feito" de CSS e alterar o estilo, deixando a tarefa como concluída//
        //"tarefa.task" para não enviar o objeto//
        //"onclick" quando a imagem for clicada a função é chamada//
    })

    lista.innerHTML = nova //joga a <li> para o documento html, onde identifica a classe .list//

    localStorage.setItem("TO-DO LIST", JSON.stringify(tarefas)) //"setItem" adicionando item - "TO-DO LIST" nome dos itens do array - O Localstorage só aceita strings e como é objeto, usei o "JSON.stringify" para transformar tudo em string//
}
function concluir(posicao) {
    tarefas[posicao].conclusao = !tarefas[posicao].conclusao //inverte para true e false, concluida e não concluida - "!" para essa inversão//

    tasks()
}
//função para exclusão da tarefa//
function deletar(posicao) {
    tarefas.splice(posicao, 1) //"splice" vai permitir a exclusão dos itens do array -- "posicão, 1" indica a posição e quantos devem ser deletados a partir do mesmo//

    tasks()
}
function atualizar() {
    const Lostorage = localStorage.getItem("TO-DO LIST") //"Lostorage" onde os itens serão armazenados - "getItem" vai pegar os itens e adicionar//
    //caso exista itens, para não adicionar vazio//
    if (Lostorage) {
        tarefas = JSON.parse(Lostorage) //"JSON.parse" vai transformar para objeto"
    }

    tasks()
}

atualizar() //chamando função, para manter as tarefas com a atualização da página//