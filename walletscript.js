// Get the elements
const loginForm = document.getElementById('login-form');
const popup = document.getElementById('2fa-popup');
const closePopup = document.getElementById('close-popup');
const verifyBtn = document.getElementById('verify-btn');

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
        window.location.href = 'walletmain.html';
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

document.getElementById('edit-button').addEventListener('click', function() {
    let newName = prompt('Enter new name:');
    if (newName) {
        document.getElementById('profilename').textContent = newName;
        localStorage.setItem('username', newName);
    }
});

function profilePage(){
    window.location.href ="wallet.html"
}

function viewWallet(){
    window.location.href ="walletfunds.html"
}

function viewHistory(){
    window.location.href ="wallethistory.html"
}


// Handle form submission
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Simulate checking credentials and show the 2FA popup
    // In a real application, you would validate the username and password
    popup.style.display = 'flex';
});

// Handle closing the popup
closePopup.addEventListener('click', function() {
    popup.style.display = 'none';
});

// Handle 2FA verification
verifyBtn.addEventListener('click', function() {
    const code = document.getElementById('2fa-code').value;

    // Simulate 2FA verification
    // In a real application, you would send the code to the server for verification
    if (code) {
        alert('2FA code verified successfully!');
        popup.style.display = 'none';
    } else {
        alert('Please enter the 2FA code.');
    }
});
