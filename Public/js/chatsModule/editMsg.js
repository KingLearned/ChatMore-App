const socket = io()
export const editMessage = (Messages) => {
    for (let e = 0; e < Messages.length; e++) {
        $(`.edit${Messages[e].Id}`).on('click', () => {
            $('.EditId').val(Messages[e].Id)
            $('.EdMsg').val(Messages[e].Msg.split('&lt;').join('<'))

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
}