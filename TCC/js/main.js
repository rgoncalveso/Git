//lista
var list = [
    { "desc": "rice", "amount": "1", "value": "5.40" },
    { "desc": "beer", "amount": "12", "value": "1.99" },
    { "desc": "meat", "amount": "1", "value": "15.00" }
];


//calcula o valor total
function getTotal(list) {
    var total = 0;
    for (var key in list) {
        total += list[key].value * list[key].amount;
    }
    document.getElementById("totalValue").innerHTML = formatValue(total);
}


//monta a lista
function setList(list) {
    var table = '<thead><tr><td>Description</td><td>Amount</td><td>Value</td><td>Action</td></tr></thead><tbody>';
    for (var key in list) {
        table += '<tr><td>' + formatDesc(list[key].desc) + '</td><td>' + formatAmount(list[key].amount) + '</td><td>' + formatValue(list[key].value) + '</td><td><button class="btn btn-default" onclick="setUpdate(' + key + ');" >Edit</button> <button class="btn btn-default" onclick="deleteData(' + key + ');" >Delete</button></td></tr>';
    }
    table += '</tbody>';
    document.getElementById("listTable").innerHTML = table;
    getTotal(list);
    saveListStorage(list);
}

//Transforma a primeira letra sempre em maiúscula
function formatDesc(desc) {
    var str = desc.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}

//retorna o valor float com o simbolo $
function formatValue(value) {
    var str = parseFloat(value).toFixed(2) + "";
    str = str.replace(".", ",");
    str = "$ " + str;
    return str;
}

//valida o formato
function formatAmount(amount) {
    return parseInt(amount);
}


function addData() {
    if (!validation()) {
        return;
    }
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list.unshift({ "desc": desc, "amount": amount, "value": value });
    setList(list);
}


//Efetua a seleção para a alteração
function setUpdate(id) {
    var obj = list[id];
    document.getElementById("desc").value = obj.desc;
    document.getElementById("amount").value = obj.amount;
    document.getElementById("value").value = obj.value;
    document.getElementById("btnUpdate").style.display = "inline-block";
    document.getElementById("btnAdd").style.display = "none";

    document.getElementById("inputIDUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="' + id + '">';
}

//reseta os dados de edição
function resetData() {
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("value").value = "";
    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btnAdd").style.display = "inline-block";

    document.getElementById("inputIDUpdate").innerHTML = "";
    document.getElementById("errors").style.display = "none";
}

//Altera um registro específico
function updateData() {
    if (!validation()) {
        return;
    }
    var id = document.getElementById("idUpdate").value;
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list[id] = { "desc": desc, "amount": amount, "value": value };
    resetData();
    setList(list);

}

//Delete um registro específico
function deleteData(id) {
    if (confirm("Delete this item?")) {
        if (id === list.length - 1) {
            list.pop();
        } else if (id === 0) {
            list.shift();
        } else {
            var arrAuxIni = list.slice(0, id);
            var arrAuxEnd = list.slice(id + 1);
            list = arrAuxIni.concat(arrAuxEnd);
        }
        setList(list)
    }
}


//Valida Dados
function validation() {

    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;
    var errors = "";
    document.getElementById("errors").style.display = "none";

    if (desc === "") {
        errors += '<p>Fill out description</p>';
    }

    if (amount === "") {
        errors += '<p>Fill out a quantity</p>';
    } else if (amount != parseInt(amount)) {
        errors += '<p>Fill out a valid amount</p>';
    }

    if (value === "") {
        errors += '<p>Fill out a value</p>';
    } else if (value != parseFloat(value)) {
        errors += '<p>Fill out a valid value</p>';
    }

    if (errors != "") {
        document.getElementById("errors").style.display = "block";
        document.getElementById("errors").style.backgroundColor = "rgba(85,85,85,0.3)";
        document.getElementById("errors").style.color = "black";
        document.getElementById("errors").style.padding = "10px";
        document.getElementById("errors").style.margin = "10px";
        document.getElementById("errors").style.borderRadius = "13px";

        document.getElementById("errors").innerHTML = "<h3> Error: </h3>" + errors;
        return 0;
    } else {
        return 1;
    }
}
//função para deletar toda a lista
function deleteList() {
    if (confirm("Delete this list?")) {
        list = [];
        setList(list);
    }
}

//função para salvar os dados
function saveListStorage(list) {
    var jsonStr = JSON.stringify(list);
    localStorage.setItem("list", jsonStr);
}

//inicializa a lista e carrega caso já tenha sido criado
function initListStorage() {
    var testList = localStorage.getItem("list");
    if (testList) {
        list = JSON.parse(testList);
    }
    setList(list);
}

initListStorage();