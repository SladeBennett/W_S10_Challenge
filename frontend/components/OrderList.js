import React from 'react'
import { useGetOrdersQuery } from '../state/pizzasApi'
import { useSelector, useDispatch } from 'react-redux'
import { setSize } from '../state/ordersSlice'


export default function OrderList() {
  const currentSize = useSelector(st => st.filters.size)
  const dispatch = useDispatch()

  const {
    data: orders,
  } = useGetOrdersQuery()

  const handleClick = evt => {
    const action = setSize(evt.target.value)
    dispatch(action)
  }

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          orders
            ?.filter(ord => {
              if ((ord.size == currentSize) || currentSize == 'All') {
                return ord
              }
            })
            .map(pz => {
              return (
                <li key={pz.id}>
                  <div>
                    {pz.customer} ordered a size {pz.size} with {pz.toppings ? pz.toppings.length : 'no'} toppings
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
            const className = `button-filter${size === currentSize ? ' active' : ''}`
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
