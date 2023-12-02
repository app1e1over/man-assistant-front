import React from 'react';
import Queue from '../../JavaScript/Classes/Queue';
import axios from 'axios';
import Notiflix from 'notiflix';

function LoadButton({text, setLoading, setText}) {

    const review =async (q)=>{
        let fixed = "";
        while(q.size>0){
          let sent = q.dequeue();
          if(sent===undefined || sent.trim()===""){
            console.log("im falling away");
            continue;
          }
          let res=await axios.post("https://localhost:7125/words/sentence/review", {sentence:sent}).then(r=>r.data);
          for (let index = 0; index < sent.split(' ').length; index++) {
            let element = sent.split(' ')[index];
            if(!res.exists[index]){
              element = element+"⠀"+res.fixes[index]+"⠀";
            }
            fixed+=element+" ";
          }
          
        }
        setText(fixed);
      }
    const handleClick= async (e)=>{
        let q = new Queue();
        let sen = "";
        for (let ch of [...text]) {
          sen += ch;
          if (ch === "." || ch === "!" || ch === "?") {
            q.enqueue(sen);
            sen = "";
          }
        }
        if (sen !== "") {
          q.enqueue(sen);
        }
        setLoading(true);
        try{
          await review(q);

        }catch{
          Notiflix.Notify.failure("Щось пішло не так. Можливо локальна програма не запущена, або не встановлена. Для встановлення натисніть сюди!", {timeout:6000})
        }
        setLoading(false);

      }

    return (
        <div>
                  <button
        onClick={handleClick}
      >
        Send
      </button>
        </div>
    );
}

export default LoadButton;