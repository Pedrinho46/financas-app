
let expenses = [];
let editingId = null;

const form = document.getElementById('expense-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const categorySelect = document.getElementById('category');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');

function addExpense(description, amount, category) {
    //Nesse campo, adiciono as opções de despesas
    const expense = {
        id: Date.now(),
        description,
        amount: parseFloat(amount),
        category
    };
    expenses.push(expense);
}

function removeExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    updateUI();
}
function editExpense(id) {
    const expense = expenses.find(exp => exp.id === id);
    if (expense) {
        descriptionInput.value = expense.description;
        amountInput.value = expense.amount;
        categorySelect.value = expense.category;
        editingId = id;
    }
}


function calculateTotal() {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
}
function updateUI() {
    expenseList.innerHTML = '';

    expenses.forEach(expense => {
        const li = document.createElement('li');
        const isHighExpense = expense.amount > 100;
        li.className = isHighExpense ? 'high-expense' : '';
        li.innerHTML = `
            <span>${expense.description} - R$ ${expense.amount.toFixed(2)} - ${expense.category}${isHighExpense ? ' ⚠️' : ''}</span>
            <button class="delete-btn" onclick="removeExpense(${expense.id})">Remover</button>
            <button class="edit-btn" onclick="editExpense(${expense.id})">Editar</button>
        `;
        expenseList.appendChild(li);
    });

    totalAmount.textContent = calculateTotal().toFixed(2);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const description = descriptionInput.value.trim();
    const amount = amountInput.value;
    const category = categorySelect.value;

    if (description && amount && category) {
        if (editingId) {
            // Editar existente
            const expense = expenses.find(exp => exp.id === editingId);
            if (expense) {
                expense.description = description;
                expense.amount = parseFloat(amount);
                expense.category = category;
            }
            editingId = null;
        } else {
            addExpense(description, amount, category);
        }
        form.reset();
        updateUI();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});