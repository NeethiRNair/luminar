
class Data{
    static accountDetails = {  hsnAc1001:{name:"User1", mpin:1001, balance:10000},
                               hsnAc1002:{name:"User2", mpin:1002, balance:20000},
                               hsnAc1003:{name:"User3", mpin:1003, balance:15000},
                               hsnAc1004:{name:"User4", mpin:1004, balance:35000},
                               hsnAc1005:{name:"User5", mpin:1005, balance:12000}
        };       
}

class User{
    static login(){
        var accno = document.querySelector("#accno").value;
        var mpin = document.querySelector("#acmpin").value;
        localStorage.setItem("myAccNo", accno);
        document.querySelector("#accno").value="";
        document.querySelector("#acmpin").value="";

        if(accno in Data.accountDetails)
        {
            var pin = Data.accountDetails[accno]["mpin"];
            if(pin == mpin) 
            {
                swal(`Welcome ${Data.accountDetails[accno]["name"]}`, "Successfull Login", "success")
                .then((value) => {
                window.location.href="/home/neethi/Desktop/Mean_Stack/Assignment/Bank/bankTrans.html";
                });
            }
            else{
                swal("Login Failed!!!", "Invalid Mpin");
            } 
        }
        else{
            swal("Login Failed!!!", "Inavlid Username ");
        }
    }
}



class Transactions{
    static withdraw(){
        var amount = document.querySelector("#amt").value;
        var accPin = document.querySelector("#mpin").value;
        var accNo=localStorage.getItem("myAccNo");
        document.querySelector("#amt").value="";
        document.querySelector("#mpin").value="";

        var pin = Data.accountDetails[accNo]["mpin"]; 
        if(accPin == pin) 
            {
                var accName = Data.accountDetails[accNo]["name"];
                var accBalance = Data.accountDetails[accNo]["balance"];
                accBalance = accBalance - amount;
                Data.accountDetails[accNo]["balance"]=accBalance;
                swal("Hi " + accName + ",  Balance is " + String(Data.accountDetails[accNo]["balance"]), "Amount Debited: " + amount);
            }
            else{
                swal("Login Failed!!!", "Invalid Mpin");
            } 
    }

    static deposit(){
        var amount = document.querySelector("#amt").value;
        var accPin = document.querySelector("#mpin").value;

        var accno=localStorage.getItem("myAccNo");
        document.querySelector("#amt").value="";
        document.querySelector("#mpin").value="";

        var pin = Data.accountDetails[accno]["mpin"]; 
        if(accPin == pin) 
            {
                var accName = Data.accountDetails[accno]["name"];
                var accBalance = Data.accountDetails[accno]["balance"];
                accBalance = Number(accBalance) + Number(amount);
                Data.accountDetails[accno]["balance"]=accBalance;
                swal("Hi " + accName + ",  Balance is " + String(Data.accountDetails[accno]["balance"]), "Amount Credited: " + amount);
                
            }
            else{
                swal("Login Failed!!!", "Invalid Mpin");
            }  
    }

    static balanceEn(){
        
        var accPin = document.querySelector("#mpin").value;

        var accno=localStorage.getItem("myAccNo");
        document.querySelector("#mpin").value="";

        var pin = Data.accountDetails[accno]["mpin"]; 
        if(accPin == pin) 
            {
                var accName = Data.accountDetails[accno]["name"];
                var accBalance = Data.accountDetails[accno]["balance"];
                
                swal("Hi " + accName ,  "Balance is " + String(Data.accountDetails[accno]["balance"]));  
            }
            else{
                swal("Login Failed!!!", "Invalid Mpin");
            }   
    }  
}


function user(){
    var accNo=localStorage.getItem("myAccNo");

    var accName = Data.accountDetails[accNo]["name"];
    document.getElementById("AccName").textContent=`Welcome ${accName} !!!`;

}
function remove(){
    localStorage.removeItem("myAccNo");
    if (document.querySelector("#amt")){
        document.querySelector("#amt").value="";
        document.querySelector("#mpin").value="";
    }
    if(accno = document.querySelector("#accno")){
        document.querySelector("#accno").value="";
        document.querySelector("#acmpin").value="";
    }
}