 
function calculateAge(){
    var date = document.querySelector(".date").value;
    var dob = new Date(date);
    var diff = new Date() - dob;
    if(diff>0){
    var age_date = new Date(diff);
    alert("Age is " + (age_date.getFullYear() - 1970) + " years!!");
    }
    else{
        alert("Invalid Date of Birth");
    }
} 



/* 
function calculateAge(){
    var todayArr=[], ageArr= [];
    var date = document.querySelector(".date").value;
    var dob = new Date(date);
    console.log(date);
    var dateArr = date.split('-');
    var today = new Date();
    todayArr.push(today.getFullYear());
    todayArr.push(today.getMonth()+1);
    todayArr.push(today.getDate());
    console.log(today);
    for(let i=0; i<3; i++){
        ageArr[i] = todayArr[i] - parseInt(dateArr[i]);}
    
    if ((ageArr[1] < 0)){
            ageArr[0]-=1;
        } else if ((ageArr[1] == 0) && (ageArr[2] <0)){
            ageArr[0]-=1;
        }
    if(ageArr[0] >=0 ) {
        alert("Age is: " + ageArr[0] + " years!");
    }else{
        alert("Invalid Date of Birth!!!");
    }   
}
 */

function clear(){
    document.querySelector(".date").value = "";
}