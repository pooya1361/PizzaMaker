<html>
    <head>
        <title>PHP AJAX Image Upload</title>
        <link href="styles.css" rel="stylesheet" type="text/css" />
        <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
        <script type="text/javascript">
            $(document).ready(function(e) {
                $("#uploadForm").on('submit', (function(e) {
                    e.preventDefault();
                    $.ajax({
                        url: "upload.php",
                        type: "POST",
                        data: new FormData(this),
                        contentType: false,
                        cache: false,
                        processData: false,
                        success: function(data)
                        {
                            $("#targetLayer").html(data);
                        },
                        error: function()
                        {
                        }
                    });
                }));
            });
        </script>
    </head>
    <body>
        <div class="bgColor">
            <form id="uploadForm" action="upload.php" method="post" autocomplete="on">
                <div id="targetLayer">No Image</div>
                <div id="uploadFormLayer">
                    <input name ="type" type="radio" value="Pizza"><label>Pizza</label>
                    <input name ="type" type="radio" value="Ingredient" checked="true"><label>Ingredient</label>
                    <br/>
                    <label>Name:</label><br />
                    <input name="pizzaName" type="text" value=""  autocomplete="on"/>
                    <br/>
                    <label>Upload Image File:</label><br />
                    <input name="userImage"
                           type="file" class="inputFile" /> <input type="submit"
                           value="Submit" class="btnSubmit" />

                </div>
            </form>
        </div>
    </body>
</html>