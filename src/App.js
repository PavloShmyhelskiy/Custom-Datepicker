import { useEffect, useState } from "react";
import DatePicker from "./components/DatePicker/DatePicker";

function App() {
  const [date, setDate] = useState(new Date())
  console.log(date);
  return (
    <DatePicker type="single" value={date} onChange={setDate} />
  );
}

export default App;
