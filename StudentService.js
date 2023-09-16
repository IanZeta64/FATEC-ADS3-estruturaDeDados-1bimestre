
const studentsList = []; //lista que contem os elementos salvos em memoria de execução

//função para criar estudante e salvar na lista
function createStudent(event) {
    event.preventDefault(); 

    //captura os elementos do formulario
    const name = document.getElementById("name").value;
    const ra = document.getElementById("ra").value;
    const age = document.getElementById("age").value;
    const sex = document.getElementById("sex").value;
    const avgScore = parseFloat(document.getElementById("avgScore").value);

    //cria e popula o objeto
    const student = { };
    student.name = name.toUpperCase();
    student.ra = ra;
    student.age = age;
    student.sex = sex;
    student.avgScore = avgScore;
    //gera resultado com base na nota automaticamente
    if(student.avgScore < 6.0){
        student.result = 'REPROVADO';
        }else{
            student.result = 'APROVADO';
        }
        studentsList.push(student); //adiciona o objeto na lista
        alert("Estudante criado com sucesso!"); // aviso no html para relatar objeto criado
}
window.addEventListener('load', () => {
    document.getElementById('formStudent').addEventListener('submit', createStudent);
  });

  //função para ordenar por nome e cescente
  function nameQuickSort(list) {
    if (list.length <= 1) {
        return list;  // retorna lista se tiver co apnas 1 elemento
    }

    const pivot = list[0]; // Escolha o primeiro elemento como pivô
    const left = []; 
    const right = [];

    for (let i = 1; i < list.length; i++) {
        if (list[i].name < pivot.name) {
            left.push(list[i]); // Elementos menores que o pivô
        } else {
            right.push(list[i]); // Elementos maiores ou iguais ao pivô
        }
    }

    // Recursivamente ordena as partes esquerda e direita
    return nameQuickSort(left).concat(pivot, nameQuickSort(right));
}

//função para ordenar por RA e decrescente
function RAQuickSort(list) {
    if (list.length <= 1) {
        return list;  // retorna lista se tiver co apnas 1 elemento
    }
    const pivot = list[0]; // Escolha o primeiro elemento como pivô
    const left = [];
    const right = [];

    for (let i = 1; i < list.length; i++) {
        if (list[i].ra > pivot.ra) {
            left.push(list[i]); // Elementos maiores que o pivô
        } else {
            right.push(list[i]); // Elementos menores ou iguais ao pivô
        }
    }

    // Recursivamente ordena as partes esquerda e direita
    return RAQuickSort(left).concat(pivot, RAQuickSort(right));
}

//função chamada pelo botão do html para retornar lista de acordo com a seleção de ordenação
function getStudentsList() {
    const returnList = [...studentsList];
    try {
        if (studentsList.length <= 1) {
            return createTable(returnList);
        } else if (studentsList.length === 0) {
            throw new Error('Sem alunos cadastrados.'); // alerta no html o usuario que a lsita esta vazia
        }
        let sortedList = [];
        switch (document.getElementById("orderSelect").value) {
            case "0":
                sortedList = nameQuickSort(returnList);
                createTable(sortedList);
                break;
            case "1":
                sortedList = RAQuickSort(returnList);
                createTable(sortedList);
                break;
            case "2":
                let returnListfiltered = returnList.filter(student => student.result === 'APROVADO');//filtra apenas pelos itens de aprovado antes de ordenar
                sortedList = nameQuickSort(returnListfiltered);
                createTable(sortedList); 
                break;
            default:
                alert("Erro ao selecionar item."); // alerta no html o usuario de valor de seleção incorreta
                break;
        }
    } catch (error) {
        alert(error.message); // alerta no html o usuario de possiveis outros erros nao esperados
    }
}

    //função para criar a tabela no html
  function createTable(list){
    const tbody = document.getElementById('listBody');
    if (tbody) {
    tbody.innerHTML = list.map(student => {
      return `<tr>
                <td>${student.name}</td>
                <td>${student.ra}</td>
                <td>${student.age}</td>
                <td>${student.sex}</td>
                <td>${student.avgScore}</td>
                <td>${student.result}</td>
              </tr>`;
    }).join('');
  }
  }
  