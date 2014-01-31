(function () {
    // make immediately invoked function expression (IIFE)

    var quick_search = document.getElementById('quicksearch_top');
    // search on the top of the page
    var commit_top = document.getElementById('commit_top');
    // save bug changes	on page

    var comment = document.getElementById('comment');
    // comment textarea (input)
    var commit = document.getElementById('commit');
    // save comment

    var severity = document.getElementById('bug_severity');
    var priority = document.getElementById('priority');
    
    var comments = document.getElementsByClassName('bz_comment');
    var num=0;

    function onFocus() {

        function cursorFocus(s) {
            x = window.scrollX;
            y = window.scrollY;
            s.focus();
            window.scrollTo(x, y);
        }

        if (comment !== null) {
            cursorFocus(comment)
            // focus on comment 
            // textarea (input)
            // without scrollto
        } else {
            quick_search.focus();
        }
    }

    function someNav(keypressed) {

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
            } else if (keyCode >= kn.p1 && keyCode <= kn.p5){
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
            } else if (keyCode == kn.up || keyCode == kn.down){
                switch (keyCode){
        			case kn.down: num+=1; break; //down arrow
        			case kn.up: num-=1; break; //up arrow
        		}

    			if (num >= comments.length) num = 0;
    			if (num < 0) num = comments.length - 1;
    
    			comments[num].scrollIntoView();
            }
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
                    if (quick_search !== null) {
                        quick_search.focus();
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

    onFocus(); document.addEventListener("keydown", someNav, true);

    // PROBLEM = I DON'T KNOW: how to call this functions 
    // when page would be loaded at all 
    // (with window.onload)
})();
