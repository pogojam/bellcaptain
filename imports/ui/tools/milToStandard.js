const milToStandard = (mil)=>{

    let hour = Math.floor(mil)
    let min = (((mil - hour)/.25)*.15)
        min= min.toFixed(2)*100


    let time

    if(hour<12){
        time = hour+':'+min+'am'
    }
    if(hour===12){
        time=12+':'+min+'pm'
    }
    if(hour>12){
        time = (hour-12)+':'+min+'pm'
    }
    if(hour===24){
        time = 12+':'+min+'am'
    }

    return time
}

export default milToStandard