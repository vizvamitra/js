// PROBLEM = I DON'T KNOW: how to call this functions 
// when page would be loaded at all 
// (with window.onload)

(function () {
    // make immediately invoked function expression (IIFE)

    var quicksearch = document.getElementById('quicksearch_top');
    // search on the top of the page
    var comment = document.getElementById('comment');
    // comment textarea (input)

    var severity = document.getElementById('bug_severity');
    var priority = document.getElementById('priority');

    var commit_top = document.getElementById('commit_top');
    // save changes
    var commit = document.getElementById('commit');
    // save comment

    function focusonload() {
        // PROBLEM = I DON'T KNOW:
        // may be it should be
        // in next function?

        function cursorfocus(s) {
            x = window.scrollX;
            y = window.scrollY;
            s.focus();
            window.scrollTo(x, y);
        }

        if (comment !== null) {
            cursorfocus(comment)
            // focus on comment 
            // textarea (input)
            // without scrollto
        } else {
            quicksearch.focus();
        }
    }

    function navigation(keypressed) {

        keypressed = keypressed || window.event;

        function selectelement(w, select) {
            w.value = select;
        }

        keyCode = keypressed.keyCode || keypressed.which,
        kn = {
            enter: 13, // for save your comment
            save: 83, // for save bug changes 
            down: 40, // go to comment area
            up: 38, // go to search
            p1: 49, // priority
            p2: 50, // priority
            p3: 51, // priority
            p4: 52, // priority
            p5: 53, // priority
        };

        if (keypressed.altKey) {
            if (keyCode == kn.save && commit_top !== null) {
                commit_top.click();
            }

            var key_str;
            if (priority !== null) {
                switch (keyCode) {
                    case kn.p1:
                        key_str = "P1";
                        break;
                    case kn.p2:
                        key_str = "P2";
                        break;
                    case kn.p3:
                        key_str = "P3";
                        break;
                    case kn.p4:
                        key_str = "P4";
                        break;
                    case kn.p5:
                        key_str = "P5";
                        break;
                }
            }
            selectelement(priority, key_str);
            severity.focus();
            // added focus on
            // bug severity

        } else if (keypressed.ctrlKey) {
            switch (keyCode) {
                case kn.enter:
                    if (commit !== null && comment.value !== "") {
                        // added check for empty comment
                        commit.click();
                    }
                    break;
                case kn.up:
                    if (quicksearch !== null) {
                        quicksearch.focus();
                    }
                    break;
                case kn.down:
                    if (comment !== null) {
                        comment.focus();
                    }
                    break;
            }
        }
    }

    focusonload();
    document.addEventListener("keydown", navigation, true);

})();