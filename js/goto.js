const register=document.getElementById('register')
const login=document.getElementById('login')

register.addEventListener('click',function(){
    window.location.href="http://localhost:3000/register"
})

login.addEventListener('click',function(){
    window.location.href="http://localhost:3000/login"
})