const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const historyList = document.getElementById('history-list');
const historyCount = document.getElementById('history-count');
const statTotal = document.getElementById('stat-total');
const statActive = document.getElementById('stat-active');
const statCompleted = document.getElementById('stat-completed');
const charLimitPopup = document.getElementById('char-limit-popup');

input.addEventListener('input', () => {
    if (input.value.length >= 60) {
        charLimitPopup.classList.remove('d-none');
    } else {
        charLimitPopup.classList.add('d-none');
    }
});

let taskCount = 0;
let completedCount = 0;
const MAX_TASKS = 10;

function updateStats() {
    if (statActive) statActive.textContent = taskCount;
    if (statCompleted) statCompleted.textContent = completedCount;
    if (statTotal) statTotal.textContent = taskCount + completedCount;
}

function updateRanks() {
    const items = list.querySelectorAll('li:not(.history-item)');
    items.forEach((item, index) => {
        const badge = item.querySelector('.rank-badge');
        if (badge) {
            badge.textContent = `${index + 1}º`;
            badge.className = 'badge rounded-pill me-2 rank-badge custom-rank';
        }
    });
}

function addTask(tasktext) {
    taskCount++;
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex align-items-center justify-content-between py-2 px-3 mb-2 rounded shadow-sm gap-2';
    li.style.cursor = 'grab';
    
    const leftContainer = document.createElement('div');
    leftContainer.className = 'd-flex align-items-center flex-grow-1 overflow-hidden';
    
    const gripIcon = document.createElement('i');
    gripIcon.className = 'fas fa-grip-vertical text-black-50 me-2';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'form-check-input me-3 mt-0 flex-shrink-0';
    checkbox.style.transform = "scale(1.2)";
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            moveToHistory(tasktext, li);
        }
    });

    const badge = document.createElement('span');
    badge.className = 'badge rounded-pill me-2 rank-badge bg-secondary';
    badge.textContent = '-';

    const span = document.createElement('span');
    span.textContent = tasktext;
    span.className = 'fw-medium text-dark text-break';
    
    leftContainer.appendChild(gripIcon);
    leftContainer.appendChild(checkbox);
    leftContainer.appendChild(badge);
    leftContainer.appendChild(span);
    
    const rightContainer = document.createElement('div');
    rightContainer.className = 'd-flex align-items-center flex-shrink-0';

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.className = 'btn btn-sm btn-outline-danger border-0 d-flex align-items-center';
    deleteBtn.addEventListener('click', () => {
        li.remove();
        taskCount--;
        updateStats();
        updateRanks();
    });
    
    rightContainer.appendChild(deleteBtn);
    
    li.appendChild(leftContainer);
    li.appendChild(rightContainer);
    list.appendChild(li);
    
    updateRanks();
}

form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Check limit based on total tasks (active + completed)
    if ((taskCount + completedCount) >= MAX_TASKS) {
        const alertElement = document.getElementById('limit-alert');
        alertElement.classList.remove('d-none');
        setTimeout(() => alertElement.classList.add('d-none'), 3000);
        return;
    }
    
    const tasktext = input.value.trim();
    if (tasktext === '') return; 

    addTask(tasktext);
    input.value = '';
    charLimitPopup.classList.add('d-none');
    
    updateStats();
});

function moveToHistory(tasktext, taskElement) {
    taskElement.remove();
    taskCount--;
    completedCount++;
    
    const historyItem = document.createElement('li');
    historyItem.className = 'list-group-item history-item d-flex justify-content-between align-items-center py-2 px-3 mb-2 rounded shadow-sm opacity-75 gap-2';
    
    const leftContainer = document.createElement('div');
    leftContainer.className = 'd-flex align-items-center flex-grow-1 overflow-hidden';
    
    const undoBtn = document.createElement('button');
    undoBtn.innerHTML = '<i class="fas fa-undo"></i>';
    undoBtn.className = 'btn btn-sm btn-outline-secondary border-0 d-flex align-items-center me-3 flex-shrink-0';
    undoBtn.title = "Restaurar para a lista pendente";
    undoBtn.style.padding = '4px 8px';
    
    undoBtn.addEventListener('click', () => {
        historyItem.remove();
        completedCount--;
        addTask(tasktext);
        historyCount.textContent = completedCount;
        updateStats();
    });
    
    const textSpan = document.createElement('span');
    textSpan.textContent = tasktext;
    textSpan.className = 'fw-medium text-decoration-line-through text-break';
    
    leftContainer.appendChild(undoBtn);
    leftContainer.appendChild(textSpan);
    
    const timeContainer = document.createElement('div');
    timeContainer.className = 'd-flex flex-column text-end pt-1 pb-1 px-2 rounded bg-white bg-opacity-25 text-nowrap flex-shrink-0 ms-2';
    timeContainer.style.minWidth = 'fit-content';
    
    const completedSpan = document.createElement('small');
    const now = new Date();
    const completedTimeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    completedSpan.style.fontSize = '0.70rem';
    completedSpan.innerHTML = `Concluída: <strong>${completedTimeStr}</strong>`;
    
    timeContainer.appendChild(completedSpan);
    
    historyItem.appendChild(leftContainer);
    historyItem.appendChild(timeContainer);
    historyList.appendChild(historyItem);
    
    historyCount.textContent = completedCount;
    updateStats();
    updateRanks();
}

// Inicializar a funcionalidade de arrastar e soltar (drag & drop) usando SortableJS
if (typeof Sortable !== 'undefined') {
    new Sortable(list, {
        animation: 150,
        ghostClass: 'opacity-50',
        onEnd: function () {
            updateRanks();
        }
    });
}


