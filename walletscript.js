// name and pass
let users = [
    { username: 'user', password: 'pass' }
];

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const errorMessage = document.getElementById('login-error-message');
    
    const user = users.find(users => users.username === username && users.password === password);

    if (user) {
        window.location.href = 'wallet.html';
    } else {
        errorMessage.innerText = 'Wrong username or password.';
    }
}

function logout() {
    window.location.href = 'index.html';
}

function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const errorMessage = document.getElementById('register-error-message');

    if (username && password) {
        const userExists = users.find(user => user.username === username);

        if (userExists) {users.push({ username: username, password: password });
            errorMessage.innerText = 'Username already exists.';
        } else {
            users.push({ username: username, password: password });
            console.log(users[1]);
            alert('Registration successful! Please log in.');
        }
    } else {
        errorMessage.innerText = 'Please fill in both fields.';
    }
}

function showRegisterForm() {
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('register-page').style.display = 'block';
}

function showLoginForm() {
    document.getElementById('register-page').style.display = 'none';
    document.getElementById('login-page').style.display = 'block';
}

let amount = 2500

function addFunds() {
    const amount = parseInt(document.getElementById('add-amount').value);
    const balanceElement = document.getElementById('balance');
    const depositElement = document.getElementById('deposit');
    let deposit = parseInt(depositElement.innerText.replace('$', '').replace('+', ''))
    let balance = parseInt(balanceElement.innerText.replace('$', ''));
    
    if (amount && amount > 0) {
        balance += amount;
        deposit += amount;
        balanceElement.innerText = `$${balance}`;
        depositElement.innerText = `+$${deposit}`;
        document.getElementById('add-amount').value = '';
        alert('$' + amount + ' added successfully.');
        addTransaction('Added', amount);
    } else {
        alert('Please enter a valid amount.');
    }
}

function sendMoney() {
    const sendAmount = parseInt(document.getElementById('send-amount').value);
    const balanceElement = document.getElementById('balance');
    let balance = parseInt(balanceElement.innerText.replace('$', ''));
    const account = document.getElementById('account');

    if (sendAmount && sendAmount > 0 && sendAmount <= balance) {
        balance -= sendAmount;
        balanceElement.innerText = `$${balance}`;
        document.getElementById('send-amount').value = '';
        alert('$' + sendAmount + ' sent successfully.');
        addTransaction('Sent', sendAmount, account);
    } else {
        alert('Please enter a valid amount within your balance.');
    }
}

function addTransaction(type, amount, account = '') {
    const transactionList = document.getElementById('transactionList');
    const newTransaction = document.createElement('li');
    newTransaction.className = 'list-group-item';
    newTransaction.innerText = `${type} $${amount} ${account ? 'to ' + account : ''}`;
    transactionList.appendChild(newTransaction);
}

