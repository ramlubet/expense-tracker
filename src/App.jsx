import { useEffect, useState } from 'react'

const people = ['Durai', 'Siva', 'Vimal', 'Others']

export default function App() {
  const [amount, setAmount] = useState('')
  const [spentBy, setSpentBy] = useState('')
  const [description, setDescription] = useState('')
  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('expenses')

    if (saved) {
      setExpenses(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  const addExpense = () => {
    if (!amount || !spentBy) return

    const newExpense = {
      id: Date.now(),
      amount,
      spentBy,
      description,
      date: new Date().toLocaleString()
    }

    setExpenses([newExpense, ...expenses])

    setAmount('')
    setSpentBy('')
    setDescription('')
  }

  return (
    <div className="container">
      <h1>RM Expense Tracker</h1>

      <div className="card">
        <input
          placeholder="Amount in RM"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          value={spentBy}
          onChange={(e) => setSpentBy(e.target.value)}
        >
          <option value="">Select person</option>

          {people.map((person) => (
            <option key={person}>{person}</option>
          ))}
        </select>

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={addExpense}>Add Expense</button>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Person</th>
              <th>Description</th>
              <th>RM</th>
            </tr>
          </thead>

          <tbody>
            {expenses.map((item) => (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td>{item.spentBy}</td>
                <td>{item.description}</td>
                <td>{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
