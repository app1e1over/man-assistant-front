import axios from "axios";
import Queue from "./Queue";

class Fetcher{
    static q = new Queue();
    static running = false;

    static go(connection,body, sender){
        if(this.q.size<0){
            this.q = new Queue();
        }
        this.q.enqueue({connection,body, sender})
        console.log(this.running);
        if(!this.running){
            this.run();
        }
    }
    static run(){
        this.running = true;

        if(this.q.isEmpty()){
            this.running=false;
            return;
        }
        let cur = this.q.dequeue();
        console.log(cur);
        if(cur===undefined){
            console.log("end");
            this.running=false;
            return;
        }
        cur.sender(axios.post(cur.connection, cur.body));
        console.log("done");
        this.run();
    }
    //https://stackoverflow.com/questions/13405129/create-and-save-a-file-with-javascript
    static save = (name, text) =>{
        var file = new Blob([text], {type: "text"});
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, name);
        else { // Others
            var a = document.createElement("a"),
                    url = URL.createObjectURL(file);
            a.href = url;
            a.download = name;
            document.body.appendChild(a);
            a.click();
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);  
            }, 0); 
        }
    }

    static load = (name, text) =>{
        //https://stackoverflow.com/questions/16215771/how-to-open-select-file-dialog-via-js
        var input = document.createElement('input');
        input.type = 'file';
        input.onchange = e => { 
            var file = e.target.files[0]; 
            name(file.name)

            // setting up the reader
            var reader = new FileReader();
            reader.readAsText(file,'UTF-8');
         
            // here we tell the reader what to do when it's done reading...
            reader.onload = readerEvent => {
               var content = readerEvent.target.result; // this is the content!
               text(content)
            }
         }
        input.click();
    }
}
export default Fetcher;