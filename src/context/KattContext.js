import { createContext, useState } from "react";
export const KattContext = createContext("");

export const KattProvider = ({ children }) => {
  const [lepes, setLepes] = useState(0);
  const [lista, setLista] = useState(["X","X"," ","O"," "," "," "," ","O",]);
  
  function katt(adat) {
    const sl = [...lista];
    if (lepes % 2 == 0) {
      sl[adat] = "X";
    } else {
      sl[adat] = "O";
    }
    setLista([...sl]);
    let slepes = lepes + 1;
    setLepes(slepes);
  }

  return (
    <KattContext.Provider value={{ lista, katt }}>
      {" "}
      {children}{" "}
    </KattContext.Provider>
  );
};
