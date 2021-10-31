import {useState } from "react";
import DatePicker from "./DatePicker/DatePicker";


function App() {
  const [date, setDate] = useState([[new Date(new Date() - 24 * 3600 * 5 * 1000), new Date()]])

  return (
    <DatePicker type="multiRange" value={date} onChange={setDate} />
  );
}

export default App;
