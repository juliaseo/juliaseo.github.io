function toggleOn(divId) {
    var el = document.getElementById(divId);
    el.style.display = 'block';
}
function toggleOff(divId) {
    var el = document.getElementById(divId);
    el.style.display = 'none';
}
function toggle(divId) {
    var el = document.getElementById(divId);
    if (el.style.display == 'none') { el.style.display = 'block'; }
    else { el.style.display = 'none'; }
}




