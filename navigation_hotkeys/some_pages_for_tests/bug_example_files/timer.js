//Время старта скрипта
var timeStart = new Date().getTime();

//Номер потока
var timeout_id = 0;

//Регистр нажатия на кнопку пауза/старт
var control_timer = 0;

//Разница времени для паузы
var diff_time_pause = 0;

//Время нажатия паузы
var time_pause = 0;

//Номер баги
var bug_id = getBugIdFromUrl() || getBugIdFromField();

//Ключ для сохранения в storage (зависит от bug_id)
var storage_key = "bug:"+window.location.protocol+bug_id;

//Изменение баги
var changed_remain = 0;

//Создание баги
var etersoft_create = 0;


//Возращает прошедшее время в секундах с учетом пауз
function initStopwatch() {
	var timeNow = new Date().getTime();
	
	if (getStorage(storage_key) != 0) {
		if (getStorage(storage_key) == 'unknown') {
			var timeDiff = 0.125;
		} else {
			var timeDiff = getStorage(storage_key);
		}
	} else {
		var timeDiff = timeNow - timeStart - diff_time_pause;
	}

	return (timeDiff/1000);
}

//Парсинг времени в формат чч:мм:сс
function getSecs() {
    var mySecs = initStopwatch();
    var myMinutes = Math.floor(mySecs/60);
    var myHours = Math.floor(myMinutes/60);
    var myMinutes1 = myMinutes - myHours*60;
    var mySecs1 = parseInt(mySecs - myMinutes*60);

	if (mySecs1 < 10) {
		mySecs1 = "0"+mySecs1;
	}
	
    if (myMinutes1 < 10) {
        myMinutes1 = "0"+myMinutes1;
    }
    if (myHours < 10) {
        myHours = "0"+myHours;
    }

	document.querySelector("#timerblock #timespent").value = myHours + ":" + myMinutes1 + ":" + mySecs1;

	setStorage(storage_key, mySecs*1000+1000);

    timeout_id = window.setTimeout('getSecs()', 1000);
}

//Установка в поле отработанного времени в минутах
function setWorkTime(manualTime) {
	var secs = initStopwatch();
	var minutes = Math.ceil(secs/60);

	document.querySelector("#timeQuestionDiv #realworktime").value = (!manualTime) ? minutes : manualTime;
}

//Пауза/продолжить
function controlTimer() {
	if (control_timer == 0) {
		time_pause = new Date().getTime();
		control_timer = 1;
		
		clearTimeout(timeout_id);
		
		document.querySelector("#timerblock #timespent").style.color = "gray";
		document.querySelector("#timerblock #timer_pause").style.visibility = "hidden";
		document.querySelector("#timerblock #timer_play").style.visibility = "visible";
	} else {
		diff_time_pause += new Date().getTime() - time_pause;
		control_timer = 0;
		window.setTimeout('getSecs()', 1000);
		
		document.querySelector("#timerblock #timespent").style.color = "black";
		document.querySelector("#timerblock #timer_pause").style.visibility = "visible";
		document.querySelector("#timerblock #timer_play").style.visibility = "hidden";
	}
}

//Сброс таймера
function resetTimer() {
	setStorage(storage_key, 'unknown');
	diff_time_pause = new Date().getTime() - timeStart;
}

/////////////////////////////////////////////////////
function showDiv(){
	document.querySelector("#timeQuestionDiv").style.display = "block";
	document.querySelector("#timeQuestionDiv #realworktime").focus();
}
function closeDiv() {
	document.querySelector("#timeQuestionDiv").style.display = "none";
}

function initWatch() {
	timeStart = new Date().getTime();
}

function getStorage(key) {
	if (window['sessionStorage'] != null) {
		if (!sessionStorage.getItem(key)) {
			return 0;
		} else {
			var data = sessionStorage.getItem(key);
			return data;
		}
	} else {
		return 0;
	}
}

function setStorage(key, data) {
	if (window['sessionStorage'] != null) {
		try {
			sessionStorage.setItem(key, data);
		} catch(e) {
			return false;
		}
	}
	return false;
}

/* Получение номера баги из поля */
function getBugIdFromField() {
	var field = document.querySelector("#changeform input[name=id]");
	if (field) {
		return parseInt(field.value);
	}
	return false;
}

