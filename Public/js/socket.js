import { MainChats } from "./chat.js"
import { wordCount } from "./chatsModule/wordCount.js"

const socket = io()

//Deleting Of Message Function
export function DeleteMsg(DelID){
    $.ajax({
        method:"POST",
        data:{
            ElementTag: $('.EleDiv').val(),
            DelMsg: DelID
        },
        success:(data) => {
            socket.emit('chat message', data.SndMsg, data.DelID)
        }
    })
}

function DelMsgWithID(MainArr,DelIndex){
    if(MainArr,DelIndex){
        let index = MainArr.indexOf(DelIndex)
        if(index > -1){
            MainArr.splice(index,1)
        }
        return MainArr
    }
}

$(`.SendForm`).on('submit', (e) => {
    e.preventDefault()
    if($('.Msg').val() !== $('.Msg').val().replace(/[^ ]/g, "")){
        $.ajax({
            method:"POST",
            data:{
                MsgTo: $('.repto').val(),
                ElementTag: $('.EleDiv').val(),
                ChatMsg: $('.Msg').val(),
            },
            success:(data) => {
                socket.emit('chat message', data.SndMsg,data.expUserChats)
                $('.Msg').val(''),$('.GrpMsg').val('')
                $('.Msg').focus()
                
            }
        })
    }
})

/**************     Send Form for Group Section     ********************/
$(`.GrpChatForm`).on('submit', (e) => {
    e.preventDefault()
    $.ajax({
        method:"POST",
        data:{
            ElementTag: $('.EleDiv').val(),
            GrpID: $('.GrpID').val(),
            GrpMsg: $('.GrpMsg').val()
        },
        success:(data) => {
            socket.emit('chat message', data.SndMsg, data.Exp)
            $('.GrpMsg').val(''),$('.Msg').val('')
            $('.GrpMsg').focus()
        }
    })
})

