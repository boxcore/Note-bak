<?php
require 'config.php';
$sql = 'select * from `link` order by sort desc';
$result = mysql_query($sql);
while($row=mysql_fetch_array($result)){
   $link_list[] = $row;
}
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>BoxCore - Share What I Write!</title>
    <script src="/assets/js/jquery-1.7.2.min.js"></script>
    <script src="/assets/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="/assets/css/bootstrap.css">
</head>
<body>
    <div id="header">
        
    </div>

    <div id="main">
<?php
$i = 0;
@$tot = count($link_list);
?>
    <?php if(isset($link_list)) { ?>
        <div class="row">
        <?php foreach($link_list as $v){ ?>

            <div class="col-sm-4 col-md-2 ">
                <div class="thumbnail">
<!--                    <a href="--><?php //echo $v['link_url']; ?><!--" title="" target="_blank"><img class="lazy" src="assets/img/headroom.png" width="300" height="150" data-src="--><?php //echo $v['link_img']; ?><!--"></a>-->
                    <div class="caption">
                        <h3>
                            <a href="<?php echo $v['link_url']; ?>" title="" target="_blank"><?php echo $v['link_name']; ?><br><small><?php echo $v['link_title']; ?></small></a>
                        </h3>
                        <p><?php echo $v['link_description']; ?></p>
                    </div>
                </div>
            </div>
<?php if($i && ($i%6 === 0) ){ ?></div><div class="row"><?php } ?>
        <?php $i++; } ?>
        </div>
    <?php  } ?>

        <hr/>
        <h1>目录浏览：</h1>
        <div class="row">
        <iframe src="scan_dir.php" frameborder="0" width="600" height="500"></iframe>
            </div>

    <div id="footer">
        
    </div>
</body>
</html>