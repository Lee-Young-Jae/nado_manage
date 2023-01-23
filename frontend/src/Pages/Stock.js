import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Button from "../Components/common/Button";
import SearchForm from "../Components/Patterns/SearchForm";
import {
  LOAD_STOCK_REQUEST,
  SEARCH_STOCK_REQUEST,
} from "../modules/reducers/stock";
import Dialog from "../Components/common/Dialog";
import StockChart from "../Components/Patterns/StockChart";
import IsLogin from "../Components/Patterns/IsLogin";
import { getCommaString } from "../Utils/common";

import Flex from "../Components/common/Flex";

const StockStyle = styled.div``;

const StockListStyle = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 150px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  & > div:hover {
    background-color: #f1f3f5;
    cursor: pointer;
  }
`;

const SearchFormWrapper = styled.div`
  margin: 0 15px;
`;

const StockName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #dee2e6;
  font-weight: bold;
`;

const StockDetail = styled.div`
  color: #adb5bd;
`;

const StockInfo = styled.div`
  margin: 0 15px;
  border-radius: 13px;
`;

const SubText = styled.div`
  font-size: 12px;
  color: #adb5bd;
`;

const Analysis = styled.div`
  margin: 0 15px;
  background-color: #f8fafe;
  border-radius: 13px;
  border: 1px solid #dbdfe8;

  p {
    font-size: 14px;
  }
`;

const ChartWrapper = styled.div`
  margin: 0 15px;
  background-color: #f8fafe;
  border-radius: 13px;
  border: 1px solid #dbdfe8;
`;

