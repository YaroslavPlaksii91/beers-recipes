import { FC } from "react";
import { useParams } from "react-router-dom";

import { useBeerStore } from "../../zustand/store";

import s from "./BeerRecipe.module.css";

const BeerRecipe: FC = () => {
  const { id } = useParams();
  const { recipes } = useBeerStore();

  const recipe = recipes.find((rec) => rec.id === Number(id));

  if (!recipe) {
    return <div>Data not found!</div>;
  }

  return (
    <article className={s.card}>
      <div className={s.imageWrap}>
        <img src={recipe.image_url} alt={recipe.name} />
      </div>
      <div>
        <h2 className={s.name}>{recipe.name}</h2>
        <p className={s.tag}>{recipe.tagline}</p>
        <p className={s.description}>{recipe.description}</p>
        <p className={s.contributor}>Contributed by {recipe.contributed_by}</p>
        <p className={s.year}>First brewed {recipe.first_brewed}</p>
        <h3 className={s.subtitle}>Food pairing</h3>
        <ul className={s.food}>
          {recipe.food_pairing.map((el, index) => (
            <li key={index}>{el}</li>
          ))}
        </ul>
        <h3 className={s.subtitle}>Brewers tips</h3>
        <p className={s.tips}>{recipe.brewers_tips}</p>
        <h3 className={s.subtitle}>Ingredients</h3>
        <ul className={s.ingredients}>
          <li>
            <h4 className={s.ingredientTitle}>Malt</h4>
            <ul>
              {recipe.ingredients.malt.map((el, index) => (
                <li key={index} className={s.ingredientItem}>
                  <h5 className={s.ingredientName}>{el.name}</h5>
                  <p>
                    {el.amount.value} {el.amount.unit}
                  </p>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <h4 className={s.ingredientTitle}>Hops</h4>
            <ul>
              {recipe.ingredients.hops.map((el, index) => (
                <li key={index} className={s.ingredientItem}>
                  <h5 className={s.ingredientName}>{el.name}</h5>
                  <p>
                    {el.amount.value} {el.amount.unit}
                  </p>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <h4 className={s.ingredientTitle}>Yeast</h4>
            <p>{recipe.ingredients.yeast}</p>
          </li>
        </ul>
      </div>
    </article>
  );
};

export default BeerRecipe;
