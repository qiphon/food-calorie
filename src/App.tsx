import { Card } from "antd";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import styles from "./app.module.scss";
import FoodList from "./components/FoodList";
import Searcher from "./components/Searcher";
import Summary from "./components/Summary";
import Store from "./store";

const queryClient = new QueryClient();

function App() {
  const [searchFood, setSearchFood] = useState("");

  return (
    <div className={styles.mainRow}>
      <QueryClientProvider client={queryClient}>
        <Provider store={Store}>
          <div className={styles.content}>
            <Searcher onSearch={setSearchFood} />
            <FoodList searchFood={searchFood} />
          </div>
          <div className={styles.content}>
            <Card>
              Today's calorie target, default <div>1,000</div>
            </Card>
            <Summary />
          </div>
        </Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
