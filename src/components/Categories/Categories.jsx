export const Categories = ({
  categories,
  categoriesSelected,
  setCategoriesSelected,
}) => {
  return (
    <>
      {categories.map(category => (
        <a
          onClick={() => {
            if (categoriesSelected.includes(category.id)) {
              setCategoriesSelected(
                categoriesSelected.filter(
                  selectedCategory => selectedCategory !== category.id,
                ),
              );
            } else {
              setCategoriesSelected([...categoriesSelected, category.id]);
            }
          }}
          key={category.id}
          data-cy="Category"
          className={
            categoriesSelected.includes(category.id)
              ? 'button mr-2 my-1 is-info'
              : 'button mr-2 my-1'
          }
          href="#/"
        >
          {category.title}
        </a>
      ))}
    </>
  );
};
