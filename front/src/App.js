
import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formulario';
import Table from './Table';


function App() {
 
  const produto = {
    id : 0,
    nome : '',
    marca : ''
  }

  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [ produtos, setProdutos] = useState([]);
  const [ objProduto, setObjProduto] = useState(produto);

  useEffect(()=>{
    fetch("http://localhost:8080/produtos").then(retorno => retorno.json()).then(return_convertido => setProdutos(return_convertido));
  }, []);


  const onTyping = (e) => {
    setObjProduto({...objProduto, [e.target.name]:e.target.value});
  }

  const insert = () =>{
    fetch("http://localhost:8080/insert",{
      method:'post',
      body:JSON.stringify(objProduto),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    }).then(retorno => retorno.json()).then(retorno_convertido => {
      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem);
      }else{
        setProdutos([...produtos, retorno_convertido]);
        alert('Produto cadastrado com sucesso!');
        limparFormulario();
      }
    })
  }


  const remove = () =>{
    fetch("http://localhost:8080/remove/"+objProduto.id,{
      method:'delete',
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    }).then(retorno => retorno.json()).then(retorno_convertido => {
      alert(retorno_convertido.mensagem);
      let vetorTemp = [...produtos];
      let indice = vetorTemp.findIndex((prod)=>{
        return prod.id === objProduto.id;
      });
      vetorTemp.splice(indice, 1);
      setProdutos(vetorTemp);
      limparFormulario();
    })
  }



  const update = () =>{
    fetch("http://localhost:8080/update/"+objProduto.id,{
      method:'put',
      body:JSON.stringify(objProduto),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    }).then(retorno => retorno.json()).then(retorno_convertido => {
      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem);
      }else{
        alert('Produto alterado com sucesso!');
        let vetorTemp = [...produtos];
        let indice = vetorTemp.findIndex((prod)=>{
          return prod.id === objProduto.id;
        });
        vetorTemp[indice] = objProduto;
        setProdutos(vetorTemp);
        limparFormulario();
      }
    })
  }







  const limparFormulario = ()=>{
    setObjProduto(produto);
    setBtnCadastrar(true);
  }

  const selecionarProduto = (indice)=>{
    setObjProduto(produtos[indice]);
    setBtnCadastrar(false);

  }


  return (
    <div>
      <Formulario
        botao={btnCadastrar}
        typingEvent={onTyping}
        insert={insert}
        obj={objProduto}
        cancelar={limparFormulario}
        remover={remove}
        alterar={update}
      />
      <Table
        vetor={produtos}
        selecionar={selecionarProduto}
      />
     
    </div>
  );
}

export default App;
