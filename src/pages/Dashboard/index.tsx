import { useEffect, useState } from "react";
import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

const Dashboard = () => {
  const [foods, setFoods] = useState<any>([]);
  const [modalOpen, setModalOpen] = useState<any>(false);
  const [editModalOpen, setEditModalOpen] = useState<any>(false);
  const [editingFood, setEditingFood] = useState<any>(false);

  useEffect(() => {
    async function getFoods() {
      const response = await api.get('/foods');
      setFoods(response.data);
    }
    getFoods();
  }, []);

  async function handleAddFood(food: any) {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });
      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  function handleDeleteFood() {
    console.log('handleDeleteFood');
  }

  function handleEditFood() {
    console.log('handleEditFood');
  }

  function handleUpdateFood() {
    console.log('handleUpdateFood');
  }

  function toggleEditModal() {
    console.log('toggleEditModal');
  }

  function toggleModal() {
    setModalOpen(!modalOpen);
  }


  return (
    <>
      <Header openModal={toggleModal} />

      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />

      {/* <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      /> */}

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food: any) => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  )
}

export default Dashboard;
