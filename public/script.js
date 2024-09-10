let expenses = []; // Store all expense objects
let totalAmount = 0; // Track total income/expenses

// Get references to HTML elements
const categorySelect = document.getElementById('category_select');
const amountInput = document.getElementById('amount_input');
const infoInput = document.getElementById('info_input');
const dateInput = document.getElementById('date_input');
const addBtn = document.getElementById('add_btn');
const expenseTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

// Event listener for the "Add" button
addBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the form from refreshing

    const category = categorySelect.value;
    const info = infoInput.value.trim(); // Trim whitespace from info
    const amount = Number(amountInput.value); // Convert to number
    const date = dateInput.value;

    // Validation checks
    if (!category) {
        alert("Please select a category.");
        return;
    }
    if (!info) {
        alert("Please enter some info.");
        return;
    }
    if (!amount || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }
    if (!date) {
        alert("Please select a date.");
        return;
    }

    // Add expense to the list
    const expense = { category, info, amount, date };
    expenses.push(expense);

    // Update the total amount based on category
    if (category === 'Income') {
        totalAmount += amount;
    } else if (category === 'Expense') {
        totalAmount -= amount;
    }
    totalAmountCell.textContent = `$${totalAmount.toFixed(2)}`; // Update total display

    // Create a new row in the table
    const newRow = document.createElement('tr'); // Create a new table row
    
    // Create table cells for category, amount, info, date, and delete button
    newRow.innerHTML = `
        <td>${category}</td>
        <td>$${amount.toFixed(2)}</td>
        <td>${info}</td>
        <td>${date}</td>
        <td><button class="delete-btn">Delete</button></td>
    `;

    // Add the row to the table body
    expenseTableBody.appendChild(newRow);

    // Add delete functionality to the "Delete" button
    const deleteBtn = newRow.querySelector('.delete-btn'); // Select the delete button
    deleteBtn.addEventListener('click', function() {
        // Remove the row from the table
        expenseTableBody.removeChild(newRow);

        // Update total amount when an expense is deleted
        if (category === 'Income') {
            totalAmount -= amount;
        } else if (category === 'Expense') {
            totalAmount += amount;
        }
        totalAmountCell.textContent = `$${totalAmount.toFixed(2)}`; // Update total display

        // Remove the expense from the array
        const index = expenses.indexOf(expense);
        if (index !== -1) {
            expenses.splice(index, 1); // Remove the expense from the array
        }
    });

    // Reset form inputs after adding the expense
    categorySelect.value = '';
    amountInput.value = '';
    infoInput.value = '';
    dateInput.value = '';
});





// let expenses = [];
// let totalAmount = 0;

// const categorySelect = document.getElementById('category_select');
// const amountInput = document.getElementById('amount_input');
// const infoInput = document.getElementById('info_input');
// const dateInput = document.getElementById('date_input');
// const addBtn = document.getElementById('add_btn');
// const expenseTableBody = document.getElementById('expense-table-body');
// const totalAmountCell = document.getElementById('total-amount');

// // Event listener for Add button
// addBtn.addEventListener('click', function(event) {
//     event.preventDefault(); // Prevent the form from submitting

//     const category = categorySelect.value;
//     const info = infoInput.value.trim();
//     const amount = Number(amountInput.value);
//     const date = dateInput.value;

//     // Validation checks
//     if (!category) {
//         alert("Please select a category.");
//         return;
//     }
//     if (!info) {
//         alert("Please enter some info.");
//         return;
//     }
//     if (!amount || amount <= 0) {
//         alert("Please enter a valid amount.");
//         return;
//     }
//     if (!date) {
//         alert("Please select a date.");
//         return;
//     }

//     // Add expense to the list
//     const expense = {
//         category,
//         info,
//         amount,
//         date
//     };
//     expenses.push(expense);
    
//     // Update total amount
//     if(category==='Income'){
//     totalAmount += amount;
//     }
//     if(category==='Expenses'){
//         totalAmount -= amount;
//         }
//     totalAmountCell.textContent =totalAmount;

//     // Update the table with the new expense
//     const newRow = newRow.insertRow();
//     const categoryCell=newRow.insertCell();
//     const AmountCell=newRow.insertCell();
//     const InfoCell=newRow.insertCell();
//     const dateCell=newRow.insertCell();
//     const deleteCell=newRow.insertCell();


//     // Reset form inputs
//     categorySelect.value = '';
//     amountInput.value = '';
//     infoInput.value = '';
//     dateInput.value = '';

//     // Add delete functionality to the delete button
//     const deleteBtn = document.createElement('button');
//     deleteBtn.textContent="Delete";
//     deleteBtn.classList.add('delete-btn')
//     deleteBtn.addEventListener('click', function() {
//      expenses.splice(expenses.indexOf(expenses),1);
//      if(category==="Income"){
//          totalAmount-=amount;
//      }
//      if(category==="Expense"){
//         totalAmount+=amount;
//     }
//     totalAmountCell.textContent=totalAmount;
//     expenseTableBody.removeChild(new row);
//     });
// });
