$.ajax({
    method:"POST",
    success: (data) => {
        const Dis = document.querySelector('grouplist')
        Dis.innerHTML = ''
        //Displaying Of Various Chat Groups
        for (let i = 0; i < data.GRP.length; i++) {
            Dis.innerHTML +=`
                <div class="ChatIn${data.GRP[i].groupid}">
                    <img src="../images/3.jpg" alt="">
                    <display>
                        <groupname>${data.GRP[i].groupname}</groupname><br>
                        <chatname></chatname><talk>Last Msg...</talk>
                        </display>
                </div>
                `
        }
        const GrpHv = $('grouplist div').length > 4 ? 
        document.querySelector('groups').style.height = 'auto' : 
        document.querySelector('groups').style.height = '100%'
        // document.querySelector('groups').style.height = '53vh'
         
        let MsgL //Get Concurrent Elements
        let ActualNum // Get Elements to Check EventListener
        const Log = document.querySelector('grouplogs')//Group Logs Display
        for (let i = 0; i < data.GRP.length; i++) {
            //Clicking of any Any Group To Get Served
            $(`.ChatIn${data.GRP[i].groupid}`).on('click', () => {
                document.querySelector('groupchats').style.display = 'flex'
                document.querySelector('grouplist').style.display = 'none'
                $('.top_menu').hide()

                $('groupchats h2').html(data.GRP[i].groupname) // Display Group Name
                $('.GrpID').val(data.GRP[i].groupid) //Assign Input The Group ID

                //Displaying Of The Group Chats Logs 
                Log.innerHTML = ''
                for (let n = 0; n < data.GRPLog.length; n++) {
                    var active = ''
                    let Person = data.GRPLog[n].from
                    if(data.GRPLog[n].from == data.PN){
                        active = 'activeme'
                        Person = 'you'
                    }
                    if(data.GRPLog[n].sento == data.GRP[i].groupid){
                        Log.innerHTML +=`
                        <article class="${active}">
                            <logname>@${Person}</logname>
                            <log>${data.GRPLog[n].Msg}</log>
                        </article>
                        `
                    }
                }
                Hview()//Run The Height Handler Function

                //Sending Of Chat To Group
                $('.GrpChatForm').on('submit', (e) => {
                    e.preventDefault()
                    $.ajax({
                        method:"POST",
                        data:{
                            GrpID: $('.GrpID').val(),
                            GrpMsg: $('.GrpMsg').val()
                        }
                    })
                    $('.GrpMsg').val('')
                    Hview()
                    setTimeout(() => {$('.GrpMsg').focus()}, 500);
                })
                /***********************************/
                ActualNum = $('grouplogs article').length //Initializing the actual length
            })
        }

            //View Height Main Function
            function Hview(){
                MsgL = $('grouplogs article').length
                window.location.href='#..'
                $('.GrpMsg').focus()
                // document.querySelector('groups').style.height = 'auto' 
                const Hig = $('grouplogs article').length >= 6 ? 
                document.querySelector('groups').style.height = '100%' : 
                document.querySelector('groups').style.height = '85vh'
            }
            
            //Closing Of Group Button Function
            $('groupchats button').on('click', () => {
                
                const Refresh = MsgL > ActualNum ? $.getScript("../js/grouphandler.js") : ''

                document.querySelector('grouplist').style.display = 'block'
                document.querySelector('groupchats').style.display = 'none'
                $('.top_menu').show()

                // const GrpHv = $('grouplist div').length > 4 ? 
                // document.querySelector('groups').style.height = 'auto' : 
                // document.querySelector('groups').style.height = '53vh'
            })

    }
})
