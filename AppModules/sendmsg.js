const MYSQL = require("../MODULES/Conn");
const { Emoji, EmojiId } = require("./Emojis");




class SendMsgAPI {
    constructor(LOGIN, ChatMsg, MsgTo, ElementTag){ this.LOGIN = LOGIN, this.ChatMsg = ChatMsg, this.MsgTo = MsgTo, this.ElementTag = ElementTag }

    ExP2P(){
        const Id = new Date().getTime()
        const M = (new Date).getMinutes() < 10 ? '0'+(new Date).getMinutes() : (new Date).getMinutes()
        const H = (new Date).getHours() < 10 ? '0'+(new Date).getHours() : (new Date).getHours()

        let LogMsg =  this.ChatMsg
        for (let n = 0; n < Emoji.length; n++) { LogMsg = LogMsg.split(Emoji[n]).join(EmojiId[n]) }// Reading The Message to encode the Emojis
        
        LogMsg = LogMsg.split('<').join('&lt;')
        const query1 = "SELECT * FROM `users` WHERE `username`=?"
        MYSQL.query(query1, [this.LOGIN],(err, Checker) => {
            const Chats = Checker[0].chats == '' ? 
            `{"replyto":"${this.MsgTo}", "from":"${this.LOGIN}", "Id":${Id}, "Msg":"${LogMsg}", "time":"${H}:${M}"}`:
            `,{"replyto":"${this.MsgTo}", "from":"${this.LOGIN}", "Id":${Id}, "Msg":"${LogMsg}", "time":"${H}:${M}"}`

            const query1 = "UPDATE `users` SET `chats`=? WHERE `username`=?"
            MYSQL.query(query1, [Checker[0].chats+Chats,this.LOGIN],(err, result) => {})
        })
    }

    MainMsg(){
        this.ExP2P()
        const Id = new Date().getTime()
        const M = (new Date).getMinutes() < 10 ? '0'+(new Date).getMinutes() : (new Date).getMinutes()
        const H = (new Date).getHours() < 10 ? '0'+(new Date).getHours() : (new Date).getHours()
        
        const ExpChat = {replyto:this.MsgTo, from:this.LOGIN, Id:Id, Msg:this.ChatMsg, time:H+':'+M}
        return {SndMsg:{Id:Id, replyto:this.MsgTo, chat:'Frd', Msg:this.ChatMsg, EleDiv:this.ElementTag,  from:this.LOGIN, time:`${H}:${M}`}, expUserChats:ExpChat}
    }
}

module.exports = { SendMsgAPI }