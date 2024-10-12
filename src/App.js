
import { useState } from 'react';
import './App.css';
import JatekTer from './components/JatekTer';

function App() {
  //a lista írja le a program állapotát
  // ha a lista változik, akkor a képernyő megfelelő tartalma is változzon
  // react STATE  ehhez useState hook-ot használ -  spec fvény
  //const lista=["X","X"," ","O"," "," "," "," ","O"]
  const [lista,setLista] = useState(["X","X"," ","O"," "," "," "," ","O"])
  // program állapotát a lepes változó is leírja
  const  [lepes,setLepes]=useState(0)
  function katt(adat){
    console.log("app-ban",adat)
    //lista[adat]="X" így nem változtathatjuk meg a state értékét
    //csak a setterén/beállítófüggvényén keresztül. 
    //1. készíts egy másolatot a változóról. 
    //2. változtasd meg az értékét
    //3. beállítóvüggvényen keresztül változtasd meg az eredeti változót.
    
    const sl=[...lista]
    if (lepes%2==0){
      sl[adat]="X"
    }else{
       sl[adat]="O"
    }    
    setLista([...sl]) //értékadás történi a háttérben: lista=sl
    let slepes=lepes+1
    setLepes(slepes)
    //setLepes(lepes+1) ez jó
    //setLepes(lepes+=1) - ezt nem tehetem meg)

 }
  return (
    <div className="App">
      <header className="App-header">
       <h1>Tic-Tac-Toe</h1>

      </header>
      <article>
        <div className="jatekter">
          <JatekTer lista={lista} katt={katt} />
        </div>
      </article>
      <footer>saját név</footer>
    </div>
  );
}

export default App;
