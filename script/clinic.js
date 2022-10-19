import Cookies from "/node_modules/js-cookie/dist/js.cookie.mjs"

const tombolSubmit = document.getElementById("tombol-submit")
const clinic = document.getElementById("clinic")
const test = document.getElementById("jenis-test")
const date = document.getElementById("tanggal")
const time = document.getElementById("time")
const name = document.getElementById("name")
const phone = document.getElementById("phone")
const address = document.getElementById("address")
const halloUser = document.getElementById("hallo-user")
const radio = document.querySelector('input[name="sexRadio"]:checked');
// cek apakah ada JWT
const clinicList = fetch("http://127.0.0.1:3000/api/user/cookie",{
    method:"POST",
    mode: 'cors',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body:Cookies.get("jwt")
    })
const clinicListResponse = await clinicList
try{
    var clinicListResponseJson = await clinicListResponse.json()
    console.log(clinicListResponseJson);
}catch{window.location.replace("http://127.0.0.1:5500/signin.html")};

// get data clinic 
async function getClinicListData(){
    const clinicList = fetch("http://127.0.0.1:3000/api/clinic/")
    const clinicListResponse = await clinicList
    const clinicListResponseJson = await clinicListResponse.json()
    console.log("response semua klinik yang ada");
    console.log(clinicListResponseJson);
    for (let dataClinic of clinicListResponseJson){
        let opt = document.createElement("option")
        opt.innerHTML = dataClinic.nama_clinic
        opt.value = dataClinic.id
        clinic.appendChild(opt)
    }
}
getClinicListData()

// get covid test
clinic.addEventListener("change",async ()=>{
    const clinicCovid19Data = await getCLinicCovid19(clinic.value)
    test.removeAttribute("disabled")
    console.log("clinicCovid19Data");
    console.log(clinicCovid19Data);
    test.innerHTML = ""
    for (let data of clinicCovid19Data){
        let opt = document.createElement("option")
        opt.innerHTML = data.tabel_covid19.nama_test
        // opt.value niainya secata berurutan clinicId,covid19Id,clinicCovidId
        opt.value = [data.clinic_id,data.covid19_id,data.id]
        test.appendChild(opt)
    }
    resetTest()
    resetDate()
    resetTime()
    test.removeAttribute("disabled")
})
test.addEventListener("change",async()=>{
    const clinicId = test.value[0]
    const covid19Id = test.value[2]
    const clinicCovid19JadwalTest = await getJadwalTest(clinicId,covid19Id)
    resetDate()
    resetTime()
    date.removeAttribute("disabled")
    
})
date.addEventListener("change",async ()=>{
    console.log("object");
    console.log(date.value);
    const clinicId = test.value[0]
    const covid19Id = test.value[2]
    const testDate = date.value
    const JadwalTest = fetch(`http://127.0.0.1:3000/api/clinic/${clinicId}/covid19/${covid19Id}/jadwal/${testDate}`)
    const JadwalTestResponse = await JadwalTest
    const JadwalTestResponseJson = await JadwalTestResponse.json()
    console.log(JadwalTestResponseJson);
    time.innerHTML = ""
    for (let data of JadwalTestResponseJson){
        let opt = document.createElement("option")
        opt.innerHTML = data.jam
        time.appendChild(opt)
    }
})
async function getCLinicCovid19(clinicId){
    const clinicCovid19 = fetch(`http://127.0.0.1:3000/api/clinic/${clinicId}/covid19/`)
    const clinicCovid19Response = await clinicCovid19
    return await clinicCovid19Response.json()    
}
async function getJadwalTest(clinicId,covid19Id){
    const JadwalTest = fetch(`http://127.0.0.1:3000/api/clinic/${clinicId}/covid19/${covid19Id}/jadwal`)
    const JadwalTestResponse = await JadwalTest
    const JadwalTestResponseJson = await JadwalTestResponse.json()
    console.log(JadwalTestResponseJson);
}
date.addEventListener("change",()=>{
    resetTime()
    time.removeAttribute("disabled")
})

function resetTest(){
    test.value = ""
    test.setAttribute("disabled",true)
}
function resetDate(){
    date.value = ""
    date.setAttribute("disabled",true)
}
function resetTime(){
    time.value = ""
    time.setAttribute("disabled",true)
}


//submit 
tombolSubmit.addEventListener("click",async ()=>{
    console.log(clinic.value);
    console.log(test.value[2]);
    console.log(date.value);
    console.log(time.value);
    const payload = {
        nik:clinicListResponseJson.nik,
        clinic_id:clinic.value,
        covid19_id: test.value[2],
        tanggal: date.value,
        jam: time.value
    }
    fetch("http://127.0.0.1:3000/api/user/booking",{
    method:"POST",
    mode: 'cors',
    headers: {'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'},
    referrerPolicy: 'no-referrer',
    body:JSON.stringify(payload)
    })
    
   
})


const linkLogout = document.getElementById("linkLogout")
linkLogout.addEventListener("click",()=>{
    Cookies.remove("jwt")
    Cookies.remove("booking")
})




