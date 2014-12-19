(function() { 
/*
 * VERSION: 0.0.1
 * Date: 2014-12-17 
 * dynamic_loader.js
 *
 * Copyright (c) 2014, Anders Lind├®n
 * Licensed under the MIT license,
 * http://www.opensource.org/licenses/MIT
 * description: Checks the client viewport-dimensions with window-match-media.
                Posting a file-path to dynamic_loader.php with ajax
                and loads the images to index.html. */
 
 
$(document).ready(function() {

/* Posting the search_path to dynamic_loader.php */
function sendit(search_path) {
       $.ajax({
              type: 'post',
              dataType: 'text',
              url: 'assets/dynamic_loader.php',
              data: {'path': search_path},
              success: function(data) {
                     
                     var array = data.split(',');
               
                     /* Manipulating array splicing out each image
                        [0] = type  [1] = id  [2] = class  [3] base64 string
                        and sending an image element with alt attribute to demo.html */
                     run();
                     function run() {
                            if (array.length > 1 ) {
                                   var result = array.splice(0,4);
                                        if(result[0] === "gif" || result[0] === "png" || result[0] === "jpg") {
                                            var div = $('.'+result[1]);
                                            var image ='<img class="'+result[2]+'" alt="image of the color '+result[0]+'" src="data:image/'+result[0]+';base64,'+result[3]+'"/>';
                                            div.html(image);
                                             run();

                                
                                        } // End if result
                                
                            } // End if array 
                            
                     } // End run
                   
              },// End data
              error : function(XMLHttpRequest, textStatus, errorThrown) {
              var error = $('.error');
              textStatus = 'Content';
              error.append(textStatus+' '+errorThrown);
              } // End error
     
       }); // End ajax
} // End sendit
 
/* Using window-match-media to determine which image folder to use
   i.e small,medium,large or xlarge.
   Finally a call to complete_path(), passing the name of the folder */
var folderNumber;
var currentFolderNumber;    
function matchMedia() {
       
       // Checking for High-resolution
       var mql0 = window.matchMedia("(min-resolution: 196dpi),(-webkit-min-device-pixel-ratio: 2), (min--moz-device-pixel-ratio: 2), (-o-min-device-pixel-ratio: 2/1), (min-device-pixel-ratio: 2), (min-resolution: 2dppx)");
        
       // High-resolution true or false
       var mq;
       if(mql0.matches){
       mq = true;       
              }else{
              mq = false;  
       }
       
       
       // Setting the CSS-rules.
       var mql1 = window.matchMedia("screen and (max-width: 480px)");
       var mql2 = window.matchMedia("screen and (min-width: 481px) and (max-width:960px)");
       var mql3 = window.matchMedia("screen and (min-width: 961px) and (max-width:1336px)");
       var mql4 = window.matchMedia("screen and (min-width: 1337px) and (max-width:1536px)");
       var mql5 = window.matchMedia("screen and (min-width: 1537px)");
    
       // Searching for the matching rule --> getQuery
       var rules = [mql1.media,mql2.media,mql3.media,mql4.media,mql5.media];
            
       var mql=[mql1.matches,mql2.matches,mql3.matches,mql4.matches,mql5.matches];
            
       var search_result = mql.indexOf(true);
           
       var getQuery = rules[search_result];
           
              
       // Setting the name of the image-folder.
       var folder;
       switch(true) {
        
       case getQuery === mql1.media && mq === false:
       folder="small";
       break;
       
       case getQuery === mql1.media && mq === true:
       folder="medium";
       break;
       
       case getQuery === mql2.media && mq === false:
       folder="medium";
       break;
       
       case getQuery === mql2.media && mq === true:
       folder="large";
       break;

       case getQuery === mql3.media && mq === false:
       folder="large";
       break;
       
       case getQuery === mql3.media && mq === true:
       folder="xlarge"
       break;
       
       case getQuery === mql4.media && mq === false:
       folder="large";
       break;

       case getQuery === mql4.media && mq === true:
       folder="xlarge";
       break;
       
       case getQuery === mql5.media:
       folder="xlarge";
       break;
       
       default:
       folder="medium";
      
       }
  
       if (folder === "small") {
            folderNumber = 1;
       }
       else if (folder === "medium") {
            folderNumber = 2;
       }
       else if(folder === "large") {
            folderNumber = 3;
       }
       else if (folder === "xlarge") {
            folderNumber = 4 ;
       }
  
            /*To prevent additional calls if a larger image
              already is loaded */
            if(folderNumber <= currentFolderNumber) {
                return false;
            }else{
            
                currentFolderNumber = folderNumber;
                complete_path(folder);
            }
}

/* Setting the search_path based on current:
       page-title and image-folder,
       and adding the image-folder css-file to the head element.
       Finally a call to sendit(), passing the search_path */
   
function complete_path(folder) {
         var title = document.getElementsByTagName("title")[0].innerHTML;
         var search_path;
         var search_path_css;
         
         search_path_css = folder + '/' + title;
      
         var head  = document.getElementsByTagName('head')[0];
         var link  = document.createElement('link');
         link.rel  = 'stylesheet';
         link.type = 'text/css';
         link.href = 'assets/'+search_path_css+'/styles.css';
         head.appendChild(link);
 
         search_path = folder + '/' + title + '/*.txt';
         sendit(search_path);
    
        }
    
    /* Run matchMedia */
    window.onload = function() {
    matchMedia();
    }
    
    window.onresize = function() {
    matchMedia();
} 
  

    }); // End document.ready
 
})(); // End script