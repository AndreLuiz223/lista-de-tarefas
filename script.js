const input = document.getElementById("tarefa");
const btnAdd = document.getElementById("adicionar");
const listaUl = document.getElementById("lista");

const STORAGE_KEY = "todo_andreluiz223";

function carregar() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

function salvar(tarefas) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
}

let tarefas = carregar();

function render() {
  listaUl.innerHTML = "";
  if (tarefas.length === 0) {
    const li = document.createElement("li");
    li.className = "item";
    li.textContent = "Nenhuma tarefa ainda. Adicione a primeira!";
    listaUl.appendChild(li);
    return;
  }

  tarefas.forEach((t, i) => {
    const li = document.createElement("li");
    li.className = "item" + (t.done ? " concluida" : "");

    const chk = document.createElement("input");
    chk.type = "checkbox";
    chk.checked = t.done;
    chk.addEventListener("change", () => {
      tarefas[i].done = !tarefas[i].done;
      salvar(tarefas);
      render();
    });

    const texto = document.createElement("span");
    texto.className = "texto";
    texto.textContent = t.text;
    texto.title = "Clique para alternar concluída";
    texto.addEventListener("click", () => {
      tarefas[i].done = !tarefas[i].done;
      salvar(tarefas);
      render();
    });

    const actions = document.createElement("div");
    actions.className = "acoes";

    const btnExcluir = document.createElement("button");
    btnExcluir.className = "icon";
    btnExcluir.textContent = "Remover";
    btnExcluir.addEventListener("click", () => {
      tarefas = tarefas.filter((_, idx) => idx !== i);
      salvar(tarefas);
      render();
    });

    actions.appendChild(btnExcluir);
    li.append(chk, texto, actions);
    listaUl.appendChild(li);
  });
}

function adicionar() {
  const text = input.value.trim();
  if (!text) return;
  tarefas.push({ text, done: false });
  input.value = "";
  salvar(tarefas);
  render();
}

btnAdd.addEventListener("click", adicionar);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") adicionar();
});

render();
