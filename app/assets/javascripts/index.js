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
    $('#EditButton').click(onEditButtonClick);
    $('#AddButton').click(onAddButtonClick);
});

function onRemoveButtonClick(){
    alert($(current_row).data("empid"));
    $(current_row).hide('slow', function(){
        $(current_row).remove();
        current_row = null;
    });

}

function onEditButtonClick(){
    alert($(current_row).data("empid"));
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