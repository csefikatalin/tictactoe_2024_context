# Tic Tac Toe alkalmazás context használatával

Az előző példában láttuk, hogyan használjuk a propsokat és stateket egy react alkalmazásban, valamint azt is, hogy a gyerek komponensnek miként adhatjuk át a kattintás kezelő függvényt. 
<a href="https://github.com/csefikatalin/tictactoe_2024.git">TitTacToe props, state és az állapot buborékoltatása a komponensfán. </a>

## Context API

A REACT Context API a React beépített funkciója, mely lehetővé teszi a komponensek közötti adatátvitelt az egész komponensfa hierarchiájában anélkül, hogy közvetlenül props-okon keresztül kellene átadni az adatokat. 

Különösen azokban az esetekben hasznos, amikor az alkalmazás állapotának vagy beállításainak globális elérést szeretnénk biztosítani a komponensek számára, vagy ha egy alkomponens által elérhető adatokat szeretnénk átadni több szülőkomponensnek. 

Alkalmas egyszerűbb állapotkezelésre vagy statikus értékek megosztására (pl. téma, nyelvi beállítások, autentikációs állapot).

Az állapotot általában egy useState vagy useReducer hookon keresztül kezeljük a Context Providerben, majd ezt az állapotot terjesztjük tovább a Context-en keresztül.

A Context nem rendelkezik saját állapotkezelő logikával, inkább az állapot elérhetőségéért felelős.

Az összes komponens, amely feliratkozott a Context-re, újrarenderelésre kerül, még akkor is, ha az adott komponens nem használja az éppen megváltozott adatokat. Ezért Context inkább kisebb, statikusabb adatokra alkalmas.

## Context API két fő eleme

1. Provider: Ez a komponens tartalmazza az adatokat, amelyeket más komponensek szeretnének használni. A Provider az adatokat egy Context-be helyezi el. Az általa körbeölelt komponensek számára ezáltal elérhetővé válnak ezek az adatok. 
2.	useContext hook (vagy Consumer ): Ez a mechanizmus, amely lehetővé teszi a komponensek számára, hogy hozzáférjenek az adatokhoz, amelyeket a Provider rendelkezésre bocsátott. 


## Használata lépésről lépésre

1. Hozzunk létre egy context mappát az src mappában, abban egy KattContext.js fájlt. 
2. A fájlba importáljuk a createContext hook-ot, és hozzuk létre a contextünket. 

    import { createContext, useState } from "react";
    export const KattContext = createContext("");

3. Ezután hozzuk létre a Providert. 

    export const KattProvider = ({ children }) => {

        return <KattContext.Provider value={{}}> {children} </KattContext.Provider>;
    };
4. Mostmár kivehetjük az App komponensben definiált állapotkezelést és áthelyezhetjük a Providerünkbe. 

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

5. Továbbá a provider value értékébe helyezzük el azokat a változókat, amelyeket használni szeretnénk majd a Provider által körbevett komponensekben.  Most így néz ki a KattContext.js-ben a Providerünk: 

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

6. Most az index.js-ben öleljük körbe a providerrel az App komponenst. Ezután már használhatjuk a provider value paraméterében megadott változókat az App-ban , illetve annak gyerekkomponenseiben.  Ne felejtsük el importálni a Kattprovidert! import { KattProvider } from './context/KattContext'; 

    <React.StrictMode>
    <KattProvider>
        <App />
    </KattProvider>
    </React.StrictMode>

7. App komponens: 
Az App komponensből kivehetjük az állapotkezelést, ám itt használni akarjuk a Contextünkben definiált lista state-et. 
Mivel ez szerepel a Provider value értékei között, ezért felhasználhatjuk itt. 
Ehhez használnunk kell a useContext hook-ot. 
Az App komponens első sorába  írjuk be: 

    const {lista} = useContext(KattContext)

Ne felejtsük el importálni a useContext-et!

8. Hasonló módon járjunk el a Cella komponensnél is! Ott a katt függvényt akarjuk használni, ezért azt kell behívni a contextből. 
    
    const {katt} =useContext(KattContext)

Ezután már nem kell a korábban létrehozott katt függvényt sem itt, sem a JatekTer komonensben, törölhetőek. A Cella komponens közvetlenül hívni tudja a context katt függvényét, ahol az állapotkezelés megtörténik majd.

    import React, { useContext } from 'react'
    import './Cella.css'
    import { KattContext } from '../context/KattContext'

    export default function Cella(props) {
        const {katt} =useContext(KattContext)
        
        return (
            <div className='cella' onClick={()=>{katt(props.index)}}>
                {props.jel}
            </div>
        )
    }

 

