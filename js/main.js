var inputData = document.getElementById('floatingInput');
var addBtn = document.getElementById('addBtn');
var errorTxt = document.getElementById("error-txt");
var table = document.getElementById('demo');
var taskContainer = JSON.parse(localStorage.getItem('taskList')) || [];
var counter = taskContainer.filter(task => !task.checked).length;
document.getElementById('count').textContent = counter;

displayTask();

function addTask() {
    var taskName = inputData.value.trim();
    if (!taskName) {
        setTimeout(() => {
            errorTxt.style.display = "block";
        }, 500);
        return;
    } else {
        errorTxt.style.display = "none";
        taskContainer.push({ text: taskName, checked: false });
        inputData.value = "";
        localStorage.setItem('taskList', JSON.stringify(taskContainer));
        counter++;
        updateCounter();
        displayTask();
    }
}

addBtn.addEventListener('click', addTask);

function displayTask() {
    table.innerHTML = '';
    taskContainer.forEach((task, index) => {
        var tableRow = document.createElement('tr');
        var tableDataInput = document.createElement('td');
        var input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        input.checked = task.checked;
        var tableDataTask = document.createElement('td');
        var taskText = document.createTextNode(task.text);
        tableDataTask.appendChild(taskText);

        if (task.checked) {
            tableDataTask.style.textDecoration = "line-through";
            tableDataTask.style.color = "gray";
        }
        tableDataInput.appendChild(input);

        var tableDataEdit = document.createElement('td');
        var editBtn = document.createElement('i');
        editBtn.setAttribute('class', 'fa-solid fa-square-pen edit');
        tableDataEdit.appendChild(editBtn);
        tableDataEdit.setAttribute('class', 'text-end');

        var tableDataDelete = document.createElement('td');
        var deleteBtn = document.createElement('i');
        deleteBtn.setAttribute('class', 'fa-solid fa-trash');
        tableDataDelete.appendChild(deleteBtn);
        tableDataDelete.setAttribute('class', 'text-end');

        tableRow.appendChild(tableDataInput);
        tableRow.appendChild(tableDataTask);
        tableRow.appendChild(tableDataEdit);
        tableRow.appendChild(tableDataDelete);
        table.appendChild(tableRow);

        input.addEventListener('change', function () {
            task.checked = input.checked;
            if (task.checked) {
                tableDataTask.style.textDecoration = "line-through";
                tableDataTask.style.color = "gray";
                counter--;
            } else {
                tableDataTask.style.textDecoration = "none";
                tableDataTask.style.color = "white";
                counter++;
            }
            localStorage.setItem('taskList', JSON.stringify(taskContainer));
            updateCounter();
        });

        deleteBtn.addEventListener('click', function () {
            deleteTask(index);
        });

        editBtn.addEventListener('click', function () {
            editTask(index);
        });
    });
}

function deleteTask(deleteIndex) {
    let taskToDelete = taskContainer[deleteIndex];
    taskContainer.splice(deleteIndex, 1);
    localStorage.setItem('taskList', JSON.stringify(taskContainer));
    displayTask();
    if (!taskToDelete.checked) {
        counter--;
    }
    updateCounter();
}
function editTask(index) {
    inputData.value = taskContainer[index].text;
    taskContainer.splice(index, 1);
    localStorage.setItem('taskList', JSON.stringify(taskContainer));
    displayTask();
    if (!taskContainer[index].checked) {
        counter--;
    }
    updateCounter();
}
function updateCounter() {
    document.getElementById('count').textContent = counter;
    localStorage.setItem('counter', counter.toString());
}
