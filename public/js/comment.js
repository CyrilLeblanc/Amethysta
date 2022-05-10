var $wrapper = $(".comment-wrapper");
var $form = $(".comment-form");
var $comments = $("#comment-list");

const getCommentTemplate = function (comment) {
    const datetime = new Date(comment.created_at);
    return $("<div/>", {
        class: "comment",
        html: `<a href="/profile/${comment.id_user}" class="user-info">${comment.user.lastname + " " + comment.user.firstname}</a>` + 
        `<div class="date">${datetime.toISOString().split("T")[0]}</div>` + 
        `<div class="time">${datetime.toISOString().split("T")[1].split(".")[0]}</div>` +
        `<div class="body">${comment.content}</div>`
    });
};

// display the comment form
const displayCommentForm = function (idPost) {
    $comments.empty();
    loadComments(idPost);
    $form.attr("action", `/comment/add/${idPost}`)
    $form.find('[name="content"]').val("");
    $wrapper.css("display", "flex");
};

// hide the comment form
const hideCommentForm = function () {
    $wrapper.hide();
};

// fetch comment list of a post from api
const getComments = function (idPost) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `/comment/get/${idPost}`,
            type: "GET",
            success: function (data) {
                resolve(data);
            },
        });
    });
};

const loadComment = async function (comment) {
    $comments.prepend(getCommentTemplate(comment))
}

const loadComments = async function (idPost) {
    var comments = await getComments(idPost);
    for (comment of comments) {
        loadComment(comment);
    }
};

// add a comment to a post
const sendComment = async function (idPost, content) {};

$(document).ready(function () {
    // handle comment form submit
    $form.submit(function (e) {
        e.preventDefault();
        var $content = $form.find('[name="content"]');
        var content = $content.val();

        $.ajax({
            url: $form.attr("action"),
            type: $form.attr("method"),
            data: {
                content: content,
            },
            success: function (data) {
                $content.val("");
                console.log(data);
                $comments.append(getCommentTemplate(data))
            },
        });
    });

    $("#close-comments").click(function(e) {
        e.preventDefault();
        hideCommentForm();
    })

    // handle add-comment click
    $addComment = $(".add-comment");
    $addComment.click(function (e) {
        e.preventDefault();
        var idPost = $(this).data("id_post");
        displayCommentForm(idPost);
    });
});
