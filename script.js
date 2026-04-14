
let expenses = [];
let editingId = null;

const form = document.getElementById('expense-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const categorySelect = document.getElementById('category');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');

function addExpense(descricao, valor, categoria) {
    // Nesse campo, adiciono as opções de despesas
    const expense = {
        id: Date.now(),
        descricao,
        valor: parseFloat(valor),
        categoria
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
        descriptionInput.value = expense.descricao;
        amountInput.value = expense.valor;
        categorySelect.value = expense.categoria;
        editingId = id;
    }
}


function calculateTotal() {
    return expenses.reduce((total, expense) => total + expense.valor, 0);
}
function updateUI() {
    expenseList.innerHTML = '';

    expenses.forEach(expense => {
        const li = document.createElement('li');
        const isHighExpense = expense.valor > 100;
        li.className = isHighExpense ? 'high-expense' : '';
        li.innerHTML = `
            <span>${expense.descricao} - R$ ${expense.valor.toFixed(2)} - ${expense.categoria}${isHighExpense ? ' ⚠️' : ''}</span>
            <button class="delete-btn" onclick="removeExpense(${expense.id})">Remover</button>
            <button class="edit-btn" onclick="editExpense(${expense.id})">Editar</button>
        `;
        expenseList.appendChild(li);
    });

    totalAmount.textContent = calculateTotal().toFixed(2);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const descricao = descriptionInput.value.trim();
    const valor = amountInput.value;
    const categoria = categorySelect.value;

    if (descricao && valor && categoria) {
        if (editingId) {
            // Editar existente
            const expense = expenses.find(exp => exp.id === editingId);
            if (expense) {
                expense.descricao = descricao;
                expense.valor = parseFloat(valor);
                expense.categoria = categoria;
            }
            editingId = null;
        } else {
            addExpense(descricao, valor, categoria);
        }
        form.reset();
        updateUI();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});