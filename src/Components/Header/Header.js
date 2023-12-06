import React from "react";
import "./style.css";
import Fetcher from "../../JavaScript/Classes/Fetcher";
import { useState } from "react";

function Header({text}) {

  const [name, setName] = useState("");



  return (
    <header>
      <nav>
        <label>Назва: <input value={name} type="text" onChange={(v)=>setName(v.target.value)}/></label>

        <select
          title="File"
          onChange={(e) => {
            switch (e.target.selectedIndex) {
                case 1: {
                let r = window.confirm(
                  "Do you want to save your curent progres?"
                );
                if (r) Fetcher.save(name, text());
                break;
              }
              case 2:
                Fetcher.save(name, text());
                break;
              case 3:
                Fetcher.load(setName, text);
                break;
             
              default:{}
            }
            e.target.selectedIndex = 0;
          }}

        >
          <option className="hidden">Файл</option>
          <option>Новий</option>

          <option>Зберегти</option>
          <option>Загрузити</option>
        </select>

      </nav>
    </header>
  );
}

export default Header;
