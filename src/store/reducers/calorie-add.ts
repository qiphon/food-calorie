type CalorieState = {
  calorie: number;
};

export enum CalorieType {
  "add",
}

type CalorieAction = {
  type: CalorieType;
  calorie: number;
};

const initState: CalorieState = {
  calorie: 0,
};

const calorieAdd = (
  state = initState,
  actions: CalorieAction
): CalorieState => {
  switch (actions.type) {
    case CalorieType.add:
      return { ...state, calorie: actions.calorie };
    default:
      return state;
  }
};

export default calorieAdd;
