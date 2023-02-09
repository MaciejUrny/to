{
    const welcome = () => {
        console.log("Witaj! Dziękuję za sprawdzenie mojej pracy.");
    };

    let tasks = [];
    let hideDoneTasks = false;

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const focusAndClearInput = () => {
        const newTaskInput = document.querySelector(".js-newTask");

        newTaskInput.value = "";
        newTaskInput.focus();
    };

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const markAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const renderTasks = () => {
        const taskToHtml = task => `
            <li class="
            list${task.done && hideDoneTasks ? " list--hidden" : ""} js-tasks">
            <button class="list__button js-done">${task.done ? "✔" : ""}</button>
            <span class="list__task${task.done ? " list__task--done" : ""}">${task.content}</span>
            <button class="list__button list__button--remove js-remove">🗑</button>
            </li>
            `;

        const tasksElement = document.querySelector(".js-tasks");
        tasksElement.innerHTML = tasks.map(taskToHtml).join("");
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");

        if (!tasks.length) {
            buttonsElement.innerHTML = "";
            return;
        };

        buttonsElement.innerHTML = `
        <button class="buttons__button js-toggleHideDoneTasks">
            ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
        </button>
        <button class="buttons__button js-markAllDone"
            ${tasks.every(({ done }) => done) ? "disabled" : ""}>Ukończ wszystkie
        </button>
        `;
    };

    const bindButtonsEvents = () => {
        const markAllDoneButton = document.querySelector(".js-markAllDone");

        if(markAllDoneButton){
            markAllDoneButton.addEventListener("click", markAllTasksDone);
        };

        const toggleHideDoneTasksButton = document.querySelector(".js-toggleHideDoneTasks");

        if(toggleHideDoneTasksButton){
            toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
        };
    };

    const render = () => {
        renderTasks();
        bindRemoveEvents();
        bindToggleDoneEvents();

        renderButtons();    
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        };

        addNewTask(newTaskContent);
        focusAndClearInput();
    };

    const init = () => {
        welcome();
        render();

        const formElement = document.querySelector(".js-form");

        formElement.addEventListener("submit", onFormSubmit);
    };

    init();
}