import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { nanoid } from "nanoid";
import Paragraph from "../Paragraph/Paragraph";
import Fixes from "../Fixes/Fixes";

function TextArea({ setText, text, pushChapter, nextPage }) {
  const refInp = useRef();
  const [fetching, setFetching] = useState(false);
  const [fixData, setFixData] = useState({
    start: 0,
    end: 0,
    fixs: [],
    top: "0px",
    left: "0px",
  });
  let disp = text.split("\n").map((par) => {
    return (
      <Paragraph
        key={nanoid()}
        text={par}
        pushChapter={pushChapter}
        setFixes={(fixs, start, end) => {
          setFixData({ start, end, fixs });
        }}
      ></Paragraph>
    );
  });
  let toInp = "";
  let arr = text.split("⠀");
  for (let i = 0; i < arr.length; i += 2) {
    toInp += arr[i].replace("&nbsp;", " ");
  }

  useEffect(() => {
    const format = () => {
      const prevText = text;
      text = text.replace("   ", "\t");
      const punct = [",", ".", "!", "?"];
      punct.forEach((p) => {
        text = text.replace(p + "-", "\0");
        text = text.replace(p, p + " ");
        text = text.replace(" " + p, p);
        text = text.replace("\0", p + "-");
      });

      while (text.includes("  ")) {
        text = text.replace("  ", " ");
      }
      let cap = false;
      let ntex = "";
      text.split(" ").forEach((f, i, arr) => {
        if (cap) {
          if (f.length > 1) {
            f = f.toUpperCase()[0] + f.substring(1);
          }else{
            f = f.toUpperCase();
          }
        }
        if (f.length <= 2) {
          ntex += f;
        } else {
          const fcap = f.toUpperCase();

          if (fcap[0] === f[0]) {
            if (fcap[1] === f[1] && fcap[2] !== f[2]) {
              ntex += fcap[0] + f.toLowerCase().substring(1);
            } else {
              ntex += f;
            }
          } else {
            ntex += f;
          }
        }
        if (f !== "" && (i + 1 !== arr.length || text.endsWith(" ")))
          ntex += " ";
        cap = f.endsWith(".") || f.endsWith("!") || f.endsWith("?");
      });
      if (ntex !== prevText) setText(ntex);
    };
    if (refInp.current.scrollHeight > refInp.current.clientHeight) {
      nextPage(refInp.current.scrollHeight - refInp.current.clientHeight);
    }
    if (text.includes("#focus#")) {
      refInp.current.focus();
      setText(text.replace("#focus#", ""));

    }
    setFixData({ start: 0, end: 0, fixs: [], top: "0px", left: "0px" });
    format();
  }, [nextPage, setText, text]);

  const ask = () => {
    console.log(text);
    const symb = "⠀";
    let words = text.split(" ");
    let promises = [];
    let ntex = "";

    setFetching(true);

    words
      .reduce((previousPromise, w) => {
        if (w !== "") {
          let punct = "";
          if (w.match(".*[,.(!?]")) {
            punct = w[w.length - 1];
            w = w.substring(0, w.length - 1);
          }
          let promise;
          if (w.length < 2) {
            promise = () => {
              ntex += w + punct + " ";
            };
          } else {
            promise = () =>
              fetch(
                "https://localhost:7125/Words/Exists/" + encodeURIComponent(w)
              )
                .then((v) => v.json())
                .then((v) => {
                  if (v.exists === "True") {
                    ntex += w + punct + " ";
                  } else {
                    ntex += w + punct + symb + v.fixes + symb + " ";
                  }
                })
                .catch((error) => {
                  console.error("Error for word", w, ":", error);
                  ntex += w + punct + " ";
                });
          }

          promises.push(promise);

          return previousPromise.then(() => promise());
        } else {
          return previousPromise;
        }
      }, Promise.resolve())
      .then(() => {
        setFetching(false);
        console.log("end");
        setText(ntex);
      })
      .catch((error) => {
        console.error("Error during Promise.all:", error);
      });
  };

  return (
    <div
      className="page holder"
      onBlur={(e) => {
        if (!fetching) {
          ask();
        }
      }}
    >
      <textarea
        className="page input"
        onInput={(e) => {
          setText(e.target.value);
        }}
        value={toInp}
        ref={refInp}
        {...(fetching ?? "disabled")}
      ></textarea>
      <div className="page">{disp}</div>
      <Fixes
        start={fixData.start}
        end={fixData.end}
        fixs={fixData.fixs}
        text={text}
        setText={setText}
      />
    </div>
  );
}

export default TextArea;
