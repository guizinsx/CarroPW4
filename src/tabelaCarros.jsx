import React, { useState, useEffect } from 'react';

const TabelaCarros = () => {
  const [carros, setCarros] = useState([]);
  const [carroSelecionado, setCarroSelecionado] = useState(null); // Estado para armazenar o carro selecionado para edição
  
  const [nome, setNome] = useState(null);
  const [ano, setAno] = useState(null);
  const [potencia, setPotencia] = useState(null);
  const [preco, setPreco] = useState(null);
  const [fabricante, setFabricante] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://ifsp.ddns.net/webservices/carro/carro');
        const data = await response.json();
        setCarros(data);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (carro) => {
    if (carro) {
      // Define o carro selecionado para edição
      setCarroSelecionado(carro);
      // Preenche os campos do formulário com os dados do carro selecionado
      setNome(carro.nome || '');
      setAno(carro.ano ? carro.ano.toString() : '');
      setPotencia(carro.potencia ? carro.potencia.toString() : '');
      setPreco(carro.preco ? carro.preco.toString() : '');
      setFabricante(carro.fabricante || '');
    }
  };

  const handleSaveEdit = async () => {
    // Verifica se pelo menos um campo foi alterado
    if (nome !== carroSelecionado.nome || ano !== carroSelecionado.ano || potencia !== carroSelecionado.potencia || preco !== carroSelecionado.preco || fabricante !== carroSelecionado.fabricante) {
      // Se algum campo foi alterado, então envia a solicitação PUT
      const formData = new URLSearchParams();
      formData.append('id', carroSelecionado.id);
      formData.append('nome', nome);
      formData.append('ano', parseInt(ano));
      formData.append('potencia', potencia);
      formData.append('preco', parseInt(preco));
      formData.append('fabricante', fabricante);
  
      try {
        const response = await fetch(`https://ifsp.ddns.net/webservices/carro/carro/${carroSelecionado.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData
        });
  
        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
  
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Erro ao atualizar os dados:', error);
      }
    } else {
      // Se nenhum campo foi alterado, exiba uma mensagem ou realize outra ação apropriada
      console.log("Nenhum campo foi alterado. A solicitação de atualização não será enviada.");
    }
  
    // Limpa o estado do carro selecionado e dos campos do formulário
    setCarroSelecionado(null);
    setNome("");
    setAno("");
    setPotencia("");
    setPreco("");
    setFabricante("");
  };


  const handleSave = async (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append('nome', nome);
    formData.append('ano', parseInt(ano));
    formData.append('potencia', potencia);
    formData.append('preco', parseInt(preco));
    formData.append('fabricante', fabricante);

    try {
      const response = await fetch('https://ifsp.ddns.net/webservices/carro/carro',{
        method:"POST", 
        headers:{"Content-Type":"application/x-www-form-urlencoded"},
        // body:{
        //   id: 100,
        //   nome: nome,
        //   ano: parseInt(ano),
        //   potencia: potencia,
        //   preco: parseInt(preco),
        //   fabricante: fabricante
        // }
        body:formData
        //body:JSON.stringify(request)
      });
      const data = await response.json();
      console.log(data)
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    }
    console.log(nome, ano, potencia, preco, fabricante)
  

    setCarroSelecionado(null);
  };

  const handleCancelEdit = () => {
    // Limpa o estado do carro selecionado para cancelar a edição
    setCarroSelecionado(null);
  };

  const handleDelete = async (carroId) => {
    try {
      const response = await fetch(`https://ifsp.ddns.net/webservices/carro/carro/${carroId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      // Atualize a lista de carros após a exclusão bem-sucedida
      const updatedCarros = carros.filter(carro => carro.id !== carroId);
      setCarros(updatedCarros);
    } catch (error) {
      console.error('Erro ao excluir o carro:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSave}>
        <div className="formgroup"> 
          <label htmlFor="nome">nome</label>
          <input type="text" name="nome" value={nome || ''} onChange={(e)=>setNome(e.target.value)}></input>
        </div>
        <div className="formgroup">
          <label htmlFor="ano">ano</label>
          <input type="text" name="ano" value={ano || ''} onChange={(e)=>setAno(e.target.value)}></input>
        </div>
        <div className="formgroup">
          <label htmlFor="potencia">potencia</label>
          <input type="text" name="potencia" value={potencia || ''} onChange={(e)=>setPotencia(e.target.value)}></input>
        </div>
        <div className="formgroup">
          <label htmlFor="preco">preco</label>
          <input type="text" name="preco" value={preco || ''} onChange={(e)=>setPreco(e.target.value)}></input>
        </div>
        <div className="formgroup">
          <label htmlFor="fabricante">fabricante</label>
          <input type="text" name="fabricante" value={fabricante || ''} onChange={(e)=>setFabricante(e.target.value)}></input>
        </div>
        <button>cadastrar</button>
      </form>
      <h1>Tabela de Carros</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Ano</th>
            <th>Potencia</th>
            <th>Preco</th>
            <th>Fabricante</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {carros.map((carro, index) => (
            <tr key={index}>
              <td>{carro.id}</td>
              <td>{carro.nome}</td>
              <td>{carro.ano}</td>
              <td>{carro.potencia}</td>
              <td>{carro.preco}</td>
              <td>{carro.fabricante}</td>
              <td>
                {carroSelecionado === carro ? (
                  <>
                    <button onClick={handleSaveEdit}>Salvar</button>
                    <button onClick={handleCancelEdit}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(carro)}>Editar</button>
                    <button onClick={() => handleDelete(carro.id)}>Excluir</button>
                  </>
                )}
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaCarros;
