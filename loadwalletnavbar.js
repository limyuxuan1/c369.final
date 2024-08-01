document.addEventListener("DOMContentLoaded", function() {
    fetch('walletnavbar.html').then(response => response.text())
    .then(data => {
        document.body.insertAdjacentHTML('afterbegin', data);
    })
});

function walletPage() {
    window.location.href = "walletlogin.html";
}

/* addeventlistener("DOMContentloaded, function()")-> once document loaded, call function() to fetch() data from navbar.html and then change data to text, and then add text to beggining of document (afterbegin) */