cont = 0;

function CheckAll() {
    for (var i = 0; i < document.formulario.elements.length; i++) {
        var x = document.formulario.elements[i];
        if (x.name == 'UIDL[]') {
            x.checked = document.formulario.selall.checked;
        }
    }
    if (cont == 0) {
        var elem = document.getElementById("checar");
        elem.innerHTML = "Desmarcar todos";
        cont = 1;
    } else {
        var elem = document.getElementById("checar");
        elem.innerHTML = "Marcar todos";
        cont = 0;
    }

}