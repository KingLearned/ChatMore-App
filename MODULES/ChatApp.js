const ChatApp = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/main.css">
    <link rel="stylesheet" href="../css/fontawesome-free-5.13.0-web/css/all.css">
    <script type="text/javascript" src="../js/jquery.min.js"></script>
    <title>Document</title>
</head>
<body>
<div class="container">
    <div class="pro-media">
        <img src="../images/facebook.png" alt="">
        <img src="../images/twitter.png" alt="">
        <img src="../images/instagram.png" alt="">
    </div>
    <div class="navbar">
        <div class="logo">
            <img src="../images/ChatMore_Logo.png" alt="logo">
        </div>
        <div class="select">
            <a href="/Log-User-Out">Logout</a>
        </div>
    </div>
    <!-- ################################# USER PROFILE EDIT ############################ -->
    <div class="user_profile">
        <button>X</button>
        <userimage>
            <div>
                <form method="POST" enctype="multipart/form-data">
                    <dpx><span style="font-weight: 100;">loading...</span></dpx>
                    <input type="file" name="user_img" id="userimage" onchange="Submit()" hidden accept="image/*">
                    <input type="submit" id="upload" hidden>
                    <h6 class="CImg"></h6>
                    <label for="userimage" class="fa fa-pen"></label>
                    <label for="upload" class="fa fa-upload"></label>
                </form>
            </div>
            <yourname>Nelson</yourname>
        </userimage>
        <maincontent>
            <form method="POST">
                <h3>About:</h3><textarea name="about" class="aboutme">Loading...</textarea><input type="submit" value="POST">
            </form>
            <h3>Number: <tel></tel></h3>
            <form method="POST">
                <h3>Update Password:</h3><input type="text" name="updatepwd" placeholder="Change Password">
            </form>
        </maincontent>
    </div>
    <!-- ################################################################## -->
    <div class="app">
        <div class="profile">
            <dp title="Edit Profile"></dp>
            <yourname><span style="font-weight: 100;">loading...</span></yourname>
        </div>
        <div class="chats_head">
            <h1 class="chat"><i class="fa fa-comments"></i> Chats</h1>
            <h1 class="group"><i class="fa fa-users"></i> Groups</h1>
            <h1 class="community"><i class="fa fa-university"></i> Community</h1>
        </div>
        <div class="appcontainer">
            <div class="friends">
                <friendlist>
                    <!-- <div>
                        <img src="../images/FeizYEoWIAMytmR.jpg" alt="">
                        <display>
                            <chatname>Besty 😍</chatname><br>
                            <talk>Hey how are you doing 047</talk>
                        </display>
                    </div> -->
                </friendlist>
                <chatlog>
                    <button>X</button>
                    <h1>Chat Log of you and Frank</h1>
                    <logs>
                        <!-- <article class="edit" onclick="window.location.href='#lk'">
                            <logname>@Franky Man</logname>
                            <log>Whats up man</log>
                            <make>
                                <edit class="fa fa-pen" title="Edit Message"></edit>
                                <del class="fa fa-window-close" title="Delete Message"></del>
                            </make>
                        </article>
                        <article>
                            <logname>you</logname>
                            <log>I'm fine man</log>
                        </article> -->
                    </logs>
                    <form method="POST" id="..." class="Delform"><input type="text" name="GrpID" class="GrpID" hidden><input type="text" name="locator" class="locator" required hidden><input type="text" name="repto" class="repto" required hidden><input type="text" name="EditId" class="EditId" hidden><input type="text" name="DelId" class="DelId" hidden><input type="text" name="Msg" class="Msg" placeholder="Enter a Message" required><input type="submit" value="SEND"></form>
                </chatlog>
            </div>
            <!-- ############################ GROUP SECTION ############################### -->
            <!-- ############################ GROUP SECTION ############################### -->
            <groups>
                <grouplist>
                    <!-- <div>
                        <img src="../images/Retro.ico" alt="">
                        <display>
                            <groupname>World Tech Gaints</groupname><br>
                            <chatname>Besty 😍:</chatname><talk> Hey how are you doing 047</talk>
                        </display>
                    </div>
                    <div>
                        <img src="../images/Retro.ico" alt="">
                        <display>
                            <groupname>All Sports Preview</groupname><br>
                            <chatname>Besty 😍:</chatname><talk> Hey how are you doing 047</talk>
                        </display>
                    </div> -->
                </grouplist>
                <groupchats>
                <button>X</button>
                    <h2>World Tech Gaints</h2>
                    <grouplogs>
                        <!-- <article>
                            <logname>@james</logname>
                            <log>I'm fine man, it has been too long since we mat</log>
                        </article>
                        <article>
                            <logname>@praise</logname>
                            <log>I'm fine man, it has been too long since we mat</log>
                        </article> -->
                        <!-- <article>
                            <logname>@grace</logname>
                            <log>I'm fine man, it has been too long since we mat</log>
                        </article> -->
                        <!-- <article class="activeme">
                            <logname>@grace</logname>
                            <log>I'm fine man, it has been too long since we mat</log>
                        </article> -->
                    </grouplogs>
                    <form method="POST" id=".." >
                        <!-- <input type="text" name="locator" class="locator" required hidden> -->
                        <input type="text" name="GrpNM" class="GrpNM" required hidden>
                        <input type="text" name="GrpID" class="GrpID" required hidden>
                        <input type="text" name="GrpMsg" placeholder="Enter a Message" required>
                        <!-- <input type="text" name="EditId" class="EditId" hidden>
                        <input type="text" name="DelId" class="DelId" hidden>-->
                        <input type="submit" value="SEND">
                    </form>
                </groupchats>
            </groups>

            <script>
                // document.querySelector('groupchats').style.display = 'flex'
                // document.querySelector('grouplist').style.display = 'none'
                // document.querySelector('groups').style.height = 'auto'
                // document.querySelector('.friends').style.display = 'none'
                // document.querySelector('groups').style.display = 'block'
            </script>
            <!-- ############################ COMMUNITY SECTION ############################### -->
            <!-- ############################ COMMUNITY SECTION ############################### -->
            <community>
                <!-- <div>
                    <img src="../images/Retro.ico" alt="">
                    <display>
                        <chatname>Besty</chatname><br>
                        <about><b>About Me:</b> Minding your business is what I like</about>
                    </display>
                    <add class="fa fa-user-check"></add>
                </div> -->
            </community>
        </div>
    </div>
    <div class="footer">
        <div class="sub-nav">
            <a href="">Terms & Conditions</a>
            <a href="">Privacy Policy</a>
            <a href="">Discliamer</a>
        </div>
        <div class="copyright">
            ©Copyright 2022, ChatMore
        </div>
    </div>
</div>
<form method="POST" class="addfform" hidden><input type="text" name="addfriend" class="entfriend" required></form>
<script type="text/javascript" src="../js/grouphandler.js"></script>
<script type="text/javascript" src="../js/&5423442locate.js"></script>
<script type="text/javascript" src="../js/chat.js"></script>
<script type="text/javascript" src="../js/main.js"></script>
</body>
</html>
`
module.exports = ChatApp