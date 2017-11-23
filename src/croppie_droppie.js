/**

    @function croppie_droppie
    @params $container id of container
    @params $loader id of loader for ajax
    @html_attributes data-path data path url of image
    @html_attributes data-url data url to upload image
    @html_attributes data-img data name of image if exist
    @html_attributes img-width image width of cropping in px
    @html_attributes img-height image height of cropping in px
    @html_attributes img-type image type of croppie like 'circle','square'
    @html_attributes res-width image width result in px
    @html_attributes res-height image height result in px
    @html_attributes box-width box width of cropping in px
    @html_attributes box-height box height of cropping in px
    @html_attributes msg-success success message of uploading image
    @html_attributes msg-error error message of uploading image
*/

function croppie_droppie($container, $loader = null){
    var $dropZone = $container.find('.drop-zone');
    var $inputfile = $container.find('.input-file');
    var $croppie = $container.find('.croppie-zone');
    var $inputhidden = $container.find('.hidden-file');
    var $cropped = $container.find('.img-cropped');

    var swal_loaded = (typeof(swal) === 'function');
    var ajaxUpload = false;
    var first_upload = true;
    var first_time = true;
    var dataimagesrc = $container.attr('data-img');
    var dataimagepath = $container.attr('data-path');
    var dataurl = $container.attr('data-url');
    var datamsgsuccess = $container.attr('msg-success') || 'Success Uploading Image';
    var datamsgerror = $container.attr('msg-error') || 'Error Uploading Image';
    var dataimagenew = null;
    var img_viewport = {
        width: parseInt($container.attr('img-width')) || 200,
        height: parseInt($container.attr('img-height')) || 200,
        type: $container.attr('img-type') || 'square'
    };

    var img_boundary = {
        width: $container.attr('box-width') || img_viewport.width + 50,
        height: $container.attr('box-height') || img_viewport.height + 50
    };

    var datasize = { 
        width: parseInt($container.attr('res-width')) || img_viewport.width,
        height: parseInt($container.attr('res-height')) || img_viewport.height,

    }

    $inputfile.attr('accept', 'image/*');
    $container.removeAttr('data-img');
    $container.removeAttr('data-path');
    $container.removeAttr('data-url');
    $container.removeAttr('img-width');
    $container.removeAttr('img-height');
    $container.removeAttr('img-type');
    $container.removeAttr('res-width');
    $container.removeAttr('res-height');
    $container.removeAttr('box-width');
    $container.removeAttr('box-height');
    $container.removeAttr('msg-success');
    $container.removeAttr('msg-error');

    $cropped.attr('width', img_viewport.width);
    $cropped.attr('height', img_viewport.height);
    if(img_viewport.type == 'circle') $cropped.addClass('img-circle');

    function init_croppie(){
        $croppie.croppie({
            boundary: img_boundary,
            viewport: img_viewport
        });
    }

    function show_croppie(){
        $cropped.hide();
        $croppie.find('.cr-image').css('opacity', 1);
        $croppie.find('.cr-overlay').css('border-color', 'black');
        $croppie.show();
        $dropZone.removeClass('upload-drop-zone');
        $container.find('.show-on').hide();
        $container.find('.show-on-croppie').show();
        if(!first_time) scrollhere();
    }

    function show_dropzone(){
        $croppie.hide();
        $cropped.hide();
        $dropZone.addClass('upload-drop-zone');
        $container.find('.show-on').hide();
        $container.find('.show-on-dropzone').show();
        if(!first_time) scrollhere();
    }

    function show_cropped(){
        $dropZone.removeClass('upload-drop-zone');
        $croppie.hide();
        $container.find('.show-on').hide();
        $container.find('.show-oncrop-before-upload').show();
        $cropped.show();
        if(!first_time) scrollhere();
    }

    function show_uploaded(){
        $dropZone.removeClass('upload-drop-zone');
        $croppie.hide();
        $container.find('.show-on').hide();
        $container.find('.show-oncrop-after-upload').show();
        if(!first_time) scrollhere();
    }

    function crop_image(resp){
        $cropped.attr('src', resp);
        dataimagenew = resp;
        show_cropped();
    }

    function show_image(resp){
        $cropped.attr('src', dataimagepath+'/'+resp);
        $inputhidden.val(resp);
        show_uploaded();
    }

    function destroy_croppie(){
        $croppie.croppie('destroy');
    }

    function readFile(files) {
        if (files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                destroy_croppie();
                init_croppie();
                $croppie.addClass('ready');
                $croppie.croppie('bind', {
                    url: e.target.result
                }).then(function(){
                    show_croppie();
                    console.log('jQuery bind complete');
                    if(first_upload){
                        first_upload = false;
                        readFile(files);
                    }
                });
                
            }
            
            reader.readAsDataURL(files[0]);
        }
        else {
            swal("Sorry - you're browser doesn't support the FileReader API");
        }
    }

    function scrollhere(){
        $('html,body').animate({
            scrollTop: ($container.offset().top - 200)
        }, 'fast');
    }

    function uploadImage(){
        if(!dataurl){
            alert('Data Url Upload Not Setting');
        } else if(!ajaxUpload){
            ajaxUpload = $.ajax({
                url: dataurl,
                type: 'post',
                data: { 'file_to_upload': dataimagenew },
                dataType: 'json',
                beforeSend: function(xhr) {
                    if($loader) $loader.show();
                },
                success: function(data){
                    if (typeof(data.error) !== 'undefined'){
                        if(swal_loaded) swal(data.error, '', 'error');
                        else alert(data.error);
                    } else if(data.name) {
                        if(swal_loaded){
                            swal({
                                title: datamsgsuccess,
                                type: 'success'
                            }, function(){
                                show_image(data.name);
                            });
                        } else {
                            alert(datamsgsuccess);
                            show_image(data.name);
                        }
                    } else {
                        if(swal_loaded) swal(datamsgerror, '', 'error');
                        else alert(datamsgerror);
                    }
                },
                error: function(xhr, status, errorThrown) {
                    if(status == 'error'){
                        var response = $.parseJSON(xhr.responseText);
                        switch(xhr.status){
                            default:
                                if(swal_loaded) swal(response.msg, '', 'error');
                                else alert(response.msg);
                                break;
                        }
                    }
                }
            })
            .always(function(){
                if($loader) $loader.hide();
                ajaxUpload = false;
            })
        }
    }

    $container.find('.croppie-crop-btn').on('click', function (ev) {
        $croppie.croppie('result', {
            type: 'base64',
            size: datasize,
        }).then(function (resp) {
            crop_image(resp);
        });
    });

    $container.find('.croppie-change-btn').on('click', function (ev) {
        $inputfile.trigger('click');
    });

    $container.find('.croppie-edit-btn').on('click', function (ev) {
        show_croppie();
    });

    $container.find('.croppie-upload-btn').on('click', function (ev) {
        uploadImage();
    });

    $dropZone.on('drop', function (e) {
        e.preventDefault();
        var datafile = e.originalEvent.dataTransfer.files;
        this.className = 'upload-drop-zone';
        if (datafile[0].type.match('image/*')) {
        	first_upload = true;
            readFile(datafile);
        } else {
            alert('File must be image');
        }
    });

    $inputfile.on('change', function(e){
    	first_upload = true;
        readFile(this.files);
    })

    $dropZone.on('dragover', function () {
        this.className = 'upload-drop-zone drop';
        return false;
    });

    $dropZone.on('dragleave', function () {
        this.className = 'upload-drop-zone';
        return false;
    });

    $dropZone.on('click', function () {
        if($dropZone.hasClass('upload-drop-zone')){
            $inputfile.trigger('click');
        }
    });

    if(!dataimagesrc) show_dropzone();
    else show_image(dataimagesrc);
    $container.css("text-align", "center");
    $cropped.css('margin', '10px');
    first_time = false;
}