$.ajax({
    method: "POST",
    success: (data) => {
        $('yourname').html(data.PN)
        document.querySelector('friendlist').innerHTML = ''
        if(data.USER[0].about !== ''){ 
            $('.aboutme').val(data.USER[0].about)
        }else{
            $('.aboutme').val(`Hello, I'm using ChatMore App`)
        }
        $('tel').html(data.USER[0].telephone)
        if(data.USER[0].user_img == ''){
            $('dpx').html(`<img src="./Public/images/avatar.png" alt="avatar.png">`)
            $('dp').html(`<img src="./Public/images/avatar.png" alt="avatar.png">`)
        }else{
            $('dpx').html(`<img src="./Public/ChatMore/Users/${data.PN}/${data.USER[0].user_img}" alt="${data.USER[0].user_img}">`)
            $('dp').html(`<img src="./Public/ChatMore/Users/${data.PN}/${data.USER[0].user_img}" alt="${data.USER[0].user_img}">`)
        }

        // IF YOU HAVE NO FRIENDS
        if(data.FRD.length < 1){
            document.querySelector('friendlist').innerHTML =`
            <div style="display:block;">
                <h3 style="text-align: center;">NO FRIENDS YET!</h3>
                <h5 style="text-align: center;">Add friends from community</h5>
            </div>
            `
        }
        for (let i = 0; i < data.FRD.length; i++) {
            const LastLogs = []
            for (let n = 0; n < data.SORT.length; n++) {
                if(data.SORT[n].username == data.FRD[i]){
                    for (let m = 0; m < data.CHATS.length; m++) {
                        if(data.CHATS[m].replyto == data.FRD[i] && data.CHATS[m].from == data.PN){
                            LastLogs.push(data.CHATS[m]) //Sent To Guest
                        }
                        if(data.CHATS[m].from == data.FRD[i] && data.CHATS[m].replyto == data.PN){
                            LastLogs.push(data.CHATS[m]) //Sent From Guest
                        }
                    }

                    var UserImg = `<img src="./Public/ChatMore/Users/${data.FRD[i]}/${data.SORT[n].user_img}" alt="${data.SORT[n].user_img}">`
                    if(data.SORT[n].user_img == ''){
                        UserImg = `<img src="./Public/images/avatar.png" alt="avatar.png">`
                    }
                    
                    document.querySelector('friendlist').innerHTML +=`
                    <div class="chat_${data.FRD[i]}">
                        ${UserImg}
                        <display>
                            <chatname>${data.FRD[i]}</chatname><br>
                            <talk><b>Last Msg:</b> ...</talk>
                        </display>
                    </div>
                    `
                }
            }    
        }

        /*************** FOR REMOVING OF CHAT LOG ******************/
        /*************** FOR REMOVING OF CHAT LOG ******************/
        $('chatlog button').on('click', () => {
            document.querySelector('chatlog').style.display = 'none'
            document.querySelector('friendlist').style.display = 'block'
            // document.querySelector('.friends').style.height = '53vh'
            $.getScript("../js/chat.js")

            if($('.friends div').length > 4){
                document.querySelector('.friends').style.height = 'auto'
            }else{
                document.querySelector('.friends').style.height = '53vh'
            }
            $('.EditId').val('')
            $('.locator').val('')
            $('.Msg').val('')
        })

        //FOR VIEWING OF PROFILE
        $('.user_profile .ClxPrf').on('click', () => {
            document.querySelector('.user_profile').style.display = 'none'
            document.querySelector('.app').style.display = 'block'
        })
        $('dp').on('click', () => {
            document.querySelector('.user_profile').style.display = 'flex'
            document.querySelector('.app').style.display = 'none'
        })
        /**************************************************************************** */
        
        /************************* FOR SERVING OF THE CHAT LOG *************************/
        /************************* FOR SERVING OF THE CHAT LOG *************************/

        for (let i = 0; i < data.FRD.length; i++) {
            $(`.chat_${data.FRD[i]}`).on('click', () => {
                
                document.querySelector('chatlog').style.display = 'flex' //Display Chat With a Friend
                document.querySelector('friendlist').style.display = 'none'//Hide Friends List

                let FriendImg = `./Public/images/avatar.png`
                for (let p = 0; p < data.SORT.length; p++) {
                    if(data.FRD[i] == data.SORT[p].username && data.SORT[p].user_img !== ''){
                        FriendImg =  `./Public/ChatMore/Users/${data.FRD[i]}/${data.SORT[p].user_img}`
                    }
                }
                document.querySelector('chatlog img').src = FriendImg
                $('chatlog h1').html(`<span style='text-transform:capitalize;'>${data.FRD[i]}</span>`)//Chat Header
                $('.GrpID').val('')
                
                const ChatLogs = []
                for (let m = 0; m < data.CHATS.length; m++) {
                    if(data.CHATS[m].replyto == data.FRD[i] && data.CHATS[m].from == data.PN){
                        ChatLogs.push(data.CHATS[m]) //Sent To Guest
                    }
                    if(data.CHATS[m].from == data.FRD[i] && data.CHATS[m].replyto == data.PN){
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

                    //Differentiating Between You and Other Users
                    const id = ChatLogs[n].from == data.PN ? 'you' : ChatLogs[n].from

                    Show.innerHTML += ` 
                        <article ${shift}>
                        <logname>@${id}</logname>
                        <log>${ChatLogs[n].Msg}</log>
                        ${edit}
                        </article>
                        `
                }
                //Going Straight To Input Field and Focusing it
                setTimeout(() => {
                    window.location.href='#...'
                    $('.Msg').focus()
                }, 50);
                    
                /********************* FOR SENDING MESSAGES    ************************/
                /********************* FOR SENDING MESSAGES    ************************/
                $('.repto').val(data.FRD[i]) //Message Tag Name
                $('.locator').val(data.FRD[i])
                $(`.SendForm`).on('submit', (e) => {
                    e.preventDefault()
                    $.ajax({
                        method: "POST",
                        data: {
                            Locate: $('.locator').val(),
                            MsgTo: $('.repto').val(),
                            ChatMsg: $('.Msg').val(),
                        },
                        success: (data) => {
                            // $.getScript("../js/grouphandler.js")
                            DoAll()
                            // const Refresh = MsgL > ActualNum ? $.getScript("../js/grouphandler.js") : ''
                        }
                    })
                    
                });

                /********************* FOR EDITING OF THE USERS MESSAGES    ************************/
                /********************* FOR EDITING OF THE USERS MESSAGES    ************************/
                for (let e = 0; e < ChatLogs.length; e++) {
                    $(`.edit${ChatLogs[e].Id}`).on('click', () => {
                        $('.locator').val(data.FRD[i])
                        $('.EditId').val(ChatLogs[e].Id)
                        $('.EdMsg').val(ChatLogs[e].Msg)
                        $('.SendForm').hide()
                        $('.EdForm').show()
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

                /********************* FOR DELETING OF THE USERS MESSAGE    ************************/
                /********************* FOR DELETING OF THE USERS MESSAGE    ************************/
                for (let e = 0; e < ChatLogs.length; e++) {
                    $(`.del${ChatLogs[e].Id}`).on('click', () => {
                        // $('.DelId').val(ChatLogs[e].Id)
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


                /********************* HEIGHT VIEW FUNCTION    ************************/
                /********************* HEIGHT VIEW FUNCTION    ************************/
                setTimeout(() => {
                    
                }, 50);
                // window.location.href='#...'
                // $('.Msg').focus()
                const Height = $('.friends article').length >= 4 ? 
                document.querySelector('.friends').style.height = 'auto' : 
                document.querySelector('.friends').style.height = '53vh'
            })
        }
        



        /************************* COMMUNITY SECTION HANDLER ***************************/
        /************************* COMMUNITY SECTION HANDLER ***************************/
        const Disp = document.querySelector('community')
        Disp.innerHTML = ''
            const Addthem = []
            for (let i = 0; i < data.SORT.length; i++) {
                if((data.SORT[i].username).toUpperCase() !== (data.PN).toUpperCase()){
                    Addthem.push(data.SORT[i].username)
                }

                const Friends = data.FRD
                for (let i = 0; i < Addthem.length; i++) {
                    for (let n = 0; n < Friends.length; n++) {
                        if((Friends[n] == Addthem[i])){
                        function Rem(comm,Add){
                            var index = comm.indexOf(Add)
                            if(index > -1){
                            comm.splice(index,1)
                            }
                            return comm
                        }Rem(Addthem,Addthem[i])
                        }
                        
                    }
                }
            }

            /******************************* ADDING OF FRIENDS DISPLAY FUNCTION ************************/
            for (let i = 0; i < Addthem.length; i++) {
                for (let n = 0; n < data.SORT.length; n++) {
                    if(data.SORT[n].username == Addthem[i]){
                        var UserImg = `<img src="./Public/ChatMore/Users/${Addthem[i]}/${data.SORT[n].user_img}" alt="${data.SORT[n].user_img}">`
                        if(data.SORT[n].user_img == ''){
                            UserImg = `<img src="./Public/images/avatar.png" alt="avatar.png">`
                        }
                        Disp.innerHTML +=`
                        <div>
                            ${UserImg}
                            <display>
                                <chatname>${Addthem[i]}</chatname><br>
                                <about><b>About:</b> ${data.SORT[n].about}</about>
                            </display>
                            <add class='fa fa-user-plus ${Addthem[i]}' title="add ${Addthem[i]} to your chats"></add>
                        </div>`
                    }
                }    
            }
            for (let i = 0; i < data.SORT.length; i++) {
                $(`.${data.SORT[i].username}`).on('click', () => {
                    $.ajax({
                        method:"POST",
                        data : {
                            AddFriend : data.SORT[i].username
                        },
                        success : (data) => {
                            window.location = '/'
                        }
                    })
                })
            }
        /************************************************************************************ */

        /********************** VIEW LENGTH HANDLE ***********************/
        if($('.friends div').length > 4){
            document.querySelector('.friends').style.height = 'auto'
        }
        if($('groups div').length > 4){
            document.querySelector('groups').style.height = 'auto'
        }
        if($('community div').length > 4){
            document.querySelector('community').style.height = 'auto'
        }
    },
    error: (err) => {
        console.log(err)
    }
})
function Submit(){
    $('.CImg').html($('#userimage').val())
    document.querySelector('.fa-upload').style.display = 'block'
    // $('.SubImg').submit()
    // if(FileCheck.files){
    //     const Size = (FileCheck.files.item(0).size/1000).toFixed(0)
    //     if(Size < 4000){
    //         if(FileCheck.files.item(0).type === ('image/jpeg'||'image/png')){
    //         }
    //     }
    // }
}
