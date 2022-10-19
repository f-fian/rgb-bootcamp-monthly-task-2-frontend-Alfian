import Cookies from "/node_modules/js-cookie/dist/js.cookie.mjs"



const userCookie = fetch("http://127.0.0.1:3000/api/user/cookie",{
    method:"POST",
    mode: 'cors',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body:Cookies.get("jwt")
    })
const userCookieResponse = await userCookie
try{
    var userCookieResponseJson = await userCookieResponse.json()
    console.log(userCookieResponseJson);
}catch{window.location.replace("http://127.0.0.1:5500/signin.html")};

const userData = fetch(`http://127.0.0.1:3000/api/user/${userCookieResponseJson.nik}`,{
    method:"GET",
    mode: 'cors',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    })
const userDataResponse = await userData
var userDataResponseJson = await userDataResponse.json()
console.log("object");
console.log(userDataResponseJson);


const NIK = document.getElementById("NIK")
const fullName = document.getElementById("fullName")
const email = document.getElementById("email")
const phone = document.getElementById("phone")
const birthDate = document.getElementById("birthDate")
const address = document.getElementById("address")
const password = document.getElementById("password")
const confirmPassword = document.getElementById("confirmPassword")
const tombolSubmit = document.getElementById("tombolSubmit")

NIK.value = userDataResponseJson.nik
fullName.value = userDataResponseJson.fullname
email.value = userDataResponseJson.email
phone.value = userDataResponseJson.phone
birthDate.value = userDataResponseJson.birthDate
address.value = userDataResponseJson.address


tombolSubmit.addEventListener("click",()=>{
    if (password.value != confirmPassword.value || password.value == ""){
        alert("Password Tidak sama atau kosong");
    }else{updateUser()}
})




async function updateUser(){
    console.log("update USer");
    const updateUserBody = {
        nik:NIK.value,
        fullname:fullName.value,
        password:password.value,
        phone:phone.value ,
        email:email.value,
        birthDate:birthDate.value,
        address:address.value
    }
    console.log("update USer");
    await fetch(`http://127.0.0.1:3000/api/user/${userDataResponseJson.nik}`,{
    method:"PUT",
    mode: 'cors',
    headers: {'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'},
    referrerPolicy: 'no-referrer',
    body:JSON.stringify(updateUserBody)
    })
    console.log("update USer2");
    alert("User Telah terupdate")
    location.reload()
}

const linkLogout = document.getElementById("linkLogout")
linkLogout.addEventListener("click",()=>{
    Cookies.remove("jwt")
    Cookies.remove("booking")
})

