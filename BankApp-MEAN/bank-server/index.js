const express = require('express');
const app= express();
const dataService = require('./data.service');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./db');
const fs = require('fs');
const os = require('os');
const cors = require('cors');

app.use(cors({
        origin:'http://127.0.0.1:8080',
        credentials:true
}));   
app.use(session({
        secret : 'randomText',
        saveUninitialized: true,
        resave:true
}));
app.use(bodyParser.json());

const logMiddleware = (req,res,next) =>{
        
        fs.appendFile('./LogRegister.txt',JSON.stringify(req.body)+os.EOL, (err,data)=>{
                if(err){
                        return console.log("Err",err);
                    }
                    console.log(req.body);
        })
       /*  console.log(req.body); */
        next();
}
app.use(logMiddleware);
   
const authMiddleware = (req,res,next)=>{
        if(!req.session.accno){ //not logged in, authorization failed
                return res.status(401).json({status: 401,"message":"Account Details does not exists. Please login"});
            }
        const accountDetails = dataService.getAccountDetails(req.session);
        if(accountDetails[req.session.accno]) //not registered
        {
                return res.status(401).json({status:401,"message":"Account Details does not exists"});   
        }
        next();
}

app.get('/test',(req,res)=>{
        return db.User.find({})
        .limit(2)
        .skip(1)
        .sort({ name: 1})
        .select('name -_id')
        .then(data => res.json(data))
})

app.get('/', authMiddleware,(req,res)=>{
        return dataService.getAccountDetails().then(result =>{
                return res.status(result.status).json({
                        accno:req.session.accno,
                        mpin:req.session.mpin,
                });
        })
        /* const result = dataService.getAccountDetails();
        return res.status(result.status).json({
                accno:req.session.accno,
                mpin:req.session.mpin,
        }); */
}); 

app.post('/register',(req,res)=>{
        return dataService.register(req.body).then(result=>{
                return res.status(result.status).json(result);
        });
       
});

app.post('/login',(req,res)=>{
        console.log(req.body)
        return dataService.login(req.body).then(result =>{
                if(result.status == 200){
                        req.session.accno = req.body.accno;
                        req.session.mpin = req.body.mpin;
                }
                return res.status(result.status).json(result);
        })
        /* const result = dataService.login(req.body);
        if(result.status == 200){

                req.session.accno = req.body.accno;
                req.session.mpin = req.body.mpin;
        }
        return res.status(result.status).json(result); */
});

app.post('/logout', authMiddleware, (req,res)=>{
        req.session.destroy();
        console.log(req.session)
        return res.status(200).json({message:"Logged Out Successsfully"})
})

app.post('/deposit',authMiddleware, (req,res)=>{
        
        return dataService.deposit(req.session, req.body).then(result =>{
                return res.status(result.status).json(result);
        })
        /* const result = dataService.deposit(req.session, req.body);
        return res.status(result.status).json(result); */
});
app.post('/withdraw',authMiddleware, (req,res)=>{
        return dataService.withdraw(req.session, req.body).then(result =>{
                return res.status(result.status).json(result);
        })
        /* const result = dataService.withdraw(req.session, req.body);
        return res.status(result.status).json(result); */
});
app.get('/balance',authMiddleware, (req,res)=>{
        return dataService.checkBalance(req.session).then(result =>{
                return res.status(result.status).json(result);
        })
        /* const result = dataService.checkBalance(req.session);
        return res.status(result.status).json(result); */
});
app.get('/history',authMiddleware, (req,res)=>{
        return dataService.getHistory(req.session).then(result =>{
                return res.status(result.status).json(result);
        })
        /* const result = dataService.getHistory(req.session);
        return res.status(result.status).json(result); */
});
app.put('/edit-history/:id',authMiddleware, (req,res)=>{
        return dataService.editHistory(req.params.id, req.session, req.body).then(result =>{
                return res.status(result.status).json(result);
        })
        /* const result = dataService.editHistory(req.params.id, req.session, req.body);
        return res.status(result.status).json(result); */
});

app.get('/profile',authMiddleware, (req,res)=>{
        return dataService.getProfile(req.session).then(result =>{
                return res.status(result.status).json(result);
        })
        /* const result = dataService.getProfile(req.session);
        return res.status(result.status).json(result); */
});
app.put('/profile',authMiddleware, (req,res)=>{
        return dataService.editProfile(req.session, req.body).then(result =>{
                return res.status(result.status).json(result);
        })
        /* const result = dataService.editProfile(req.session, req.body);
        return res.status(result.status).json(result);*/
}); 

app.delete('/history/:id',authMiddleware, (req,res)=>{
        return dataService.deleteHistory(req.params.id, req.session)
        .then(result =>{
                return res.status(result.status).json(result);
        })
        /* const result = dataService.editHistory(req.params.id, req.session, req.body);
        return res.status(result.status).json(result); */
});

app.listen(8000,()=>console.log("App Started"))