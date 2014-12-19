<?php
/*
 * VERSION: 0.0.1
 * Date: 2014-12-17 
 * dynamic_loader.php
 *
 * Copyright (c) 2014, Anders LindÃ©n
 * Licensed under the MIT license,
 * http://www.opensource.org/licenses/MIT
 * description: This file fetches the images corelating with the file-path 
                set in dynamic_loader.js. */

// Initialize variables
$filename ="";
$parts ="";
$file ="";
$path ="";
$id="";
$class="";
$src ="";

/* This is the search_path sent with ajax
   for example [medium/index/*.txt]
   it goes in the glob method determining which set of
   images to get. */ 
$path = isset($_POST["path"]) ? $_POST["path"] :"";
 
// Open image file(s) 
foreach (glob($path) as $file) {
    $file_handle = fopen($file, "r");
    
   /* Retrieving the name of the base64 imagefile(s)
      for example  jpg_black_img.txt becomes 
      type:jpg
      id:black 
      class:img */
    $filename = pathinfo($file)['filename'];
 
    $parts = explode('_', $filename);
    $type = $parts[0];
    $id = $parts[1];
    $class = $parts[2];
  
   // Getting image source(s).  
    while (!feof($file_handle)) {
     $src = fgets($file_handle);
     } // End while !feof
   
   // Populating 2-dimensional array with the result.  
    $myArray = array(
                     array($type),
                     array($id),
                     array($class),
                     array($src)
                    );
 
// Formating array to comma-separated string. 
$tempArray = array();
foreach ($myArray as $subArray) {
    $tempArray[] = implode(',', $subArray);
    } // End foreach $myArray

    $result = implode(',', $tempArray);
    $format =($result.',');
    echo $format;

} // End foreach glob

fclose($file_handle);
  
exit();
    
?>