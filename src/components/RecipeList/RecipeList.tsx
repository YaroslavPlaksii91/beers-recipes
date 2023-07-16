import { FC, useState, MouseEvent, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { useBeerStore } from "../../zustand/store";
import { getRecipes } from "../../services/getRecipes";

import s from "./RecipeList.module.css";

export const RecipeList: FC = () => {
  const { recipes, removeRecipes, addRecipes } = useBeerStore();
  const [selectedRecipes, setSelectedRecipes] = useState<number[]>([]);
  const visibleRecipesRef = useRef<number>(15);

  console.log(recipes);

  //   let step = 15;

  //   if (
  //     window.innerHeight + document.documentElement.scrollTop !==
  //     document.documentElement.offsetHeight
  //   ) {
  //     return;
  //   }

  //   removeRecipes(recipes.slice(0, 5).map((recipe) => recipe.id));

  //   addRecipes(recipes.slice(15, 20));

  //   // step += 5;
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [handleScroll]);

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

  const observerTarget = useRef(null);

  useEffect(() => {
    let initialLoad = true;

    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && !initialLoad) {
          const nextVisibleRecipes = visibleRecipesRef.current + 5;
          if (nextVisibleRecipes > recipes.length) {
            try {
              const nextPage = Math.ceil(recipes.length / 5) + 1;
              const newRecipes = await getRecipes(nextPage);
              if (newRecipes.length > 0) {
                addRecipes(newRecipes);
              }
            } catch (error) {
              console.error("Error fetching new recipes:", error);
            }
          }

          removeRecipes(recipes.slice(0, 5).map((recipe) => recipe.id));
          visibleRecipesRef.current = nextVisibleRecipes;
          addRecipes(recipes.slice(nextVisibleRecipes - 5, nextVisibleRecipes));
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
  }, [visibleRecipesRef, removeRecipes, addRecipes, recipes]);

  const visibleRecipes = recipes.slice(0, 15);

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
