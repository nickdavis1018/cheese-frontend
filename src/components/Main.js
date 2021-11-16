import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

function Main(props) {
  const [cheese, setCheese] = useState(null);

  const URL = "http://localhost:4000/cheese/";

  const getCheese = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setCheese(data);
  };

  const createCheese = async (cheese) => {
    await fetch(URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cheese),
    });
    getCheese();
  };

  const updateCheese = async (cheese, id) => {
    await fetch(URL + id, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cheese)
    })
    getCheese()
  }

  const deleteCheese = async (id) => {
    // make the delete request
    await fetch(URL + id, {
      method: "delete"
    })
    getCheese()
  }

  useEffect(() => getCheese(), []);

  return (
    <main>
      <Switch>
        <Route exact path="/">
          <Index cheese={cheese} createCheese={createCheese} />
        </Route>
        <Route
          path="/cheese/:id"
          render={(rp) => (
<Show 
              {...rp}
              cheese={cheese}
              updateCheese={updateCheese}
              deleteCheese={deleteCheese}
            />
          )}
        />
      </Switch>
    </main>
  );
}

export default Main;