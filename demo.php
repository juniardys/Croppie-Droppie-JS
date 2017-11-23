<!DOCTYPE html>
<html>
<head>
	<title>Demo Croppie Droppie</title>
	<!-- Load Plugins Needed -->
	<link rel="stylesheet" type="text/css" href="plugins/css/font-awesome.css">
	<link rel="stylesheet" type="text/css" href="plugins/croppie/croppie.css">
	<script type="text/javascript" src="plugins/jquery/jquery-2.1.4.min.js"></script>
	<script type="text/javascript" src="plugins/croppie/croppie.js"></script>
	<script type="text/javascript" src="plugins/croppie/exif.js"></script>
	<!-- Load Croppie Droppie -->
	<link rel="stylesheet" type="text/css" href="src/croppie_droppie.css">
	<script type="text/javascript" src="src/croppie_droppie.js"></script>

	<!-- Example CSS for loader -->
	<style type="text/css">
	    #loader {
	        z-index: 1000000;
	        top: 0;
	        left: 0;
	        position: fixed;
	        width: 100%;
	        height: 100%;
	        text-align: center;
	        background: rgba(1,1,1,0.2);
	    }
	    .img-loader {
	        border: 10px solid #f3f3f3; /* Light grey */
	        border-top: 10px solid #3498db; /* Blue */
	        border-radius: 50%;
	        width: 50px;
	        height: 50px;
	        position: absolute;
	        margin: auto;
	        top:0;
	        bottom: 0;
	        left: 0;
	        right: 0;
	        animation: spin 2s linear infinite;
	    }

	    @keyframes spin {
	        0% { transform: rotate(0deg); }
	        100% { transform: rotate(360deg); }
	    }
	</style>
</head>
<body>
<!-- Example Loader -->
<div id="loader" style="display:none">
    <div class="img-loader"></div>
</div>
<!-- 
	HTML for Image Upload.
	attributes required data-path, data-url.
 -->
<div id="croppie_droppie" data-path="images" data-url="server_side/upload.php" img-width="200" img-height="200">
    <input type="file" class="input-file" style="display: none">
    <!-- Input For image name to saved into database -->
    <input type="hidden" id="photo" name="photo" class="hidden-file">

    <!-- Drop Zone -->
    <div class="drop-zone upload-drop-zone" style="max-height: 300px">
    	<!-- Image Zone -->
        <img class="img-cropped">
        <!-- Croppie Zone -->
        <div class="croppie-zone"></div>
        <!-- Show on Drop Zone -->
        <span class="show-on-dropzone show-on">
            <i class="fa fa-cloud-upload" style="font-size: 28px"></i>
        </span>
    </div>
    <!-- Show on croppie (when cropping) -->
    <div class="show-on-croppie show-on">
        <button type="button" class="croppie-change-btn"><i class="fa fa-refresh"></i> Change Photo</button>                
        <button type="button" class="croppie-crop-btn"><i class="fa fa-cut"></i> Crop</button>                
    </div>
    <!-- Show on Crop Before Upload -->
    <div class="show-oncrop-before-upload show-on">
        <button type="button" class="croppie-edit-btn"><i class="fa fa-edit"></i> Edit</button>                
        <button type="button" class="croppie-upload-btn"><i class="fa fa-save"></i> Save</button>                
    </div>
    <!-- Show on Crop After Upload -->
    <div class="show-oncrop-after-upload show-on">
        <button type="button" class="croppie-change-btn"><i class="fa fa-refresh"></i> Change Photo</button>                
    </div>
</div>
</body>
</html>
<script type="text/javascript">
	$(function(){
		// Initialization croppie droppie
		croppie_droppie($('#croppie_droppie'), $('#loader'));
	})
</script>

