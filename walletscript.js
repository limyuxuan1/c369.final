
// name and pass
let users = [
    { username: 'user', password: 'pass' }
];

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const errorMessage = document.getElementById('login-error-message');
    
    const users=JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(users => users.username === username && users.password === password);

    if (user) {
        const userCode = prompt('Enter the 2FA code sent to your device (code is 123):');
        const twoFACode = "123";

        if (userCode === twoFACode) {
            window.location.href = "walletmain.html";
            alert('Login successful!');
        } else {
            alert('Invalid 2FA code. Please try again.');
        }
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
            localStorage.setItem('users', JSON.stringify(users));
            console.log(users[1]);
            alert('Registration successful! Please log in.');
            window.location.href = "walletlogin.html";
        }
    } else {
        errorMessage.innerText = 'Please fill in both fields.';
    }
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

newTransaction = [];
myHistory=[];

function addTransaction(type, amount, account = '') {
    //const transactionList = document.getElementById('transactionList');
    const history = `${type} $${amount} ${account ? 'to ' + account : ''}`;
    myHistory.push(history);
    localStorage.setItem('myHistory', JSON.stringify(myHistory));
    console.log(newTransaction);
    const historyString = localStorage.getItem("myHistory");
    console.log(historyString);
}

function updateProfileName() {
    const storedName = localStorage.getItem('username');
    if (storedName) {
        document.getElementById('profilename').textContent = storedName;
    }
}


function profilePage(){
    window.location.href ="wallet.html"
}

function viewWallet(){
    window.location.href ="walletfunds.html"
}

function viewHistory(){
    window.location.href ="wallethistory.html"
}

function mainPage(){
    window.location.href = 'walletmain.html'
;}

function toggleForm() {
    const formContainer = document.getElementById('formContainer');
    formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
}

function addCard() {
    const name = document.getElementById('name').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const cvv = document.getElementById('cvv').value;
    const expirationDate = document.getElementById('expirationDate').value;

    if (name && cardNumber && cvv && expirationDate) {
        const cardContainer = document.getElementById('cardContainer');
        const newCard = document.createElement('div');
        newCard.classList.add('card');
        newCard.innerHTML = `
            <div>Type: Credit Card</div>
            <div>Name: ${name}</div>
            <div>Card Number: ${cardNumber}</div>
            <div>CVV: ${cvv}</div>
            <div>Expiration Date: ${expirationDate}</div>
            <button onclick="selectCard(this)">Use this card</button>
        `;
        cardContainer.appendChild(newCard);

        document.getElementById('name').value = '';
        document.getElementById('cardNumber').value = '';
        document.getElementById('cvv').value = '';
        document.getElementById('expirationDate').value = '';

        toggleForm();
    } else {
        alert('Please fill in all fields.');
    }
}

function selectCard(button) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.borderColor = '#ccc';
        card.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    });
    const selectedCard = button.parentElement;
    selectedCard.style.borderColor = 'blue';
    selectedCard.style.boxShadow = '0 0 10px rgba(0, 0, 255, 0.5)';
    alert('This card is selected: ' + selectedCard.querySelector('div:nth-child(2)').textContent.split(': ')[1]);
}

document.addEventListener('DOMContentLoaded', () => {
    toggleForm();
});

