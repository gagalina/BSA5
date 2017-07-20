(() => {
    let nameInput = document.querySelector('.nameInput');
    let nickNameInput = document.querySelector('.nickNameInput');
    const signUpBtn = document.querySelector('.signUpBtn');
    const messageField = document.querySelector('.messageField');
    const sendMessageBtn = document.querySelector('.sendMessageBtn');
    let userName = document.querySelector('.userName');
    let messageHistory = document.querySelector('.messageHistory');
    let userIsTyping = document.querySelector('.userIsTyping');
    let modalWindow = document.querySelector('.modalWindow');
    let history = [];
    let users = [];
    let renderedHistory = [];
    let ajax = new XMLHttpRequest();


    userName.innerText = "User Name";

    signUpBtn.addEventListener('click', () => {
        nameInput.value ? (userName.innerText = nickNameInput.value) : "User Name";
        ajax.open('POST', '/users', true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax.send("user=" + nickNameInput.value);
        ajax.onreadystatechange = () => {
            if (ajax.readyState === XMLHttpRequest.DONE && ajax.status === 200) {
                nameInput.value = '';
                nickNameInput.value = '';
                modalWindow.style.display = 'none';
            }
        }
    });

    sendMessageBtn.addEventListener('click', () => {
        let message = messageField.value;
        ajax.open('POST', '/messages', true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax.send("message=" + message + "&user=" + userName.innerText);
        ajax.onreadystatechange = () => {
            if (ajax.readyState === XMLHttpRequest.DONE && ajax.status === 200) {
                messageField.value = '';
            }
        }

    });

    messageField.addEventListener('focus', () => {
        ajax.open('PUT', '/users', true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax.send("isTyping=" + true + "&user=" + userName.innerText);
    });

    messageField.addEventListener('blur', () => {
        ajax.open('PUT', '/users', true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax.send("isTyping=" + false + "&user=" + userName.innerText);
    });

    const getHistory = () => {
        ajax.open("GET", '/messages', true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax.send();
        ajax.onreadystatechange = () => {
            if (ajax.readyState === XMLHttpRequest.DONE && ajax.status === 200) {
                history = JSON.parse(ajax.responseText);
                renderHistory();
                getUsers();
            }
        };

    };

    const getUsers = () => {
        ajax.open("GET", '/users', true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax.send();
        ajax.onreadystatechange = () => {
            if (ajax.readyState === XMLHttpRequest.DONE && ajax.status === 200) {
                users = JSON.parse(ajax.responseText);
                renderUsers();
            }
        };
    };


    const renderHistory = () => {
        if (history) {
            messageHistory.innerHTML = "";
            renderedHistory = history;
            history.map((el) => {
                let itemMessage = document.createElement("li");
                if (checkForReceiver(el.message) === true){
                    itemMessage.classList.add("special");
                    itemMessage.classList.add("well");
                }
                itemMessage.classList.add("well");
                itemMessage.innerText = el.user + ' - ' + el.message;
                messageHistory.appendChild(itemMessage);
            });
        }
    };

    const renderUsers = () => {
        if (users.length !== 0) {
            userIsTyping.innerText = '';
            let typingUsers = [];
            users.map((el) => {
                if (el.isTyping === "true"){
                    typingUsers.push(el.user);
                }
            });
            if(typingUsers.length !== 0){
                userIsTyping.innerText = typingUsers.join(',') + ' is typing...';
                while (typingUsers.length) {
                    typingUsers.pop();
                }
            }
        }
    };


    const checkForReceiver = (item) => {
        let splittedMessage = item.split(" ");
        let receiver = splittedMessage.filter((item) => {
            return item.startsWith("@");
        });
        return !!receiver.length>0;
    };


    getHistory();

    setInterval(() => {
        getHistory();

    }, 1000);


    // validate form
    const validateForm = () => {
        if(nameInput.value === "" || nickNameInput.value === ""){
            signUpBtn.classList.add("disabled");
        }else{
            signUpBtn.classList.remove("disabled");
        }
    };

    nameInput.onkeydown = validateForm;
    nickNameInput.onkeydown = validateForm;


})();