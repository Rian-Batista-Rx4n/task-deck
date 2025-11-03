// --- Seletores principais ---
const addTaskBtn = document.getElementById("add-task");
const createTaskMenu = document.querySelector(".create-task");
const addTaskFinalBtn = document.getElementById("add-task-final");
const closeTaskMenuBtn = document.getElementById("close-task-menu");
const overview = document.querySelector(".overview-main-menu");

const titleInput = document.getElementById("task-title");
const resumeInput = document.getElementById("task-resume");
const progressInput = document.getElementById("task-progress");

// Carrega tasks salvas ao iniciar
window.onload = () => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    saved.forEach(task => renderTask(task.title, task.resume, task.info));
};

// --- Funções principais ---

function renderTask(title, resume, info) {
    const task = document.createElement("div");
    task.className = "tasks-item";

    task.innerHTML = `
        <div class="main-task">
            <p class="title-task">${title}</p>
            <p class="resume-task">${resume}</p>
            <p class="info-task">${info}</p>
        </div>
        <div class="task-delete-btn" title="Excluir tarefa">×</div>
    `;

    task.querySelector(".task-delete-btn").addEventListener("click", () => {
        task.remove();
        saveTasks();
    });

    overview.appendChild(task);
}

// Salva todas as tasks atuais no localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll(".tasks-item").forEach(item => {
        const title = item.querySelector(".title-task").textContent;
        const resume = item.querySelector(".resume-task").textContent;
        const info = item.querySelector(".info-task").textContent;
        tasks.push({ title, resume, info });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// --- Eventos ---

// Abrir menu
addTaskBtn.addEventListener("click", () => {
    createTaskMenu.style.display = "flex";
});

// Fechar menu
closeTaskMenuBtn.addEventListener("click", () => {
    createTaskMenu.style.display = "none";
});

// Adicionar tarefa
addTaskFinalBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const resume = resumeInput.value.trim();
    const info = progressInput.value.trim() || "0%";

    if (!title) return alert("Please, insert a title to add the task.");

    renderTask(title, resume, info);
    saveTasks();

    // Limpa campos e fecha menu
    titleInput.value = "";
    resumeInput.value = "";
    progressInput.value = "";
    createTaskMenu.style.display = "none";
});
