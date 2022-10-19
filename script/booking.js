import Cookies from "/node_modules/js-cookie/dist/js.cookie.mjs"

const userCookie = await getCookie("jwt",logUserData,redirrect,"http://127.0.0.1:5500/signin.html")
const bookingCookie = await getCookie("booking",getBookingData,log,("Tidak ada bookingan"))

async function getCookie(cookieName,success,fail,catchError){
    const cookie = fetch("http://127.0.0.1:3000/api/user/cookie",{
    method:"POST",
    mode: 'cors',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body:Cookies.get(cookieName)
    })
const cookieResponse = await cookie
try{
    var cookieResponseJson = await cookieResponse.json()
    cookieResponseJson
    success(cookieResponseJson)
}catch{fail(catchError)};
}


const clinicName = document.getElementById("clinicName")
const testName = document.getElementById("testName")
const price = document.getElementById("price")
const userName = document.getElementById("userName")
const userNIK = document.getElementById("userNIK")
const userBirthDate = document.getElementById("userBirthDate")
const testDate = document.getElementById("testDate")
const testTime = document.getElementById("testTime")

async function getBookingData(bookingId){
    const bookingData = fetch(`http://127.0.0.1:3000/api/user/booking/${bookingId.bookingId}`,{
    method:"GET",
    mode: 'cors',
    headers: {'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'},
    referrerPolicy: 'no-referrer',
    })
    const bookingDataResponse = await bookingData
    const bookingDataResponseJson = await bookingDataResponse.json()
    clinicName.innerHTML = bookingDataResponseJson.tabel_clinic.nama_clinic
    testName.innerHTML = bookingDataResponseJson.tabel_covid19.nama_test
    price.innerHTML = bookingDataResponseJson.harga
    userName.innerHTML = bookingDataResponseJson.tabel_user.fullname
    userNIK.innerHTML = bookingDataResponseJson.tabel_user.nik
    userBirthDate.innerHTML = bookingDataResponseJson.tabel_user.birthDate
    testDate.innerHTML = bookingDataResponseJson.tabel_jadwal.tanggal
    testTime.innerHTML = bookingDataResponseJson.tabel_jadwal.jam
    console.log(bookingDataResponseJson);
}


function logUserData(data){
    console.log(data);
}
async function redirrect(url){
    window.location.replace(url)
}
async function log(message){
   console.log(message)
}


const linkLogout = document.getElementById("linkLogout")
linkLogout.addEventListener("click",()=>{
    Cookies.remove("jwt")
    Cookies.remove("booking")
})