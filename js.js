(function ($) {
console.log("yeye");
    $.fn.my_wysiwyg = function (options) {
        var settings = $.extend({
            buttons: ["bold", "italic", "foreColor", "strikeThrough",
                "fontSize", "createLink", "font-thickness-up", "font-thickness-down",
                "justifyLeft", "justifyRight", "justifyCenter", "justifyFull", "switch"]
        }, options);
        var textarea = $("textarea");
        var switch_btn = true;
        if (this.prop("tagName") !== "TEXTAREA") {
            return null;
        }
        this.after("<div id='options'></div>");
        this.after("<div id='editor' contenteditable='true'></div>");
        settings.buttons.forEach(function (index, value) {
            $("#options").append("<button type='button' id='" + index + "'>" + index + "</button>");
        });

        function getSelectedText() {
            if (window.getSelection) {
                var txtarea = $("#text").get(0);
                return txtarea.value.substring(txtarea.selectionStart, txtarea.selectionEnd);
            }
        }

        $("button").click(function () {
            console.log($(this).attr('id'));
            console.log("mdr");
            document.execCommand($(this).attr('id'), false, '');
        });
        $("#foreColor").click(function () {
            $(this).after("<input type='color' id='color'></input>");
            $("#color").change(function () {
                var color = $("#color").val().toString();
                console.log(color);
                document.execCommand('foreColor', false, color);
                $(this).hide();
            });
        });
        $("#fontSize").click(function () {
            $(this).after("<select id='fontSize_select'></select>");
            $("#fontSize_select").append("<option selected disabled>Choose a size</option>");
            for (var i = 1; i <= 7; i++) {
                $("#fontSize_select").append("<option value='" + i + "'>Size " + i + "</option>");
            }
            $("#fontSize_select").change(function () {
                var newSize = $("#fontSize_select").val();
                document.execCommand('fontSize', false, newSize);
                $(this).hide();
            });
        });
        $("#createLink").click(function () {
            var url = prompt("Which url do you want to link ?");
            if (url !== null) {
                document.execCommand('createLink', false, url);
            }
        });
        $("#switch").click(function () {
            if (switch_btn === true) {
                $("#editor").hide();
                textarea.val($("#editor").html());
                textarea.show();
            } else {
                textarea.hide();
                $("#editor").html(textarea.val());
                $("#editor").show();
            }
            switch_btn = !switch_btn;
        });
        $("#font-thickness-up").click(function () {
            var selected = getSelectedText();
        });
    }
}(jQuery));
$("textarea").my_wysiwyg(
    {
        buttons: ["bold", "italic", "foreColor", "strikeThrough",
        "fontSize", "createLink", "font-thickness-up", "font-thickness-down",
        "justifyLeft", "justifyRight", "justifyCenter", "justifyFull", "switch"]
    }
);
