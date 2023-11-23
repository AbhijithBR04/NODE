import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  name: yup.string().required('This field cannot be empty'),
});

function Update() {
  const navigate = useNavigate();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const handleUpdate = async (data) => {
    try {
      const id = localStorage.getItem('id');
      const token = localStorage.getItem('token');

      const body = {
        name: data.name,
        id: id,
        token: token,
      };

      const updateResponse = await axios.post('/update', body);

      alert(updateResponse.data.message);

      // Assuming you want to navigate to a different page after a successful update
      if (updateResponse.data.message === 'The name is updated') {
        navigate('/home'); 
      }
    } catch (error) {
      console.error('Error updating user', error);
      alert('Error updating user');
    }

    reset();
  };

  return (
    <div className="App">
      <form className="formdata" onSubmit={handleSubmit(handleUpdate)}>
        <div className="formback">
          <h2 className="heading">Update Form</h2>

          <label>Please update your name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your Name"
            {...register('name')}
          />
          <br />
          <p className="error">{errors.name?.message}</p>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Update;
