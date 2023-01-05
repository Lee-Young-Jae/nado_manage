const axios = require("axios");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
// API 상수 불러오기 (backend\Constants\STOCK.API\index.js)
const STOCKAPI = require("./Constans/STOCK.API");

async function getStockPrice() {
  try {
    const API_KEY =
      "XDETQb%2F26zd%2FDhN9Bph7S70zdwfNtd5ztYDrBekqSVZX7N%2BrQIwKp5%2BTFGa33ca6btfzM10Z9o0B4Jox9UaTdA%3D%3D";
    let url = `https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=${API_KEY}&numOfRows=10&pageNo=1&resultType=json&likeItmsNm=삼성&basDt=20221201`;

    const response = await axios.get(url);
    console.log(response.data.response.body.items.item);
  } catch (error) {
    console.error(error);
  }
}

/**
 *
 * @param {string} stockCode 종목코드
 * @param {string} date YYYYMMDD 형식의 기준 날짜
 * @param {number} numOfRows 가져올 데이터의 개수
 */
// async function getSamsungStockPrice(
//   stockCode = "005930",
//   date = "20221201",
//   numOfRows = 30
// ) {
//   try {
//     const URL = `${
//       STOCKAPI.BASE_URL + STOCKAPI.API_KEY + STOCKAPI.RESULT_TYPE
//     }json${STOCKAPI.MRKT_CLS + STOCKAPI.KOSPI}${
//       STOCKAPI.LIKE_SRTN_CD
//     }${stockCode}${STOCKAPI.BEGIN_BAS_DT}${date}${STOCKAPI.PAGE_NO}1${
//       STOCKAPI.NUM_OF_ROWS
//     }${numOfRows}`;
//     console.log("url: ", URL);
//     const response = await axios.get(URL);
//     console.dir(response.data.response.body.items.item);
//   } catch (error) {
//     console.error(error);
//   }
// }

// getStockPrice();
// getSamsungStockPrice("432320", "20221201", 30);

// 코스피 지수 가져오기
const puppeteer = require("puppeteer");
// async function getKospiIndex() {
//   try {
//     const browser = await puppeteer.launch({
//       headless: true,
//       args: ["--no-sandbox", "--disable-setuid-sandbox"],
//     });
//     const page = await browser.newPage();
//     await page.goto("https://finance.naver.com/sise/");
//     const kospi = await page.evaluate(() => {
//       return document.querySelector("#KOSPI_now").textContent;
//     });
//     console.log(kospi);
//     await browser.close();
//   } catch (error) {
//     console.error(error);
//   }
// }

// getKospiIndex();

//https://finance.naver.com/sise/sise_index_day.naver?code=KOSPI&page=1

// https://finance.naver.com/sise/sise_index_day.naver?code=KOSPI 1~page페이지를 순회하며 코스피 지수 가져오기
async function getKospiIndex(pageNumber) {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(
      `https://finance.naver.com/sise/sise_index_day.naver?code=KOSPI&page=${pageNumber}`
    );
    const kospi = await page.evaluate(() => {
      // td.date 가져오기
      const date = [...document.querySelectorAll("td.date")]
        .filter((td) => {
          return td.textContent.includes(".");
        })
        .map((td) => {
          return td.textContent;
        });
      // td.number_1 가져오기
      const indexs = [...document.querySelectorAll("td.number_1")]
        .filter((td) => {
          return td.textContent.includes(",");
        })
        .filter((td, index) => {
          return index % 3 === 0;
        })
        .map((td) => {
          return td.textContent;
        });

      // date, indexs 합치기
      const result = date.map((date, index) => {
        return { date, index: indexs[index] };
      });

      return result;
    });
    // console.log(kospi);
    await browser.close();
    return kospi;
  } catch (error) {
    console.error(error);
  }
}

const getKospiIndexList = async (page) => {
  const kospiIndexList = [];
  let pageNumber = 1;
  try {
    while (pageNumber <= page) {
      const kospiIndex = await getKospiIndex(pageNumber).then((res) => res);
      kospiIndexList.push(kospiIndex);
      pageNumber++;
    }
    return kospiIndexList;
  } catch (error) {
    console.error(error);
  }
};

getKospiIndexList(10).then((res) => console.log(res.flat(1))); // 10 페이지를 가져오는데 10초 소요 (최대 1분 소요) 페이지당 6개 데이터 가져옴
