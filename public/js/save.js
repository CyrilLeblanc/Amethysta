const $ = jQuery;

$(document).ready(function () {
    $("a.save-button").click(function (event) {
        event.preventDefault();
        const className = "fa-solid";

        $li = $(this).children().children();
        
        $li.toggleClass(className);
        $.ajax({
            url: $(this).attr("href"),
            type: "POST",
            error: function (data) {
                $li.toggleClass(className);
            }
        })
    });
});
