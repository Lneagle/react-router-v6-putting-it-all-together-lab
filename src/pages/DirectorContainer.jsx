import { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import NavBar from '../components/NavBar';

const DirectorContainer = () => {
    const [directors, setDirectors] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/directors")
        .then(r => {
            if (!r.ok) { throw new Error("failed to fetch directors") }
            return r.json();
        })
        .then(setDirectors)
        .catch(console.log)
    }, [])

    const addDirector = (newDirector) => {
        setDirectors(previousDirectors => [...previousDirectors, newDirector]);
    }

  const updateDirector = (updatedDirector) => {
    setDirectors(previousDirectors => previousDirectors.map(director => {
        if (director.id === updatedDirector.id) {
            return updatedDirector;
        }
        return director;
    }));
  }

    return (
        <>
            <NavBar />
            <main>
                <h1>Welcome to the Directors Directory!</h1>
                <Link to="new">Add a new Director</Link>
                <Outlet context={{directors, addDirector, updateDirector}} />
            </main>
        </>
    );
}

export default DirectorContainer;
