const $ = jQuery;

$(document).ready(function () {
    $("a.save-button").click(function (event) {
        event.preventDefault();
        const classNames = ["fa-solid", "fa-regular"];

        $li = $(this).children().children();
        
        $li.toggleClass(classNames);
        $.ajax({
            url: $(this).attr("href"),
            type: "POST",
            error: function (data) {
                $li.toggleClass(classNames);
            }
        })
    });
});
