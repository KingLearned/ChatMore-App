//INITIALIZING OUR SERVERs

const express = require('express')
const app = express()
const FS = require('fs')
const PATH = require('path')
const bodyparser = require('body-parser') // FOR CAPTURING OF INPUT FROM FRONT END
const CORS = require('cors')
const JOI = require('joi') // FOR VALIDATION OF LOGIN || FORMS
const MD5 = require('md5')
const session = require('express-session')
const UUID = require('uuid')
const MULTER = require('multer')
const PORT = process.env.PORT || 1000 // FOR HOSTING OF SERVER
const authenticated = require('speakeasy')
const MAILER = require('nodemailer')
const TWILIO = require('twilio')
const dotenv = require('dotenv')
const socket = require('socket.io')

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server); 
dotenv.config()
// // ###################### Serving Static Files ###########################
app.use(express.static(PATH.join(__dirname, './Public')))
// app.use(express.static(PATH.join(__dirname, '/Public')))
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())

const MYSQL = require('./MODULES/Conn')
const HomePage = require('./MODULES/Home')
const ChatApp = require('./MODULES/ChatApp')

const expDate = 1000 * 60 * 60 * 24 * 7 //It will Last for Days
app.use(session({
  name: "ChatMore-Session-App",
  secret: UUID.v4(),
  resave: false,
  saveUninitialized: process.env.NODE_ENV === "production",
  cookie: {
      httpOnly: process.env.NODE_ENV === "production" ? false : true,
      maxAge: expDate, 
      secure: false,
      sameSite: true //'strict'
  }
}))

app.get('/Log-User-Out', (req, res) =>{
  // destroy session && Clear cookies
  req.session.destroy((err) => {
      if(err){
          return res.redirect('/')
      }else{
          console.log('User Logged Out Successfully')
          res.clearCookie("ChatMore-Session-App")
          return res.redirect('/')
      }
  })
})
const Emoji = ['😎', '😡', '😊','😍', '😅', '😁', '💓','💔', '😒', '😜','☕', '🏃']
const EmojiId =   ['<!cool','<!vex','<!smile','<!love','<!lol','<!laf','<!hrt','<!brhrt','<!nag','<!tong','<!tea','<!run']

app.get('/', (req, res) => {
  const {LOGIN} = req.session
  // const LOGIN = 'reformer'
  if(LOGIN == undefined){
    res.send(HomePage)
  }else{
    // res.send(ChatApp)
    res.sendFile(PATH.join(__dirname, './Public/html/app.html'))
  }
})

