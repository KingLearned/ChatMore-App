// #################### HOME HANDLER ########################
const Login = document.querySelector('.login_page')
const Signup = document.querySelector('.signup')
$('.login_btn').on('click', () => {
    Login.style.display = 'flex'
    $('.username').focus()
    
})
$('.signup_btn').on('click', () => {
    Signup.style.display = 'flex'
    $('.sigusername').focus()
})
$('close').on('click', () => {
    Login.style.display = 'none'
    Signup.style.display = 'none'
    $('input').val('')
})
$('.tele').on('keypress', () => {
    $('.tele').val($('.tele').val().replace(/[^0-9]/g, ""))
})
$('.tele').on('keyup', () => {
    $('.tele').val($('.tele').val().replace(/[^0-9]/g, ""))
})

$('.LoginForm').on('submit', (e) => {
    e.preventDefault()
        $.ajax({
            method: "POST",
            data: {
                Log_Name: $('.username').val(),
                Log_Pwd: $('.pwd').val()
            },
            success: (data) => {
                const Auth = data.Approved ? window.location.href = '/' : $('log').html(data.msg)
                setTimeout(() => { $('log').html('') }, 3000)
            },
            error: (err) => {
                console.log(err)
            }
        })
})

// ##########################   SIGN UP   #############################
$('.SignUpForm').on('submit', (e) => {
    e.preventDefault()
        $.ajax({
            method: "POST",
            data: {
                Sig_Name: $('.sigusername').val().toLocaleLowerCase(),
                Sig_Tele: $('.tele').val(),
                Sig_Pwd: $('.sigpwd').val(),
                Sig_CPwd: $('.cpwd').val()
            },
            success: (data) => {
                if(data.Successful){
                    window.location.href = '/'
                }
                if(data.ErrMsg){
                    $('sig').html(data.ErrMsg)
                    setTimeout(() => {
                        $('sig').html('')
                    }, 3000)
                }
            },
            error: (err) => {
                console.log(err)
            }
        })
})
// ###################################################

// ##################### CHATS HEADER BUTTON ##########################
const Cht = document.querySelector('.chat')
const ChtDis = document.querySelector('.friends')
const Grp = document.querySelector('.group')
const GrpDis = document.querySelector('groups')
const Comm = document.querySelector('.community')
const CommDis = document.querySelector('community')
Cht.style.color = 'black'

// document.querySelector('chatlog').style.display = 'flex' //Display Chat With a Friend
// document.querySelector('friendlist').style.display = 'none'//Hide Friend
// document.querySelector('.friends').style.height = 'auto'

Cht.addEventListener('click', () => {
    Cht.style.color = 'black'
    Grp.style.color = ''
    Comm.style.color = ''
    ChtDis.style.display = 'block'
    GrpDis.style.display = 'none'
    CommDis.style.display = 'none'
    if($('.friends div').length > 4){
        document.querySelector('.friends').style.height = 'auto'
    }else{
        document.querySelector('.friends').style.height = '53vh'
    }
})
Grp.addEventListener('click', () => {
    if($('groups div').length > 4){
        document.querySelector('groups').style.height = 'auto'
    }
    Grp.style.color = 'black'
    Cht.style.color = ''
    Comm.style.color = ''
    GrpDis.style.display = 'block'
    ChtDis.style.display = 'none'
    CommDis.style.display = 'none'
})
Comm.addEventListener('click', () => {
    Comm.style.color = 'black'
    Grp.style.color = ''
    Cht.style.color = ''
    CommDis.style.display = 'block'
    GrpDis.style.display = 'none'
    ChtDis.style.display = 'none'
})

