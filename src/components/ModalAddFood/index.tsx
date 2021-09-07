import { SubmitHandler, FormHandles } from '@unform/core'
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import { useRef } from 'react';

interface Food {
  image: string,
  name: string,
  price: number,
  description: string,
}

const ModalAddFood = ({ isOpen, setIsOpen, handleAddFood }: any) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit: SubmitHandler<Food> = data => {
    console.log(data);
    if (data.image === '') {
      alert('Insira o link da imagem do prato');
      return;
    }

    if (data.name === '') {
      alert('Insira o nome do prato');
      return;
    }

    if (data.price === 0) {
      alert('Insira o preço do prato');
      return;
    }

    if (data.description === '') {
      alert('Insira a descrição do prato');
      return;
    }

    handleAddFood(data);

    setIsOpen();
  }


  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Novo Prato</h1>

          <Input name="image" icon="" placeholder="Cole o link aqui" />

          <Input name="name" icon="" placeholder="Ex: Moda Italiana" />

          <Input name="price" defaultValue="0" icon="" placeholder="Ex: 19.90" />

          <Input name="description" icon="" placeholder="Descrição" />

          <button type="submit" data-testid="add-food-button">
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