app.post('/', (req, res) => {
  
  const {LOGIN} = req.session
  // const LOGIN = 'reformer'
  const {Log_Name} = req.body
  const {Log_Pwd} = req.body

  const {Sig_Name} = req.body
  const {Sig_Tele} = req.body
  const {Sig_Pwd} = req.body
  const {Sig_CPwd} = req.body

  /************  CHAT COLLECTION   ***********/
  const {AddFriend} = req.body
  
  const {MsgTo} = req.body
  const {ChatMsg} = req.body
  const {ElementTag} = req.body

  const {EditId} = req.body
  const {EditMsg} = req.body

  const {DelMsg} = req.body

  const UserAbout = req.body.about
  // const {UserAbout} = req.body.updatepwd
  const {UpdatePWD} = req.body

   /************  GROUP COLLECTION   ***********/
  const {GrpMsg} = req.body
  const {GrpID} = req.body
  const {CRTGID} = req.session //Current Group ID
  // const {GCRT} = req.session //Current Group Name
  // req.session.GCRT = gcrt
  // const {gcrt} = req.body
  // const {GCRT} = req.session
  let Revole = 'GrpID'

  
  
  
  
  
  if(LOGIN){
    const Storage = MULTER.diskStorage({
      destination: `./Public/ChatMore/Users/${LOGIN}`,
      filename(req, file, cb){
        cb(null, file.originalname)
      }
    })

    setTimeout(() => {
      const query = "SELECT * FROM `users` WHERE `username`=?"
      MYSQL.query(query, [LOGIN], (err, Delete) => {
        FS.readdir(`./Public/ChatMore/Users/${LOGIN}`, 'utf8',(err, content) =>{
          for (let i = 0; i < content.length; i++) {
            if(content[i] !== Delete[0].user_img){
              FS.unlink(`./Public/ChatMore/Users/${LOGIN}/${content[i]}`, (err) => {})
            }
          }
        })
      })
    }, 3000);

    const upload = MULTER({
        storage: Storage
    }).single('User_Img')

    upload(req,res, (err) => {
      
      if(req.file){
          console.log(req.file.originalname)
          const query = "UPDATE `users` SET `user_img`=? WHERE `username`=?"
          MYSQL.query(query, [req.file.originalname,LOGIN], (err, SubResult) => {
              res.redirect('/')
          })
      }else{
        if(AddFriend){
          const query = "SELECT * FROM `users` WHERE `username`=?"
          MYSQL.query(query, [LOGIN], (err, MainResult) => {
            const query = "UPDATE `users` SET `friends`=? WHERE `username`=?"
            MYSQL.query(query, [MainResult[0].friends+`,${AddFriend}`,LOGIN], (err, SubResult) => {
              res.redirect('/')
            })
          })
          const query1 = "SELECT * FROM `users` WHERE `username`=?"
          MYSQL.query(query1, [AddFriend], (err, MainResult) => {
            const query = "UPDATE `users` SET `friends`=? WHERE `username`=?"
            const Add = MainResult[0].friends == '' ? `${LOGIN}` : MainResult[0].friends+`,${LOGIN}`
            MYSQL.query(query, [Add,AddFriend], (err, SubResult) => {})
          })
        }else if(ChatMsg && MsgTo){
          /*************** SENDING OT USERS CHAT *****************/
          const Id = new Date().getTime()
          const M = (new Date).getMinutes() < 10 ? '0'+(new Date).getMinutes() : (new Date).getMinutes()
          const H = (new Date).getHours() < 10 ? '0'+(new Date).getHours() : (new Date).getHours()
          let LogMsg =  ChatMsg
          for (let i = 0; i < LogMsg.length; i++) {
            for (let n = 0; n < Emoji.length; n++) {
              LogMsg = LogMsg.split(Emoji[n]).join(EmojiId[n])
            }
            // con = con.split(EmojiId[i]).join(Emoji[i])
          }
          console.log(LogMsg)
          const query1 = "SELECT * FROM `users` WHERE `username`=?"
          MYSQL.query(query1, [LOGIN],(err, Checker) => {
            const Chats = Checker[0].chats == '' ? `{"replyto":"${MsgTo}", "from":"${LOGIN}", "Id":${Id}, "Msg":"${LogMsg}", "time":"${H}:${M}"}`:
            `,{"replyto":"${MsgTo}", "from":"${LOGIN}", "Id":${Id}, "Msg":"${LogMsg}", "time":"${H}:${M}"}`

            const query1 = "UPDATE `users` SET `chats`=? WHERE `username`=?"
            MYSQL.query(query1, [Checker[0].chats+Chats,LOGIN],(err, result) => {})
            res.json({SndMsg:{Id:Id, MsgTo:MsgTo, Msg:ChatMsg, EleDiv:ElementTag,  from:LOGIN, time:`${H}:${M}`}})
          })
        }else if(EditId,EditMsg){
          /*************** EDITING OT USERS CHAT *****************/
          const query1 = "SELECT * FROM `users` WHERE `username`=?"
          MYSQL.query(query1, [LOGIN],(err, result) => {
            var ChatEdit = JSON.parse(`[${result[0].chats}]`)
            for (let i = 0; i < ChatEdit.length; i++) {
              if(ChatEdit[i].Id == EditId){
                ChatEdit[i].Msg = EditMsg
              }
            }
            ChatEdit = JSON.stringify(ChatEdit)
            ChatEdit = ChatEdit.split('[').join('')
            ChatEdit = ChatEdit.split(']').join('')
            const query1 = "UPDATE `users` SET `chats`=? WHERE `username`=?"
            MYSQL.query(query1, [ChatEdit,LOGIN],(err, result) => {})
          })
          res.json({SndMsg:{Id:'Edit', MsgId:EditId, Msg:EditMsg, EleDiv:ElementTag}})
        }else if(DelMsg){
          /*************** DELETING OT USERS CHAT *****************/
          res.json({SndMsg:{Id:'Del', Msg:DelMsg, EleDiv:ElementTag}})
          const query1 = "SELECT * FROM `users` WHERE `username`=?"
          MYSQL.query(query1, [LOGIN],(err, result) => {
            var Del = JSON.parse(`[${result[0].chats}]`)
            for (let n = 0; n < Del.length; n++) {
              if((Del[n].Id == DelMsg)){
                function Rem(comm,Add){
                  var index = comm.indexOf(Add)
                  if(index > -1){
                    comm.splice(index,1)
                  }
                  return comm
                }Rem(Del,Del[n])
              }
            }
            Del = JSON.stringify(Del)
            Del = Del.split('[').join('')
            Del = Del.split(']').join('')
            const query1 = "UPDATE `users` SET `chats`=? WHERE `username`=?"
            MYSQL.query(query1, [Del,LOGIN],(err, result) => {})
          })
        }else if(UserAbout){
        /********************************* UPDATING OF USERS ABOUT  ********************************/
          const query = "UPDATE `users` SET `about`=? WHERE `username`=?"
          MYSQL.query(query, [UserAbout,LOGIN], (err, SubResult) => {
            res.redirect('/')
          })
        }else if(UpdatePWD){
        /********************************* UPDATING OF USERS PASSWORD  ********************************/
        console.log(UpdatePWD)
          // const query = "UPDATE `users` SET `pwd`=? WHERE `username`=?"
          // MYSQL.query(query, [UpdatePWD,LOGIN], (err, SubResult) => {
          //   res.redirect('/')
          // })
        }else if (GrpMsg){
        /********************************* GROUP MESSAGING HANDLER  ********************************/
        /********************************* GROUP MESSAGING HANDLER  ********************************/
          // console.log(GrpID)
          req.session.CRTGID = GrpID
          // Revole = 'ID'
          // console.log(GrpID, GrpMsg)
          const Id = new Date().getTime()

          const {CRTGID} = req.session
          
          const query = "SELECT * FROM `chatmoregroups` WHERE `groupid`=?"
          MYSQL.query(query, GrpID, (err, Main) => {
            var Chats = `,{"sento":"${Main[0].groupid}", "Id":${Id}, "from":"${LOGIN}", "Msg":"${GrpMsg}"}`
            if(Main[0].chatlogs == ''){
              Chats = `{"sento":"${Main[0].groupid}", "Id":${Id}, "from":"${LOGIN}", "Msg":"${GrpMsg}"}`
            }

            const query = "UPDATE `chatmoregroups` SET `chatlogs`=? WHERE `groupid`=?"// New Function
            MYSQL.query(query, [Main[0].chatlogs+Chats,GrpID], (err, Result) => {
              res.json({Resd:'/'})
            })

          })


        }else if(Revole){
          /*************** UPDATING MODULE FOR CHAT FRIENDS *****************/
          const query1 = "SELECT * FROM `users`"
          MYSQL.query(query1, (err, RunUpdate) => {
              const add = []
              for (let i = 0; i < RunUpdate.length; i++) {
                add.push(RunUpdate[i].username)
              }
              const query1 = "SELECT * FROM `users` WHERE `username`=?"
              MYSQL.query(query1, [LOGIN],(err, friend) => {
                const Friends = friend[0].friends.split(',')
                const UpdateFrd = []
                for (let i = 0; i < add.length; i++) {
                  for (let n = 0; n < Friends.length; n++) {
                      if(Friends[n] == add[i]){
                        UpdateFrd.push(Friends[n])
                      }
                  }
                }
                const query1 = "UPDATE `users` SET `friends`=? WHERE `username`=?"
                MYSQL.query(query1, [UpdateFrd.toLocaleString(),LOGIN],(err, result) => {})
              })
          })
          /*****************************************************************/
            
            setTimeout(() => {
              const query = "SELECT * FROM `users` WHERE `username`=?"
              MYSQL.query(query, [LOGIN], (err, ForFriends) => {
                const query = "SELECT * FROM `users`"
                MYSQL.query(query, (err, MainResult) => {
                  var Friends = ''
                  if(ForFriends[0].friends){
                    Friends = ForFriends[0].friends.split(',')
                  }
                  var ChatLog = ``
                  for (let i = 0; i < MainResult.length; i++) {
                    ChatLog += MainResult[i].chats
                  }
                  ChatLog = (JSON.parse(`[${ChatLog.split('}{').join('},{')}]`)).sort((a, b) => a.Id - b.Id)
                  for (let m = 0; m < ChatLog.length; m++) {
                    for (let n = 0; n < Emoji.length; n++) {
                      ChatLog[m].Msg = ChatLog[m].Msg.split(EmojiId[n]).join(Emoji[n])
                    }
                  }
                  //GETTING CHATS OF SENT TO THE DIFFERENT GROUPS
                  const query = "SELECT * FROM `chatmoregroups`"
                  MYSQL.query(query, (err, Group) => {
                      var Col = ''
                      for (let i = 0; i < Group.length; i++) {
                        Col += Group[i].chatlogs
                      }
                    const GRPLogs = (JSON.parse(`[${Col.split('}{').join('},{')}]`))

                    const {CRTGID} = req.session //Current Group ID

                    res.json({PN: LOGIN,
                      USER:ForFriends, SORT:MainResult, CHATS:ChatLog, FRD:Friends,
                      GRP:Group, GRPLog:GRPLogs, CRTGID:CRTGID,
                    })
                    // res.json({PN: LOGIN, CRT:CHECKER, GCRT:GCRT, GNCRT:GNCRT, GRP:Group, GRPLog:GRPLogs, USER:ForFriends, SORT:MainResult, CHATS:ChatLog, FRD: Friends})
                  })
                })
              })  
            },500)
        }

      }

    })

  }else{
/********************************* LOGIN HANDLER  ********************************/
/********************************* LOGIN HANDLER  ********************************/
    if(Log_Name,Log_Pwd){
      const query = "SELECT * FROM `users` WHERE username=?"
      MYSQL.query(query, [Log_Name], (err, Result) => {
        
        const Auth = Result.length > 0 ? 
        Result[0].pwd == Log_Pwd ? (req.session.LOGIN = Log_Name, res.json({Approved: 'Yes'})) : res.json({msg: 'Mismatched Password or Username!'}) : 
        res.json({msg:'User Dose Not Exist!'})

      })
/********************************* SIGN UP HANDLER  ********************************/
/********************************* SIGN UP HANDLER  ********************************/
    }else if(Sig_Name,Sig_Tele,Sig_Pwd,Sig_CPwd){
      const valid = Sig_Name.replace(/[^a-zA-Z^0-9]/g, "")
      if(Sig_Name == valid){

        if(Sig_Pwd !== Sig_CPwd){
          res.json({ErrMsg: 'Password Mismatched!'})
        }else if(Sig_Pwd == Sig_CPwd){
          
          const About = `Hello, I'm using ChatMore App`
          const query = 'INSERT INTO `users` (`username`, `telephone`, `pwd`,`about`, `user_img`, `friends`, `chats`) VALUES(?,?,?,?,?,?,?)'
          MYSQL.query(query, [Sig_Name.toLocaleLowerCase(),Sig_Tele,Sig_Pwd,About,'','',''], (err, result) => {
            if(err){
              // `Duplicate entry '${Sig_Name}' for key 'users.username'`
              // `Duplicate entry '${Sig_Tele}' for key 'users.telephone'`
              if(err.sqlMessage == (`Duplicate entry '${Sig_Name}' for key 'user.username'`)){
                res.json({ErrMsg: 'Username Already Exist!'})
                // console.log('Username Already Exist')
              }else if(err.sqlMessage == `Duplicate entry '${Sig_Tele}' for key 'users.telephone'`){
                res.json({ErrMsg: 'Number Already Exist!'})
                // console.log('Number Already Exist')
              }
            }else{
              res.json({Successful: 'Registered Succefully!'})
            }
          })
        }
      }else{
        res.json({msg: 'use characters [Aa-Zz & 0-9] only!'})
      }
    }
  } 

})

io.on('connection', (socket) => {
  if('connection'){
    // console.log('Yes')
  }
  socket.on('chat message', Msg => {
    io.emit('chat message', Msg)
    // console.log(Msg)
  })

})

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
})