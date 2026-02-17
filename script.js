// Grab elements
const form = document.getElementById("expense-form");
const categoryInput = document.getElementById("category");
const amountInput = document.getElementById("amount");
const expenseList = document.getElementById("expense-list");
const ctx = document.getElementById("expense-chart").getContext("2d");

// Store expenses
let expenses = [];

// Initialize Chart.js pie chart
let chart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: [],
        datasets: [{
            label: 'Expenses',
            data: [],
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40'
            ]
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }
});

// Update chart
function updateChart() {
    const categoryTotals = {};
    expenses.forEach(exp => {
        if (categoryTotals[exp.category]) {
            categoryTotals[exp.category] += exp.amount;
        } else {
            categoryTotals[exp.category] = exp.amount;
        }
    });
    chart.data.labels = Object.keys(categoryTotals);
    chart.data.datasets[0].data = Object.values(categoryTotals);
    chart.update();
}

// Render expense list
function renderList() {
    expenseList.innerHTML = "";
    expenses.forEach((exp, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${exp.category}: $${exp.amount.toFixed(2)} 
                        <button onclick="removeExpense(${index})">Remove</button>`;
        expenseList.appendChild(li);
    });
}

// Remove expense
function removeExpense(index) {
    expenses.splice(index, 1);
    renderList();
    updateChart();
}

// Handle form submit
form.addEventListener("submit", function(e) {
    e.preventDefault();
    const category = categoryInput.value.trim();
    const amount = parseFloat(amountInput.value);
    if (!category || isNaN(amount)) return;
    expenses.push({ category, amount });
    categoryInput.value = "";
    amountInput.value = "";
    renderList();
    updateChart();
});