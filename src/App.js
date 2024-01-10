
import "./App.css";
import TextArea from "./Components/TextArea/TextArea";
import { useEffect, useState } from "react";
import Loader from "./Components/Loader/Loader";
import Header from "./Components/Header/Header";
import Chapters from "./Components/Chapters/Chapters";
import Modal from "./Components/Modal/Modal";
import Side from "./Components/Side/Side";

function App() {
  const [loading] = useState(false);
  const [chapters, setChapter] = useState([]);
  const [pages, setPages] = useState([{text:"", edited:false}]);
  const [modal, setModal]= useState({type:"inactive", onFinish:()=>{}, data:[]})
  const text = (text)=>{
    if(text===undefined){
      let res = ""
      pages.forEach(e => {
        res+=e.text+"\n";
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
  const addPage = (id, height)=>{
    let exesLines = (height-6)/22+1;
    let curText = pages[id].text;
    if(curText.split('\n').slice(-1).length/2-30*exesLines<5){
      const toMove = curText.slice(curText.lastIndexOf('\n'))+"#focus#";
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
        <Side setModal={setModal}/>
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
