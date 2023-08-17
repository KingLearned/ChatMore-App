// #################### HOME HANDLER ########################
const Login = document.querySelector('.login_page')
const Signup = document.querySelector('.signup')
$('.login_btn').on('click', () => {
    Login.style.display = 'flex'
    Signup.style.display = 'none'
    $('.username').focus()
    
})

$('.signup_btn').on('click', () => {
    Login.style.display = 'none'
    Signup.style.display = 'flex'
    $('.sigusername').focus()
})
    Login.style.display = 'none'
    Signup.style.display = 'flex'
    $('.sigusername').focus()

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

// ##########################   LOGIN    #############################
$('.LoginForm').on('submit', (e) => {
    e.preventDefault()
        $.ajax({
            method: "POST",
            data: {
                Log_Name: $('.username').val(),
                Log_Pwd: $('.pwd').val()
            },
            success: (data) => {
                const Auth = data.Approved ? window.location.href = '/' : $('sig').html(data.msg)
                setTimeout(() => { $('sig').html('') }, 3000)
            },
            error: (err) => {
                console.log(err)
            }
        })
})

// ##########################   SIGN UP   #############################
$('.SignUpForm').on('submit', (e) => {
    const displayErr = (errMsg) => { $('sig').html(errMsg); setTimeout(() => { $('sig').html('') }, 3000) }
    e.preventDefault()
    if($('.tele').val() == $('.tele').val().replace(/[^081^091]/g, "")){
        displayErr('Invalid Telenumber')

    }else{

    
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
                    displayErr(data.ErrMsg)
                }
            },
            error: (err) => {
                console.log(err)
            }
        })
    }
})