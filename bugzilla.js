quicksearch = document.getElementById('quicksearch_top');
comment = document.getElementById('comment');

severity = document.getElementById('bug_severity');
priority = document.getElementById('priority');
 
commit_top = document.getElementById('commit_top');
commit = document.getElementById('commit'); 

function focusonload() { 
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
        enter: 13, 
        save: 83, 
        down: 40, 
        up: 38, 
        p1: 49, 
        p2: 50, 
        p3: 51, 
        p4: 52, 
        p5: 53, 
    };
    
    if (keypressed.altKey) {
        if (keyCode == nk.save && commit_top!==null){
            commit_top.click();
        }

        var key_str;
        if (priority!==null){
            switch (keyCode) {
                case kn.p1: key_str = "P1"; break;
                case kn.p2: key_str = "P2"; break;
                case kn.p3: key_str = "P3"; break;
                case kn.p4: key_str = "P4"; break;
                case kn.p5: key_str = "P5"; break;
            }
        }
        selectelement(priority, key_str);
        severity.focus();
		
    } else if (keypressed.ctrlKey) {
        switch (keyCode) {
            case kn.enter:
                if (commit!==null&&comment.value!=="") {
                    commit.click();
                }
                break;
            case kn.up:
                if (quicksearch!==null) {
                    quicksearch.focus();
                }
                break;
            case kn.down:
                if (comment!==null) {
                    comment.focus();
                }
                break;
        }
    }
}

focusonload();
document.onkeydown = navigation;
// how to call this functions when page
// would be loaded at all (with window.onload)