$(document).ready(function () {
    $(".like-button").click(function (e) {
        e.preventDefault();
        var $button = $(this);
        var $icon = $button.find(".fa-heart");
        $.ajax({
            url: $button.attr("href"),
            type: "GET",
            success: function (data) {
                var isAdd = $icon.hasClass("fa-regular");
                var $label = $icon.find("label");
                var oldValue = Number($label.text());
                var url = $button.attr("href");
                console.log($label, $icon, $button);
                $icon.toggleClass(["fa-regular", "fa-solid"]);
                if (isAdd) {
                    $label.text(oldValue + 1);
                    $button.attr("href", url.replace("/like", "/dislike"));
                } else {
                    $label.text(oldValue - 1);
                    $button.attr("href", url.replace("/dislike", "/like"));
                }
                console.log(isAdd);
            },
        });
    });
});
