// TODO: follow https://coligo.io/building-ajax-file-uploader-with-node/ starting @ upload.js file
$(".upload-btn").on("click", function() {
    $("#upload-input").click();
    $(".progress-bar").text("0%");
    $(".progress-bar").width("0%");
});

$("#upload-input").on("change", function() {
    const files = $(this).get(0).files;
    if (files.length > 0) {
        const formData = new FormData();
        for (const file of files) {
            formData.append("uploads[]", file, file.name);
        }
    }
});

$.ajax({
    url: "/upload",
    type: "POST",
    processData: false,
    contentType: false,
    success: function(data) {
        console.log("upload successful!");
    },
    xhr: function() {
        const xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", function(evt) {
            if (evt.lengthComputable) {
                let percComplete = evt.loaded / evt.total;
                percComplete = parseInt(percComplete * 100);
                $(".progress-bar").text(percComplete + "%");
                $(".progress-bar").width(percComplete + "%");

                if (percComplete === 100) {
                    $(".progress-bar").html("Done!");
                }
            }
        }, false);

        return xhr;
    }
});