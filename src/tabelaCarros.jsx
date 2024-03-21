import React, { useState, useEffect } from 'react';

const TabelaCarros = () => {
  const [carros, setCarros] = useState([]);
  const [carroSelecionado, setCarroSelecionado] = useState(null); // Estado para armazenar o carro selecionado para edição

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

  const handleEdit = (index) => {
    // Define o carro selecionado para edição
    setCarroSelecionado(carros[index]);
  };

  const handleSaveEdit = () => {
    // Implemente a lógica para salvar as alterações do carro editado no servidor
    console.log('Salvar alterações:', carroSelecionado);
    // Após salvar, você pode limpar o estado do carroSelecionado
    setCarroSelecionado(null);
  };

  const handleCancelEdit = () => {
    // Limpa o estado do carro selecionado para cancelar a edição
    setCarroSelecionado(null);
  };

  return (
    <div>
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
                  <button onClick={() => handleEdit(index)}>Editar</button>
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
