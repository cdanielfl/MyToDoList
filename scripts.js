const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const historyList = document.getElementById('history-list');
const historyCount = document.getElementById('history-count');
const statTotal = document.getElementById('stat-total');
const statActive = document.getElementById('stat-active');
const statCompleted = document.getElementById('stat-completed');

let taskCount = 0;
let completedCount = 0;
const MAX_TASKS = 10;

function updateStats() {
    if (statActive) statActive.textContent = taskCount;
    if (statCompleted) statCompleted.textContent = completedCount;
    if (statTotal) statTotal.textContent = taskCount + completedCount;
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

    taskCount++;
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex align-items-center justify-content-between py-2 px-3 mb-2 rounded shadow-sm gap-2';
    
    // Store creation time inside the element dataset for later use
    const now = new Date();
    const creationTimeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    li.dataset.creationTime = creationTimeStr;
    
    const leftContainer = document.createElement('div');
    leftContainer.className = 'd-flex align-items-center flex-grow-1 overflow-hidden';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'form-check-input me-3 mt-0 flex-shrink-0';
    checkbox.style.transform = "scale(1.2)";
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            moveToHistory(tasktext, li);
        }
    });

    const span = document.createElement('span');
    span.textContent = tasktext;
    span.className = 'fw-medium text-dark text-break';
    
    leftContainer.appendChild(checkbox);
    leftContainer.appendChild(span);
    
    const rightContainer = document.createElement('div');
    rightContainer.className = 'd-flex align-items-center flex-shrink-0';

    const timeSpan = document.createElement('small');
    timeSpan.className = 'text-muted ms-auto me-2 bg-light px-2 py-1 rounded d-flex align-items-center gap-1 text-nowrap';
    timeSpan.innerHTML = `<i class="far fa-clock"></i> ${creationTimeStr}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.className = 'btn btn-sm btn-outline-danger border-0 d-flex align-items-center';
    deleteBtn.addEventListener('click', () => {
        li.remove();
        taskCount--;
        updateStats();
    });
    
    rightContainer.appendChild(timeSpan);
    rightContainer.appendChild(deleteBtn);
    
    li.appendChild(leftContainer);
    li.appendChild(rightContainer);
    list.appendChild(li);
    input.value = '';
    
    updateStats();
});

function moveToHistory(tasktext, taskElement) {
    taskElement.remove();
    taskCount--;
    completedCount++;
    
    // Retrieve creation time
    const creationTimeStr = taskElement.dataset.creationTime;
    taskElement.remove();
    
    const historyItem = document.createElement('li');
    historyItem.className = 'list-group-item history-item d-flex justify-content-between align-items-center py-2 px-3 mb-2 rounded shadow-sm opacity-75 gap-2';
    
    const textSpan = document.createElement('span');
    textSpan.textContent = tasktext;
    textSpan.className = 'fw-medium text-decoration-line-through text-break flex-grow-1 overflow-hidden';
    
    const timeContainer = document.createElement('div');
    timeContainer.className = 'd-flex flex-column text-end pt-1 pb-1 px-2 rounded bg-white bg-opacity-25 text-nowrap flex-shrink-0';
    timeContainer.style.minWidth = 'fit-content';
    
    const createdSpan = document.createElement('small');
    createdSpan.style.fontSize = '0.70rem';
    createdSpan.innerHTML = `Adicionada: <strong>${creationTimeStr}</strong>`;
    
    const completedSpan = document.createElement('small');
    const now = new Date();
    const completedTimeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    completedSpan.style.fontSize = '0.70rem';
    completedSpan.innerHTML = `Concluída: <strong>${completedTimeStr}</strong>`;
    
    timeContainer.appendChild(createdSpan);
    timeContainer.appendChild(completedSpan);
    
    historyItem.appendChild(textSpan);
    historyItem.appendChild(timeContainer);
    historyList.appendChild(historyItem);
    
    historyCount.textContent = completedCount;
    updateStats();
}

