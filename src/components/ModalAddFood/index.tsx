import { Component, createRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import { useState } from 'react';

const ModalAddFood = ({ isOpen, setIsOpen, handleAddFood }: any) => {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  function handleButton() {
    if (image === '') {
      alert('Insira o link da imagem do prato');
      return;
    }

    if (name === '') {
      alert('Insira o nome do prato');
      return;
    }

    if (price === '') {
      alert('Insira o preço do prato');
      return;
    }

    if (description === '') {
      alert('Insira a descrição do prato');
      return;
    }

    const food: any = {
      image,
      name,
      price,
      description
    }

    handleAddFood(food);

    setImage('');
    setName('');
    setPrice('');
    setDescription('');

    setIsOpen();
  }

  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form>
          <h1>Novo Prato</h1>

          <Input name="image" icon="" placeholder="Cole o link aqui" onChange={(event: any) => setImage(event.target.value)} />

          <Input name="name" icon="" placeholder="Ex: Moda Italiana" onChange={(event: any) => setName(event.target.value)} />

          <Input name="price" icon="" placeholder="Ex: 19.90" onChange={(event: any) => setPrice(event.target.value)} />

          <Input name="description" icon="" placeholder="Descrição" onChange={(event: any) => setDescription(event.target.value)} />

          <button type="submit" data-testid="add-food-button" onClick={handleButton}>
            <p className="text">Adicionar Prato</p>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    </>
  )
}

export default ModalAddFood;
