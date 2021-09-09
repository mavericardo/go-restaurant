import { useEffect, useState } from "react";
import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

import { ModelFood } from '../../types/food';


const Dashboard = () => {
  const [foods, setFoods] = useState<ModelFood[]>([]);
  const [modalOpen, setModalOpen] = useState<Boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<Boolean>(false);
  const [editingFood, setEditingFood] = useState<ModelFood>();

  useEffect(() => {
    async function getFoods() {
      const response = await api.get<ModelFood[]>('/foods');
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

  async function handleDeleteFood(id: number) {
    await api.delete(`/foods/${id}`);
    const foodsFiltered = foods.filter((food: any) => food.id !== id);
    setFoods(foodsFiltered);
  }

  function handleEditFood(food: ModelFood) {
    setEditingFood(food);
    setEditModalOpen(true);
  }

  async function handleUpdateFood(food: any) {
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood?.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map((food: any) =>
        food.id !== foodUpdated.data.id ? food : foodUpdated.data,
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  function toggleEditModal() {
    setEditModalOpen(!editModalOpen);
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

      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

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
