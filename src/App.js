import './App.css';
import { useState, useRef, useEffect } from 'react';

const generateKey = (i) => {
  return `${i} ${ new Date().getTime() }`;
}

function getItems (){
  let arr = [];
  for(let i = 0; i < 10; i++) {
    arr.push(<div className="item" key={generateKey(i)}></div>)
  }

  return arr;
}

function App() {
  const [items, setItems] = useState(()=> getItems());
  const elRef = useRef();

  useEffect(()=> {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [items])

  function handleScroll(){
    if (window.scrollY + window.innerHeight >= elRef.current.offsetHeight) {
      let moreItems = getItems();
      let allItems = items.concat(moreItems);
      setItems(allItems);
    }
  }
  
  return (
    <div id="container" ref={elRef}>
      <h1>infinite scroll baby</h1>
      {items}
    </div>
  );
}

export default App;
