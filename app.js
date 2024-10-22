`use strict`;

const errorMsgEl = document.querySelector(".error-message");
const budgetInputEl = document.querySelector(".budget_input");
const expenseDelEl = document.querySelector(".expenses_input");
const expenseAmountEl = document.querySelector(".expenses_amount");
const tblRecordEl = document.querySelector(".table-data");
const cardsContainerEl = document.querySelector(".cards");

const budgetCardEl = document.querySelector(".budget-card");
const exxpensesCardEl = document.querySelector(".expenses-card");
const balanceCardEl = document.querySelector(".blnc-card");


let itemList =[];
let itemId = 0;


function btnEvents(){
    const btnBudgetCal = document.querySelector("#btn_budget");
    const btnExpensesCal = document.querySelector("#btn_expenses");

    btnBudgetCal.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("budget");
        budgetFun()
    });

    btnExpensesCal.addEventListener("click", (e) => {
       e.preventDefault();
       console.log("Expenses")
       expensesFun()
    });
}


document.addEventListener("DOMContentLoaded", btnEvents);


function expensesFun() {
    let expensesDescVal = expenseDelEl.value;
    let expensesAmountVal = expenseAmountEl.value;
    console.log(expensesDescVal, expensesAmountVal);

    if(expensesDescVal === "" || expensesAmountVal === "" || budgetInputEl < 0 ){
        errorMsg("Please Enter Expenses Decs or Expense Amount");
    }else{
        let amount = parseInt(expensesAmountVal);

        expenseAmountEl.value = "";
        expenseDelEl.value = "";

        let expenses = {
            id: itemId,
            title: expensesDescVal,
            amount: amount
        };
        itemId++;
        itemList.push(expenses);

        addExpenses(expenses);
        showBalance();
    }
}


function addExpenses(expenses){
     const html = `<ul class="tbl-tr-content">
     <li data-id = ${expenses.id}>${expenses.id}</li>
     <li>${expenses.title}</li>
     <li><span>$</span>${expenses.amount}</li>
     <li>
         <button type="button" class="btn-edit">Edit</button>
         <button type="button" class="btn-delete">Delete</button>
     </li>
     </ul>`

    tblRecordEl.insertAdjacentHTML("beforeend", html); 

    const btnEdit = document.querySelectorAll(".btn-edit");
    const btnDelete = document.querySelectorAll(".btn-delete");
    const content_id = document.querySelectorAll(".tbl-tr-content");

    btnEdit.forEach((btnedit) => {
        btnedit.addEventListener("click", (el) => {
            let id;

            content_id.forEach((ids) => {
              id = ids.firstElementChild.dataset.id;
            })

            let element = el.target.parentElement.parentElement;
            element.remove();

            let expenses = itemList.filter(function(item){
                return item.id == id;
            })

            expenseDelEl.value = expenses[0].title;
            expenseAmountEl.value = expenses[0].amount;

            let templist = itemList.filter(function (item){
                return item.id != id;
            });

            itemList = templist;
        });
    })

    btnDelete.forEach((btndel) => {
        btndel.addEventListener("click", (el) => {
            let id;

            content_id.forEach((ids) => {
              id = ids.firstElementChild.dataset.id;
            })

            let element = el.target.parentElement.parentElement;
            element.remove();

            let templist = itemList.filter(function (item){
                return item.id != id;
            });

            itemList = templist;
            showBalance();
        });
    })
}


function budgetFun() {
    const budgetValue = budgetInputEl.value;
    console.log(budgetValue);
    if(budgetValue === "" || budgetValue < 0){
        errorMsg("Please Enter Budget  Amount | Budget Input Should Be More Than 0");
    }else{
    budgetCardEl.textContent = budgetValue;
    budgetInputEl.value = "";
    showBalance()
    }
}


function showBalance() {
    const expenses = totalExpenses();
    const total = parseInt(budgetCardEl.textContent) - expenses
    balanceCardEl.textContent = total;
}


function totalExpenses() {
    let total = 0;

    if(itemList.length > 0){
        total = itemList.reduce(function(acc, curr){
           acc += curr.amount;
           return acc
        }, 0);
    }

    exxpensesCardEl.textContent =  total;
    return total;
}


function errorMsg(message){
    errorMsgEl.innerHTML = `<p>${message}</p>`;
    errorMsgEl.classList.add("error");
    setTimeout(() => {
        errorMsgEl.classList.remove("error");
    }, 2500);
}



