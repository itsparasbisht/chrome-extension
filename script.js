var searchBtn = document.getElementById('search-btn')
var pinCode = document.getElementById('pin-code')
var centersCtr = document.getElementById('centers-ctr')

var centers = []

function handleClick(e){
    e.preventDefault()

    if(pinCode.value.length == 6){
        const date = new Date()
        const day = date.getDate()
        let month = date.getMonth() + 1
        const year = date.getFullYear()
        centersCtr.innerHTML = ''

        if(month < 10){
            month = "0"+month
        }

        const formatDate = day+'-'+month+'-'+year

        fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pinCode.value}&date=${formatDate}`)
        .then(res => res.json())
        .then(data => {
            centers = data.sessions
            displayCenter(centers)
        })
    }
    else{
        alert("enter valid pincode")
    }
}

function displayCenter(centers){
    if(centers.length > 0){
        centers.forEach((center) => (
            centersCtr.innerHTML += `<div>
                <h2>${center.address}</h2>
                <h3><span>center:</span> ${center.name}</h3>
                <h3><span>date:</span> ${center.date}</h3>
                <h3><span>available capacity:</span> ${center.available_capacity}</h3>
                <h3><span>for dose 1:</span> ${center.available_capacity_dose1}</h3>
                <h3><span>for dose 2:</span> ${center.available_capacity_dose2}</h3>
                <h3><span>fee:</span> Rs ${center.fee}</h3>
                <h3><span>fee type:</span> ${center.fee_type}</h3>
                <h3><span>min age:</span> ${center.min_age_limit}</h3>
                <h3><span>vaccine:</span> ${center.vaccine}</h3>
                <h3><span>slots:</span> ${center.slots.map(slot => slot+'  ')}</h3>
            </div>`
        ))
    }
    else{
        centersCtr.innerHTML = "<h1> Vaccine not available </h1>"
    }
}

searchBtn.addEventListener('click', handleClick)