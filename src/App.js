
import "./App.css";
import TextArea from "./Components/TextArea/TextArea";
import { useEffect, useState } from "react";
import Loader from "./Components/Loader/Loader";
import Header from "./Components/Header/Header";
import Chapters from "./Components/Chapters/Chapters";
import Music from "./Components/Music/Music";

function App() {
  const [loading] = useState(false);
  const [chapters, setChapter] = useState([]);
  const [pages, setPages] = useState([""]);
  const text = (text)=>{
    if(text===undefined){
      let res = ""
      pages.forEach(e => {
        res+=e+"\n";
      });
      return res;
    }else{
      setPages([text])
    }

  }
  useEffect(() => {
    setChapter([]);
  }, [ pages]);

  const pushChapter = (ch) => {

    if(chapters.every(c=>c.id!==ch.id))
      setChapter([...chapters, ch]);
  };
  const addPage = (id, height)=>{
    let exesLines = (height-6)/22+1;
    let curText = pages[id];
    if(curText.split('\n').slice(-1).length/2-30*exesLines<5){
      const toMove = curText.slice(curText.lastIndexOf('\n'))+"!focus!";
      pages[id] = curText.slice(0, curText.lastIndexOf('\n'));
      if(pages.length>id+1){
        const npage=toMove+pages[id+1];
        pages[id+1] = npage;
      }else{
        pages.push(toMove);
      }
      setPages([...pages]);
    }
    console.log(id, height);
  }
  const pagesDispl = pages.map((v,i)=><TextArea key={i} setText={(d)=>{setPages(pages.map((p, j)=>j===i?d:p))}} text={v} pushChapter = {pushChapter} nextPage={(h)=>addPage(i, h)}/>)



  return (
    <div className="outlay">
      <Header text={text}></Header>
      <div className="main">
        <Chapters list={chapters} />
        <div className="pages-cont">
          {pagesDispl}
        </div>
        <Music/>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
