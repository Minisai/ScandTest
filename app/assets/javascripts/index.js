function show_add_popup(popup_type){

	document.getElementById("opaco").style.height = document.body.offsetHeight;		
	document.getElementById("opaco").className = document.getElementById("opaco").className.replace( /(?:^|\s)hidden(?!\S)/ , '' );	
	
	document.getElementById("popup").innerHTML = document.getElementById("popup_"+popup_type).innerHTML;
	document.getElementById("popup").className = document.getElementById("popup").className.replace( /(?:^|\s)hidden(?!\S)/ , '' );	
	
    alignCenter("popup");

    return false;
}

    function alignCenter(id) {
        //get margin left
        var marginLeft = Math.max(40, parseInt(document.body.offsetHeight/2 - document.getElementById(id).offsetWidth *2)) + 'px';
        //get margin top
        var marginTop = Math.max(40, parseInt(document.body.offsetWidth/2 - document.getElementById(id).offsetWidth)) + 'px';
        //return updated element
        document.getElementById(id).style.marginLeft = marginLeft;
		document.getElementById(id).style.marginTop = marginTop;
    };

function onDocumentLoad(){
	
	//$("#employees").tablesorter();
	
	document.getElementById('RemoveButton').onclick = onRemoveButtonClick;
	document.getElementById('EditButton').onclick = onEditButtonClick;
	document.getElementById('AddButton').onclick = onAddButtonClick;
	document.getElementById('employees').onclick = onTableClick;

}

function closePopup(){
    document.getElementById("opaco").classList.add("hidden");
    document.getElementById("popup").classList.add("hidden");

    return false;
}


function onConfirmButtonClick(){
    if (confirm("Are you sure?")){
		if (window.XMLHttpRequest) {
			request = new XMLHttpRequest();
		}
		else {
			if (window.ActiveXObject) {
			request = new ActiveXObject("Microsoft.XMLHTTP");
			}
		}		
				
		request.open("PUT", "employees/" + current_row.getAttribute("data-empid"), true);		
		request.onreadystatechange = function() {
			if (request.readyState==4){ 
				if (request.status == 200) {
					console.log("Updated");
					refreshTable();
				} 
				else {
					alert("Error ");
				}				   
			}
		}		
		request.setRequestHeader("Content-type", "application/json");
		
		var first_name = document.getElementById('FirstNameText').value;
		var surname = document.getElementById('SurnameText').value;
		var date_of_birth = document.getElementById('DateOfBirthText').value;
		var salary = document.getElementById('SalaryText').value;
		
		var params = { 'page': {'first_name': first_name, 'surname': surname, 'date_of_birth': date_of_birth, 'salary': salary } };
		request.send(JSON.stringify(params));
    }
    closePopup();
}


function onRemoveButtonClick(){
   if (confirm("Are you sure?")){
	
	if (window.XMLHttpRequest) {
	request = new XMLHttpRequest();
	}
	else {
		if (window.ActiveXObject) {
			request = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}	
	request.open("DELETE", "employees/" + current_row.getAttribute("data-empid"), true);		
	request.onreadystatechange = function() {
		if (request.readyState==4){ 
			if (request.status == 200) {
				console.log("Deleted");
				refreshTable();
			} 
			else {
				alert("Error");
			}				   
		}
	}
	request.send(null);
   } 	
}

function onEditButtonClick(){

    show_add_popup('edit');

    var empid = current_row.getAttribute("data-empid");
	
	document.getElementById('FirstNameText').value = current_row.cells[0].innerHTML;
	document.getElementById('SurnameText').value = current_row.cells[1].innerHTML;
	document.getElementById('DateOfBirthText').value = current_row.cells[2].innerHTML;
	document.getElementById('SalaryText').value = current_row.cells[3].innerHTML;;
}

function onAddButtonClick(){
    show_add_popup('add');
}


function refreshTable(){
	if (window.XMLHttpRequest) {
	request = new XMLHttpRequest();
	}
	else {
		if (window.ActiveXObject) {
			request = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	
	request = new XMLHttpRequest();
	request.open("GET", 'table', true);		
	request.onreadystatechange = function() {
		if (request.readyState==4){ 
			if (request.status == 200) {
				var response = request.responseText;
				var emp_array = jsonParse(response); 
				renderTable(emp_array);
			} 
			else {
				alert("Error");
			}				   
		}
	}
	
	request.send(null);
}

function renderTable(emp_array){
    var table =  [
        '<thead>',
        '<tr>',
        '<th>First_name</th>',
        '<th>Surname</th>',
        '<th>Date of Birth</th>',
        '<th>Salary</th>',
        '</tr>',
        '</thead>',
        '<tbody>'];
	
	for(i=0; i < emp_array.length; i++){
		table.push(['<tr data-empid="', emp_array[i].id, '">'].join(""));
        table.push('<td>');
        table.push(emp_array[i].first_name);
        table.push('</td>');
        table.push('<td>');
        table.push(emp_array[i].surname);
        table.push('</td>');
        table.push('<td>');
        table.push(emp_array[i].date_of_birth);
        table.push('</td>');
        table.push('<td>');
        table.push(emp_array[i].salary);
        table.push('</td>');
        table.push('</tr>');
	}
	
    table.push('</tbody>');
    
	document.getElementById("employees").innerHTML = (table.join(""));
    //$("#employees").tablesorter();
}

var current_row = undefined;

function select_record(row) {
    if(current_row == row)
    {
        row.style.backgroundColor = "white";
        current_row = undefined;
    }
    else
    {
		if(current_row) {
			current_row.style.backgroundColor = "white";
		}
        current_row = row;
        row.style.backgroundColor = "yellow";
    }
}

document.onkeydown = function(e){
    var next;
    if (e.keyCode == 40) {
        next = current_row.parentNode.parentNode.rows[current_row.rowIndex+1];
        if (next == undefined)
            return;
        else{
            select_record(next);
            return false;
        }
    }
    if (e.keyCode == 38) {
        next = current_row.parentNode.parentNode.rows[current_row.rowIndex-1];
        if (next == undefined)
            return;
        else{
			if(next.cells[0].tagName != "TH"){
				select_record(next);
				return false;
			}
        }
    }
    if (current_row != undefined && (e.keyCode == 46 || e.keyCode == 110)) {
        onRemoveButtonClick();
        return false;
    }
    if (current_row != undefined && (e.keyCode == 13 )) {
        onEditButtonClick();
        return false;
    }
}


function onTableClick(e){
	var row = e.target.parentNode;
    if (row != undefined && (row.tagName == "TR")){
        select_record(row);
    }
}

