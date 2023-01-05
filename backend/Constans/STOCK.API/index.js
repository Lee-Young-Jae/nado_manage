const STOCKAPI = Object.freeze({
  BASE_URL: `https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?`,
  FULL_URL: `https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?serviceKey=XDETQb%2F26zd%2FDhN9Bph7S70zdwfNtd5ztYDrBekqSVZX7N%2BrQIwKp5%2BTFGa33ca6btfzM10Z9o0B4Jox9UaTdA%3D%3D&mrktCls=KOSPI&pageNo=1&resultType=json`,
  NUM_OF_ROWS: "&numOfRows=",
  PAGE_NO: "&pageNo=", // 페이지 번호
  RESULT_TYPE: "&resultType=", // 구분 (json, xml)
  BAS_DT: "&basDt=", // 기준일자 (검색값과 기준일지가 일치하는 데이터를 검색)
  BEGIN_BAS_DT: "&beginBasDt=", // 기준일자 시작일 (검색값과 기준일지가  크거나 일치하는 데이터를 검색)
  END_BAS_DT: "&endBasDt=", // 기준일자 종료일 (검색값과 기준일지가 작은 데이터를 검색)
  LIKE_ITMS_NM: "&likeItmsNm=", // 검색값 (검색값이 기준일자값을 포함하는 검색)
  LIKE_SRTN_CD: "&likeSrtnCd=", // 단축코드가 검색값을 포함하는 데이터 검색
  ISIN_Cd: "&isinCd=", // ISIN코드가 검색값과 일치하는 데이터 검색
  LIKE_ISIN_Cd: "&likeIsinCd=", // ISIN코드가 검색값을 포함하는 데이터 검색
  ITMS_NM: "&itmsNm=", // 종목명이 검색값과 일치하는 데이터 검색
  LIKE_ITMS_NM: "&likeItmsNm=", // 종목명이 검색값을 포함하는 데이터 검색
  MRKT_CLS: "&mrktCls=", // 시장구분 (KOSDAQ, KOSPI, KONEX)
  KOSDAQ: "KOSDAQ", // 코스닥
  KOSPI: "KOSPI", // 코스피
  KONEX: "KONEX", // 코넥스
  BEGIN_VS: "&beginVs=", // 전일대비 시작값 (검색값과 전일대비가 크거나 일치하는 데이터 검색)
  END_VS: "&endVs=", // 전일대비 종료값 (검색값과 전일대비가 작거나 일치하는 데이터 검색)
  BEGIN_FLT_RT: "&beginFltRt=", // 등락률 시작값 (검색값과 등락률이 크거나 일치하는 데이터 검색)
  END_FLT_RT: "&endFltRt=", // 등락률 종료값 (검색값과 등락률이 작거나 일치하는 데이터 검색)
  BEGIN_TRQU: "&beginTrqu=", // 거래량 시작값 (검색값과 거래량이 크거나 일치하는 데이터 검색)
  END_TRQU: "&endTrqu=", // 거래량 종료값 (검색값과 거래량이 작거나 일치하는 데이터 검색)
  BEGIN_TR_PRC: "&beginTrPrc=", // 거래대금 시작값 (검색값과 거래대금이 크거나 일치하는 데이터 검색)
  END_TR_PRC: "&endTrPrc=", // 거래대금 종료값 (검색값과 거래대금이 작거나 일치하는 데이터 검색)
  BEGIN_LSTG_ST_CNT: "&beginLstgStCnt=", // 상장주식수 시작값 (검색값과 상장주식수가 크거나 일치하는 데이터 검색)
  END_LSTG_ST_CNT: "&endLstgStCnt=", // 상장주식수 종료값 (검색값과 상장주식수가 작거나 일치하는 데이터 검색)
  BEGIN_MRKT_TOT_AMT: "&beginMrktTotAmt=", // 시가총액 시작값 (검색값과 시가총액이 크거나 일치하는 데이터 검색)
  END_MRKT_TOT_AMT: "&endMrktTotAmt=", // 시가총액 종료값 (검색값과 시가총액이 작거나 일치하는 데이터 검색)
});

module.exports = STOCKAPI;
