import React, { useState } from "react";
import { IProduct } from "../models";
import axios from "axios";
import { ErrorMessage } from "./ErrorMessage";

const productData: IProduct = {
  title: '',
  price: 13.5,
  description: 'lorem ipsum set',
  image: 'https://i.pravatar.cc',
  category: 'electronic',
  rating: {
    rate: 42,
    count: 10
  }
}

interface CreateProductProps {
  onCreate: () => void
}


export function CreateProduct({ onCreate }: CreateProductProps) {

  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  const submitHander = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')

    if (value.trim().length === 0) {
      setError('Please anter valid title')
      return
    }

    productData.title = value
    const responce = await axios.post<IProduct>('https://fakestoreapi.com/products', productData)
    onCreate()
  }

  // const changeHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   setValue(event.target.value)
  // }

  return (
    <form onSubmit={submitHander}>
      <input
        type="text"
        className="border py px-4 mb-2 w-full outline-0"
        placeholder="Enter product title..."
        value={value}
        // onChange={changeHandler}
        onChange={event => setValue(event.target.value)}
      />

      <p className=""></p>

      {error && <ErrorMessage error={error} />}


      <button type="submit" className="py-2 px-4 border bg-yellow-400 hover:text-white">Create</button>
    </form>
  )
}