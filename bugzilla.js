quicksearch = document.getElementById('quicksearch_top');
comment = document.getElementById('comment');

severity = document.getElementById('bug_severity');
priority = document.getElementById('priority');
	
commit_top = document.getElementById('commit_top');
commit = document.getElementById('commit');	

function focusonload() {

	function cursorfocus(s) {
	x = window.scrollX;
    y = window.scrollY;
    s.focus();
    window.scrollTo(x, y);
	}

	if (comment !== null) {
		cursorfocus(comment)
	} else {quicksearch.focus();
	}
}

function navigation(keypressed) { 

    keypressed = keypressed || window.event;

	function selectelement(w, select) {
    w.value = select;
	}
	
    keyCode = keypressed.keyCode || keypressed.which,
        kn = {
            enter: 13, // ctrl + enter - оставить комментарий
            save: 83, // alt + s - сохранить изменения бага
            down: 40, // crtl + down - в поле комментария
            up: 38, // ctrl + up - в поле поиска
            p1: 49, // alt + 1 - P1 - приоритет
            p2: 50, // alt + 2 - P2 - приоритет 
            p3: 51, // alt + 3 - P3 - приоритет
            p4: 52, // alt + 4 - P4 - приоритет
            p5: 53, // alt + 5 - P5 - приоритет
        };
				
    if (keypressed.altKey) {
        switch (keyCode) {
            case kn.p1:
                if (priority!==null) {
				selectelement(priority, "P1");
                severity.focus();
				}
                break;
            case kn.p2:
                if (priority!==null) {
				selectelement(priority, "P2");
                severity.focus();
				}
                break;
            case kn.p3:
                if (priority!==null) {
				selectelement(priority, "P3");
                severity.focus();
				}
                break;
            case kn.p4:
                if (priority!==null) {
				selectelement(priority, "P4");
                severity.focus();
				}
                break;
            case kn.p5:
                if (priority!==null) {
				selectelement(priority, "P5");
                severity.focus();
				}
                break;
			case kn.save:
                if (commit_top!==null) {
				commit_top.click();
				}
                break;
        }

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