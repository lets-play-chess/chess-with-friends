const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const userObj={
        email:document.querySelector("#email-login").value,
        password:document.querySelector("#password-login").value,
    };
    //TODO: figure out the correct login route
    fetch('loginRoute',{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            //TODO: figure out the correct user profile route
            location.href = "userprofileRoute"
        } else {
            alert("trumpet sound");
        }
    });
});
