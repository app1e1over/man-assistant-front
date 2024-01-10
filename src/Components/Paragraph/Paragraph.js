import React from "react";
import Sentence from "../Sentence/Sentence";
import { nanoid } from "nanoid";
import "./style.css";

const hashCode = function (str) {
  var hash = 0,
    i,
    chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

function Paragraph({ text, pushChapter, setFixes }) {
  let id = "";

  if (text.toLowerCase().includes("розділ")) {
    let name = text.toLowerCase().split("розділ")[1].trim();
    id = hashCode(name.split(" ")[0]);
    pushChapter({ id, name });
  }
  let end = 0;
  let disp = text
    .replace(".", ".\0")
    .replace("!", "!\0")
    .replace("?", "?\0")
    .split("\0")
    .map((s, i, arr) => {
      end += s.length;
      return (
        <Sentence
          key={nanoid()}
          text={s}
          setFixes={(fixs, st, ed) => {
            setFixes(
              fixs.split(","),
              end - s.length + st,
              end - s.length + st + ed,
            );
          }}
        ></Sentence>
      );
    });
  if (id !== "") {
    return (
      <p id={id} className="par">
        {disp}
      </p>
    );
  }
  return <p className="par">{disp}</p>;
}

export default Paragraph;
