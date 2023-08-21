const showChats = (ChatLogs, FRD, SORT, userName, MainChats) => {
    for (let i = 0; i < FRD.length; i++) {
        $(`.chat_${FRD[i]}`).on('click', () => {
            document.querySelector('chatlog').style.display = 'flex' //Display Chat With a Friend
            document.querySelector('friendlist').style.display = 'none'//Hide Friends List
            $('.chats_head').hide()

            let FriendImg = `../images/avatar.png`
            //Generate FriendsImg & About 
            for (let p = 0; p < SORT.length; p++) { FRD[i] == SORT[p].username && SORT[p].user_img !== '' ? FriendImg =  `${showImg(SORT[p].user_img)}` : ''; FRD[i] == SORT[p].username && $('about').html(SORT[p].about) }

            document.querySelector('chatlog img').src = FriendImg
            $('chatlog h1').html(`<span style='text-transform:capitalize;'>${FRD[i]}</span>`)//Chat Header
            $('chatlog h6').html(FRD[i])//Chat Header
            const setStatus = localStorage.getItem(FRD[i])
            //Status Indicator
            document.querySelector('.imgHead span').innerHTML = 
            `<user_${FRD[i]} style='border:2px solid white; position: absolute; bottom: 0; right: 0; width: 13px; height: 13px; background-color: ${setStatus == 'online' ? 'lime' : 'red'}; border-radius: 100px;'></user_${FRD[i]}>`

            //Populate The ChatLogs[]
            for (let m = 0; m < MainChats.length; m++) { MainChats[m].replyto == FRD[i] && MainChats[m].from == userName ?  ChatLogs.push(MainChats[m]) : ''; MainChats[m].from == FRD[i] && MainChats[m].replyto == userName ?  ChatLogs.push(MainChats[m]) : '' }
            
            let GenEle = (((`${FRD[i]+userName}`).toLocaleLowerCase()).split('')).sort()
            let Ele = ''
            for (let i = 0; i < GenEle.length; i++) {Ele += GenEle[i]}
            
            $('.repto').val(FRD[i]) //Reply To User Friend
            $('.EleDiv').val(Ele)//User Display Element Div
            document.querySelector('logs').innerHTML = `<${Ele} style="display:flex; flex-direction:column; padding-bottom:15px"></${Ele}>`
            const Show = document.querySelector(`logs ${Ele}`)

            for (let n = 0; n < ChatLogs.length; n++) {
                //Shift user log to right
                const shiftClass  = ChatLogs[n].replyto !== userName ? `class="alignUserlog edit ChatID${ChatLogs[n].Id}"` : ''
                //Add edit permission dynamically
                const editDiv = ChatLogs[n].replyto !== userName ? `<make><edit class="fa fa-pen edit${ChatLogs[n].Id}" title="Edit Message"></edit><del class="fa fa-times del${ChatLogs[n].Id}" title="Delete Message"></del></make>` : ''
                //Dispay chat logs
                Show.innerHTML += ` 
                    <article ${shiftClass} id="ChatID${ChatLogs[n].Id}">
                        <log>${ChatLogs[n].Msg.split('<').join('&lt;')}</log>
                        <time>${convertTime(ChatLogs[n].time)}</time>
                        ${editDiv}
                    </article>
                    `
                //Generate Time
                if(n < ChatLogs.length-1){
                    if(Number(Math.ceil(ChatLogs[n+1].Id/(1000*60*60*24))) > Number(Math.ceil(ChatLogs[n].Id/(1000*60*60*24)))){
                        const D = new Date(ChatLogs[n+1].Id)
                        const Mon = D.getMonth()+1 < 10 ? '0'+(D.getMonth()+1) : D.getMonth()+1
                        const Day = D.getDate() < 10 ? '0'+(D.getDate()) : D.getDate()
                        Show.innerHTML += `<chatdate>${Mon}/${Day}/${D.getFullYear()}</chatdate>`
                    }
                }
            }
            // HEIGHT VIEW FUNCTION
            window.scrollTo(0, document.body.scrollHeight)
            //Focusing of Type new Message
            $('.Msg').focus()
            // FOR EDITING OF THE USERS MESSAGES
            editMessage(ChatLogs)
            // FOR DELETING OF THE USERS MESSAGE
            ChatLogs.forEach(eachMsg => { $(`.del${eachMsg.Id}`).on('click', () => { DeleteMsg(eachMsg.Id) }) })
        })
    }
}