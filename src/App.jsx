import { useEffect } from "react";
import useAxios from "./hooks/useAxios";
import XLoader from "./components/xLoader";
import PageLoader from "./components/pageLoader";
function App() {

  const { fetchData, response, loading } = useAxios();
  const { strMeal, strMealThumb, strInstructions } = response;
  // optional chaining operator to prevent runtime error
  const youtubeUrl = response?.strYoutube?.replace('watch?v=', 'embed/');

  console.log(response);
  useEffect(() => {
    fetchData()
  }, []);

  if (loading) {
    return (
      <>
        <XLoader className='w-7 h-7 mx-auto ' />

        <div className="max-w-4xl mx-auto px-4 py-10">
          <PageLoader className='h-10 md:w-40' />
          <PageLoader className='h-10 w-72 mt-6' />
          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <PageLoader className='md:h-72 h-52' />
            <PageLoader className='md:h-72 h-52' />
          </div>
          <PageLoader className='h-10 w-72 mt-6' />
          <PageLoader className='h-64 mt-6' />
          <PageLoader className='h-72 mt-6' />


        </div>
      </>
    )
  }

  let ingredients = [];
  Object.keys(response).forEach((item, index) => {
    if (response[`strIngredient${index}`]) {
      ingredients.push({
        'ingredient': response[`strIngredient${index}`],
        'measure': response[`strMeasure${index}`]
      })
    }
  });




  // const ingredients = [{ ingredient: "olive oil", measure: "1/2 teaspoon" }];

  const renderList = (item, index) => {
    return (
      <div className="flex text-sm ml-4">
        <li>{item.ingredient} -- </li>
        <span className="italic text-gray-500 pl-3">{item.measure}</span>
      </div>
    );
  };
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <button
        onClick={() => fetchData()}
        className="bg-gray-800 text-white px-4 py-2 w-full rounded-md md:w-40" >
        Get a new meal!
      </button>
      <h1 className="text-4xl font-bold mt-8 mb-3 underline">{strMeal}</h1>
      <div className="md:grid md:grid-cols-2 md:gap-4">
        <div className="mt-4 border-orange-400 border-4 rounded-md h-80">
          <img
            className="w-full h-full object-cover"
            src={strMealThumb}
            alt="image"
          />
        </div>
        <div className="my-6">
          <h3 className="text-4xl font-bold mb-2">Ingredients</h3>
          {ingredients.map((item, index) => renderList(item, index))}
        </div>
      </div>
      <div>
        <h3 className="text-4xl font-bold mb-2">Instructions</h3>
        <p className="text-justify">
          {strInstructions}
        </p>
      </div>
      <div className="aspect-w-16 aspect-h-9 mt-6">
        <iframe
          src={youtubeUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default App;
