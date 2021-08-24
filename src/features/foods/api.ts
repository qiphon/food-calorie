/**
 * foods querys
 */

import { useMutation, useQuery } from "react-query";
import { get, post } from "../../api";

const Apis = {
  searchFoods: "/api/menu-items/v2/search",
  autoComplete: "/auto-complete",
  getCalorie: "/api/food-database/v2/nutrients",
};

export type Foods = {
  food: {
    category: string;
    categoryLabel: string;
    foodId: string;
    healthLabels: string[];
    label: string;
  };
};

export const useQueryFoods = (q: string) =>
  useQuery(`${Apis.searchFoods}${q}`, () => queryFoods(q), {});
export const queryFoods = (
  q: string
): Promise<{ data: { text: string; hints: Foods[] } }> =>
  q
    ? get({ url: Apis.searchFoods, params: { q } })
    : Promise.resolve({ data: { text: q, hints: [] } });

export const useQueryAutoComplete = (q: string) =>
  useQuery(`${Apis.autoComplete}${q}`, () => queryAutoComplete(q));
export const queryAutoComplete = (
  q: string
): Promise<{ data: { text: string; hints: Foods[] } }> =>
  q
    ? get({ url: Apis.autoComplete, params: { q } })
    : Promise.resolve({ data: { text: q, hints: [] } });

export type FoodProps = {
  quantity: number;
  measureURI?: string;
  foodId: string;
};
export const useQueryCalorie = (q: FoodProps[]) =>
  useMutation([Apis.getCalorie, ...q], () => queryCalorie(q));
export const queryCalorie = (
  ingredients: FoodProps[]
): Promise<{ data: { calories?: number } }> =>
  post({ url: Apis.getCalorie, data: { ingredients } });