/* Получение номера баги из урлу */
function getBugIdFromUrl() {
	var get_id = window.location.search.split('id='); //номер баги (через URL)
	if (get_id[1]) {
		var id = get_id[1].split('&');
		try {
			return parseInt(id[0]);
		} catch(e) {
			return false;
		}
	}
	return false;
}

////////////////////////////////////////////
//timer-splash

//Показываем прошедшее время только для сотрудников Etersoft
function istimer() {
	if (isetersoft()) {
		document.getElementById("timerblock").style.display = 'block';
	}
}

//Является ли пользователь сотрудником Etersoft
function isetersoft() {
	var email = document.getElementById('useremail').className;
	var domain = email.split("@")[1];
	
	return (domain === "etersoft.ru");
}

//Является ли пользователь ответственным
function isworker() {
	var useremail = document.getElementById('useremail');
	var assigntoemail = document.getElementById('assigntoemail');
	var email = useremail.className;
	var assignemail = assigntoemail.className;
	
	return (email == assignemail);
}

function update_remain() {
	if (changed_remain == 1) {
		var remaining_time = document.querySelector("#changeform #remaining_time").value;
		var realworktime = document.querySelector("#timeQuestionDiv #realworktime").value;
		var rrt = Math.round((remaining_time - Math.round(realworktime*10/60)/10)*10)/10;
		
		if (rrt < 0) {
			rrt = 0;
		}
		document.querySelector("#timeQuestionDiv #realremaintime").value = rrt;
	}
	
	if (document.querySelector("#timeQuestionDiv #realremaintime").value == 0 && isworker()) {
		document.getElementById('message_warning').className = "div_show";
	} else {
		document.getElementById('message_warning').className = "div_hide";
	}
	
}

function premysubmit(realworktime) {
	if (realworktime != -1) {
		document.querySelector("#timeQuestionDiv #realworktime").value = realworktime;
	}
	
	var wt = Math.round(document.querySelector("#timeQuestionDiv #realworktime").value*100/60)/100;

	if (etersoft_create == 1) {
		// Запрет ставить более 1 часа отработанного времени при создании баги
		if ( wt > 1) {
			alert('Вы указали время на создание баги более 1 часа.');
			return false;
		}
		document.querySelector("#Create #work_time").value = wt;
		mysubmitnew();
		return;
	}

	// Запрет ставить более 12 часов отработанного времени
	if ( wt > 12) {
		alert('Вы указали отработанное время более 12 часов. Рекомендуется разбивать этапы своей работы на более мелкие отрезки времени.');
		return false;
	}
	
	if (changed_remain == 1) {
		document.querySelector("#changeform #work_time").value = wt;
		document.querySelector("#changeform #remaining_time").value =  document.querySelector("#timeQuestionDiv #realremaintime").value;
	}
	setStorage(storage_key, 'unknown');

	mysubmit();
}

function mysubmit() {
	if (document.querySelector("#Create")) {
		etersoft_create = 1;
	}
	if (document.querySelector("#changeform")) {
		changed_remain = 1;
	}
	
	if (changed_remain == 1 && (!isetersoft() || document.querySelector("#changeform #work_time").value > 0 || document.querySelector("#changeform #comment").value.length == 0)) {
		document.changeform.submit();
	} else {
		showDiv();
		setWorkTime();
		update_remain();
		if (changed_remain == 1 && isworker()) {
			document.querySelector("#timeQuestionDiv #id_remain_time").className = "div_show";
			document.querySelector("#timeQuestionDiv #message").className = "div_show";
		}
	}
}

function mysubmitnew() {
	if (document.querySelector("#Create #work_time").value > 0 || !isetersoft()) {
		document.Create.submit();
		setStorage(storage_key, 'unknown');
		return;
	}
	etersoft_create = 1;
	showDiv();
	setWorkTime();
}

//////////////////////////////////////////////////////////////
window.setTimeout('istimer()', 500);

if (typeof (window.addEventListener) != 'undefined') {
	//gecko, safari, konqueror and standard
	window.addEventListener('load', getSecs(), false);
} else if (typeof document.addEventListener != 'undefined') {
	//opera 7
	document.addEventListener('load', getSecs(), false);
} else if(typeof window.attachEvent != 'undefined') {
	//win/ie
	window.attachEvent('onload', getSecs());
}
