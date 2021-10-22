import React, { useState } from "react";
import './App.css';

function App() {
  const [city, setCity] = useState("");
  const [weatherForecast, setWeatherForecast] = useState(null);

  const [load, setLoad] = useState(false);
  const [erro, setErro] = useState(false);

  const handleSearch = () => {
    fetch(
      `${process.env.REACT_APP_BASE_URL}current.json?key=${process.env.REACT_APP_KEY}&q=${city}&lang=pt`
    )
      .then((res) => {
        setLoad(true)
        setErro(null)
        if (res.status === 200) {
          setCity("");
          return res.json();
        }
        else {
          setCity("");
          setErro(true)
        }
      })
      .then((data) => {
        setLoad(false)
        console.log(data);
        setWeatherForecast(data);
      });
  };

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-transparent mb-4">
          <a className="navbar-brand " href="https://github.com/devnivek/Weather-React-EBAC">
            <i class="fa fa-cloud mr-2" aria-hidden="true"></i> Como está o Clima?
          </a>
        </nav>
      </div>
      <br></br>
      <main className="container" id="search">
        <div className="jumbotron text-white">
          <h1><i class="fa fa-sun-o mr-2 text-warning" aria-hidden="true"></i>Confira o clima atual de qualquer lugarl! </h1>
          <p className="lead">
            Digite um local no campo abaixo e clique em pesquisar ;)
          </p>
          <div className="row mb-4">
            <div class="col-md-6">
              <input
                type="text"
                class="form-control h-100"
                value={city}
                placeholder="qual cidade deseja conferir?"
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <button className="btn btn-lg btn-primary h-100" onClick={handleSearch}>
                {load ? "Buscando ..." : <i class="fa fa-search" aria-hidden="true"><a class="ml-2">Pesquisar</a></i>}
              </button>
            </div>
          </div>

          <p class="erro mt-4">{erro ? <i class="fa fa-exclamation-triangle ml-2 mt-4" aria-hidden="true"><a class="erro ml-2">Ops, cidade não encontrada! tente novamente.</a></i> : ""}</p>

          {weatherForecast ? (
            <>
              <div className="mt-4 d-flex align-items-center clima">
                <div className="col-sm-2 mr-3">
                  <img
                    src={`${weatherForecast.current.condition.icon}`}
                    alt="Weather Icon" width="130px"
                  />
                </div>
                <div>
                  <br></br>
                  <h6 class="text-info">
                    <i class="fa fa-globe mr-2" aria-hidden="true"></i>Você está vendo {weatherForecast.location.name}, {weatherForecast.location.region} - {weatherForecast.location.country}
                  </h6>
                  <hr></hr>
                  <h3>
                    {weatherForecast.current.is_day == 0 ? "Boa noite! " : "Bom dia! "}
                    <br></br>Hoje o dia está {weatherForecast.current.condition.text}
                  </h3>
                  <p className="lead text-primary">
                    <i class="fa fa-thermometer-three-quarters mr-2" aria-hidden="true"></i>
                    Temperatura atual: {weatherForecast.current.temp_c}ºC 
                    <br></br>
                    <h6>Humidade do ar em {weatherForecast.current.humidity}% {
                      weatherForecast.current.humidity >= 60 ? "- Tudo Ok!" : "- Beba Água!"
                    }</h6>
                  </p>
                  <small><i class="fa fa-clock-o mr-2" aria-hidden="true"></i>atualizado ás {
                  weatherForecast.current.last_updated.split(" ")[1] }</small>
                </div>
              </div>
            </>
          ) : null}
        </div>
        <div class="rodape bg-primary text-center py-3">
          <span class="text-light"> © 2021 - Desenvolvido por <a href="https://devnivek.github.io/portfolio/" title="Confira meu projeto Portfólio ;)" target="_blank" class="link">Kevin Santos</a></span>
        </div>
      </main>
    </>
  );
}

export default App;
