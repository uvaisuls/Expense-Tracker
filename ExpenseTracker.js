const amountInput = document.getElementById("amount");
const descInput = document.getElementById("description");
const categoryInput = document.getElementById("category");
const addBtn = document.getElementById("add");
const expenseList = document.getElementById("expenselist");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let editIndex = -1;

addBtn.addEventListener("click",function() {
    const amount = amountInput.value;
    const desc = descInput.value;
    const categ = categoryInput.value;

    if (!amount || !desc) {
        alert("Please enter all fields");
        return;
    }

    const expense = { amount, desc, categ }

    if(editIndex === -1){
    expenses.push(expense)
    }
    else{
        expenses[editIndex] = expense;
        editIndex = -1;
    }

    console.log(expenses)
    localStorage.setItem("expenses",JSON.stringify(expenses));

    renderExpense();
    amountInput.value = "";
    descInput.value= "";

    
})

function renderExpense(){
    expenseList.innerHTML = " "; 
    let total = 0;
    expenses.forEach((item,index)=>{
    total += Number(item.amount);
    const li = document.createElement("li");
    li.innerHTML =` <div>
    <strong>₹${item.amount}</strong> - ${item.desc}
    <br><small>${item.categ}</small>
  </div>
  <div>
    <button onclick="editExpenses(${index})">Edit</button>
    <button onclick="deleteExpenses(${index})">X</button>
  </div>`;
        
    expenseList.appendChild(li);
    });

    document.getElementById("total").textContent = total;
}

function deleteExpenses(index){
    expenses.splice(index,1);

    localStorage.setItem("expenses",JSON.stringify(expenses))

    renderExpense();
}

function editExpenses(index){
    const item = expenses[index];

    amountInput.value = item.amount;
    descInput.value = item.desc;
    categoryInput.value = item.categ

    editIndex = index;
}

renderExpense();