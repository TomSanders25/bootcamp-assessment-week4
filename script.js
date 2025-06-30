const TodoItemStatus = Object.freeze({
    NOTSTARTED: 0,
    INPROGRESS: 1,
    COMPLETED: 2
});

function GetItemStatusString(status) {
    switch (status) {
        case TodoItemStatus.NOTSTARTED: return "Not Started";
        case TodoItemStatus.INPROGRESS: return "In Progress";
        case TodoItemStatus.COMPLETED: return "Completed";
        default: return "-";
    }
}

const TodoItemPriority = Object.freeze({
    LOW: 0,
    MEDIUM: 1,
    HIGH: 2,
    URGENT: 3
});

function GetItemPriorityString(priority) {
    switch (priority) {
        case TodoItemPriority.LOW: return "Low";
        case TodoItemPriority.MEDIUM: return "Medium";
        case TodoItemPriority.HIGH: return "High";
        case TodoItemPriority.URGENT: return "Urgent";
        default: return "-";
    }
}

function GetDateString(date) {
    return date ? date.toDateString() : "-";
}

// Integer Id used to uniquely specify an item
var nextId = 0;

// The master item list
var TodoItemList = Array();

function GenerateAndIncrementId() {
    return nextId++;
}

// Todo - use class and constructor for this
function GenerateDefaultTodoItem() {
    return {
        id: GenerateAndIncrementId(),
        title: "Default item",
        description: "Default description",
        dateCreated: new Date(),
        dateLastEdited: this.dateCreated,
        dateToComplete: null,
        status: TodoItemStatus.NOTSTARTED,
        priority: TodoItemPriority.LOW
    };
}

function GenerateSampleItems() {
    console.log("GenerateSampleItems()");
    let item = GenerateDefaultTodoItem();
    item.title = "Tidy the garden";
    item.description = "Trim the hedge, mow the grass and remove the weeds.";
    item.dateToComplete = new Date();
    item.dateToComplete.setDate(item.dateToComplete.getDate() + 7);

    TodoItemList.push(item);

    item = GenerateDefaultTodoItem();
    item.title = "DIY shelves";
    item.description = "Cut the wood for the new shelves, buy brackets and fix to wall";
    item.dateToComplete = new Date();
    item.dateToComplete.setDate(item.dateToComplete.getDate() + 14);

    TodoItemList.push(item);
}

function RefreshView() {
    console.log("RefreshView()");
    const tableBody = document.getElementById("TodoListTableBody");
    if (tableBody != null) {
        tableBody.replaceChildren();    // Clear existing table elements
        for (const item of TodoItemList) {
            let newElem = document.createElement("tr");
            newElem.id = "tr-item-" + item.id;

            var td = "";
            td += `<td><button>Edit</button></td>`;                     // 'Edit' button
            td += `<td>${item.title}</td>`;                             // Title
            td += `<td>${item.description}</td>`;                       // Description
            td += `<td>${GetDateString(item.dateCreated)}</td>`;        // Date created
            td += `<td>${GetDateString(item.dateLastEdited)}</td>`;     // Date last edited
            td += `<td>${GetDateString(item.dateToComplete)}</td>`;     // Date to complete
            td += `<td>${GetItemStatusString(item.status)}</td>`;       // Status                            
            td += `<td>${GetItemPriorityString(item.priority)}</td>`;   // Priority
            td += `<td><button>Delete</button></td>`;                   // 'Delete' button

            newElem.innerHTML = td;
            tableBody.appendChild(newElem);
        }
        console.log(tableBody.innerHTML);
    }
}

// Event handlers
var generateDataButton = document.getElementById("generateSampleData");
generateDataButton.addEventListener("click", function () {
    GenerateSampleItems();
    RefreshView();
    console.log(`TodoItemList size = ${TodoItemList.length}`);
});
