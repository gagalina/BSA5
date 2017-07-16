(() => {
    const nameInput = document.querySelector('.nameInput');
    const signUpBtn = document.querySelector('.signUpBtn');
    const messageField = document.querySelector('.messageField');
    const sendMessageBtn = document.querySelector('.sendMessageBtn');
    let userName = document.querySelector('.userName');
    let ajax = new XMLHttpRequest();


    userName.innerText = "User Name";

    signUpBtn.addEventListener('click', () =>{
        nameInput.value ? (userName.innerText = nameInput.value ): "User Name";
        ajax.open('POST', 'http://localhost:3000/users', true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax.send("user="+nameInput.value);
        ajax.onreadystatechange = () => {
            if(ajax.readyState === XMLHttpRequest.DONE && ajax.status === 200) {
                console.log(ajax.responseText);
            }
        }

    });








})();