document.getElementById('link').onclick = function (e) {
    e = e || window.event;
    e.preventDefault ? e.preventDefault() : e.returnValue = false;

    alert('珠峰培训');
};