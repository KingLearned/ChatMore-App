const socket = io()
$(`.SendForm`).on('submit', (e) => {
    e.preventDefault()
    $.ajax({
        method:"POST",
        data:{
            MsgTo: $('.repto').val(),
            ElementTag: $('.EleDiv').val(),
            ChatMsg: $('.Msg').val(),
        },
        success:(data) => {
            socket.emit('chat message', data.SndMsg)
            $('.Msg').val('')
        }
    })
})


socket.on('chat message', function(Msg) {
    const Show = document.querySelector(`${Msg.EleDiv}`)
    Show.style.display = 'flex';
    Show.style.flexDirection = 'column'

    if(Msg.Id !== 'Del' && Msg.Id !== 'Edit'){
        let Id = Msg.from
        let shift = ''
        let edit = ''
        if(Msg.from !== $('chat_top h6').html()){
            Id = 'you'
            shift = `class="edit" 
            style="align-self:flex-end; background-color: pink; border-radius:100px 100px 0 100px"`
            edit = `
                <make>
                    <edit class="fa fa-pen edit${Msg.Id}" title="Edit Message"></edit>
                    <del class="fa fa-window-close del${Msg.Id}" title="Delete Message"></del>
                </make>`
        }
        
        Show.innerHTML += ` 
            <article ${shift} id="ChatID${Msg.Id}">
                <logname>@${Id}</logname>
                <log>${Msg.Msg}</log>
                <time>${Msg.time}</time>
                ${edit}
            </article>
            `
    }else if(Msg.Id == 'Del'){
        document.querySelector(`${Msg.EleDiv} #ChatID${Msg.Msg}`).remove()
        HeightSet()

    }else if(Msg.Id == 'Edit'){
        $(`${Msg.EleDiv} #ChatID${Msg.MsgId} log`).html(Msg.Msg)
    }

    
        const ArtLng = document.querySelectorAll(`${Msg.EleDiv} article make del`)
        const EdLng = document.querySelectorAll(`${Msg.EleDiv} article make edit`)
        const Art = document.querySelectorAll(`${Msg.EleDiv} article`)
        
        for (let i = 0; i < ArtLng.length; i++) {
            let DelBtn = document.querySelector(`.${ArtLng[i].classList[2]}`)
            let EdBtn = document.querySelector(`.${EdLng[i].classList[2]}`)
            let DoID = Number(ArtLng[i].classList[2].replace(/[^0-9]/g, ""))
            let Edmsg = document.querySelector(`${Msg.EleDiv} #ChatID${DoID} log`)

            //Editing Of Message
            EdBtn.addEventListener('click', () => {
                $('.EditId').val(DoID); 
                $('.EleDiv').val(Msg.EleDiv); 
                $('.EdMsg').val(Edmsg.innerHTML)

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
                        }
                    })
                })
            })

            //Deleting Of Msg
            DelBtn.addEventListener('click', () => {
                $.ajax({
                    method:"POST",
                    data:{
                        ElementTag: $('.EleDiv').val(),
                        DelMsg: DoID,
                    },
                    success:(data) => {
                        socket.emit('chat message', data.SndMsg)
                    }
                })
            })
        }
    function HeightSet(){
        const Height = $('.friends article').length >= 4 ? 
        document.querySelector('.friends').style.height = 'auto' : 
        document.querySelector('.friends').style.height = '85vh'
        window.scrollTo(0, document.body.scrollHeight);
    }HeightSet()
})