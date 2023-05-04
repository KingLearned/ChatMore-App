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

const NavBar = [document.querySelector('.chat'), document.querySelector('.group'), document.querySelector('.community')]
const NavDisplay = [document.querySelector('.friends'), document.querySelector('groups'), document.querySelector('community')]
const HeightEle = ['.friends', 'groups', 'community']
NavBar[0].style.color = 'black'
NavBar.forEach(eachNav => {
   eachNav.addEventListener('click', () => {
        for (let i = 0; i < NavBar.length; i++) {
            const Navigator = eachNav == NavBar[i] ? 
            (eachNav.style.color = 'black', NavDisplay[NavBar.indexOf(eachNav)].style.display = 'block' ) : 
            (NavBar[i].style.color = '', NavDisplay[i].style.display = 'none')

            const viewHeight = $(`${HeightEle[NavBar.indexOf(eachNav)]} div`).length > 6 ? 
            NavDisplay[NavBar.indexOf(eachNav)].style.height = 'auto' :
            NavDisplay[NavBar.indexOf(eachNav)].style.height = '88vh'
        }  
    })
})

//CHANGING OF USER PROFILE IMAGE
function Submit(){
    $('.CImg').html($('#userimage').val())
    document.querySelector('.fa-upload').style.display = 'block'
    document.querySelector('.fa-pen').style.display = 'none'
}

//APP EMOJIS FUNCTIONALITIES
const Smiles = ['😎', '😡', '😊','😍', '😅', '😁', '💓','💔', '😒', '😜','☕', '🏃',]
let SmileCount = 0
$('smile').on('click', () => {
    $('emojis').html('')
    for (let i = 0; i < Smiles.length; i++) {
        $('emojis').html($('emojis').html() + `<emo>${Smiles[i]}</emo>`)
    }
    const Emoji = SmileCount == 0 ? ($('emojis').show(),SmileCount=1) : ($('emojis').hide(),SmileCount=0)

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
})

if($('friendlist div').length > 0){
    document.querySelector('.preloader').style.display = 'none'
}else{
    document.querySelector('.preloader').style.display = 'flex'
}

