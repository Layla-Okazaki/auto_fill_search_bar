import './App.css';
import { useState, useEffect } from 'react';
import searchBar from './search.svg';

function App() {
  const [input, setInput] = useState('');

  const [searching, setSearching] = useState(false);

  const [searchResults, setSearchResults] = useState([]);

  const [people, setPeople] = useState([]);

  const [selected, setSelected] = useState(0);

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then((res) => res.json())
      .then((data) => {
        setPeople(
          data.results.map((person) => {
            return {
              name: `${person.name.first} ${person.name.last}`,
              image: person.picture.medium,
              email: person.email,
              gender: person.gender,
            };
          })
        );
      });
  }, []);

  function handleChange(e) {
    setInput(e.target.value);
    setSearching(true);
  }

  function handleSubmit(results) {
    setSearching(false);
    console.log(results);
    setSearchResults(results);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter')
      handleSubmit(
        people.filter((person) =>
          person.name.toLowerCase().startsWith(input.toLowerCase())
        )
      );
  }

  // conditional rendering
  // (bool && <div>will render</div>)

  // rendering for each item in array
  // {array.map((songName) => {
  //  return <div></div>
  // })}

  return (
    <div className="App">
      <div className="search-bar">
        <div className="input-container">
          <input
            value={input}
            type="text"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={() => {
              handleSubmit(
                people.filter((person) =>
                  person.name.toLowerCase().startsWith(input.toLowerCase())
                )
              );
            }}
          >
            <img src={searchBar} alt="search" />
          </button>
        </div>
        {input && (
          <div className="drop-down">
            {searching &&
              people
                .filter((person) =>
                  person.name.toLowerCase().startsWith(input.toLowerCase())
                )
                .map((person, index) => (
                  <h2
                    key={index}
                    className={selected === index ? 'selected' : ''}
                    onClick={() => {
                      setInput(person.name);
                      handleSubmit(person);
                    }}
                    onMouseEnter={() => {
                      setSelected(index);
                    }}
                  >
                    {person.name}
                  </h2>
                ))}
          </div>
        )}
      </div>
      <div className="results">
        {Array.isArray(searchResults) ? (
          searchResults.map((person, index) => {
            return (
              <div
                className="person"
                key={index}
                onClick={() => setSearchResults(person)}
              >
                <div className="img-container">
                  <img src={person.image} alt="" />
                </div>

                <h1>{person.name}</h1>
              </div>
            );
          })
        ) : (
          <div className="single-search">
            <img src={searchResults.image} alt="profile picture" />
            <h1>{searchResults.name}</h1>
            <h2>{searchResults.gender}</h2>
            <h2>{searchResults.email}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
