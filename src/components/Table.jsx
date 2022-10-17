import React, { useContext } from 'react';
import Context from '../context/myContext';

function Table() {
  const { data, isLoading, filteredSearch } = useContext(Context);
  return isLoading ? (
    <h1>Wait, please...</h1>
  ) : (
    Object.keys(data).length && (
      <div className="table-scroll">
        <table>
          <thead>
            <tr className="thead">
              {Object.keys(data[0]).map((key) => (
                <th key={ key }>{key.toUpperCase().replace('_', ' ')}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredSearch.map((planet, index) => (
              <tr className="tbody" key={ index }>
                {Object.values(planet).map((d, i) => (
                  <td key={ i }>{d}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
}

export default Table;
