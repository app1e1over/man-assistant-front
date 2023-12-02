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

    static save = () =>{

    }

    static load = () =>{
        
    }
}
export default Fetcher;