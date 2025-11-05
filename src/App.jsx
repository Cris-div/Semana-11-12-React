import axios from 'axios'; 
import { useEffect, useState } from 'react';

const LIMITE_PER_PAGE = 10;

const getAllCharacters = async (page = 1, limit = 10) => {
  const { data } = await axios.get(`https://dragonball-api.com/api/characters?page=${page}&limit=${limit}`);
  return data;
};

function App() {

  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const dataFetched = await getAllCharacters(page, LIMITE_PER_PAGE);
      setResponse(dataFetched);
      setLoading(false);
    };

    fetchData();
  }, [page]);

  return (
    <>
      <section className="py-4">
        <div className="container">
          <h2 className="text-center">Dragonball API</h2>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

            {loading ? (
              <div className="text-center">
                <div className="spinner-grow text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              response.items.map((character) => {
                const { id, name, description, image } = character;
                return (
                  <div key={id} className="col">
                    <div className="card shadow-sm">
                      <img
                        src={image}
                        alt={name}
                        style={{ height: '250px', objectFit: 'contain' }}
                      />

                      <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">{description.slice(0, 100)}...</p>

                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-outline-secondary">
                              View
                            </button>
                            <button type="button" className="btn btn-sm btn-outline-secondary">
                              Edit
                            </button>
                          </div>
                          <small className="text-body-secondary">9 mins</small>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

          </div>
          <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">

            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                Previous
              </button>
            </li>

            <li className="page-item">
              <button className="page-link active">
                {page}
              </button>
            </li>

            <li className="page-item">
              <button
                className={`page-link ${
                  page === response.meta?.totalPages ? 'disabled' : ''
                }`}
                onClick={() => setPage(page + 1)}
                disabled={page === response.meta?.totalPages}
              >
                Next
              </button>
            </li>

          </ul>
        </nav>
        </div>
      </section>
    </>
  );
}

export default App;
