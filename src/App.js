import {useState } from "react";
import DatePicker from "./DatePicker/DatePicker";
import './App.css';

function App() {
  const [date, setDate] = useState([[new Date(new Date() - 24 * 3600 * 5 * 1000), new Date()]])

  return (
    <div  className="datePicker">
      <DatePicker type="multiRange" value={date} onChange={setDate} />
    </div>
  );
}

export default App;
