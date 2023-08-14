//INITIALIZING OUR SERVERs
const express = require('express')
const app = express()
const PATH = require('path')
const bodyparser = require('body-parser')
const session = require('express-session')
const UUID = require('uuid')
const MULTER = require('multer')
const PORT = process.env.PORT || 1000
const dotenv = require('dotenv')
const FS = require('fs')
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server); 
const appwriteSDK = require('node-appwrite')

dotenv.config()

const apiKey = '0074d8a2662e7782495369b57eb4de049c4fee6eb6bcf5197b5a276a7123540252e293c317724b370785f9056d0faef3580d0048a5616d9c9cf7bcc29127f6ace652aa45f14cd340213c072a0150cd41039d4680282ad31a6b5b6f7a6fb40deb653f9c976b3df6f4d77906f442ced14564dbef114e9358a3ca0eff7ac11658d6'

const client = new appwriteSDK.Client()
const appwriteStorage = new appwriteSDK.Storage(client)
client.setEndpoint('https://cloud.appwrite.io/v1').setProject('64c7e9ee17c84cabe3cd').setKey(apiKey)

// // ###################### Serving Static Files ###########################
app.use(express.static(PATH.join(__dirname, './Public')))
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())

const MYSQL = require('./MODULES/Conn')
const HomePage = require('./MODULES/Home')
const ChatApp = require('./MODULES/ChatApp')
const { SendMsgAPI } = require('./AppModules/sendmsg')
const { Emoji, EmojiId } = require('./AppModules/Emojis')

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
          res.clearCookie("ChatMore-Session-App")
          return res.redirect('/')
      }
  })
})



const Storage = MULTER.memoryStorage()
const upload = MULTER({ storage: Storage })

app.get('/', (req, res) => {

  const LOGIN = 'eliz'
  // const {LOGIN} = req.session
  
  if(LOGIN){
    res.sendFile(PATH.join(__dirname, './Public/html/app.html'))
  }else{
    res.sendFile(PATH.join(__dirname, './Public/html/home.html'))
  }
})

