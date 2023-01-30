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
            $('dpx').html(`<img src="../images/avatar.png" alt="avatar.png">`)
            $('dp').html(`<img src="../images/avatar.png" alt="avatar.png">`)
        }else{
            $('dpx').html(`<img src="../ChatMore/Users/${data.PN}/${data.USER[0].user_img}" alt="${data.USER[0].user_img}">`)
            $('dp').html(`<img src="../ChatMore/Users/${data.PN}/${data.USER[0].user_img}" alt="${data.USER[0].user_img}">`)
        }

        // IF YOU HAVE NO FRIENDS
        if(data.FRD.length < 1){
            document.querySelector('friendlist').innerHTML =`
            <div style="display:block;">
                <h3 style="text-align: center;">NO FRIENDS YET!</h3>
                <h5 style="text-align: center;">Add friends from the community</h5>
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

                    var UserImg = `<img src="../ChatMore/Users/${data.FRD[i]}/${data.SORT[n].user_img}" alt="${data.SORT[n].user_img}">`
                    if(data.SORT[n].user_img == ''){
                        UserImg = `<img src="../images/avatar.png" alt="avatar.png">`
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
            window.scrollTo(0, document.body.scrollTop)
            document.querySelector('chatlog').style.display = 'none'
            document.querySelector('friendlist').style.display = 'block'
            $('.top_menu').show()

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
        $('.ChngPwd').on('submit', (e) => {
            e.preventDefault()
            $.ajax({
                method:"POST",
                data:{
                    UpdatePWD : $('.updatepwd').val()
                }
            })
        })
        $('dp').on('click', () => {
            document.querySelector('.user_profile').style.display = 'flex'
            document.querySelector('.user_profile').style.height = '80vh'
            document.querySelector('.app').style.display = 'none'
        })
        /**************************************************************************** */
        
        /************************* FOR SERVING OF THE CHAT LOG *************************/
        /************************* FOR SERVING OF THE CHAT LOG *************************/
        for (let i = 0; i < data.FRD.length; i++) {
            $(`.chat_${data.FRD[i]}`).on('click', () => {
                
                $.ajax({
                    method:"POST",
                    success:(data) => {

                    document.querySelector('chatlog').style.display = 'flex' //Display Chat With a Friend
                    document.querySelector('friendlist').style.display = 'none'//Hide Friends List
                    $('.top_menu').hide()

                    let FriendImg = `../images/avatar.png`
                    for (let p = 0; p < data.SORT.length; p++) {
                        if(data.FRD[i] == data.SORT[p].username && data.SORT[p].user_img !== ''){
                            FriendImg =  `../ChatMore/Users/${data.FRD[i]}/${data.SORT[p].user_img}`
                        }
                        if(data.FRD[i] == data.SORT[p].username){
                            $('about').html(data.SORT[p].about) //For about the user friends
                        }
                    }
                    document.querySelector('chatlog img').src = FriendImg
                    $('chatlog h1').html(`<span style='text-transform:capitalize;'>@${data.FRD[i]}</span>`)//Chat Header
                    $('chatlog h6').html(data.FRD[i])//Chat Header
                    

                    
                    const ChatLogs = []
                    for (let m = 0; m < data.CHATS.length; m++) {
                        if(data.CHATS[m].replyto == data.FRD[i] && data.CHATS[m].from == data.PN){
                            ChatLogs.push(data.CHATS[m]) //Sent To Guest
                        }
                        if(data.CHATS[m].from == data.FRD[i] && data.CHATS[m].replyto == data.PN){
                            ChatLogs.push(data.CHATS[m]) //Sent From Guest
                        }
                    }

                let GenEle = (((`${data.FRD[i]+data.PN}`).toLocaleLowerCase()).split('')).sort()
                let Ele = ''
                for (let i = 0; i < GenEle.length; i++) {Ele += GenEle[i]}
                
                $('.repto').val(data.FRD[i]) //Reply To User Friend
                $('.EleDiv').val(Ele)//User Display Element Div
                
                document.querySelector('logs').innerHTML = `<${Ele}></${Ele}>`
                const Show = document.querySelector(`logs ${Ele}`)

                Show.style.display = 'flex';
                Show.style.flexDirection = 'column'
                    for (let n = 0; n < ChatLogs.length; n++) {
                        var shift = ''
                        var edit = ''
                        if(ChatLogs[n].replyto !== data.PN){
                            shift = `class="edit ChatID${ChatLogs[n].Id}" style="align-self:flex-end; background-color: pink; border-radius:20px 20px 0 20px"`
                            edit = `<make><edit class="fa fa-pen edit${ChatLogs[n].Id}" title="Edit Message"></edit><del class="fa fa-window-close del${ChatLogs[n].Id}" title="Delete Message"></del></make>`
                        }
                        
                        //Differentiating Between You and Other Users
                        const id = ChatLogs[n].from == data.PN ? 'you' : ChatLogs[n].from

                        Show.innerHTML += ` 
                            <article ${shift} id="ChatID${ChatLogs[n].Id}">
                            <logname>@${id}</logname>
                            <log>${ChatLogs[n].Msg}</log>
                            <time>${ChatLogs[n].time}</time>
                            ${edit}
                            </article>
                            `
                        if(n < ChatLogs.length-1){
                            // if(Number((ChatLogs[n+1].Id/(1000*60*60*24)).toFixed(1)) > Number((ChatLogs[n].Id/(1000*60*60*24)).toFixed(1))){
                            if((new Date(ChatLogs[n+1].Id)).getDate() > (new Date(ChatLogs[n].Id)).getDate()){
                                const D = new Date(ChatLogs[n+1].Id)
                                const Mon = D.getMonth()+1 < 10 ? '0'+(D.getMonth()+1) : D.getMonth()+1
                                Show.innerHTML += `<chatdate>${Mon}/${D.getDate()}/${D.getFullYear()}</chatdate>`
                            }
                        }
                    }
                
                /********************* FOR EDITING OF THE USERS MESSAGES    ************************/
                for (let e = 0; e < ChatLogs.length; e++) {
                    $(`.edit${ChatLogs[e].Id}`).on('click', () => {
                        $('.EditId').val(ChatLogs[e].Id)
                        $('.EdMsg').val(ChatLogs[e].Msg.split('&lt;').join('<'))
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
                                    $('.Msg').val(''),$('.GrpMsg').val('')
                                }
                            })
                        })
                    })
                }

                /********************* FOR DELETING OF THE USERS MESSAGE    ************************/
                for (let e = 0; e < ChatLogs.length; e++) {
                    $(`.del${ChatLogs[e].Id}`).on('click', () => {
                        $.ajax({
                            method:"POST",
                            data:{
                                ElementTag: $('.EleDiv').val(),
                                DelMsg: ChatLogs[e].Id
                            },
                            success:(data) => {
                                socket.emit('chat message', data.SndMsg)
                            }
                        })
                    })
                }

                /********************* HEIGHT VIEW FUNCTION    ************************/
                    const Scroll = $('.friends article').length >= 4 ? 
                    document.querySelector('sending').style.position = 'sticky' :
                    document.querySelector('sending').style.position = 'absolute'

                    $('.Msg').focus()
                    const Height = $('.friends article').length >= 4 ? 
                    document.querySelector('.friends').style.height = 'auto' : 
                    document.querySelector('.friends').style.height = '85vh'
                    window.scrollTo(0, document.body.scrollHeight);
                    }
                })
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
                    var UserImg = `<img src="../ChatMore/Users/${Addthem[i]}/${data.SORT[n].user_img}" alt="${data.SORT[n].user_img}">`
                    if(data.SORT[n].user_img == ''){
                        UserImg = `<img src="../images/avatar.png" alt="avatar.png">`
                    }
                    Disp.innerHTML +=`
                    <div>
                        ${UserImg}
                        <display>
                            <chatname>${Addthem[i]}</chatname><br>
                            <userabout><b style="color:white">About:</b><br> ${data.SORT[n].about}</userabout>
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

const Emo = document.querySelectorAll('emo')
for (let i = 0; i < Emo.length; i++) {
    Emo[i].addEventListener('click',() => {
        $('.EdMsg').val($('.EdMsg').val()+Emo[i].innerHTML)
        $('.EdMsg').focus()
        $('.Msg').val($('.Msg').val()+Emo[i].innerHTML)
        $('.Msg').focus()
        $('.GrpMsg').val($('.GrpMsg').val()+Emo[i].innerHTML)
        $('.GrpMsg').focus()
    }) 
}
let SmileCount = 0
$('smile').on('click', () => {
    const Emoji = SmileCount == 0 ? ($('emojis').show(),SmileCount=1) : ($('emojis').hide(),SmileCount=0)
})
