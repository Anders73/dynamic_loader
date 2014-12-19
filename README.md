# dynamic_loader #
Dynamicly loading base64-coded images with jQuery AJAX based on Window.matchMedia rules. 

----------

## How it works ##

### The image folders ###

For this demo I've created four folders  
small, medium, large, xlarge, each containing  
a set of base64 coded images.   
The naming convention of the base64 text-files is

	[type_id_class].txt    

### The Files ###
	
	dynamic_loader.js  
Creates a filepath-string based on the  
document title and the image-folder-name.  
This string gets posted with an ajax request to   
	
	dynamic_loader.php. 
The php-file retrieves all the files in the destination-folder and  
sends them back to the dynamic_loader.js  

The ajax success function traverses the dom for each of the div-containers that  
match up with the class-name (included in the image-filename).    
The image type(also included in the filename) and source makes up the img-tag  
and appends it to the div-container.

	image_loader.css   
Each image-folder includes a css-file that is    
injected in the html head-element from dynamic_loader.js   
  
----------



## Add more images ##
  
  
    
### Convert ###
    
Convert your different resolution images ( .gif, .png, .jpg ) to base64 with available online tools  
or you can use this php script.

    <?php   
    $img = file_get_contents('name of the file');
    $imgdata = (base64_encode($img));
    $result=$imgdata;
    echo $result; 
    ?>

Copy the result in the browser and paste it in notepad.  
Name the file like this...  

	[type_id_class] 

and save it with (.txt) extension  
        
for example 
	
	jpg_page1_pics.txt
  
  
    
### Folders ###
    
Place the file in either  
 
	assets/small/index  
	assets/medium/index  
	assets/large/index  
	assets/xlarge/index  
  
depending on the image resolution.				 

  
   
### HTML ###
   
Make a div-container for the image.  
The container must have the same id as the id in the filename.      

for example  
	
	<div id="page1"></div> 
  

      
### CSS ###
  
Each folder includes a CSS-file  

make a selector for the image-container    

	#page1 {
	// styles here
	}

and for the image    

	#page1 img {
    // styles here
    }  



> As for type and class in the filename  
> type is used in dynamic_loader.js in the img-tag.      
> The img-tag also gets a class.     