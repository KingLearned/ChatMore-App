// #################### HOME HANDLER ########################
const Login = document.querySelector('.login_page')
const Signup = document.querySelector('.signup')
$('.login_btn').on('click', () => {
    Login.style.display = 'flex'
})
$('.signup_btn').on('click', () => {
    Signup.style.display = 'flex'
})
$('close').on('click', () => {
    Login.style.display = 'none'
    Signup.style.display = 'none'
    $('input').val('')
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
                Sig_Name: $('.sigusername').val(),
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

Cht.addEventListener('click', () => {
    Cht.style.color = 'black'
    Grp.style.color = ''
    Comm.style.color = ''
    ChtDis.style.display = 'block'
    GrpDis.style.display = 'none'
    CommDis.style.display = 'none'
})
Grp.addEventListener('click', () => {
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

