$.ajax({
    method:"POST",
    success: (data) => {
        const Dis = document.querySelector('grouplist')
        Dis.innerHTML = ''
        //Displaying Of Various Chat Groups
        for (let i = 0; i < data.GRP.length; i++) {
            Dis.innerHTML +=`
                <div class="ChatIn${data.GRP[i].groupid}">
                    <img src="../images/group.jpg" alt="">
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
         
        const GrpLog = $('grouplogs')//Group Logs Display
        for (let i = 0; i < data.GRP.length; i++) {
            //Clicking of any Any Group To Get Served
            $(`.ChatIn${data.GRP[i].groupid}`).on('click', () => {
                $.ajax({
                method:"POST",
                success: (data) => {
                        document.querySelector('groupchats').style.display = 'flex'
                        document.querySelector('grouplist').style.display = 'none'
                        $('.top_menu').hide()

                        $('groupchats h2').html(data.GRP[i].groupname) // Display Group Name
                        $('.GrpID').val(data.GRP[i].groupid) //Assign Input The Group ID
                        $('.EleDiv').val((data.GRP[i].groupname).split(' ').join(''))

                        //Displaying Of The Group Chats Logs 
                        const Ele = (data.GRP[i].groupname).split(' ').join('')
                        GrpLog.html(`<${Ele}></${Ele}>`)
                        const Log  = document.querySelector(`${Ele}`)
                        Log.style.display = 'flex'
                        Log.style.flexDirection = 'column'

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
                                    <time>${data.GRPLog[n].time}</time>
                                </article>
                                `
                            }
                        }
                        Hview()
                    }
                }) 
            })
        }

            //View Height Main Function
            function Hview(){
                $('.GrpMsg').focus()
                const Hig = $('grouplogs article').length >= 6 ? 
                document.querySelector('groups').style.height = '100%' : 
                document.querySelector('groups').style.height = '85vh'
                window.scrollTo(0, document.body.scrollHeight)
            }
            
            //Closing Of Group Button Function
            $('groupchats button').on('click', () => {
                window.scrollTo(0, document.body.scrollTop)
                document.querySelector('grouplist').style.display = 'block'
                document.querySelector('groupchats').style.display = 'none'
                $('.top_menu').show()

                const GrpHv = $('grouplist div').length > 4 ? 
                document.querySelector('groups').style.height = 'auto' : 
                document.querySelector('groups').style.height = '53vh'
            })

    }
})
