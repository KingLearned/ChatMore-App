const Home = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/main.css">
    <link rel="stylesheet" href="../css/mediaquery.css">
    <link rel="stylesheet" href="../css/fontawesome-free-5.13.0-web/css/all.css">
    <script type="text/javascript" src="../js/jquery.min.js"></script>
    <title>Document</title>
</head>
<body>
<div class="container">
    <div class="login_page">
        <form method="POST" class="LoginForm">
            <close>X</close>
            <input type="text" class="username" placeholder="USERNAME" required>
            <input type="password" class="pwd" placeholder="PASSWORD" required>
            <button>Login</button>
            <h5>Or<br>Forgot Password?</h5>
            <log style="color:rgb(255, 0, 157); height: 15px;"></log>
        </form>
    </div>
    <div class="signup">
        <form method="POST" class="SignUpForm">
            <close>X</close>
            <input type="text" class="sigusername" placeholder="enter a username" required>
            <input type="text" class="tele" placeholder="enter phone" required>
            <input type="password" class="sigpwd" placeholder="enter password" required>
            <input type="password" class="cpwd" placeholder="comfirm password" required>
            <button>Signup</button>
            <sig style="color:rgb(255, 0, 157); height: 15px;"></sig>
        </form>
    </div>
    <div class="pro-media">
        <img src="../images/facebook.png" alt="">
        <img src="../images/twitter.png" alt="">
        <img src="../images/instagram.png" alt="">
    </div>
    <div class="navbar">
        <div class="logo">
            <img src="../images/ChatMore_Logo.png" alt="Logo">
        </div>
        <div class="select">
            <a href="">About</a>
        </div>
    </div>
    <div class="main-section">
        <h1>WELCOME TO CHATMORE <br>CHAT BETTER</h1>
        <button class="login_btn">Login</button>
        <button class="signup_btn">Signup</button>
    </div>
    <div class="footer">
        <div class="sub-nav">
            <a href="">Terms & Conditions</a>
            <a href="">Privacy Policy</a>
        </div>
        <div class="copyright">
            ©Copyright 2022, ChatMore
        </div>
    </div>
</div>
<script type="text/javascript" src="../js/main.js"></script>
</body>
</html>
`

module.exports = Home