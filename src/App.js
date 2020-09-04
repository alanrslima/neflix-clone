import React from 'react';
import Store from './store';
import { useEffect } from 'react';
import { useState } from 'react';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';
import './App.css'
import Lottie from 'react-lottie';
import LoadingAnimation from './assets/json/loading.json'

function App() {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(undefined);
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 20) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  async function loadAll() {
    const data = await Store.getHomeList();
    setMovieList(data);
    let [originals] = data.filter(i => i.slug === 'originals');
    let randomChosen = Math.floor(Math.random() * (originals.items.results.length));
    const chosen = originals.items.results[randomChosen];
    let chosenDetail = await Store.getMovieDetail(chosen.id, 'tv');
    setFeaturedData(chosenDetail);
  }

  return (
    <div className="page">

      <Header black={blackHeader} />

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }
      <section className="lists">
        {movieList.map((movie, index) => (
          <MovieRow
            title={movie.title}
            items={movie.items}
            key={index} />
        ))}
      </section>

      <footer>
        Feito com <span role="img" aria-label="heart">♥️</span> por Alan Lima<br />
        Direitos de imagem para Netflix<br />
        Dados providos pelo site https://www.themoviedb.org<br />
      </footer>

      {!movieList.length ? (
        <div className="loading">
          <Lottie
            height={300}
            width={300}
            options={{ loop: true, autoplay: true, animationData: LoadingAnimation }} />
        </div>
      ) : null}


    </div>
  );
}

export default App;
