const express = require("express");
const { User, Kospi } = require("../models");
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

  if (kospi.length === 0) {
    return res
      .status(404)
      .send("해당하는 이름의 주식이 없네요...😰 다시 검색해주세요.");
  }

  res.status(201).send(kospi);
});

// localhost:3070/stock?shortCode=${shortCode}&BASE_DT=${BASE_DT}&ROWS=${ROWS}&NAME=${NAME} GET
router.get("/", async (req, res) => {
  const { shortCode, BASE_DT, ROWS } = req.query;

  if (!shortCode || !BASE_DT || !ROWS) {
    return res.status(404).send("필수 요청값이 없습니다.");
  }

  if (ROWS > 1000) {
    return res.status(404).send("ROWS는 1000 이하로 입력해주세요.");
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

module.exports = router;
