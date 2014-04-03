var gui = require('nw.gui');
gui.Window.get().show();

var menu2 = new gui.Menu();
menu2.append(new gui.MenuItem({ label: 'Re-select' }));
menu2.append(new gui.MenuItem({ label: 'Export Result' }));
menu2.append(new gui.MenuItem({ type: 'separator' }));
var info_item = new gui.MenuItem({ label: 'Project Page' });
menu2.append(info_item);
var bodyElems = document . getElementsByTagName( "body" ) ; 
var body = bodyElems[ 0 ] ;

function reSelect() {
   $(".spinner").css("display", "none");
   $(".usagesection").css("display", "none");
   $("#1").html("");
   $(".selectFolder").css("display", "block");
}
	/*
   for (var x in details){
          console.log(x+' --- ' + details[x]);
    }
    */


function exportReport(){
  if(!details.length) { alert('result empty, please select a folder to do analysis first!');
  return;}
    LZADialog.saveFileAs({filename:'result.csv'}, function(file){
      
        
            //alert(file.path);
            var fs = require('fs')
            var json2csv = require('json2csv');
            //var alerts = [ ];
            //alerts.push({"name":"software/test.txt","size":"1.5M"});

            json2csv({data: details, fields: ['name', 'size']}, function(err, csv) {
              if (err) console.log(err);
              fs.writeFile(file.path, csv, function(err) {
                if (err) throw err;
                console.log('file saved');
              });
            });
          

        }
    );
}

function projectPage() {
   gui.Shell.openExternal("http://youtube.com")
}
menu2.items[0].click = reSelect;
menu2.items[1].click = exportReport;
menu2.items[3].click = projectPage;

body.addEventListener('contextmenu', function(ev) { 
  ev.preventDefault();
  menu2.popup(ev.x, ev.y);
  return false;
});

