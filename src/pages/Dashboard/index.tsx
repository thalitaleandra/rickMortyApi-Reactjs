import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import logoImg from '../../assets/rm.gif';
import { Link } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';
import { Title, Form, Heroes, Error, Footer } from './styles';
import api from '../../services/api';
import { Character } from '../../@types/index';

const Dashboard: React.FC = () => {
  const [heroFilter, setNewHero] = useState('');
  const [inputError, setInputError] = useState('');
  const [loadHeroes, setLoadHeroes] = useState(false);
  const [numPage, setNumPage] = useState();
  const [page, setPage] = useState(
    localStorage.getItem('pageRick&Morty')
      ? Number(localStorage.getItem('pageRick&Morty'))
      : 1,
  );
  const [heroes, setHeroes] = useState<Character[]>([]);

  useEffect(() => {
    async function getRick() {
      localStorage.setItem('pageRick&Morty', String(page));
      console.log('page: ', page);
      setLoadHeroes(true);
      try {
        const response = await api.get(`/character/?page=${page}`);
        console.log(response.data);
        setLoadHeroes(false);
        setHeroes(response.data.results);
        setNumPage(response.data.info.pages);
      } catch (err) {
        console.log(err);
      }
    }
    getRick();
  }, [page]);

  function handleChange(event: any, page: any) {
    setPage(page);
  }

  async function FilterHero(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (!heroFilter) {
      setInputError('Digite o nome do seu personagem.');
      return;
    }
    try {
      const response = await api.get(`/character/?name=${heroFilter}`);
      const character = response.data.results;
      setHeroes([...character]);
      setNewHero('');
      setInputError('');
    } catch (err) {
      setInputError('Erro na busca por esse personagem.');
    }
  }
  return (
    <>
      <img style={{ width: '250px' }} src={logoImg} alt="Rick and Morty" />
      <Title> Explore Rick and Morty API!</Title>
      <Form hasError={!!inputError} onSubmit={FilterHero}>
        <input
          placeholder="Digite o nome do seu Herói."
          value={heroFilter}
          onChange={e => setNewHero(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}
      <Heroes>
        {heroes.map((hero, index) => (
          <Link key={index} to={`/hero/${hero.id}`}>
            <img src={hero.image} alt="Hero" />
            <div>
              <strong>{hero.name}</strong>
              <p>{hero.status}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Heroes>
      <Footer>
        <Pagination
          count={numPage}
          page={page}
          onChange={handleChange}
          disabled={loadHeroes}
          color="primary"
          size="large"
        />
      </Footer>
    </>
  );
};

export default Dashboard;
