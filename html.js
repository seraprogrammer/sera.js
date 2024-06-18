
document.addEventListener("DOMContentLoaded", function () {
  window.MyLibrary = {
    ButtonEvents: function () {
      document.querySelectorAll("button").forEach((t) => {
        t.addEventListener("click", function (t) {
          const n = t.target.getAttribute("alert"),
            e = t.target.getAttribute("console");
          n && alert(n), e && console.log(e);
        });
      });
    },
    Tabs: function () {
      const t = document.querySelectorAll("[tab-btn]"),
        n = document.querySelectorAll("[tab-content]");
      n.forEach((t) => {
        t.style.display = "none";
      }),
        t.forEach((t) => {
          if (
            (t.addEventListener("click", () => {
              const e = t.getAttribute("role");
              n.forEach((t) => {
                t.getAttribute("role") === e
                  ? (t.style.display = "block")
                  : (t.style.display = "none");
              });
            }),
            t.hasAttribute("show"))
          ) {
            const n = t.getAttribute("role");
            document.querySelector(`[tab-content][role="${n}"]`).style.display =
              "block";
          }
        });
    },
    CascadingSelects: function () {
      const t = document.querySelector("select[parent]"),
        n = document.querySelectorAll("select[child]");
      function e(t, n) {
        const e = t.value,
          o = n.querySelectorAll("option");
        let a = "";
        o.forEach((t) => {
          t.getAttribute("select-parent") === e
            ? ((t.style.display = ""), a || (a = t.value))
            : (t.style.display = "none");
        }),
          (n.value = a || "");
        const r = new Event("change");
        n.dispatchEvent(r);
      }
      t.addEventListener("change", function () {
        e(t, n[0]);
      }),
        n[0].addEventListener("change", function () {
          e(n[0], n[1]);
        }),
        e(t, n[0]);
    },
    Toasts: function () {
      const t = document.createElement("style");
      (t.textContent =
        '\n    /* Toast container */\n    [toast-container] {\n      position: fixed;\n      z-index: 1000;\n      pointer-events: none; /* Allow clicks to pass through */\n    }\n\n    /* Positions */\n    [toast-container][toast-position="top"] {\n      top: 10px;\n      left: 50%;\n      transform: translateX(-50%);\n    }\n    [toast-container][toast-position="bottom"] {\n      bottom: 10px;\n      left: 50%;\n      transform: translateX(-50%);\n    }\n    [toast-container][toast-position="top-right"] {\n      top: 10px;\n      right: 10px;\n    }\n    [toast-container][toast-position="top-left"] {\n      top: 10px;\n      left: 10px;\n    }\n    [toast-container][toast-position="bottom-right"] {\n      bottom: 10px;\n      right: 10px;\n    }\n    [toast-container][toast-position="bottom-left"] {\n      bottom: 10px;\n      left: 10px;\n    }\n\n    /* Toast message */\n    .toast {\n      display: flex;\n      align-items: center;\n      background: #000;\n      color: #fff;\n      padding: 8px 21px;\n      border-radius: 5px;\n      box-shadow: 0 1px 10px 0 rgba(0,0,0,.1),0 2px 15px 0 rgba(0,0,0,.05);\n      margin: 10px 0;\n      opacity: 0;\n      transform: translate3d(100%, 0, 0) scale(0.5);\n      pointer-events: auto; /* Allow clicks */\n      transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;\n      width: fit-content;\n      position: relative;\n      margin-bottom: 10px;\n      cursor: pointer;\n    }\n    .toast p {\n        font-size: 16px;\n        font-family: sans-serif;\n    }\n    .toast.show {\n      opacity: 1;\n      transform: translate3d(0, 0, 0) scale(1);\n      animation: bounceInRight 0.75s;\n    }\n\n    .toast.hide {\n      opacity: 0;\n      transform: translate3d(100%, 0, 0) scale(0.5);\n    }\n\n    /* Animation for coming from the right */\n    @keyframes slideInFromRight {\n      0% {\n        opacity: 0;\n        transform: translateX(3000px) scale(0.5);\n      }\n      60% {\n        opacity: 1;\n        transform: translateX(-25px) scale(1.05);\n      }\n      75% {\n        transform: translateX(10px) scale(0.95);\n      }\n      90% {\n        transform: translateX(-5px) scale(1.02);\n      }\n      100% {\n        transform: translateX(0) scale(1);\n      }\n    }\n\n    /* Animation for coming from the left */\n    @keyframes slideInFromLeft {\n      0% {\n        opacity: 0;\n        transform: translateX(-3000px) scale(0.5);\n      }\n      60% {\n        opacity: 1;\n        transform: translateX(25px) scale(1.05);\n      }\n      75% {\n        transform: translateX(-10px) scale(0.95);\n      }\n      90% {\n        transform: translateX(5px) scale(1.02);\n      }\n      100% {\n        transform: translateX(0) scale(1);\n      }\n    }\n\n    @keyframes slideInFromTop {\n      0% {\n        opacity: 0;\n        transform: translateY(-3000px) scale(0.5);\n      }\n      60% {\n        opacity: 1;\n        transform: translateY(25px) scale(1.05);\n      }\n      75% {\n        transform: translateY(-10px) scale(0.95);\n      }\n      90% {\n        transform: translateY(5px) scale(1.02);\n      }\n      100% {\n        transform: translateY(0) scale(1);\n      }\n    }\n\n    @keyframes slideInFromBottom {\n      0% {\n        opacity: 0;\n        transform: translateY(3000px) scale(0.5);\n      }\n      60% {\n        opacity: 1;\n        transform: translateY(-25px) scale(1.05);\n      }\n      75% {\n        transform: translateY(10px) scale(0.95);\n      }\n      90% {\n        transform: translateY(-5px) scale(1.02);\n      }\n      100% {\n        transform: translateY(0) scale(1);\n      }\n    }\n\n    .toast.from-right {\n      animation: slideInFromRight 0.75s;\n    }\n\n    .toast.from-left {\n      animation: slideInFromLeft 0.75s;\n    }\n\n    .toast.from-top {\n      animation: slideInFromTop 0.75s;\n    }\n    .toast.from-bottom {\n      animation: slideInFromBottom 0.75s;\n    }\n\n    /* Close button */\n   .toast .toast-close {\n    background: transparent;\n    border: none;\n    color: #9e9898;\n    font-size: 15px;\n    margin-left: 10px;\n    cursor: pointer;\n    position: absolute;\n    right: 1px;\n    top: 5px;\n}\n\n    /* Progress bar */\n    .progress-bar {\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      width: 100%;\n     \n      height: 5px;\n      background-color: #fff;\n    }\n\n    .progress-bar-fill {\n      height: 100%;\n      background: linear-gradient(\n        45deg,\n        #ff5733,\n        #ff8d1a,\n        #ffc300,\n        #daf7a6,\n        #33ff57,\n        #33ffbd,\n        #33d4ff,\n        #3375ff,\n        #8e33ff,\n        #ff33a8\n      );\n      width: 100%;\n      transition: width 0.1s;\n    }\n\n    /* Dark theme */\n    [toast-container][dark] .toast {\n      background-color: #121212;\n      color: #fff;\n      box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1),\n        0 2px 15px 0 rgba(0, 0, 0, 0.05);\n    }\n\n    [toast-container][dark] .toast-close {\n      color: #d1d0d0;\n    }\n\n    [toast-container][dark] .toast-close:hover {\n      color: #fff;\n    }\n\n    /* Light theme */\n    [toast-container]:not([dark]) .toast {\n      background-color: #fff;\n      color: #333;\n      box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1),\n        0 2px 15px 0 rgba(0, 0, 0, 0.05);\n    }\n\n    [toast-container]:not([dark]) .toast-close {\n      color: #9b9a9a;\n    }\n\n    [toast-container]:not([dark]) .toast-close:hover {\n      color: #000;\n    }\n  '),
        document.head.appendChild(t);
      const n = document.querySelector("[toast-container]");
      document.querySelectorAll("[toast-trigger]").forEach((t) => {
        t.addEventListener("click", () => {
          const e = t.getAttribute("role"),
            o = document.querySelector(`.toast-container[role="${e}"]`);
          if (o) {
            !(function (t, e, o, a) {
              const r = document.createElement("div");
              r.className = "toast";
              const s = document.createElement("p");
              (s.textContent = t),
                (s.style.color = a || "#fff"),
                r.appendChild(s),
                r.setAttribute("toast-position", o);
              const l = document.createElement("button");
              (l.className = "toast-close"),
                (l.textContent = "X"),
                l.addEventListener("click", () => {
                  r.classList.add("hide"), setTimeout(() => r.remove(), 500);
                }),
                r.appendChild(l);
              const c = document.createElement("div");
              c.className = "progress-bar";
              const i = document.createElement("div");
              if (
                ((i.className = "progress-bar-fill"),
                c.appendChild(i),
                r.appendChild(c),
                n.appendChild(r),
                setTimeout(() => {
                  r.classList.add("show");
                }, 10),
                e)
              ) {
                const t = Date.now() + e,
                  n = () => {
                    const o = Date.now(),
                      a = (Math.max(0, t - o) / e) * 100;
                    (i.style.width = a + "%"),
                      o < t
                        ? requestAnimationFrame(n)
                        : (r.classList.add("hide"),
                          setTimeout(() => r.remove(), 500));
                  };
                n();
              }
              o.includes("top-right") || o.includes("bottom-right")
                ? r.classList.add("from-right")
                : o.includes("top-left") || o.includes("bottom-left")
                ? r.classList.add("from-left")
                : o.includes("top")
                ? r.classList.add("from-top")
                : o.includes("bottom") && r.classList.add("from-bottom");
            })(
              o.getAttribute("toast-content"),
              parseInt(o.getAttribute("time")),
              o.getAttribute("toast-position"),
              o.getAttribute("text")
            );
          }
        });
      });
    },
    Valid: function () {
      const t = document.querySelector("[text]"),
        n = document.querySelector("[validation]"),
        e = n.querySelector("[email]"),
        o = n.querySelector("[password]"),
        a = n.querySelector("[confirmPassword]"),
        r = parseInt(n.getAttribute("time"), 10);
      function s(t, n) {
        return (
          (t.nextElementSibling.innerText = n),
          t.parentElement.classList.add("invalid"),
          !1
        );
      }
      function l(t) {
        return (
          (t.nextElementSibling.innerText = ""),
          t.parentElement.classList.remove("invalid"),
          !0
        );
      }
      n.addEventListener("submit", function (c) {
        c.preventDefault(),
          ("" === t.value.trim() ? s(t, "Please complete this field") : l(t)) &&
            (e.value.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)
              ? l(e)
              : s(e, "Invalid email")) &&
            (o.value.match(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!%*?&])[A-Za-z\d@!%*?&]{8,}$/
            )
              ? l(o)
              : s(
                  o,
                  "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
                )) &&
            (o.value !== a.value || "" === a.value
              ? s(a, "Passwords do not match")
              : l(a)) &&
            setTimeout(function () {
              n.submit();
            }, r);
      });
    },
    Color: function () {
      const t = document.querySelectorAll("[red]"),
        n = document.querySelectorAll("[green]"),
        e = document.querySelectorAll("[orange]"),
        o = document.querySelectorAll("[yellow]"),
        a = document.querySelectorAll("[white]"),
        r = document.querySelectorAll("[black]"),
        s = document.querySelectorAll("[lime]"),
        l = document.querySelectorAll("[sky]"),
        c = document.querySelectorAll("[blue]"),
        i = document.querySelectorAll("[indigo]"),
        d = document.querySelectorAll("[violet]"),
        f = document.querySelectorAll("[pink]"),
        m = document.querySelectorAll("[cyan]");
      t.forEach((t) => {
        t.style.color = "#ef4444";
      }),
        n.forEach((t) => {
          t.style.color = "#22c55e";
        }),
        e.forEach((t) => {
          t.style.color = "#f97316";
        }),
        o.forEach((t) => {
          t.style.color = "#fde047";
        }),
        a.forEach((t) => {
          t.style.color = "#fff";
        }),
        r.forEach((t) => {
          t.style.color = "#000";
        }),
        s.forEach((t) => {
          t.style.color = "#84cc16";
        }),
        l.forEach((t) => {
          t.style.color = "#0ea5e9";
        }),
        c.forEach((t) => {
          t.style.color = "#3b82f6";
        }),
        i.forEach((t) => {
          t.style.color = "#4f46e5";
        }),
        d.forEach((t) => {
          t.style.color = "#7c3aed";
        }),
        f.forEach((t) => {
          t.style.color = "#db2777";
        }),
        m.forEach((t) => {
          t.style.color = "#0891b2";
        });
    },
    Code: function () {
      const t = { name: name },
        n = (function (t, n) {
          let e = "",
            o = 0;
          for (; o < t.length; )
            if ("{" === t[o]) {
              let a = o;
              for (; a < t.length && "}" !== t[a]; ) a++;
              if (a < t.length) {
                const r = t.slice(o + 1, a);
                (e += r in n ? n[r] : `{${r}}`), (o = a + 1);
              } else (e += t[o]), o++;
            } else (e += t[o]), o++;
          return e;
        })(document.body.innerHTML, t);
      document.body.innerHTML = n;
    },
    Drag: function () {
      const t = document.createElement("style");
      (t.textContent =
        "\n      .draggable {\n        cursor: move;\n        position: absolute;\n      }\n    "),
        document.head.appendChild(t),
        document.querySelectorAll("[darg]").forEach((t, n) => {
          if ((t.classList.add("draggable"), t.hasAttribute("saved"))) {
            const e = localStorage.getItem(`draggableElementPosition-${n}`);
            if (e) {
              const n = JSON.parse(e);
              (t.style.left = `${n.left}px`), (t.style.top = `${n.top}px`);
            }
          }
          t.setAttribute("draggable", "true"),
            t.addEventListener("dragstart", (n) => {
              n.dataTransfer.setData("text/plain", null),
                n.dataTransfer.setDragImage(t, 0, 0),
                (t.style.opacity = "0.5");
            }),
            t.addEventListener("dragend", (e) => {
              t.style.opacity = "1";
              const o = e.pageX - t.offsetWidth / 2,
                a = e.pageY - t.offsetHeight / 2;
              if (
                ((t.style.left = `${o}px`),
                (t.style.top = `${a}px`),
                t.hasAttribute("saved"))
              ) {
                const t = { left: o, top: a };
                localStorage.setItem(
                  `draggableElementPosition-${n}`,
                  JSON.stringify(t)
                );
              }
            });
        });
    },
  };
  const t = document.querySelector("body").getAttribute("import");
  if (t) {
    t.split(" ").forEach((t) => {
      "function" == typeof MyLibrary[t] && MyLibrary[t]();
    });
  }
});
