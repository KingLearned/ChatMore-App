const Home = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/main.css">
    <link rel="stylesheet" href="../css/mediaquery.css">
    <link rel="stylesheet" href="../css/fontawesome-free-5.13.0-web/css/all.css">
    <link rel="shortcut icon" href="../images/Icon.png" type="image/x-icon">
    <script type="text/javascript" src="../js/jquery.min.js"></script>
    <title>ChatMore</title>
</head>
<body>
<div class="container">
    <div class="login_page">
        <form method="POST" class="LoginForm">
            <close class="fa fa-arrow-left"></close>
            <input type="text" class="username" placeholder="Username" required>
            <input type="password" class="pwd" placeholder="Password" required>
            <button>Login</button>
            <sig style="color:rgb(207, 38, 207); height: 15px;"></sig>
        </form>
    </div>
    <div class="signup">
        <form method="POST" class="SignUpForm">
            <close class="fa fa-arrow-left"></close>
            <input type="text" class="sigusername" placeholder="Choose Username" required>
            <input type="tel" class="tele" placeholder="Enter Phone Number" required>
            <input type="password" class="sigpwd" placeholder="Enter Password" required>
            <input type="password" class="cpwd" placeholder="Comfirm Password" required>
            <button>Sign up</button>
            <sig style="color:rgb(207, 38, 207); height: 15px;"></sig>
        </form>
    </div>
    <div class="main-section">
        <img src="../images/Icon.png" alt="">
        <h1>ChatMore</h1>
    </div>
    <div class="signinarea">
        <div class="top">
            <h5>Enjoy the new experience of <br>chating with global friends</h5>
            <h6>Connect with people around the world</h6>
            <button class="signup_btn">Get Started</button>
            <button class="login_btn">Sign in</button>
        </div>
        <div class="footer">
            <img src="../images/powered.png" alt="" width="40%">
        </div>
    </div>
</div>
<script type="text/javascript" src="../js/main.js"></script>
</body>
</html>
`

module.exports = Home