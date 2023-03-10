const socket = io()

//Deleting Of Message Function
function DeleteMsg(DelID){
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
    const Show = document.querySelector(`${Msg.EleDiv}`)
    Show.style.display = 'flex';
    Show.style.flexDirection = 'column'
    
    if(Msg.chat == 'Frd'){
        MainChats.push(Exp)
        let Id = Msg.from
        let shift = ''
        let edit = ''
        if(Msg.from !== $('chat_top h6').html()){
            Id = 'you'
            shift = `class="edit" 
            style="align-self:flex-end; background-color: pink; border-radius:20px 20px 0 20px"`
            edit = `
                <make>
                    <edit class="fa fa-pen edit${Msg.Id}" title="Edit Message"></edit>
                    <del class="fa fa-window-close del${Msg.Id}" title="Delete Message"></del>
                </make>`
        }

        const Art = document.querySelectorAll(`${Msg.EleDiv} article`)
        if(Art.length !== 0){
            const LastArt = Number(Art[Art.length-1].id.replace(/[^0-9]/g, ""))
            if(Number(Math.ceil(Msg.Id/(1000*60*60*24))) > Number(Math.ceil(LastArt/(1000*60*60*24)))){
            // if((new Date(Msg.Id)).getDate() > (new Date(LastArt)).getDate()){
                const D = new Date(Msg.Id)
                const Mon = D.getMonth()+1 < 10 ? '0'+(D.getMonth()+1) : D.getMonth()+1
                const Day = D.getDate() < 10 ? '0'+(D.getDate()) : D.getDate()
                Show.innerHTML += `<chatdate>${Mon}/${Day}/${D.getFullYear()}</chatdate>`
            }
        }

        Show.innerHTML += ` 
            <article ${shift} id="ChatID${Msg.Id}">
                <logname>@${Id}</logname>
                <log>${Msg.Msg.split('<').join('&lt;')}</log>
                <time>${Msg.time}</time>
                ${edit}
            </article>
            `
            HeightSet()
            reRrun()

    }else if(Msg.Id == 'Del'){
        document.querySelector(`${Msg.EleDiv} #ChatID${Msg.Msg}`).remove()
        for (let n = 0; n < MainChats.length; n++) if(MainChats[n].Id == Msg.Msg) DelMsgWithID(MainChats,MainChats[n])
        
        const Height = $('.friends article').length >= 4 ? 
        (document.querySelector('.friends').style.height = 'auto',document.querySelector('sending').style.position = 'sticky') : 
        (document.querySelector('.friends').style.height = '85vh',document.querySelector('sending').style.position = 'absolute')

    }else if(Msg.Id == 'Edit'){
        $(`${Msg.EleDiv} #ChatID${Msg.MsgId} log`).html(Msg.Msg.split('<').join('&lt;'))
        for (let n = 0; n < MainChats.length; n++) if(MainChats[n].Id == Msg.MsgId) MainChats[n].Msg = Msg.Msg.split('<').join('&lt;')

    }else if(Msg.Id == 'Grp'){
        let Home = Exp
        const Log = document.querySelector(`${Msg.EleDiv}`)//Dynamic getElement

        const Art = document.querySelectorAll(`${Msg.EleDiv} article`)
        if(Art.length !== 0){
            const LastArt = Number(Art[Art.length-1].id)
            if(Number(Math.ceil(Msg.InId/(1000*60*60*24))) > Number(Math.ceil(LastArt/(1000*60*60*24)))){
            // if((new Date(Msg.InId)).getDate() > (new Date(LastArt)).getDate()){
                const D = new Date(Msg.InId)
                const Mon = D.getMonth()+1 < 10 ? '0'+(D.getMonth()+1) : D.getMonth()+1
                const Day = D.getDate() < 10 ? '0'+(D.getDate()) : D.getDate()
                Log.innerHTML += `<chatdate>${Mon}/${Day}/${D.getFullYear()}</chatdate>`
            }
        }


        let Id = Msg.from
        let shift = ''
        if(Msg.from == $('yourname').html()){
            Id = 'you'
            shift = 'activeme'
        }
        Log.innerHTML +=`
        <article class="${shift}" id="${Msg.InId}">
            <logname>@${Id}</logname>
            <log>${Msg.Msg.split('<').join('&lt;')}</log>
            <time>${Msg.time}</time>
        </article>
        `
        HeightSet()
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
                    $('.EleDiv').val(Msg.EleDiv); 
                    $('.EdMsg').val(Edmsg.innerHTML.split('&lt;').join('<'))

                    $('.SendForm').hide()
                    $('.EdForm').show()
                    $('.EdMsg').focus()

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
            
    function HeightSet(){
        const Height = $('.friends article').length >= 4 ? 
        document.querySelector('.friends').style.height = 'auto' : 
        document.querySelector('.friends').style.height = '85vh'
        window.scrollTo(0, document.body.scrollHeight);

        const Hig = $('grouplogs article').length >= 5 ? 
        document.querySelector('groups').style.height = '100%' : 
        document.querySelector('groups').style.height = '85vh'
    }
})
