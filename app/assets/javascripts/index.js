function show_add_popup(popup_type){
//          when IE - fade immediately
    if($.browser.msie)
    {
        $('#opaco').height($(document).height()).toggleClass('hidden');
    }
    else
//          in all the rest browsers - fade slowly
    {
        $('#opaco').height($(document).height()).toggleClass('hidden').fadeTo('slow', 0.7);
    }
	
    $('#popup')
        .html($('#popup_' + popup_type).html())
        .alignCenter()
        .toggleClass('hidden');

    return false;
}

function onDocumentLoad(){
	//align element in the middle of the screen
    $.fn.alignCenter = function() {
        //get margin left
        var marginLeft = Math.max(40, parseInt($(window).width()/2 - $(this).width()/2)) + 'px';
        //get margin top
        var marginTop = Math.max(40, parseInt($(window).height()/2 - $(this).height()/2)) + 'px';
        //return updated element
        return $(this).css({'margin-left':marginLeft, 'margin-top':marginTop});
    };
	
	$("#employees").tablesorter();
    $('#RemoveButton').click(onRemoveButtonClick);
    $('#EditButton').click(onEditButtonClick);
    $('#AddButton').click(onAddButtonClick);
	
	$('#employees').click(onTableClick);

}
/*
$(document).ready(function(){
    //align element in the middle of the screen
    $.fn.alignCenter = function() {
        //get margin left
        var marginLeft = Math.max(40, parseInt($(window).width()/2 - $(this).width()/2)) + 'px';
        //get margin top
        var marginTop = Math.max(40, parseInt($(window).height()/2 - $(this).height()/2)) + 'px';
        //return updated element
        return $(this).css({'margin-left':marginLeft, 'margin-top':marginTop});
    };
	
	$("#employees").tablesorter();
    $('#RemoveButton').click(onRemoveButtonClick);
    $('#EditButton').click(onEditButtonClick);
    $('#AddButton').click(onAddButtonClick);
	
	$('#employees').click(onTableClick);
});
*/
function closePopup(){
    $('#opaco').toggleClass('hidden').removeAttr('style');
    $('#popup').toggleClass('hidden');
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
				
		request.open("PUT", "employees/" + $(current_row).data("empid"), true);		
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
		
		var params = { 'page': {'first_name': $("#FirstNameText").attr('value'), 'surname': $("#SurnameText").attr('value'), 'date_of_birth': $("#DateOfBirthText").attr('value'), 'salary': $("#SalaryText").attr('value') } };
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
	request.open("DELETE", "employees/" + $(current_row).data("empid"), true);		
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
    var empid = $(current_row).data("empid");
    $("#FirstNameText").attr('value', $(current_row).children(":nth-child(1)").text());
    $("#SurnameText").attr('value', $(current_row).children(":nth-child(2)").text());
    $("#DateOfBirthText").attr('value', $(current_row).children(":nth-child(3)").text());
    $("#SalaryText").attr('value', $(current_row).children(":nth-child(4)").text());

    show_add_popup('edit');
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

function renderTable(employees){
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
    $.each(employees, function(k, v){
        table.push(['<tr data-empid="', v.id, '">'].join(""));
        table.push('<td>');
        table.push(v.first_name);
        table.push('</td>');
        table.push('<td>');
        table.push(v.surname);
        table.push('</td>');
        table.push('<td>');
        table.push(v.date_of_birth);
        table.push('</td>');
        table.push('<td>');
        table.push(v.salary);
        table.push('</td>');
        table.push('</tr>');

    });
    table.push('</tbody>');
    
	document.getElementById("employees").innerHTML = (table.join(""));
//	$("#employees").html(table.join(""));
    $("#employees").tablesorter();
}

var current_row = undefined;

function select_record(row) {
    if($(current_row).get(0) == $(row).get(0))
    {
        $(row).css("background-color", "white");
        current_row = undefined;
    }
    else
    {
        $(current_row).css("background-color", "white");
        current_row = row;
        $(row).css("background-color", "yellow");
    }
}

$(document).keydown( function(e){
    var next;
    if (e.keyCode == 40) {
        next = $(current_row).next();
        if (next == undefined)
            return;
        if ($(next).is("tr")){
            select_record(next);
            return false;
        }
    }
    if (e.keyCode == 38) {
        next = $(current_row).prev();
        if (next == undefined)
            return;
        if ($(next).is("tr") && $("#employees tr:eq(0)").get(0) != $(next).get(0) ){
            select_record(next);
            return false;
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

});


function onTableClick(e){
    var row = $(e.target).parent();
    if (row != undefined && $(row).is("tr")){
        select_record(row);
    }
}

