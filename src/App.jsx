import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [list,setList] = useState([])
  const [price,setPrice] = useState(0)
  useEffect(() => {
    const fetchdata = async () => {
      const response = await fetch(('https://dummyjson.com/products'))
      const data = await response.json();
      setData(data['products']);
      console.log(data);
    }
    fetchdata();

  },[])

  function addItem(ppro,pro){
    setPrice(ppro);
    const existingItem = list.find(item=> item.id === pro.id);
    if(existingItem) {
      existingItem.quantity++;
      setList([...list]);
    }
    else {
      setList([...list,{...pro,quantity: 1}]);
    }
  }
  function clearList(){
    setPrice(0);
    setList([]);
  }
  function delList(index,ppro){
    if(list[index].quantity > 1){
      list[index].quantity-=1;
    }
    else {
      const newlist = [...list];
      newlist.splice(index,1);
      setList(newlist);
    }
    
    setPrice(price-ppro);
  }

  return (
    <div className="App">
      <div className="list">
      <ul>
        {data.map((item) => (
          <div className='choice'>
          <li key = {item.id}>{item.title} ---- {item.price}</li>
          <button onClick={()=>addItem(price+item.price,item)} className='but'>+</button>
          </div>
        ))}
      </ul>
      </div>
      <div className='receipt'>
          <p>Price : {price}</p>
          {list.map((item,index) =>
            <div className='selectedList'>
            <p key={item.id}>{item.title} ---- {item.price}</p>
            <button onClick={()=>delList(index,item.price)} className='but'>x</button>
            <p>{item.quantity}</p>
            </div>
          )}
          <button onClick={()=>clearList()} className='but' style={{marginTop : '10px',height : '30px',fontSize:'15px'}}>clear</button>
      </div>
    </div>
    
  )
}

export default App
