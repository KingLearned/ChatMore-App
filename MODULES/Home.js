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
            <input type="text" class="username" placeholder="username" required>
            <input type="password" class="pwd" placeholder="password" required>
            <button>Login</button>
            <h5>Or<br>Forgot Password?</h5>
            <log style="color:white; height: 15px;"></log>
        </form>
    </div>
    <div class="signup">
        <form method="POST" class="SignUpForm">
            <close>X</close>
            <input type="text" class="sigusername" placeholder="enter a username" required>
            <input type="tel" class="tele" placeholder="enter phone number" required>
            <input type="password" class="sigpwd" placeholder="enter password" required>
            <input type="password" class="cpwd" placeholder="comfirm password" required>
            <button>Signup</button>
            <sig style="color:white; height: 15px;"></sig>
        </form>
    </div>
    <!-- <div class="navbar">
    </div> -->
    <div class="main-section">
        <img src="../images/Icon.png" alt="">
        <h1>ChatMore</h1>
        <button class="signup_btn">Sign up</button>
        <button class="login_btn">Log in</button>
    </div>
    <div class="footer">
        <div class="copyright">
            ©ChatMore 2022 - ${(new Date).getFullYear()} || Developed by LDC
        </div>
    </div>
</div>
<script type="text/javascript" src="../js/main.js"></script>
</body>
</html>
`

module.exports = Home