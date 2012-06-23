/**
 * Created with JetBrains RubyMine.
 * User: rebel
 * Date: 23.06.12
 * Time: 15:07
 * To change this template use File | Settings | File Templates.
 */
var current_row= null;

function select_record(row) {
    if($(current_row).get(0) == $(row).get(0))
    {
        $(row).css("background-color", "white");
        current_row = null;
    }
    else
    {
        $(current_row ).css("background-color", "white");
        current_row = row;
        $(row).css("background-color", "yellow");
    }
}

$(document).keydown(function(e){
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

