import { FC, useState, MouseEvent, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { useBeerStore } from "../../zustand/store";
import { getRecipes } from "../../services/getRecipes";

import s from "./RecipeList.module.css";

export const RecipeList: FC = () => {
  const { recipes, removeRecipes, addRecipes, page } = useBeerStore();
  const [selectedRecipes, setSelectedRecipes] = useState<number[]>([]);
  const observerTarget = useRef(null);

  let visibleRecipes = recipes.slice(0, 15);

  const handleRecipeClick = (
    event: MouseEvent<HTMLAnchorElement>,
    recipeId: number
  ) => {
    event.preventDefault();
    toggleRecipeSelection(recipeId);
  };

  const toggleRecipeSelection = (recipeId: number) => {
    if (selectedRecipes.includes(recipeId)) {
      setSelectedRecipes(selectedRecipes.filter((id) => id !== recipeId));
    } else {
      setSelectedRecipes([...selectedRecipes, recipeId]);
    }
  };

  const handleDeleteSelectedRecipes = () => {
    removeRecipes(selectedRecipes);
    setSelectedRecipes([]);
  };

  useEffect(() => {
    let initialLoad = true;

    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && !initialLoad) {
          let nextVisibleRecipes = (visibleRecipes.length += 5);
          visibleRecipes = recipes.slice(
            nextVisibleRecipes - 5,
            nextVisibleRecipes
          );
          if (recipes.length < 15) {
            try {
              const nextPage = page + 1;
              const newRecipes = await getRecipes(nextPage);
              if (newRecipes.length > 0) {
                addRecipes(newRecipes);
              }
            } catch (error) {
              console.error("Error fetching new recipes:", error);
            }
          }

          removeRecipes(recipes.slice(0, 5).map((recipe) => recipe.id));
        } else {
          initialLoad = false;
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [removeRecipes, addRecipes, recipes, page]);

  return (
    <section>
      <ul className={s.list}>
        {visibleRecipes.map((recipe) => (
          <li
            key={recipe.id}
            className={selectedRecipes.includes(recipe.id) ? s.selected : ""}
          >
            <Link
              to={`${recipe.id}`}
              onContextMenu={(event) => handleRecipeClick(event, recipe.id)}
              className={s.link}
            >
              <div>
                <img
                  src={recipe.image_url}
                  alt={recipe.name}
                  className={s.img}
                />
              </div>
              <div>
                <h2 className={s.name}>{recipe.name}</h2>
                <p>{recipe.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div ref={observerTarget}></div>
      {selectedRecipes.length > 0 && (
        <button
          type="button"
          onClick={handleDeleteSelectedRecipes}
          className={s.btn}
        >
          Delete
        </button>
      )}
    </section>
  );
};
