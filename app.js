// DOM Variables
const addedText = document.getElementById('add-text');
const addedPriority = document.getElementById('add-priority');
const form = document.getElementById('form');
const showList = document.getElementById('show-list');
const doneList = document.getElementById('done-list');
const unfinishedLabel = document.getElementById('unfinished-label');
const completeLabel = document.getElementById('complete-label');
const sortWrapperBtn = document.getElementById('btn-wrapper');
// Array Variables
let lowPriority = [];
let medPriority = [];
let highPriority = [];
let reorderedArrayHighLow = [];
let reorderedArrayLowHigh = [];
let completedArray = [
    {
        text: "Request time off",
        priority: "high",
        id: 125567763541
    },
    {
        text: "Gym membership",
        priority: "medium",
        id: 12556771141
    }
];
let array = [
    {
        text: "Walk the Dog",
        priority: "low",
        id: 12556776541
    },
    {
        text: "Go to Dentist",
        priority: "high",
        id: 12556776542
    },
    {
        text: "Call insurance",
        priority: "medium",
        id: 12556776543
    },
    {
        text: "pay rent",
        priority: "high",
        id: 12556776544
    },
    {
        text: "Go to store",
        priority: "medium",
        id: 12556776545
    },
    {
        text: "Call mom",
        priority: "low",
        id: 12556776546
    }
];

// Start Functions
renderList();
updateLables();
renderDoneList();


// Event Listeners
form.addEventListener('submit', function (e) {
    e.preventDefault();
    addedText.value.length > 1 ? init() : null;
});

function init() {
    createItem();
    renderList();
    updateLables();
}

function createItem() {
    const item = {
        text: addedText.value,
        priority: addedPriority.value,
        id: genID()
    };
    array.push(item);
}

function genID() {
    return Math.floor(Math.random() * 10000000);
}

function renderList() {
    showList.innerHTML = '';
    array.forEach(function (x) {
        let listItem = document.createElement('li');
        let listPriority = document.createElement("div");
        let deleteBtnDiv = document.createElement('div');
        let completeBtnDiv = document.createElement('div');
        listItem.innerHTML = x.text;
        listItem.classList.add('item-text');
        listPriority.innerHTML = x.priority;

        if (x.priority === "low") {
            listPriority.classList.add("low-priority");
        } else if (x.priority === "medium") {
            listPriority.classList.add("med-priority");
        } else if (x.priority === "high") {
            listPriority.classList.add("high-priority");
        }

        listPriority.classList.add('priority-text');
        deleteBtnDiv.innerHTML = "X";
        completeBtnDiv.innerHTML = "&#10003;";
        deleteBtnDiv.classList.add("delete-btn");
        completeBtnDiv.classList.add("complete-btn");
        deleteBtnDiv.addEventListener("click", function () {
            for (let i = 0; i < array.length; i++)
                if (array[i].id === x.id) {
                    array.splice(i, 1);
                }
            renderList();
            renderDoneList();
            updateLables();
        });
        completeBtnDiv.addEventListener("click", function () {
            for (let i = 0; i < array.length; i++)
                if (array[i].id === x.id) {
                    completedArray.push(array[i]);
                    array.splice(i, 1);
                    console.log(completedArray);
                }
            renderList();
            renderDoneList();
            updateLables();
        });
        listItem.appendChild(listPriority);
        listItem.appendChild(deleteBtnDiv);
        listItem.appendChild(completeBtnDiv);
        showList.appendChild(listItem);
    });
}

function renderDoneList() {
    doneList.innerHTML = '';
    completedArray.forEach(function (x) {
        let doneListItem = document.createElement('li');
        let undoBtn = document.createElement('button');
        undoBtn.innerHTML = "undo";
        doneListItem.innerHTML = x.text;
        doneListItem.classList.add('item-text-done');
        undoBtn.classList.add("undoBtn");
        undoBtn.addEventListener('click', function () {
            for (let i = 0; i < completedArray.length; i++)
                if (completedArray[i].id === x.id) {
                    array.push(completedArray[i]);
                    completedArray.splice(i, 1);
                }
            console.log("hi");
            renderList();
            renderDoneList();
            updateLables();
        });
        doneListItem.appendChild(undoBtn);
        doneList.appendChild(doneListItem);
    });

}

function reorder() {
    for (let i = 0; i < array.length; i++) {
        if (array[i].priority === "low") {
            lowPriority.push(array[i]);
        } else if (array[i].priority === "medium") {
            medPriority.push(array[i]);
        } else if (array[i].priority === "high") {
            highPriority.push(array[i]);
        }
    }
    reorderedArrayHighLow = [...highPriority, ...medPriority, ...lowPriority];
    reorderedArrayLowHigh = [...lowPriority, ...medPriority, ...highPriority];
}

function clearArrays() {
    lowPriority = [];
    medPriority = [];
    highPriority = [];
    reorderedArrayHighLow = [];
    reorderedArrayLowHigh = [];
}

function reorderHighLow() {
    clearArrays();
    reorder();
    array = reorderedArrayHighLow;
    renderList();
}

function reorderLowHigh() {
    clearArrays();
    reorder();
    array = reorderedArrayLowHigh;
    renderList();
}

function updateLables() {
    if (completedArray.length == 0) {
        completeLabel.setAttribute("style", "display: none");
    } else if (completedArray.length > 0) {
        completeLabel.setAttribute("style", "display: flex");
    }
    if (array.length == 0) {
        sortWrapperBtn.classList.add("hidden");
    } else if (array.length > 0) {
        sortWrapperBtn.classList.remove("hidden");
    }
}

function clearCompletedArray() {
    completedArray = [];
    renderDoneList();
    updateLables();
}


const toggle = document.getElementById('toggle');
toggle.addEventListener('click', () => {
    let nav = document.getElementById("nav");
    nav.classList.toggle('show-nav');
});