app.post('/', upload.single('User_Img'), (req, res) => {

  const LOGIN = 'eliz'
  // const {LOGIN} = req.session

  const {Log_Name, Log_Pwd } = req.body //Login inputs

  const { Sig_Name, Sig_Tele, Sig_Pwd, Sig_CPwd } = req.body //Sign up inputs

  /************  CHAT COLLECTION   ***********/
  const {AddFriend} = req.body
  
  const { MsgTo, ChatMsg, ElementTag, EditId, EditMsg, DelMsg } = req.body //destructuring of the variables coming from the req.body

  const UserAbout = req.body.about
  const { newPWD, CnewPWD } = req.body

   /************  GROUP COLLECTION   ***********/
  const { GrpMsg, GrpID } = req.body

  let Revole = 'GrpID'
  
  if(LOGIN){ // IMPLEMENT THIS, IF THE USER LOGS IN
    if(req.file){
      const Img = Math.floor(new Date().getTime()/new Date().getFullYear())+req.file.originalname
      const ID = Img.replace(/[^a-z^A-Z^0-9]/g, '').slice(0,20)
      
      const query = "SELECT * FROM `users` WHERE `username`=?" //DELETING OF USER'S PREVIOUS IMAGE
      MYSQL.query(query, [LOGIN], (err, Result) => { if(Result[0].user_img !== ''){ appwriteStorage.deleteFile('Chatmoreupload', Result[0].user_img) } })

      const promise = appwriteStorage.createFile('Chatmoreupload', ID, appwriteSDK.InputFile.fromBuffer(req.file.buffer, req.file.originalname))
      
      promise.then(function (response) {
        const query = "UPDATE `users` SET `user_img`=? WHERE `username`=?"
        MYSQL.query(query, [response.$id, LOGIN], (err, SubResult) => { res.redirect('/') })

      }, function (error) {
        console.log(error)
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
        const ExpMsg = new SendMsgAPI(LOGIN,ChatMsg,MsgTo,ElementTag) 
        res.json(ExpMsg.MainMsg())

      }else if(EditId,EditMsg){
      /*************** EDITING OT USERS CHAT *****************/
        const query1 = "SELECT * FROM `users` WHERE `username`=?"
        MYSQL.query(query1, [LOGIN],(err, result) => {
          let ChatEdit = JSON.parse(`[${result[0].chats}]`)
          for (let i = 0; i < ChatEdit.length; i++) {
            if(ChatEdit[i].Id == EditId){ ChatEdit[i].Msg = EditMsg }
          }
          ChatEdit = JSON.stringify(ChatEdit)
          ChatEdit = ChatEdit.split('[').join('')
          ChatEdit = ChatEdit.split(']').join('')
          for (let n = 0; n < Emoji.length; n++) {
            ChatEdit = ChatEdit.split(Emoji[n]).join(EmojiId[n])
          }
          ChatEdit = ChatEdit.split('<').join('&lt;')
          const query1 = "UPDATE `users` SET `chats`=? WHERE `username`=?"
          MYSQL.query(query1, [ChatEdit,LOGIN],(err, result) => {})
        })
        res.json({SndMsg:{Id:'Edit', MsgId:EditId, Msg:EditMsg, EleDiv:ElementTag}})

      }else if(DelMsg){
      /*************** DELETING OT USERS CHAT *****************/
        res.json({SndMsg:{Id:'Del', Msg:DelMsg, EleDiv:ElementTag}, DelID:{DelMsg}})
        const query1 = "SELECT * FROM `users` WHERE `username`=?"
        MYSQL.query(query1, [LOGIN],(err, result) => {
          let Del = JSON.parse(`[${result[0].chats}]`)
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
      }else if(newPWD, CnewPWD){
      /********************************* UPDATING OF USERS PASSWORD  ********************************/
      const query = "UPDATE `users` SET `pwd`=? WHERE `username`=?"
      const checkPWD = newPWD === CnewPWD ? (
        MYSQL.query(query, [newPWD,LOGIN], (err, SubResult) => {}),
        res.json({validPwd:'<span style="color:green;">Password was changed successfully</span>'}) ): 
        res.json({errPwd:'<span style="color:red;">Password mismatched, try again!</span>'})

          
      }else if (GrpMsg){
      /********************************* GROUP MESSAGING HANDLER  ********************************/
      /********************************* GROUP MESSAGING HANDLER  ********************************/

        const Id = new Date().getTime()
        const M = (new Date).getMinutes() < 10 ? '0'+(new Date).getMinutes() : (new Date).getMinutes()
        const H = (new Date).getHours() < 10 ? '0'+(new Date).getHours() : (new Date).getHours()

        const query = "SELECT * FROM `chatmoregroups` WHERE `groupid`=?"
        MYSQL.query(query, GrpID, (err, Main) => {
          let GrpLog =  GrpMsg
          for (let n = 0; n < Emoji.length; n++) {
            GrpLog = GrpLog.split(Emoji[n]).join(EmojiId[n]) // Reading The Message to encode the Emojis
          }
          GrpLog = GrpLog.split('<').join('&lt;')

          const Chats = Main[0].chatlogs == '' ? `{"sento":"${Main[0].groupid}", "Id":${Id}, "from":"${LOGIN}", "Msg":"${GrpLog}", "time":"${H}:${M}"}`:
                `,{"sento":"${Main[0].groupid}", "Id":${Id}, "from":"${LOGIN}", "Msg":"${GrpLog}", "time":"${H}:${M}"}`

          const query = "UPDATE `chatmoregroups` SET `chatlogs`=? WHERE `groupid`=?"// New Function
          MYSQL.query(query, [Main[0].chatlogs+Chats,GrpID], (err, Result) => {})
          res.json({SndMsg:{Id:'Grp', InId:Id, MsgTo:GrpID, Msg:GrpMsg, EleDiv:ElementTag,  from:LOGIN, time:`${H}:${M}`},Exp:LOGIN})
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

                  let ChatLog = ''
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
                    for (let m = 0; m < GRPLogs.length; m++) {
                      for (let n = 0; n < Emoji.length; n++) {
                        GRPLogs[m].Msg = GRPLogs[m].Msg.split(EmojiId[n]).join(Emoji[n])
                      }
                    }

                    res.json({PN: LOGIN,
                      USER:ForFriends, SORT:MainResult, CHATS:ChatLog, FRD:Friends,
                      GRP:Group, GRPLog:GRPLogs
                    })
                  })
                  /***********    Ended Here  *********/
                })
              })  
            },500)
      }
    }

  }else{ /********************************* LOGIN HANDLER  ********************************/
    if(Log_Name,Log_Pwd) {
      const query = "SELECT * FROM `users` WHERE username=?"
      MYSQL.query(query, [Log_Name.toLocaleLowerCase()], (err, Result) => {

        const Auth = Result.length > 0 ? 
        Result[0].pwd == Log_Pwd ? (req.session.LOGIN = Log_Name.toLocaleLowerCase(), res.json({Approved: 'Yes'})) : res.json({msg: 'Mismatched Password or Username!'}) : 
        res.json({msg:'User Dose Not Exist!'})

      })

    }else if(Sig_Name, Sig_Tele, Sig_Pwd, Sig_CPwd) {/********************************* SIGN UP HANDLER  ********************************/
      const valid = Sig_Name.replace(/[^a-zA-Z^0-9]/g, "")
      if(Sig_Name == valid){

        if(Sig_Pwd !== Sig_CPwd){
          res.json({ErrMsg: 'Password Mismatched!'})
        }else if(Sig_Tele.length < 11 || Sig_Tele.length > 11){
          res.json({ErrMsg: 'Invalid Phone Number!'})
        }else if(Sig_Pwd == Sig_CPwd){
          
          const About = `Hello, I'm using ChatMore App`
          const query = 'INSERT INTO `users` (`username`, `telephone`, `pwd`,`about`, `user_img`, `friends`, `chats`) VALUES(?,?,?,?,?,?,?)'
          MYSQL.query(query, [Sig_Name,Sig_Tele,Sig_Pwd,About,'','',''], (err, result) => {
            if(err){
              
              const ErrName = err.sqlMessage == `Duplicate entry '${Sig_Name}' for key 'users.PRIMARY'` ? `Duplicate entry '${Sig_Name}' for key 'users.PRIMARY'` : `Duplicate entry '${Sig_Name}' for key 'PRIMARY'`
              const ErrTele = err.sqlMessage == `Duplicate entry '${Sig_Tele}' for key 'users.telephone'` ? `Duplicate entry '${Sig_Tele}' for key 'users.telephone'` : `Duplicate entry '${Sig_Tele}' for key 'telephone'`

              const Error = err.sqlMessage == ErrName ? res.json({ErrMsg: 'Username Already Exist!'}) :
              err.sqlMessage == ErrTele ? res.json({ErrMsg: 'Number Already Exist!'}) : ''
              
            }else{
              res.json({Successful: 'Registered Succefully!'})
            }
          })
        }
      }else{
        res.json({ErrMsg: 'use characters [Aa-Zz & 0-9] only!'})
      }

    }

  } 

})

io.on('connection', (socket) => {
  
  socket.on('chat message', (Msg,Exp) => {
    io.emit('chat message', Msg,Exp)
  })

})

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
})