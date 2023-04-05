console.log("Welcome to Data Transmission")

document.getElementById("message").innerHTML = "F12 to open dev tools -> console (this was written in js)"

function printf(message){
    console.log(message)
}

var user = {
    "id":1,
    "name":"Alexandru Cristea",
    "email":"acristea@test.com",
    "address": {
        "street":"Padin",
        "number":"Ap. 10",
        "city":"Cluj-Napoca",
        "zipcode":"123456",
        "geo":{
            "lat":"46.783364",
            "lng":"23.546472"
        }
    },
    "phone":"004-07xx-123456",
    "company":{
        "name":"XYZ",
        "domain":"Air Traffic Management",
        "cities":["Cluj-Napoca", "Vienna", "Paris"]
    }
}

printf(user.name)
printf(user.address.geo.lat)
printf(user.company.name)
console.dir(user.company.cities)
printf(user.company.cities[0])
