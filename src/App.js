import React, { useState } from "react";
/*
Olá tudo bem? 

Então vamos lá vou deixar esse desafio pra você.

Quero que você melhore a usabilidade do nosso verificador de clima.

Estava pensando aqui e precisamos das seguintes melhorias:

Mostrar para o usuário de alguma maneira que estamos buscando a informação
meteorologia da cidade dele, acho que precisamos de um "loading", o que acha?
Que tal escrever "Buscando..." dentro do botão enquanto a requisição esta sendo feita?

Seria legal também a gente mostrar para o usuário a cidade e estado dele,
pra ele ter certeza que estamos mostrando a previsão do tempo da cidade correta, o que acha?

Podemos também limpar o campo de busca após a busca ser realizada! Isso melhora a usabilidade
do nosso sistema.

O que acha de informamos o usuário quando a cidade não for encontrada ou tivermos algum 
erro na nossa requisição? Legal ne?

E por último temos varias outras informações que podemos mostrar para o usuário,
como por exemplo, visibilidade, sensação termica, humidade, velocidade do vento.

Vamos listras alguma dessas informações para o usuário? Sinta-se a vontade para modificar
o layout como você quiser!!

*/

function App() {
  const [city, setCity] = useState("");
  const [weatherForecast, setWeatherForecast] = useState(null);

  const [load = Boolean(false), setLoad] = useState("");
  const [erro, setErro] = useState("");

  const handleSearch = () => {
    fetch(
      `${process.env.REACT_APP_BASE_URL}current.json?key=${process.env.REACT_APP_KEY}&q=${city}&lang=pt`
    )
      .then((res) => {
        setLoad(true)
        setErro("")
        if (res.status === 200) {
          setCity("");
          return res.json();
        }
        else{
          setCity("");
          setErro(<i class="fa fa-exclamation-triangle ml-3 mt-4" aria-hidden="true"><p class="erro">Ops, cidade não encontrada! tente novamente.</p></i>)
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
          <a className="navbar-brand " href="#search">
          <i class="fa fa-cloud mr-2" aria-hidden="true"></i> Consulta Clima
          </a>
        </nav>
      </div>

      <main className="container" id="search">
        <div className="jumbotron text-white">
          <h1>Veja agora o clima atual de qualquer local! </h1>
          
          <p className="lead">
            Digite uma cidade no campo abaixo em seguida
            clique em pesquisar.
          </p>
          <div className="row mb-4">
            <div class="col-md-6">
              <input
                type="text"
                class="form-control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>
          <button className="btn btn-lg btn-primary" onClick={handleSearch}>
            {load? "Buscando ..." : <i class="fa fa-search" aria-hidden="true"><a class="ml-2">Pesquisar</a></i>}
          </button>
          <p class="erro">{erro}</p>

          {weatherForecast ? (
            <>
              <div className="mt-4 d-flex align-items-center clima">
                <div className="col-sm-1">
                  <img
                    src={`${weatherForecast.current.condition.icon}`}
                    alt="Weather Icon"
                  />
                </div>
                <div>
                  <br></br>
                  <h6 class="text-info">
                    <i class="fa fa-globe mr-2" aria-hidden="true"></i>Você está em {weatherForecast.location.name}, {weatherForecast.location.region} - {weatherForecast.location.country}
                  </h6>
                  <hr></hr>
                  <h3>
                    Hoje o dia está: {weatherForecast.current.condition.text}
                  </h3>
                  <p className="lead text-primary">
                  <i class="fa fa-thermometer-three-quarters mr-2" aria-hidden="true"></i>
Temperatura atual: {weatherForecast.current.temp_c}ºC <br></br><h6>Humidade do ar em {weatherForecast.current.humidity}% {weatherForecast.current.humidity >= 60 ? "- Tudo Ok!" : "- Beba Água!"}</h6>
                  </p>
                  <small class="text-muted"><i class="fa fa-clock-o mr-2" aria-hidden="true"></i>atualizado em {weatherForecast.current.last_updated}</small>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </main>
    </>
  );
}

export default App;
