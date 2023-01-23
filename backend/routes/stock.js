const express = require("express");
const { User, Kospi, KospiIndex } = require("../models");
const { Op } = require("sequelize");
const axios = require("axios");
const puppeteer = require("puppeteer");

const router = express.Router();

// localhost:3070/stock/list/${stockName} GET
router.get("/list/:stockName", async (req, res) => {
  // params가 포함된 이름의 sikjae 검색
  const stockName = req.params.stockName;

  const kospi = await Kospi.findAll({
    where: {
      name: {
        [Op.like]: "%" + stockName + "%",
      },
    },
  });

  // if (kospi.length === 0) {
  //   return res
  //     .status(404)
  //     .send("해당하는 이름의 주식이 없네요...😰 다시 검색해주세요.");
  // }

  res.status(201).send(kospi);
});

// localhost:3070/stock?shortCode=${shortCode}&BASE_DT=${BASE_DT}&ROWS=${ROWS}&NAME=${NAME} GET
router.get("/", async (req, res) => {
  const { shortCode, BASE_DT, ROWS } = req.query;

  if (!shortCode || !BASE_DT || !ROWS) {
    return res.status(404).send("필수 요청값이 없습니다.");
  }

  if (ROWS > 1500) {
    return res.status(404).send("ROWS는 1500 이하로 입력해주세요.");
  }

  // shortCode 길이가 6자리 미만일 경우
  // 0을 앞에 붙여 6자리로 만들어줌

  let SHORTCODE = shortCode;
  if (SHORTCODE?.length < 6) {
    const len = SHORTCODE.length;
    for (let i = 0; i < 6 - len; i++) {
      SHORTCODE = "0" + SHORTCODE;
    }

    console.log("shortCode: ", SHORTCODE);
  }

  try {
    const URL = `https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=${process.env.STOCK_API_KEY}&mrktCls=KOSPI&pageNo=1&resultType=json&likeSrtnCd=${SHORTCODE}&beginBasDt=${BASE_DT}&numOfRows=${ROWS}`;
    //${STOCKAPI.ITMS_NM}${NAME}
    console.log("url: ", URL);
    const response = await axios.get(URL);
    // res.status(201).send(response.data.response.body.items.item);

    // response가 들어오지 않았을 경우 처리
    if (response.data.response.body.totalCount === 0) {
      return res
        .status(404)
        .send("데이터를 불러오지 못했습니다...😰 다시 검색해주세요.");
    }
    const stockData = response.data.response.body.items.item;
    res.status(201).send(stockData);
  } catch (error) {
    console.error(error);
  }
});

// localhost:3070/stock/kospiindex/today GET
router.get("/kospiindex/today", async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(
      `https://finance.naver.com/sise/sise_index_day.naver?code=KOSPI&page=1`
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
    console.log(kospi);
    await browser.close();

    return res.status(201).send(kospi);
  } catch (error) {
    console.error(error);
  }
});

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

// localhost:3070/stock/kospiindex/week GET
router.get("/kospiindex/week", async (req, res) => {
  try {
    // KOSPIINDEX DB의 날짜순으로 3년치 데이터 가져오기
    const kospiindex = await KospiIndex.findAll({
      where: {
        date: {
          [Op.gte]: new Date(
            new Date().setFullYear(new Date().getFullYear() - 3)
          ),
        },
      },
      order: [["date", "ASC"]],
    });

    const recentDateOnDataBase = new Date(
      kospiindex[kospiindex.length - 1].date
    );
    const baseDate = recentDateOnDataBase;

    const baseDateStr = `${baseDate.getFullYear()}${
      baseDate.getMonth() + 1 < 10
        ? "0" + (baseDate.getMonth() + 1)
        : baseDate.getMonth() + 1
    }${
      baseDate.getDate() < 10 ? "0" + baseDate.getDate() : baseDate.getDate()
    }`;
    console.log("baseDateStr: ", baseDateStr);
    // 공공데이터 포털에서 불러온 최신값 데이터의 날짜가 kospiindex의 최신 날짜보다 더 최신인 경우를 확인합니다.
    const url = `https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=${process.env.STOCK_API_KEY}&mrktCls=KOSPI&pageNo=1&resultType=json&beginBasDt=${baseDateStr}&numOfRows=1`;
    console.log(url);

    const response = await axios.get(url);
    const stockData = response.data.response.body.items.item;

    // response가 들어오지 않았을 경우 (DB에 INDEX가 최신인 경우) 바로 DB의 값을 돌려줍니다.
    if (response.data.response.body.totalCount === 0) {
      return res.status(201).json(kospiindex);
    }

    // response가 들어왔을 경우 처리 (DB에 INDEX가 최신이 아닌 경우)
    // KOSPI지수 크롤링하여 DB에 추가하기 (부족한 만큼)
    //  baseDateStr ~ stockData[0].basDt 까지의 데이터를 kospiindex DB에 추가합니다.

    // getKospiIndex() 는 page당 6개의 데이터를 가져오기때문에
    // Date2의 Day와 Date1의 Day 차이를 6으로 나눈 몫 만큼의 page를 가져옵니다.

    const date1 = new Date(
      baseDateStr.slice(0, 4),
      baseDateStr.slice(4, 6),
      baseDateStr.slice(6, 8)
    );
    const date2 = new Date(
      stockData[0].basDt.slice(0, 4),
      stockData[0].basDt.slice(4, 6),
      stockData[0].basDt.slice(6, 8)
    );

    console.log("date1: ", date1);
    console.log("date2: ", date2);
    const diff = Math.abs(date2 - date1);

    console.log("diff: ", diff);
    const diffDay = Math.ceil(diff / (1000 * 60 * 60 * 24));
    console.log("diffDay: ", diffDay);

    let page = Math.ceil(diffDay / 6);
    console.log("page: ", page);

    let kospiIndexs = [];
    // result가 promise이므로 while문을 수정
    kospiIndexs = await Promise.all(kospiIndexs);

    // page가 1이 될때까지
    while (page > 0) {
      const result = await getKospiIndex(page);
      kospiIndexs.push(result);
      page--;
    }

    console.log("kospiIndexs: ", kospiIndexs);

    // Day2 - 1달 보다 이전이고 Day1보다 이후인 데이터만 남기기
    // stackData[0].basDt의 YYYYMMDD 형식을 Date로 변환
    const baseDate2 = new Date(
      stockData[0].basDt.slice(0, 4),
      stockData[0].basDt.slice(4, 6),
      stockData[0].basDt.slice(6, 8)
    );

    // baseDate2 - 1달
    baseDate2.setMonth(baseDate2.getMonth() - 1);

    console.log("baseDate:", baseDate);
    console.log("baseDate2: ", baseDate2);

    kospiIndexs = kospiIndexs.flat().filter((v) => {
      const date = new Date(v.date);
      return date > baseDate && date <= baseDate2;
    });

    console.log("kospiIndexs: ", kospiIndexs);
    // DB에 추가하기
    // await KospiIndex.bulkCreate(kospiIndexs);

    for (const kospiIndex of kospiIndexs) {
      const intedKospiIndex = Number(kospiIndex.index.replace(/,/g, ""));
      await KospiIndex.create({
        date: kospiIndex.date,
        closePrice: intedKospiIndex,
      });
    }

    // DB에 추가된 데이터를 가져와서 리턴하기
    const result = await KospiIndex.findAll({
      where: {
        date: {
          [Op.gte]: new Date(
            new Date().setFullYear(new Date().getFullYear() - 3)
          ),
        },
      },
      order: [["date", "ASC"]],
    });

    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
