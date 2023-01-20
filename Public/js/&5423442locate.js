function DoAll(){
    $.ajax({
        method: "POST",
        success: (data) => {
            $('.Msg').val('')
            if(data.USER[0].user_img == ''){
                $('dpx').html(`<img src="./Public/images/avatar.png" alt="avatar.png">`)
                $('dp').html(`<img src="./Public/images/avatar.png" alt="avatar.png">`)
            }else{
                $('dpx').html(`<img src="../ChatMore/Users/${data.PN}/${data.USER[0].user_img}" alt="${data.USER[0].user_img}">`)
                $('dp').html(`<img src="../ChatMore/Users/${data.PN}/${data.USER[0].user_img}" alt="${data.USER[0].user_img}">`)
            }

            if(data.USER[0].about !== ''){ 
                $('.aboutme').val(data.USER[0].about)
            }else{
                $('.aboutme').val(`Hello, I'm using ChatMore App`)
            }
            $('tel').html(data.USER[0].telephone)
            if(data.CRT){
                $('yourname').html(data.PN)
                document.querySelector('chatlog').style.display = 'flex'
                document.querySelector('friendlist').style.display = 'none'

                let FriendImg = `./Public/images/avatar.png`
                for (let p = 0; p < data.SORT.length; p++) {
                    if(data.CRT == data.SORT[p].username && data.SORT[p].user_img !== ''){
                        FriendImg =  `../ChatMore/Users/${data.CRT}/${data.SORT[p].user_img}`
                    }
                }
                document.querySelector('chatlog img').src = FriendImg
                $('chatlog h1').html(`<span style='text-transform:capitalize;'>${data.CRT}</span>`)//Chat Header
                $('.repto').val(data.CRT) //Message Tag Name
                $('.locator').val(data.CRT)
                
                    
                    const ChatLogs = []
                    for (let m = 0; m < data.CHATS.length; m++) {
                        if(data.CHATS[m].replyto == data.CRT && data.CHATS[m].from == data.PN){
                            ChatLogs.push(data.CHATS[m]) //Sent To Guest
                        }
                        if(data.CHATS[m].from == data.CRT && data.CHATS[m].replyto == data.PN){
                            ChatLogs.push(data.CHATS[m]) //Sent From Guest
                        }
                    }
            
            
                    document.querySelector('logs').innerHTML = ''
                    const Show = document.querySelector('logs')
                    for (let n = 0; n < ChatLogs.length; n++) {
                        var shift = ''
                        var edit = ''
                        if(ChatLogs[n].replyto !== data.PN){
                            shift = 'class="edit" style="align-self:flex-end;background-color:pink;"'
                            edit = `<make><edit class="fa fa-pen edit${ChatLogs[n].Id}" title="Edit Message"></edit><del class="fa fa-window-close del${ChatLogs[n].Id}" title="Delete Message"></del></make>`
                        }
                        var id = ChatLogs[n].from
                        if(ChatLogs[n].from == data.PN){
                            id = 'you'
                        }
                        Show.innerHTML += `
                            <article ${shift}>
                            <logname>@${id}</logname>
                            <log>${ChatLogs[n].Msg}</log>
                            ${edit}
                            </article>
                            ` 
                    }

                    $('.SendForm').show()
                    $('.Msg').focus()
                    $('.EdForm').hide()
                    for (let e = 0; e < ChatLogs.length; e++) {
                        $(`.edit${ChatLogs[e].Id}`).on('click', () => {
                            $('.SendForm').hide()
                            $('.EdForm').show()
                            $('.EditId').val(ChatLogs[e].Id)
                            $('.EdMsg').val(ChatLogs[e].Msg)
                            $('.EdMsg').focus()
                        
                            $(`.EdForm`).on('submit', (e) => {
                                e.preventDefault()
                                $.ajax({
                                    method: "POST",
                                    data: {Locate: $('.locator').val(),EditId: $('.EditId').val(),EditMsg: $('.EdMsg').val()},
                                    success: (data) => {
                                        DoAll()
                                        $('.EdForm').hide()
                                        $('.SendForm').show()
                                    }
                                }) 
                            })
                        })
                    }
                    for (let e = 0; e < ChatLogs.length; e++) {
                        $(`.del${ChatLogs[e].Id}`).on('click', () => {
                            $('.DelId').val(ChatLogs[e].Id)
                            // document.querySelector('.Delform').submit()
                            $.ajax({
                                method: "POST",
                                data: {
                                    Locate: $('.locator').val(),
                                    DelMsg: ChatLogs[e].Id
                                },
                                success: (data) => {
                                    DoAll()
                                }
                            })
                        })
                    }
                
                window.location.href='#...'
                const Height = $('.friends article').length >= 4 ? 
                document.querySelector('.friends').style.height = 'auto' : 
                document.querySelector('.friends').style.height = '53vh'
                // if($('.friends article').length >= 4){document.querySelector('.friends').style.height = 'auto'}
            }
        },
        error: (err) => {
            console.log(err)
        }
    })
}
