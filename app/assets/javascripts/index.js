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

//          $('#elemets').toggleClass('hidden');

    $('#popup')
        .html($('#popup_' + popup_type).html())
        .alignCenter()
        .toggleClass('hidden');

    return false;
}
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
});

function closePopup(){
    $('#opaco').toggleClass('hidden').removeAttr('style');
    $('#popup').toggleClass('hidden');
    return false;
}

$(document).ready ( function(){
    $('#RemoveButton').click(onRemoveButtonClick);
    //$('#EditButton').click(onEditButtonClick);
    $('#AddButton').click(onAddButtonClick);
    //$('#ConfirmButton').click(onConfirmButtonClick)
});

function onConfirmButtonClick(){
    if (confirm("Are you sure?")){
//        var employee = new Object();
//        employee.first_name = $("#FirstNameText").attr('value');
//        employee.surname = $("#SurnameText").attr('value');
//        employee.date_of_birth = $("#DateOfBirthText").attr('value');
//        employee.salary = $("#SalaryText").attr('value');
//
//        var employee_filter = new Array();
//        employee_filter[0] = "first_name";
//        employee_filter[1] = "surname";
//        employee_filter[2] = "date_of_birth";
//        employee_filter[3] = "salary";
//        $.ajax({
//            type: "PUT",
//            url: "employees/" + $(current_row).data("empid"),
//            data: { page : JSON.stringify( employee ) },
//            dataType: 'json',
//            success: function(){
//                console.log("Updated");
//                refreshTable();
//            }
//        });
        $.ajax({
            type: "PUT",
            url: "employees/" + $(current_row).data("empid"),
            data: { page : {first_name: $("#FirstNameText").attr('value'), surname: $("#SurnameText").attr('value'), date_of_birth: $("#DateOfBirthText").attr('value'), salary: $("#SalaryText").attr('value')} },
            dataType: 'json',
            success: function(){
                console.log("Updated");
                refreshTable();
            },
            error: function(data){
                refreshTable();
            }

        });
    }
    closePopup();
}

function onRemoveButtonClick(){
    if (confirm("Are you sure?")){
        $.ajax({
            type: "DELETE",
            url: "employees/" + $(current_row).data("empid"),
            success: function(){
                console.log("Deleted");
                refreshTable();
            }
        });
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
    $.get('table', renderTable);
}

function renderTable(employees){
    var table =  [
        '<tr>',
        '<th>First_name</th>',
        '<th>Surname</th>',
        '<th>Date of Birth</th>',
        '<th>Salary</th>',
        '</tr>'];
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
    table.push('</table>');
    $("#employees").html(table.join(""));
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
        $(current_row ).css("background-color", "white");
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

$(document).ready ( function(){
    $('#employees').click(onTableClick);
});


function onTableClick(e){
    var row = $(e.target).parent();
    if (row != undefined && $(row).is("tr")){
        select_record(row);
    }
}

