import { Card, Progress } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import style from "./index.module.scss";

const Summary = () => {
  const state = useSelector((state: RootState) => state.calorieAdd);
  const calorie = state.calorie;
  return (
    <Card className={style.summary}>
      <h3>You Daily calorie summary is:</h3>
      <div>{calorie} Cal</div>
      <Progress percent={(calorie / 1000) * 100}></Progress>
    </Card>
  );
};

export default Summary;
