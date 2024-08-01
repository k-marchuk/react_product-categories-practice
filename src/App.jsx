/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';
import { Categories } from './components/Categories/Categories';
import { Users } from './components/Users/Users';
import { Products } from './components/Products/Products';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map(product => {
  const category = categoriesFromServer.find(
    ({ id }) => id === product.categoryId,
  );
  const user = usersFromServer.find(({ id }) => id === category.ownerId);

  return { ...product, category, user };
});

function getPreparedProducts(query, selectedUserId, categoriesSelected) {
  const preparedProducts = products.filter(product => {
    let matched = true;

    if (selectedUserId) {
      matched = selectedUserId === product.user.id;
    }

    if (matched && categoriesSelected.length) {
      matched = categoriesSelected.includes(product.categoryId);
    }

    if (matched && query) {
      matched = product.name.toLowerCase().includes(query);
    }

    return matched;
  });

  return preparedProducts;
}

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [query, setQuery] = useState('');
  const [categoriesSelected, setCategoriesSelected] = useState([]);
  const preparedProducts = getPreparedProducts(
    query,
    selectedUserId,
    categoriesSelected,
  );

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                data-cy="FilterAllUsers"
                href="#/"
                className={selectedUserId === '' ? 'is-active' : null}
                onClick={() => setSelectedUserId('')}
              >
                All
              </a>

              <Users
                users={usersFromServer}
                setSelectedUserId={setSelectedUserId}
                selectedUserId={selectedUserId}
              />
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={query}
                  onChange={event => setQuery(event.target.value.toLowerCase())}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {query && (
                  <span className="icon is-right">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={() => setQuery('')}
                    />
                  </span>
                )}
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className={
                  categoriesSelected.length
                    ? 'button mr-6 is-outlined'
                    : 'button is-success mr-6'
                }
                onClick={() => setCategoriesSelected([])}
              >
                All
              </a>

              <Categories
                categories={categoriesFromServer}
                categoriesSelected={categoriesSelected}
                setCategoriesSelected={setCategoriesSelected}
              />
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={() => {
                  setSelectedUserId('');
                  setCategoriesSelected([]);
                  setQuery('');
                }}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {!preparedProducts.length ? (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          ) : (
            <table
              data-cy="ProductTable"
              className="table is-striped is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      ID
                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Product
                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort-down" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Category
                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort-up" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      User
                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort" />
                        </span>
                      </a>
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody>
                <Products products={preparedProducts} />
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
