
//上いらない

// const weatherNum = 3;

// const fetchW = async () =>{
//   for(let i =1; i <= weatherNum; i++){
//     await getW(i);
//   }
// };


const getW = async (id) =>{
  const url = `https://api.open-meteo.com/v1/forecast?latitude=35.69&longitude=139.69&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo`;
  const res = await fetch(url);
  const weather = await res .json();
  console.log(weather);
  createW(weather);
}


function createW(weather){
  const tenki = `
  <div class="item_wrap">
   <div class="item">場所${weather.timezone}</div>
   <div class="item">緯度${weather.latitude}</div>
   <div class="item">標高${weather.elevation}</div>
  </div>
  `

  $(".list").append(tenki);
};

getW();

//こんなやり方もあった

const url = 'https://api.open-meteo.com/v1/forecast?latitude=35.69&longitude=139.69&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo';


fetch(url)
  .then(data => data.json())
  .then(json => console.log(json))

  fetch(url)
  .then(data => data.json())
  .then(json => drawChart(json))

  function drawChart(json) {
    const mydata = {
      labels: json.daily.time,
      datasets: [{
        label: '最高気温',
        data: json.daily.temperature_2m_max,
        borderColor: 'rgb(192, 75, 75)',
      },{
        label: '最低気温',
        data: json.daily.temperature_2m_min,
        borderColor: 'rgb(75, 75, 192)',
      }]
    }
    
    new Chart(document.getElementById('stage'), {
      type: 'line',
      data: mydata,
    });
  }
