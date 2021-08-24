import { Button, Card, Empty, Input, Spin } from "antd";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  FoodProps,
  Foods,
  queryCalorie,
  useQueryFoods,
} from "src/features/foods/api";
import { RootDispatch } from "src/store";
import { CalorieType } from "src/store/reducers/calorie-add";
import style from "./index.module.scss";

type Props = {
  searchFood: string;
};

type EatedFoods = Foods & { nums: number };
type FoodsCalorie = {
  [id: string]: number;
};

const FoodList = memo(({ searchFood }: Props) => {
  const {
    data: foodDatas,
    isFetching,
    refetch: foodReload,
  } = useQueryFoods(searchFood);
  const dispatch = useDispatch<RootDispatch>();
  const cacheCalorie = useRef<FoodsCalorie>({});
  const [eatedFoods, seteatedFoods] = useState<EatedFoods[]>([]);
  const [foodNums, setFoodNums] = useState<{ [key: string]: number }>({});
  const foods = useMemo(() => {
    return foodDatas?.data.hints || [];
  }, [foodDatas]);

  // single food
  const getFoodCalorie = async (food: FoodProps) => {
    const { data } = await queryCalorie([food]);
    const calorie = data?.calories || 0;
    cacheCalorie.current[food.foodId] = calorie;
    return calorie;
  };
  const foodTotalCalorie = useMemo(async () => {
    let noCalorieFood: FoodProps[] = [];
    let totalCalorie = 0;
    eatedFoods.forEach((food) => {
      if (cacheCalorie.current[food.food.foodId]) {
        totalCalorie += cacheCalorie.current[food.food.foodId] * food.nums;
      } else {
        noCalorieFood.push({
          quantity: food.nums,
          foodId: food.food.foodId,
          // measureURI: "KG",
        });
      }
    });
    let noCalorieFoodValue = 0;
    if (noCalorieFood.length) {
      const vals = await Promise.all(
        noCalorieFood.map((food) => getFoodCalorie(food))
      );
      noCalorieFoodValue = vals.reduce((a, b) => a + b + 100, 0);
    }
    return totalCalorie + noCalorieFoodValue;
  }, [eatedFoods]);

  useEffect(() => {
    foodTotalCalorie.then((calorie) => {
      dispatch({ type: CalorieType.add, calorie });
    });
  }, [foodTotalCalorie]);

  // add or remove food
  const toggleFood = (addedIndex: number, food: Foods["food"]) => {
    console.log(addedIndex, "index", "food", food);
    if (addedIndex >= 0) {
      eatedFoods.splice(addedIndex, 1);
      seteatedFoods([...eatedFoods]);
    } else {
      const nums = foodNums[food.foodId] || minFoodWeight;
      setFoodNums({ ...foodNums, [food.foodId]: nums });
      seteatedFoods(eatedFoods.concat([{ nums, food }]));
    }
  };

  const minFoodWeight = 100;
  return (
    <Card className={style.foodlist}>
      {foods.length <= 0 && <Empty />}
      <Spin spinning={isFetching}>
        {foods.map(({ food }) => {
          const addedIndex = eatedFoods.findIndex(
            (f) => f.food.foodId === food.foodId
          );
          return (
            <div className={style.foodItem} key={food.foodId}>
              <span className={style.foodName}>{food.label}</span>
              <Input
                className={style.inputNums}
                placeholder="Qty g"
                type="number"
                min={minFoodWeight}
                value={foodNums[food.foodId] ?? ""}
                onChange={(ev) => {
                  setFoodNums({
                    ...foodNums,
                    [food.foodId]: +ev.target.value || minFoodWeight,
                  });
                }}
              />
              <Button
                className={style.foodOperation}
                onClick={() => toggleFood(addedIndex, food)}
              >
                {addedIndex >= 0 ? "remove" : "add"}
              </Button>
            </div>
          );
        })}
      </Spin>
    </Card>
  );
});

export default FoodList;
