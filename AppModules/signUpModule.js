const MYSQL = require("../MODULES/Conn");

const signUpAPI = (Sig_Name, Sig_Tele, Sig_Pwd, Sig_CPwd) => {
    const valid = Sig_Name.replace(/[^a-zA-Z^0-9]/g, "")
      if(Sig_Name == valid){

        if(Sig_Pwd !== Sig_CPwd){

        //   res.json({ErrMsg: 'Password Mismatched!'})
            // console.log('Password Mismatched!')
            return {ErrMsg: 'Password Mismatched!'}

        }else if(Sig_Tele.length < 11 || Sig_Tele.length > 11){
        //   res.json({ErrMsg: 'Invalid Phone Number!'})
            return {ErrMsg: 'Invalid Phone Number!'}

        }else if(Sig_Pwd == Sig_CPwd){
          
          const About = `Hello, I'm using ChatMore App`
          const query = 'INSERT INTO `users` (`username`, `telephone`, `pwd`,`about`, `user_img`, `friends`, `chats`) VALUES(?,?,?,?,?,?,?)'
          MYSQL.query(query, [Sig_Name,Sig_Tele,Sig_Pwd,About,'','',''], (err, result) => {
            if(err){
              
              const ErrName = err.sqlMessage == `Duplicate entry '${Sig_Name}' for key 'users.PRIMARY'` ? `Duplicate entry '${Sig_Name}' for key 'users.PRIMARY'` : `Duplicate entry '${Sig_Name}' for key 'PRIMARY'`
              const ErrTele = err.sqlMessage == `Duplicate entry '${Sig_Tele}' for key 'users.telephone'` ? `Duplicate entry '${Sig_Tele}' for key 'users.telephone'` : `Duplicate entry '${Sig_Tele}' for key 'telephone'`

              return  err.sqlMessage == ErrName ? {ErrMsg: 'Username Already Exist!'} :
              err.sqlMessage == ErrTele ? {ErrMsg: 'Number Already Exist!'} : '';
              
            //   return {ErrMsg: 'Number Already Exist!'}

            }else{
              res.json({Successful: 'Registered Succefully!'})
            }
          })
        }
      }else{
        // res.json({ErrMsg: 'use characters [Aa-Zz & 0-9] only!'})
        console.log('use characters [Aa-Zz & 0-9] only!')
      }
}

module.exports = { signUpAPI }