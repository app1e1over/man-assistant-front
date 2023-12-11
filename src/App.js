
import "./App.css";
import TextArea from "./Components/TextArea/TextArea";
import { useEffect, useState } from "react";
import Loader from "./Components/Loader/Loader";
import Header from "./Components/Header/Header";
import Chapters from "./Components/Chapters/Chapters";
import Music from "./Components/Music/Music";
import Modal from "./Components/Modal/Modal";
import axios from "axios";

function App() {
  const [loading] = useState(false);
  const [chapters, setChapter] = useState([]);
  const [pages, setPages] = useState([{text:"", edited:false}]);
  const [modal, setModal]= useState({type:"inactive", onFinish:()=>{}, data:[]})
  const [editing, setEding] = useState(false);
  const text = (text)=>{
    if(text===undefined){
      let res = ""
      pages.forEach(e => {
        res+=e+"\n";
      });
      return res;
    }else{
      setPages([{text, edited: false}])
    }

  }
  useEffect(() => {
    setChapter([]);
    if(pages.find(v=>v.text==="") && pages.length>1){
      setPages(pages.filter(v=>v.text!==""))
    }
  }, [ pages]);

  const pushChapter = (ch) => {

    if(chapters.every(c=>c.id!==ch.id))
      setChapter([...chapters, ch]);
  };
  const check = async ()=>{
    pages.forEach(page => {
      if(!page.edited){
        page.text.split(" ").map(v=>v.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim()).filter(v=>v && v!=="").forEach(async v=>{
          await fetch("https://goroh.pp.ua/%D0%A1%D0%BB%D0%BE%D0%B2%D0%BE%D0%B7%D0%BC%D1%96%D0%BD%D0%B0/"+v).then(v=>console.log(v.status)).catch(v=>console.log(v));
        })
        page.edited = true;
      
      }
    });
  }
  const addPage = (id, height)=>{
    let exesLines = (height-6)/22+1;
    let curText = pages[id].text;
    if(curText.split('\n').slice(-1).length/2-30*exesLines<5){
      const toMove = curText.slice(curText.lastIndexOf('\n'))+"!focus!";
      pages[id].text = curText.slice(0, curText.lastIndexOf('\n'));
      if(pages.length>id+1){
        const npage=toMove+pages[id+1].text;
        pages[id+1].text = npage;
        pages[id+1].edited = false;
      }else{
        pages.push({text:toMove, edited:false});
      }
      setPages([...pages]);
    }
    if(!editing){
      setEding(true);
      check().then(()=>setEding(false))

    }

  }
  const pagesDispl = pages.map((v,i)=><TextArea key={i} setText={(d)=>{setPages(pages.map((p, j)=>j===i?{text:d, edited:false}:p))}} text={v.text} pushChapter = {pushChapter} nextPage={(h)=>addPage(i, h)}/>)



  return (
    <div className="outlay">
      <Header text={text}></Header>
      <div className="main">
        <Chapters list={chapters} />
        <div className="pages-cont">
          {pagesDispl}
        </div>
        <Music setModal={setModal}/>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <></>
      )}
      <Modal type={modal.type} onFinish={modal.onFinish} data={modal.data}/>
    </div>
  );
}

export default App;
