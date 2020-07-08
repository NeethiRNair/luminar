const db = require('./db');


const register=(data) =>{
    /* if(accountDetails[data.accno]){
        return {status: 422,"message":"Account already exists.Please login"};
    } */
    return db.User.findOne({
        accno: data.accno
    }).then(u=>{
        if(u){
            return {status: 422,"message":"Account already exists. Please login"};
        }
        const user = new db.User({
            accno: data.accno,
            name: data.fName,
            mpin: data.mpin,
            balance:0,
            history:[]
    
        });
        user.save();
        return { status:200, "message":"Account registered successfully"};
    });

    
    /* accountDetails[data.accno] = {
        name: data.fName,
        mpin: data.mpin,
        balance:0,
        history:[]
    } */
    
}


const login=(data)=>{
    return db.User.findOne({
        accno: data.accno
    }).then(u=>{
        if(!u){
            return {status: 422,"message":"Account Details does not exists. Please login"};
        }
        else if(u.mpin != data.mpin){
            return{status:422,"message":"Invalid Credentials"}   
        }
        
        return {status:200, "message" : "Login Successful"} ; 

    });
    /* if(!accountDetails[data.accno]){
        return {status: 422,"message":"Account Details does not exists"};
    }
    if(accountDetails[data.accno].mpin != data.mpin) 
    {
        
        return{status:422,"message":"Invalid Credentials"}   
    }
    return {status:200, "message" : "Login Successful"} ;  */
    
}

const deposit= (session, body)=>{
    return db.User.findOne({
        accno: session.accno
    }).then(u=>{
        if(!u){
            return {status: 422,"message":"Account Details does not exists. Please login"};
        }
        else if(u.mpin != body.mpin){
            return{status:422,"message":"Invalid Credentials"}   
        }
        
        u.balance += parseFloat(body.amount);
    
        u.history.push({id: Math.floor(Math.random()*10000), amount: parseFloat(body.amount), typeOfAction: 'credit', date : new Date()});
        u.save();
        return {status: 200 ,"message":"Amount credited successfully"};
    })
    /* if(accountDetails[session.accno].mpin != body.mpin) 
    {
        return{status:422,"message":"Invalid Credentials"}   
    }
    accountDetails[session.accno].balance += parseFloat(body.amount); 
    accountDetails[session.accno].history.push({id: Math.floor(Math.random()*10000), amount: body.amount, type: 'credit', date : new Date()});
    return {status: 200 ,"message":"Amount credited successfully"};
  */
}

const withdraw= (session, body)=>{
    return db.User.findOne({
        accno: session.accno
    }).then(u=>{
        if(!u){
            return {status: 422,"message":"Account Details does not exists. Please login"};
        }
        if(u.mpin != body.mpin){
            return{status:422,"message":"Invalid Credentials"}   
        }
        else if(u.balance <= body.amount){
            return {status:422,"message":"Insufficient balance"}
        }
        
        u.balance -= parseFloat(body.amount);
        
        u.history.push({id: Math.floor(Math.random()*10000), amount: parseFloat(body.amount), typeOfAction: 'debit', date : new Date()});
        u.save();
        return {status: 200 ,"message":"Amount debited successfully", 'data':u.balance};
    });

    /* if(accountDetails[session.accno].mpin != body.mpin ){
        return {status:422,"message":"Invalid Credentials"}   
    }
    if(accountDetails[session.accno].balance <= body.amount){
        return {status:422,"message":"Insufficient balance"}
    }
    accountDetails[session.accno].balance -=parseFloat(body.amount);
    accountDetails[session.accno].history.push({id: Math.floor(Math.random()*10000), amount: body.amount, type: 'debit', date : new Date()});
    return {status: 200 ,"message":"Amount debited successfully"};  */
}

const checkBalance = (session)=>{
    
    return db.User.findOne({
        accno: session.accno
    }).then(u=>{
        if(!u){
            return {status: 422,"message":"Account Details does not exists. Please Login"};
        }
        return { status: 200, "balance" : u.balance }
    });
}

const getHistory = (session) =>{
    return db.User.findOne({
        accno: session.accno
    }).then(u=>{
        if(!u){
            return {status: 422,"message":"Account Details does not exists. Please Login"};
        }
        return {status:200, history:u.history}
    })
    /* return {status:200, history:accountDetails[session.accno].history} */
}

const editHistory = (id, session, body) => {
    return db.User.findOne({
        accno: session.accno
    }).then(u=>{
        
        const history = u.history.find(history => history._id == id);
        history.amount=body.amount;
        history.typeOfAction=body.typeOfAction;
        history.date=body.date;
        u.save();
        return {status:200, "message":"History edit successfully"};
    });
    /* const history = accountDetails[session.accno].history.find(h => h.id == id);
    history.amount=body.amount;
    history.type=body.type;
    history.date=body.date;
    return {status:200, "message":"History edit successfully"}; */
}

const deleteHistory = (id, session) => {
    return db.User.findOne({
        accno: session.accno
    }).then(u=>{
       
        u.history = u.history.filter(history => history._id != id);
        u.save();
        return {status:200, "message":"History deleted successfully"};
    });
}

const getAccountDetails=()=>{
    return db.User.find({}).then(u=>{
        return {status: 200, "data" :u};
    });
}

const getProfile = (session) =>{
    return db.User.findOne({
        accno: session.accno
    }).then(u=>{
        if(!u){
            return {status: 422,"message":"Account Details does not exists. Please Login"};
        }
        const name = u.name;
        const balance = u.balance;
        u.save();
        return {status:200,"name": name, "mpin":u.mpin, "balance":balance };
    });
    /* const name = accountDetails[session.accno].name;
    const balance = accountDetails[session.accno].balance;
    return {status:200,"Name": name, "Balance":balance }; */

}
const editProfile = (session, body) =>{
    return db.User.updateOne({
        accno: session.accno
    },{
        mpin:body.mpin,
        name:body.name
    }).then(u=>{
        /* if(!u){
            return {status: 422,"message":"Account Details does not exists. Please Login"};
        }
        u.name=body.name;
        u.mpin=body.mpin;
        console.log(u.name); */
        return {status:200, "message":"Profile edited successfully"};
    });
    /* const newName=body.name
    const newMpin = body.mpin;
    accountDetails[session.accno].name = newName;
    accountDetails[session.accno].mpin = newMpin;
    return {status:200, "message":"Profile edited successfully", "Name": accountDetails[session.accno].name,"mpin":accountDetails[session.accno].mpin} */

}
module.exports={
    register,
    getAccountDetails,
    login,
    deposit,
    withdraw,
    checkBalance,
    getHistory,
    editHistory,
    getProfile,
    editProfile,
    deleteHistory
}