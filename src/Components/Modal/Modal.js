import React, { useState } from "react";
import "./style.css";

function Modal({ type, onFinish, data }) {
  const [selectedCats, setSelected] = useState([]);

  if (type === "inactive") return <div></div>;

  if (type === "music-add") {
    const submit = (e) => {
      e.preventDefault();
      const form = e.target;
      let cats = "";
      selectedCats.forEach((cat) => {
        cats += "|" + cat;
      });

      if(form["name"].value.trim()==="" ||  !getVideoId(form["link"].value)){
        return;
      }
      console.log(getVideoId(form["link"].value)==="");

      setSelected([]);



      onFinish({
        name: form["name"].value,
        category: cats,
        id: getVideoId(form["link"].value),
      });
    };
    const getVideoId = (link) => {
      const match = link.match(/[?&]v=([^?&]+)/);
      return match && match[1];
    };

    const catChange = (e) => {
      e.preventDefault();
      const val = e.target.value.trim();
      if (val === "") {
        return;
      }
      if (!selectedCats.includes(val)) {
        setSelected([...selectedCats, val]);
      }
    };
    return (
      <div className="backdrop">
        <form onSubmit={submit} className="music">
          <h1>Додай пісню</h1>
          <label>
            Назва: <input name="name" />
          </label>
          <br />
          <label>
            Покликання(YouTube): <input name="link" />
          </label>
          <br />
          <div className="cat">
            <label>Категорії:</label>
            <ul className="cats-music">
              {selectedCats.map((v) => (
                <li>
                  {v}
                  <button
                    type="john"
                    onClick={(e) => {
                      e.preventDefault();
                      const val = e.target.parentElement.innerText.replace(
                        "🗑️",
                        ""
                      );
                      setSelected(selectedCats.filter((c) => c !== val));
                    }}
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <select onChange={catChange}>
            {data[0].map((v) => (
              <option>{v}</option>
            ))}
          </select>
          <input name="_toAdd" />{" "}
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              catChange({
                preventDefault: () => {},
                target: e.target.parentElement["_toAdd"],
              });
            }}
          >
            Додати категорію
          </button>
          <br />
          <button>Готово</button>
        </form>
      </div>
    );
  }
}

export default Modal;