socket.on('chat message', function(Msg,Exp) {
    
    const wordExced = wordCount(Msg.Msg?Msg.Msg.split('<').join('&lt;'):'')[1] > 10 ? '...':''
    const Show = document.querySelector(`${Msg.EleDiv}`)
    Show ? (Show.style.display = 'flex', Show.style.flexDirection = 'column') : ''
    
    if(Msg.chat == 'Frd'){
        document.querySelector('.friends').style.minHeight = '100vh'; document.querySelector('.friends').style.maxHeight = 'auto'

        MainChats.push(Exp)

        const shiftClass = Msg.from !== $('chat_top h6').html() ? `class="edit alignUserlog"` : ''
        const editDiv = Msg.from !== $('chat_top h6').html() ? `<make><edit class="fa fa-pen edit${Msg.Id}" title="Edit Message"></edit><del class="fa fa-times del${Msg.Id}" title="Delete Message"></del></make>` : ''
        const Art = document.querySelectorAll(`${Msg.EleDiv} article`)

        if(Art.length !== 0){
            const LastArt = Number(Art[Art.length-1].id.replace(/[^0-9]/g, ""))
            if(Number(Math.ceil(Msg.Id/(1000*60*60*24))) > Number(Math.ceil(LastArt/(1000*60*60*24)))){
                const D = new Date(Msg.Id)
                const Mon = D.getMonth()+1 < 10 ? '0'+(D.getMonth()+1) : D.getMonth()+1
                const Day = D.getDate() < 10 ? '0'+(D.getDate()) : D.getDate()
                Show.innerHTML += `<chatdate>${Mon}/${Day}/${D.getFullYear()}</chatdate>`
            }
        }

        Show.innerHTML += ` 
            <article ${shiftClass} id="ChatID${Msg.Id}">
                <log>${Msg.Msg.split('<').join('&lt;')}</log>
                <time>${Msg.time}</time>
                ${editDiv}
            </article>
            `    
        $(`.last-log${Msg.EleDiv}`).html(wordCount(Msg.Msg.split('<').join('&lt;'))[0].trim()+wordExced) //Last Msg
        window.scrollTo(0, document.body.scrollHeight)
        reRrun()

    }else if(Msg.Id == 'Del'){
        document.querySelector(`${Msg.EleDiv} #ChatID${Msg.Msg}`).remove()

        const whole = document.querySelectorAll(`${Msg.EleDiv} article`)
        for(let i=0; i<whole.length; i++) (console.log(whole[i]))
        //Last Msg Function
        // for(let i=0; i<whole.length; i++) (whole[whole.length-1].id.replace(/[^0-9]/g, "") == Msg.MsgId ? $(`.last-log${Msg.EleDiv}`).html(wordCount(Msg.Msg.split('<').join('&lt;'))[0].trim()+wordExced) : '')

        for (let n = 0; n < MainChats.length; n++) if(MainChats[n].Id == Msg.Msg) DelMsgWithID(MainChats,MainChats[n])
        document.querySelector('.friends').style.minHeight = '100vh'; document.querySelector('.friends').style.maxHeight = 'auto'
    }else if(Msg.Id == 'Edit'){
        $(`${Msg.EleDiv} #ChatID${Msg.MsgId} log`).html(Msg.Msg.split('<').join('&lt;'))
        const whole = document.querySelectorAll(`${Msg.EleDiv} article`)
        //Last Msg Function
        for(let i=0; i<whole.length; i++) (whole[whole.length-1].id.replace(/[^0-9]/g, "") == Msg.MsgId ? $(`.last-log${Msg.EleDiv}`).html(wordCount(Msg.Msg.split('<').join('&lt;'))[0].trim()+wordExced) : '')

        for (let n = 0; n < MainChats.length; n++) if(MainChats[n].Id == Msg.MsgId) MainChats[n].Msg = Msg.Msg.split('<').join('&lt;')
    }else if(Msg.Id == 'Grp'){
        GroupChats.push({Id:Msg.InId, Msg:Msg.Msg, from:Msg.from, sento:Msg.MsgTo, time:Msg.time})
        document.querySelector('groups').style.minHeight = '100vh'; document.querySelector('groups').style.maxHeight = 'auto'
        
        const Log = document.querySelector(`${Msg.EleDiv}`)//Dynamic getElement

        const Art = document.querySelectorAll(`${Msg.EleDiv} article`)
        if(Art.length !== 0){
            const LastArt = Number(Art[Art.length-1].id)
            if(Number(Math.ceil(Msg.InId/(1000*60*60*24))) > Number(Math.ceil(LastArt/(1000*60*60*24)))){
                const D = new Date(Msg.InId)
                const Mon = D.getMonth()+1 < 10 ? '0'+(D.getMonth()+1) : D.getMonth()+1
                const Day = D.getDate() < 10 ? '0'+(D.getDate()) : D.getDate()
                Log.innerHTML += `<chatdate>${Mon}/${Day}/${D.getFullYear()}</chatdate>`
            }
        }

        let Id = `<logname>@${Msg.from}</logname>`
        let shift = ''
        if(Msg.from == $('yourname').html()){
            Id = ''
            shift = 'activeme'
        }
        Log.innerHTML +=
        `
        <article class="${shift}" id="${Msg.InId}">
            ${Id}
            <log>${Msg.Msg.split('<').join('&lt;')}</log>
            <time>${Msg.time}</time>
        </article>
        `
        window.scrollTo(0, document.body.scrollHeight)
    }else{
        
        const setStatus = document.querySelector(`user_${Msg.User}`)
        localStorage.setItem(Msg.User, Msg.Status)

        localStorage.getItem(Msg.User) == 'online' ? setStatus ? setStatus.style.backgroundColor = 'lime' : '' : setStatus ? setStatus.style.backgroundColor = 'red' : ''
    }
    
    function reRrun() {
        const ArtLng = document.querySelectorAll(`${Msg.EleDiv} article make del`)
        const EdLng = document.querySelectorAll(`${Msg.EleDiv} article make edit`)
        const Art = document.querySelectorAll(`${Msg.EleDiv} article`)

        /****************    FOR EDITING || DELETING CHATS IN FRIENDS PART ***************/
        for (let i = 0; i < ArtLng.length; i++) {
            let DelBtn = document.querySelector(`.${ArtLng[i].classList[2]}`)
            let EdBtn = document.querySelector(`.${EdLng[i].classList[2]}`)
            let DoID = Number(ArtLng[i].classList[2].replace(/[^0-9]/g, ""))
            let Edmsg = document.querySelector(`${Msg.EleDiv} #ChatID${DoID} log`)
            
            //Editing Of Message
            EdBtn.addEventListener('click', () => {
                $('.EditId').val(DoID); 
                $('.EdMsg').val(Edmsg.innerHTML.split('&lt;').join('<'))
                $('.EleDiv').val(Msg.EleDiv); 

                $('.SendForm').hide(); $('.EdForm').show(); $('.EdMsg').focus()

                $(`.EdForm`).on('submit', (e) => {
                    e.preventDefault()
                    $.ajax({
                        method:"POST",
                        data:{
                            ElementTag: $('.EleDiv').val(),
                            EditId: $('.EditId').val(),
                            EditMsg:$('.EdMsg').val()
                        },
                        success:(data) => {
                            socket.emit('chat message', data.SndMsg)
                            $('.EdForm').hide()
                            $('.SendForm').show()
                            $('.GrpMsg').val(''),$('.Msg').val('')
                        }
                    })
                    $('.Msg').val('')
                })
            })

            //Deleting Of Msg
            DelBtn.addEventListener('click', () => {
                DeleteMsg(DoID)
            })
        }
    }
})
