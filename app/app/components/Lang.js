// "use client";
// import { useEffect, useState } from "react";
// import { SelectPicker } from "rsuite";
// import { getCookie, hasCookie, setCookie } from "cookies-next";

// const GoogleTranslate = () => {
//   const languages = [
//     { label: "English", value: "/auto/en" },
//     { label: `Русский`, value: "/auto/ru" },
//     { label: "Polski", value: "/auto/pl" },
//   ];
//   const [selected, setSelected] = useState(null);
//   useEffect(() => {
//     var addScript = document.createElement("script");
//     addScript.setAttribute(
//       "src",
//       "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
//     );
//     document.body.appendChild(addScript);
//     window.googleTranslateElementInit = googleTranslateElementInit;
//   }, []);
//   if (hasCookie("googtrans")) {
//     setSelected(getCookie("googtrans"));
//   } else {
//     setSelected("/auto/en");
//   }
//   const googleTranslateElementInit = () => {
//     new window.google.translate.TranslateElement(
//       {
//         pageLanguage: "auto",
//         autoDisplay: false,
//         includedLanguages: "ru,en,pl", // If you remove it, by default all google supported language will be included
//         layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
//       },
//       "google_translate_element"
//     );
//   };
//   const langChange = (e, m, evt) => {
//     evt.preventDefault();
//     if (hasCookie("googtrans")) {
//       setCookie("googtrans", decodeURI(e));
//       setSelected(e);
//     } else {
//       setCookie("googtrans", e);
//       setSelected(e);
//     }
//     window.location.reload();
//   };
//   return (
//     <>
//       <div
//         id="google_translate_element"
//         style={{
//           width: "0px",
//           height: "0px",
//           position: "absolute",
//           left: "50%",
//           zIndex: -99999,
//         }}
//       ></div>
//       <SelectPicker
//         data={languages}
//         style={{ width: 100 }}
//         placement="bottomEnd"
//         cleanable={false}
//         value={selected}
//         searchable={false}
//         className={"notranslate"}
//         menuClassName={"notranslate"}
//         onSelect={(e, m, evt) => langChange(e, m, evt)}
//         placeholder="Lang"
//       />
//     </>
//   );
// };



"use client";
import { useEffect, useState } from "react";
import { SelectPicker } from "rsuite";
import { getCookie, hasCookie, setCookie } from "cookies-next";

const googleTranslateElementInit = () => {
  new window.google.translate.TranslateElement(
    {
      pageLanguage: "auto",
      autoDisplay: false,
      includedLanguages: "ru,en,pl",
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    },
    "google_translate_element"
  );
};

const GoogleTranslate = () => {
  const languages = [
    { label: "English", value: "/auto/en" },
    { label: `Русский`, value: "/auto/ru" },
    { label: "Polski", value: "/auto/pl" },
  ];
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  useEffect(() => {
    if (hasCookie("googtrans")) {
      setSelected(getCookie("googtrans"));
    } else {
      setSelected("/auto/en");
    }
  }, []); // Run this effect only once on component mount

  const langChange = (e, m, evt) => {
    evt.preventDefault();
    if (hasCookie("googtrans")) {
      setCookie("googtrans", decodeURI(e));
      setSelected(e);
    } else {
      setCookie("googtrans", e);
      setSelected(e);
    }
    window.location.reload();
  };
  return (
    < >
      <div
        id="google_translate_element"
        style={{
          width: "0px",
          height: "0px",
          position: "absolute",
          left: "50%",
          zIndex: -99999,
        }}
      ></div>
      <SelectPicker
        data={languages}
        style={{ width: 100 }}
        placement="bottomEnd"
        cleanable={false}
        value={selected}
        searchable={false}
        className={"notranslate"}
        menuClassName={"notranslate"}
        onSelect={(e, m, evt) => langChange(e, m, evt)}
        placeholder="Lang"
      />
    </>
  );
};


export default GoogleTranslate;