const Stock = () => {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { search_stock, detail_stock } = useSelector((state) => state.stock);

  const searchStock = useCallback(
    (e) => {
      dispatch({
        type: SEARCH_STOCK_REQUEST,
        data: e.target.value,
      });
    },
    [dispatch]
  );

  const onClickStockItem = useCallback(
    (item) => {
      console.log(item);
      dispatch({
        type: LOAD_STOCK_REQUEST,
        data: {
          shortCode: item.shortCode,
          BASE_DT: "20150101",
          ROWS: 1000,
        },
      });
    },
    [dispatch]
  );

  const [valueAtRisk, setValueAtRisk] = useState({
    ninetyFivePercent: 0,
    onePercent: 0,
  });

  const [sharpRatio, setSharpRatio] = useState(0);

  const [fluctuationRange, setFluctuationRange] = useState(0);

  const getValueAtRisk = (stocksClosePrice) => {
    const lambda = 0.94;

    // 152개만 사용
    const dailyClosingPrice = stocksClosePrice.slice(0, 152);

    const dailyReturn = dailyClosingPrice.map((item, index) => {
      if (index === dailyClosingPrice.length - 1) {
        return 0;
      }

      return Math.log(item) - Math.log(dailyClosingPrice[index + 1]);
    });

    const reversedDailyReturn = [...dailyReturn].reverse();

    let reversedEWMAVar = [];

    for (let i = 0; i < reversedDailyReturn.length; i++) {
      if (i === 0) {
        reversedEWMAVar.push(0);
      } else {
        reversedEWMAVar.push(
          (1 - lambda) * Math.pow(reversedDailyReturn[i - 1], 2) +
            lambda * reversedEWMAVar[i - 1]
        );
      }
    }

    const EWMAVar = [...reversedEWMAVar].reverse().map((v) => Math.sqrt(v));

    return {
      ninetyFivePercent: dailyClosingPrice[0] * EWMAVar[0] * 1.65 * -1,
      onePercent: dailyClosingPrice[0] * EWMAVar[0] * 2.33 * -1,
    };
  };

  const getSharpRatio = (stocksClosePrice) => {
    const dailyClosingPrice = stocksClosePrice.slice(0, 31);
    console.log(dailyClosingPrice);

    let dailyReturn = dailyClosingPrice.map((item, index) => {
      if (index === dailyClosingPrice.length - 1) {
        return 0;
      }
      return Math.log(item) - Math.log(dailyClosingPrice[index + 1]);
    });

    dailyReturn = dailyReturn.slice(0, 30);

    console.log(dailyReturn);

    // standard deviation Sample version
    const getStandardDeviation = (arr, usePopulation = false) => {
      const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
      return Math.sqrt(
        arr
          .reduce((acc, val) => acc.concat((val - mean) ** 2), [])
          .reduce((acc, val) => acc + val, 0) /
          (arr.length - (usePopulation ? 0 : 1))
      );
    };

    const standardDeviation = getStandardDeviation(dailyReturn);

    const averageReturn =
      dailyReturn.reduce((acc, cur) => acc + cur, 0) / (dailyReturn.length - 1);

    return (averageReturn - 0.0312) / standardDeviation;
  };

  const getFluctuationRange = (stocksClosePrice) => {
    const dailyClosingPrice = stocksClosePrice.slice(0, 31);
    console.log(dailyClosingPrice);

    let dailyReturn = dailyClosingPrice.map((item, index) => {
      if (index === dailyClosingPrice.length - 1) {
        return 0;
      }
      return Math.log(item) - Math.log(dailyClosingPrice[index + 1]);
    });

    dailyReturn = dailyReturn.slice(0, 30);

    console.log(dailyReturn);

    // standard deviation Sample version
    const getStandardDeviation = (arr, usePopulation = false) => {
      const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
      return Math.sqrt(
        arr
          .reduce((acc, val) => acc.concat((val - mean) ** 2), [])
          .reduce((acc, val) => acc + val, 0) /
          (arr.length - (usePopulation ? 0 : 1))
      );
    };

    const standardDeviation = getStandardDeviation(dailyReturn);

    return Math.abs(standardDeviation) * stocksClosePrice[0];
  };

  useEffect(() => {
    const stocks = detail_stock.map((item) => Number(item.clpr));
    setValueAtRisk(getValueAtRisk(stocks));
    setSharpRatio(getSharpRatio(stocks));
    setFluctuationRange(getFluctuationRange(stocks));
  }, [detail_stock]);

  return (
    <StockStyle>
      {/* <MeMoStyle>
        <p>계산 결과를 확인하기 위한 메모장 입니다</p>
        <Button onClick={onClickProfitBtn}>수익률</Button>

        <Button
          onClick={() => {
            setIsDialogOpen((prev) => !prev);
          }}
        >
          Modal 테스트를 위한 버튼
        </Button>
        <p>
          1. 데이터의 개수가 152가 안된다면? (KOSPI에 상장된 시간이 짧은 경우)
          Alret Modal 출력 - 주가 데이터가 충분하지 않아 검증 결과의 신뢰도가
          떨어집니다. (어떤가용)
        </p>
        <p>
          2. 백테스팅을 결과를 보여주기 위해선 1000개 이상의 데이터가 필요하나
          현재 API에선 748개 가량의 데이터가 최대이다 (테스트해보니 2020년 이후
          데이터만 불러오기가 가능하다.)
        </p>
        <p>
          3. 검색결과를 받아오고 뿌려주는데는 상당한 시간이 걸린다... 실제
          유저는 페이지 로딩시간이 5초 이상 걸리면 페이지를 떠나는 경향이 있다.
          해결방법: 1️⃣스켈레톤 페이지 만들기
        </p>
      </MeMoStyle> */}
      <SearchFormWrapper>
        <SearchForm
          onChangeInput={searchStock}
          placeholder="종목을 검색하세요."
          searchResultList={search_stock}
        ></SearchForm>
        <StockListStyle>
          {search_stock?.map((v) => (
            <div
              onClick={() => {
                onClickStockItem(v);
              }}
              key={v.id}
            >
              <StockName>{v.name}</StockName>
              <StockDetail>
                {v.industry} | {v.products} | {v.listingDate} | {v.CEO}
              </StockDetail>
            </div>
          ))}
        </StockListStyle>
        {detail_stock?.length !== 0 && (
          <p>{detail_stock.length}일 동안의 검색 결과가 있습니다.</p>
        )}
      </SearchFormWrapper>

      <StockInfo>
        <Flex justify="space-between" grow="1">
          <div>
            <Flex justify="space-between">
              <SubText>{detail_stock[0]?.srtnCd}</SubText>
              <SubText>KOSPI</SubText>
            </Flex>
            <h2>
              {detail_stock[0]?.clpr
                ? getCommaString(detail_stock[0]?.clpr)
                : 0}
            </h2>
          </div>
          <div>
            <Button size="small">SharpRatio</Button>
            <p>{sharpRatio.toFixed(2)}</p>
          </div>
        </Flex>
      </StockInfo>

      <ChartWrapper>
        <StockChart
          valueAtRisk={valueAtRisk}
          sharpRatio={sharpRatio}
          fluctuationRange={fluctuationRange}
        ></StockChart>
      </ChartWrapper>
      <br />
      <Analysis>
        <Flex margin="0 0 0 14px">
          <h3>종목분석</h3>
        </Flex>
        <Flex margin="0 14px" justify="space-between">
          <p>5%</p>
          <p>
            {detail_stock[0]?.clpr
              ? `${(
                  Number(valueAtRisk.ninetyFivePercent) /
                  (Number(detail_stock[0]?.clpr) / 100)
                ).toFixed(2)}%`
              : 0}
          </p>
        </Flex>
        <Flex margin="0 14px" justify="space-between">
          <p>1%</p>
          <p>
            {detail_stock[0]?.clpr
              ? `${(
                  Number(valueAtRisk.onePercent) /
                  (Number(detail_stock[0]?.clpr) / 100)
                ).toFixed(2)}%`
              : 0}
          </p>
        </Flex>
        <Flex margin="0 14px" justify="space-between">
          <p>기대 수익률</p>
          <p>
            {detail_stock[0]?.clpr
              ? `${(
                  Number(valueAtRisk.onePercent) /
                  (Number(detail_stock[0]?.clpr) / 100)
                ).toFixed(2)}%`
              : 0}
          </p>
        </Flex>
      </Analysis>
      <br />

      <div
        style={{
          margin: "0 15px 15px",
        }}
      >
        <Button fullWidth size="large">
          관심종목 추가
        </Button>
      </div>
      <Dialog
        visible={isDialogOpen}
        title={<p>주의 !</p>}
        onlyConfirm
        isAlert
        onClickBackground={() => {
          setIsDialogOpen(false);
        }}
      >
        <p>기대 수익률이 음수이거나 </p>
        <p>Value At Risk이 5%를 넘어가면</p>
        <p>주의해야 합니다.</p>
      </Dialog>
      <IsLogin></IsLogin>
    </StockStyle>
  );
};

export default Stock;
