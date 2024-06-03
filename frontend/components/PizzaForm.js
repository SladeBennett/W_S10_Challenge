import React, { useReducer } from 'react'
import { useCreateOrderMutation } from '../state/pizzasApi'
import { type } from '@testing-library/user-event/dist/cjs/utility/type.js'


const CHANGE_INPUT = 'CHANGE_INPUT'
const RESET_FORM = 'RESET_FORM'
const CHANGE_CHECKED = 'CHANGE_CHECKED'

const initialFormState = {
  fullName: '',
  size: '',
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_CHECKED: {
      const { name, checked } = action.payload
      return { ...state, [name]: checked }
    }
    case CHANGE_INPUT: {
      const { name, value } = action.payload
      return { ...state, [name]: value }
    }
    case RESET_FORM:
      return {
        fullName: '',
        size: '',
        '1': false,
        '2': false,
        '3': false,
        '4': false,
        '5': false,
      }
    default:
      return { ...state }
  }
}

export default function PizzaForm() {
  const [state, dispatch] = useReducer(reducer, initialFormState)
  const [createOrder, { error: creationError, isLoading: creatingOrder }] = useCreateOrderMutation()

  const onChange = ({ target: { name, value } }) => {
    dispatch({ type: CHANGE_INPUT, payload: { name, value } })
  }

  const onToggle = ({ target: { name, checked } }) => {
    dispatch({ type: CHANGE_CHECKED, payload: { name, checked } })
  }

  const resetForm = () => {
    dispatch({ type: RESET_FORM })
  }

  const onNewOrder = evt => {
    evt.preventDefault()
    const { fullName, size, ...toppings } = state
    let theAnswer = Object.keys(toppings).filter(tp => toppings[tp] == true)
    createOrder({ fullName, size, "toppings": theAnswer })
      .unwrap()
      .then(data => {
        console.log(data.message)
        resetForm()
      })
      .catch(err => {
        console.log(err)
      })
  }


  return (
    <form onSubmit={onNewOrder}>
      <h2>Pizza Form</h2>
      {creatingOrder && <div className='pending'>Order in progress...</div>}
      {creationError && <div className='failure'>Order failed: {creationError.data.message}</div>}

      <div className="input-group" >
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            onChange={onChange}
            value={state.fullName}
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select data-testid="sizeSelect" id="size" name="size" value={state.size} onChange={onChange}>
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="1" type="checkbox" onChange={onToggle} checked={state['1']}/>
          Pepperoni<br /></label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" onChange={onToggle} checked={state['2']}/>
          Green Peppers<br /></label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" onChange={onToggle} checked={state['3']}/>
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" onChange={onToggle} checked={state['4']}/>
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" onChange={onToggle} checked={state['5']}/>
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" onSubmit={onNewOrder} />
    </form>
  )
}
