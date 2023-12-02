import React from "react";
import "./style.css";
import Fetcher from "../../JavaScript/Classes/Fetcher";

function Header({addChapter}) {
  return (
    <header>
      <nav>
        <select
          title="File"
          onChange={(e) => {
            switch (e.target.selectedIndex) {
                case 1: {
                let r = window.confirm(
                  "Do you want to save your curent progres?"
                );
                if (r) Fetcher.save();
                break;
              }
              case 2:
                Fetcher.save();
                break;
              case 3:
                Fetcher.load();
                break;
             
              default:{}
            }
            e.target.selectedIndex = 0;
          }}

        >
          <option className="hidden">File</option>
          <option>New</option>

          <option>Save</option>
          <option>Load</option>
        </select>
        <select onChange={(e)=>{
            e.preventDefault();
            addChapter(e.target.selectedIndex)
            e.target.selectedIndex = 0;
        }}>
            <option className="hidden">Додати Розділ</option>
            <option>Першого порядку</option>
            <option>Другого порядку</option>
            <option>Третього порядку</option>
            <option>Четвертого порядку</option>
            <option>П'ятого порядку</option>
            <option>Шостого порядку</option>
        </select>

      </nav>
    </header>
  );
}

export default Header;
