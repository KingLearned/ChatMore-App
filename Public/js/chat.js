const MainChats = []    //for storing user => user chats

$.ajax({
    method: "POST",
    success: (data) => {
        for (let m = 0; m < data.CHATS.length; m++) { MainChats.push(data.CHATS[m]) }

        $('yourname').html(data.PN)
        data.USER[0].about !== '' ? $('.aboutme').val(data.USER[0].about) : $('.aboutme').val(`Hello, I'm using ChatMore App`) //user about display
        data.USER[0].user_img == '' ? $('dpx').html(`<img src="../images/avatar.png" alt="avatar.png">`) : $('dpx').html(`<img src="${showImg(data.USER[0].user_img)}" alt="${data.USER[0].user_img}">`)
        $('tel').html(data.USER[0].telephone)
        
        
        document.querySelector('friendlist').innerHTML = ''
        
        // WHEN FRIENDS LIST IS EMPTY
        if(data.FRD.length < 1){
            document.querySelector('friendlist').innerHTML =
            `
                <div style="display:block;">
                    <h3 style="text-align: center;">NO FRIENDS YET!</h3>
                    <h5 style="text-align: center;">Add friends from users</h5>
                </div>
            `
        }

        //FOR GETTING OF THE LAST MESSAGE A IN CHAT
        const friendsChat = []
        const userFriends = []
        if(data.FRD.length > 0){ //Checking to know if the user has friends
            data.FRD.forEach(Frd => { friendsChat.push([]); userFriends.push([Frd,data.PN]) })
            for (let i = 0; i < userFriends.length; i++) {
                for (let n = 0; n < data.CHATS.length; n++) {
    
                    if(userFriends[i].some(Ele => Ele == data.CHATS[n].replyto) && userFriends[i].some(Ele => Ele == data.CHATS[n].from)){
                        friendsChat[userFriends.indexOf(userFriends[i])] = data.CHATS[n]
                    }
                }
            }
        }

        //FOR SHOWING OF USER'S FRIENDS
        showFriends(data.FRD, data.PN, data.SORT, friendsChat)

        //FOR SERVING OF THE CHAT LOGs
        const ChatLogs = []
        showChats(ChatLogs, data.FRD, data.SORT, data.PN, MainChats)

        //FOR REMOVING OF CHAT LOG
        $('chatlog button').on('click', () => {
            window.scrollTo(0, document.body.scrollTop)
            document.querySelector('chatlog').style.display = 'none'
            document.querySelector('friendlist').style.display = 'block'
            $('.chats_head').show()
            
            $('.EditId').val('');$('.locator').val('');$('.Msg').val('');$('.EdMsg').val('');$('.SendForm').show();$('.EdForm').hide()
            ChatLogs.length = 0 //For resetting of the Chatlogs to empty
        })
        
        //Log Out Function & Emit That a user went offline
        $('.logOutBtn').on('click', () => { socket.emit('chat message', {Id:'Status', User:data.PN, Status:'offline'});localStorage.setItem(data.PN, 'offline');window.location = '/Log-User-Out' })
        //Emit That a user is online
        socket.emit('chat message', {Id:'Status', User:data.PN, Status:'online'})

        //ADD OTHER USERS FUNCTIONS
        const Disp = document.querySelector('community');Disp.innerHTML = ''
        const Addthem = []
        //SORT FRIENDS LIST
        sortFriends(data.SORT, Addthem, data.PN, data.FRD)
        //ADDING OF FRIENDS & DISPLAY FUNCTION
        addFriends(data.SORT, Addthem, Disp)
    }
})
//Preloader function caller
setInterval(() => {
    $('friendlist div').length > 0 ? document.querySelector('.preloader').style.display = 'none' : document.querySelector('.preloader').style.display = 'flex' 
}, 500);