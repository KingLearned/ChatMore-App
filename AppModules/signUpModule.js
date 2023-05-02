const MYSQL = require("../MODULES/Conn");

class signUpAPI {
    constructor(Sig_Name, Sig_Tele, Sig_Pwd, Sig_CPwd){ this.Sig_Name = Sig_Name, this.Sig_Tele = Sig_Tele, this.Sig_Pwd = Sig_Pwd, this.Sig_CPwd = Sig_CPwd }

    Feedback(){
        const valid = this.Sig_Name.replace(/[^a-zA-Z^0-9]/g, "")
      if(this.Sig_Name == valid){

        if(this.Sig_Pwd !== this.Sig_CPwd){
          return({ErrMsg: 'Password Mismatched!'})
        //   res.json({ErrMsg: 'Password Mismatched!'})
        }else if(this.Sig_Tele.length < 11 || this.Sig_Tele.length > 11){
          return({ErrMsg: 'Invalid Phone Number!'})
        //   res.json({ErrMsg: 'Invalid Phone Number!'})
        }else if(this.Sig_Pwd == this.Sig_CPwd){
          
          const About = `Hello, I'm using ChatMore App`
          const query = 'INSERT INTO `users` (`username`, `telephone`, `pwd`,`about`, `user_img`, `friends`, `chats`) VALUES(?,?,?,?,?,?,?)'
          MYSQL.query(query, [this.Sig_Name,this.Sig_Tele,this.Sig_Pwd,About,'','',''], (err, result) => {
            if(err){
              
              const ErrName = err.sqlMessage == `Duplicate entry '${this.Sig_Name}' for key 'users.PRIMARY'` ? `Duplicate entry '${this.Sig_Name}' for key 'users.PRIMARY'` : `Duplicate entry '${this.Sig_Name}' for key 'PRIMARY'`
              const ErrTele = err.sqlMessage == `Duplicate entry '${this.Sig_Tele}' for key 'users.telephone'` ? `Duplicate entry '${this.Sig_Tele}' for key 'users.telephone'` : `Duplicate entry '${this.Sig_Tele}' for key 'telephone'`

              const Error = err.sqlMessage == ErrName ? res.json({ErrMsg: 'Username Already Exist!'}) :
              err.sqlMessage == ErrTele ? res.json({ErrMsg: 'Number Already Exist!'}) : ''
              
            }else{
              return({Successful: 'Registered Succefully!'})
            //   res.json({Successful: 'Registered Succefully!'})
            }
          })
        }
      }else{
        res.json({ErrMsg: 'use characters [Aa-Zz & 0-9] only!'})
      }
    }
}

module.exports = { signUpAPI }