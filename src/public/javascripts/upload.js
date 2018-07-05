/* eslint-disable no-mixed-spaces-and-tabs */
$(".upload-btn").on("click", function() {
    $("#upload-input").click();
    $(".progress-bar").text("0%");
    $(".progress-bar").width("0%");
});

$("#upload-input").on("change", function() {
    const file = $(this).get(0).files[0];
    if ((file.name).match(/.*\.txt/)) {
        const formData = new FormData();
        formData.append("upload", file, file.name);

        $.ajax({
            url: "/upload",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            statusCode: {
                400: function(xhr, status, err) {
                    alert(err.message);
                },
                200: function(data, status, xhr) {
                    console.log("upload successful!");
                }
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
    } else {
    		alert("Please upload .txt files only!");
    }
});