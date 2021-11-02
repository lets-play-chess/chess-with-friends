const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const loginObj={
        email:document.querySelector("#email-login").value,
        password:document.querySelector("#password-login").value,
    }

    // TODO: add the correct route to login
    fetch("correct route to login",{
        method:"POST",
        body:JSON.stringify(loginObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(!res.ok){
            // TODO: show that the login was unsuccessful
        }
    });
});

const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const signupObj={
        email:document.querySelector("#email-signup").value,
        password:document.querySelector("#password-signup").value,
        username:document.querySelector("#username-signup").value,
    }

    // TODO: add the correct route to signup
    fetch("correct route to signup",{
        method:"POST",
        body:JSON.stringify(signupObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(!res.ok){
            // TODO: show that signup was unsuccessful
        }
    });
});