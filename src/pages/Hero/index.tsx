import React, { useState, useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { Header, HeroInfo, HeroDetail } from './styles';
import api from '../../services/api';
import logoImg from '../../assets/rm.gif';
import { CharacterHero } from '../../@types/index';
interface HeroParams {
  id: string;
}

const Hero: React.FC = () => {
  const [characters, setHero] = useState<CharacterHero>({} as CharacterHero);
  const { params } = useRouteMatch<HeroParams>();
  const url = "https://rickandmortyapi.com/documentation/"

  useEffect(() => {
    api.get(`/character/${params.id}`).then(response => {
      setHero(response.data);
    });
  }, [params.id]);

  return (
    <>
      <Header>
        <img style={{ width: '250px' }} src={logoImg} alt="Hero" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>
      {characters ? (
        <HeroInfo key={characters.id}>
          <header>
            <img src={characters.image} alt="Hero" />
            <div>
              <strong>{characters.name}</strong>
              <p>{characters.species}</p>
            </div>
          </header>
        </HeroInfo>
      ) : null}
      <HeroDetail>
        {characters ? (
          <a key={characters.id} href={url}>
            <div>
              <strong>Gender</strong>
              <p>{characters.gender}</p>
            </div>
            <div>
              <strong>Origin</strong>
              <p>{characters ?.origin ?.name}</p>
            </div>
            <div>
              <strong>Location</strong>
              <p>{characters ?.location ?.name}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ) : null}
      </HeroDetail>
    </>
  );
};

export default Hero;
