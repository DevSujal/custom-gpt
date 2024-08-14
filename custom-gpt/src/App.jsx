import { Outlet } from "react-router-dom";
import "./App.css";
import { RequestResponseProvider } from "./store/requestRespnse";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("data"));

    if (localData && Array.isArray(localData) && localData.length > 0) {
      setData(localData);
    }
  }, []);

  const addData = (data) => {
    setData((prev) => {
      localStorage.setItem("data", JSON.stringify([...prev, data]));
      return [...prev, data];
    });
  };

  const deleteData = (id) => {
    setData((prev) => {
      const data = prev.filter((item) => item.id !== id);
      localStorage.setItem("data", JSON.stringify(data));
      return data;
    });
  };

  const updateData = (id, answer) => {
    setData((prev) => {
      const data = prev.map((item) =>
        item.id === id ? { ...item, answer } : item
      );
      localStorage.setItem("data", JSON.stringify(data));
      return data;
    });
  };

  return (
    <RequestResponseProvider value={{ data, addData, deleteData, updateData }}>
      <div className="bg-gray-950 relative w-screen h-full">
        <Outlet />
      </div>
    </RequestResponseProvider>
  );
}

export default App;
