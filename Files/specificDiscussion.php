<?php
$topic = $topic??$_GET["discTopic"];
?>
<!DOCTYPE html>
<html>

<head>
  <div class="wrapper">
    <?php include "pageheader.php"; ?>
  </div>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

  <script src="script/specificDiscussion.js"></script>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
    crossorigin="anonymous"></script>
  <script>
    var topic = '<?php echo $topic; ?>'  
  </script>
</head>

<body onload="discussion(topic)">
  <div id="discomments">

  </div>
  <footer>
  <nav style="--bs-breadcrumb-divider: '-';" aria-label="breadcrumb">
            <ul class="breadcrumb">
            <?php 
            $current ='SpecificDiscussion';
            //print_r($_SESSION['prevPage']);
                    if(isset($_SESSION['prevPage']))
                    {
                        $previous = $_SESSION['prevPage'];
                        echo "<li class='breadcrumb-item'><a href='#'>$previous </a></li>";
                        echo "<li class='breadcrumb-item'><a href='#'>$current </a></li>";
                    }
                   else
                   {
                    echo "<li class='breadcrumb-item'><a href='#'>$current </a></li>";
                    }
                    $_SESSION['prevPage']=$current;?>
            </ul>
          </nav>
    </footer>
    <script>setInterval(discussion(topic),30000)</script>
</body>

</html>
