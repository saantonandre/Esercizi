
<html>
    <head>
        <title>title</title>
    </head>
    <body>
        <?php
        if($_POST){
            $name = $_POST['name'];
            $content = $_POST["commentContent"];
            $handle = fopen("comments2.html","a");
            fwrite($handle,"<b>".$name."<b>:<br/>".$content."<br/>");
            fclose($handle);
        }
        ?>
        <form action="" method = "POST">
        Comments: <textarea rows = "10" cols="30" name="commentContent" required></textarea><br/> Name:
        <input type = "text" name="name" required><br/>
        <input type = "submit" value="Post!"><br/></form>
        <?php include "comments2.html"; ?>
    </body>
</html>