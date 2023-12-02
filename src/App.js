import logo from "./logo.svg";
import "./App.css";
import TextArea from "./Components/TextArea/TextArea";
import { useEffect, useState } from "react";
import Loader from "./Components/Loader/Loader";
import LoadButton from "./Components/LoadButton/LoadButton";
import Header from "./Components/Header/Header";
import Chapters from "./Components/Chapters/Chapters";

function App() {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [chapters, setChapter] = useState([]);
  const [pages, setPages] = useState([]);


  useEffect(() => {
    setChapter([]);
  }, [text]);

  const pushChapter = (ch) => {
    if(chapters.every(c=>c.id!==ch.id && ch.name!==c.id))
      setChapter([...chapters, ch]);
  };

  const pagesDispl = pages.map(v=><TextArea setText={setText} text={v} pushChapter = {pushChapter}/>)



  return (
    <div className="outlay">
      <Header></Header>
      <div className="main">
        {/* <Chapters list={chapters} /> */}
        
      </div>
      {loading ? (
        <Loader />
      ) : (
        <LoadButton text={text} setLoading={setLoading} setText={setText} />
      )}
    </div>
  );
}

export default App;
