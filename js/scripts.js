/* Seleção de Elementos */
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
let oldInputValue;

/* Funções */
//CRIA O HTML AUTOMATICAMENTE
const saveTodo = (text) => {
    const todo = document.createElement ("div"); //Criação da Div
    todo.classList.add("todo"); //Classe que adcionará, através de string, a div

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    //Ícone de Check / finalizado
    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn);

    //Ícone de edição
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn);

    //Ícone de apagar
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark""></i>'
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo); //Coloca o ToDo na Lista Geral, Div todo-list

    todoInput.value = "";
    todoInput.focus();

};

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");

        if (todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text;
        }

    });
};


/* Eventos */
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;

    if(inputValue){
        saveTodo(inputValue);
    }
});

/* IDENTIFICADOR DE ELEMENTOS (FINISH / FINALIZADOS / CHECK) */

//Evento de Click que identifica o elemento que foi clicado
document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div"); //Elemento pai, div mais próxima.
    
    /*Os Títulos não possuem ID pois são criados dinamicamente. Então, é necessário que esses ítens existam para se ter um título*/
    let todoTitle;
    
    if (parentEl && parentEl.querySelector("h3")){
        todoTitle = parentEl.querySelector("h3").innerHTML;
    }


    //Verifica se o elemento que foi clicado contém uma classe com o nome de "finish-todo"
    if (targetEl.classList.contains("finish-todo")){
        parentEl.classList.toggle("done");//toggle faz ou disfaz a ação da classe. Adicionar ou remover o check
    }

    if (targetEl.classList.contains("remove-todo")){
        parentEl.remove();
    }
    
    if (targetEl.classList.contains("edit-todo")){
        toggleForms();

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
});

//Botão de Cancelar
cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault(); //Impede que o formulário seja enviado

    toggleForms();
})

editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if(editInputValue){
        updateTodo(editInputValue);
    }

    toggleForms();

})
