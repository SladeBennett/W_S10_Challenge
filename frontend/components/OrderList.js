import React from 'react'
import { useGetPizzasQuery } from '../state/pizzasApi'

const initialState = {
  size: 'All'
}

export const orderReducer = (state = initialState) => {
  return state
}

const handleClick = evt => {
 
}

export default function OrderList() {
  const { 
    data: orders, 
    isLoading: gettingOrders, 
    isFetching: refreshingOrders 
  } = useGetPizzasQuery()
 

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          orders?.map(pz => {
          return (
            <li key={pz.id}>
              <div>
                {pz.customer} ordered a size {pz.size} with {pz.toppings.length} toppings
              </div>
            </li>
          )
        })
      }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${size === initialState.size ? ' active' : ''}`
            return <button
              onClick={handleClick}
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}
              value={size}>{size}</button>
          })
        }
      </div>
    </div>
  )
}
