import React, { useCallback, useEffect, useState } from "react";
import ECharts from "echarts-for-react";
import { graphic } from "echarts";
import { useSelector } from "react-redux";
import Button from "../common/Button";
import styled from "styled-components";

const EChartsStyle = styled(ECharts)``;

const StockChart = ({
  valueAtRisk = {
    ninetyFivePercent: 0,
    onePercent: 0,
  },
  sharpRatio = 0,
  fluctuationRange = 0,
}) => {
  const { detail_stock } = useSelector((state) => state.stock);
  const { loadStockDone } = useSelector((state) => state.stock);

  const [options, setOptions] = useState({
    xAxis: {
      type: "category",
      data: [],
      axisLabel: {
        formatter: (value, index) => {
          // YYYY-DD-MM or YYYY-MM
          if (value.length === 6) {
            return value.slice(0, 4) + "-" + value.slice(4, 6);
          }
          return (
            value.slice(0, 4) + "-" + value.slice(4, 6) + "-" + value.slice(6)
          );
        },
      },
      silent: true,
    },
    yAxis: {
      type: "value",
      // offset: -5,
      // show: false,
      min: (value) => {
        return parseInt(value.min - (value.max - value.min) * 0.1);
      },
      axisLabel: {
        // show: true,
        // inside: true, // 라벨 안쪽으로
        hideOverlap: true, // 중복되는 라벨 숨기기
        align: "center", // 라벨 가운데 정렬
        margin: 30, // 라벨과 축 사이의 거리
      },
    },
    grid: {
      left: "0",
      width: "70%",
      containLabel: true,
    },
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 101,
      },
      {
        show: true,
        type: "slider",
        top: "85%",
        start: 0,
        end: 101,
      },
    ],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        animation: false,
        type: "cross",
        lineStyle: {
          color: "#376df4",
          width: 1,
          opacity: 1,
        },
      },
    },
    series: [
      {
        name: "종가",
        data:
          detail_stock !== undefined
            ? [1, 2, 3]
            : detail_stock?.map((item) => {
                return item.clpr;
              }),
        type: "line",
        smooth: true,
        color: "green",
        areaStyle: {
          opacity: 0.5,
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "green",
            },
            {
              offset: 1,
              color: "white",
            },
          ]),
        },
      },
    ],
  });

  const [xData, setXData] = useState(
    detail_stock !== undefined
      ? []
      : detail_stock?.map((item) => {
          return item.basDt;
        })
  );
  const [clprData, setClprData] = useState(
    detail_stock !== undefined
      ? []
      : detail_stock?.map((item) => {
          return item.clpr;
        })
  );

  useEffect(() => {
    setOptions({
      ...options,
      xAxis: {
        type: "category",
        data: xData,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "종가",
          data: clprData,
          type: "line",
        },
        {
          name: "현재가",
          symbol: "none",
          data: detail_stock.map((_, index, array) => {
            // if (index === detail_stock.length - 1) {
            //   return array[0].clpr;
            // }
            // return "-";
            return array[0].clpr;
          }),
          type: "line",
          markLine: {
            silent: true,
            symbol: "none",
            data: [{ type: "max", name: "현재가" }],
            label: {
              formatter: `${detail_stock[0]?.clpr} 현재가`,
            },
            animation: false,
          },
        },
        {
          name: "변동폭",
          symbol: "none",
          data: detail_stock?.map((_, index) => {
            return (
              Number(detail_stock[0]?.clpr) - Number(fluctuationRange)
            ).toFixed(2);
          }),
          type: "line",
          markLine: {
            silent: true,
            symbol: "none",
            data: [{ type: "max", name: "변동폭" }],
            label: {
              formatter: `${(detail_stock[0]?.clpr - fluctuationRange).toFixed(
                2
              )} 변동폭`,
            },
            animation: false,
          },
        },

        {
          name: "5% VAR",
          symbol: "none",
          data: detail_stock?.map((_, index) => {
            return (
              Number(detail_stock[0]?.clpr) + valueAtRisk.ninetyFivePercent
            ).toFixed(2);
          }),
          type: "line",
          markLine: {
            silent: true,
            symbol: "none",
            data: [{ type: "max", name: "5%VAR" }],
            color: "red",
            label: {
              formatter: `${(
                detail_stock[0]?.clpr - valueAtRisk.ninetyFivePercent
              ).toFixed(2)} 5% VaR`,
              color: "red",
            },
            animation: false,
          },
        },
      ],
    });
  }, [clprData, xData]);

  useEffect(() => {
    setClprData(
      detail_stock
        ?.map((item) => {
          return item.clpr;
        })
        .reverse()
    );

    setXData(
      detail_stock
        ?.map((item) => {
          return item.basDt;
        })
        .reverse()
    );
  }, [detail_stock]);

  useEffect(() => {
    if (loadStockDone) {
      setClprData(
        detail_stock
          ?.map((item) => {
            return item.clpr;
          })
          .reverse()
      );

      setXData(
        detail_stock
          ?.map((item) => {
            return item.basDt;
          })
          .reverse()
      );
    }
  }, [loadStockDone, detail_stock]);

  const onClickDailyBtn = useCallback(
    (e) => {
      setClprData(
        detail_stock
          ?.map((item) => {
            return item.clpr;
          })
          .reverse()
      );

      setXData(
        detail_stock
          ?.map((item) => {
            return item.basDt;
          })
          .reverse()
      );
    },
    [detail_stock]
  );

  const onClickMonthlyBtn = useCallback(
    (e) => {
      const monthObj = {};

      for (let i = 0; i < detail_stock?.length; i++) {
        const month = detail_stock[i].basDt.slice(0, 6);
        if (monthObj[month] === undefined) {
          monthObj[month] = [Number(detail_stock[i].clpr)];
        } else {
          monthObj[month] = [...monthObj[month], Number(detail_stock[i].clpr)];
        }
      }

      for (let key in monthObj) {
        monthObj[key] =
          monthObj[key].reduce((a, b) => a + b) / monthObj[key].length;
      }

      setXData(Object.keys(monthObj));
      setClprData(Object.values(monthObj));
    },
    [detail_stock]
  );

  return (
    <>
      {detail_stock?.length === 0 ? (
        <div>데이터가 없습니다 종목을 검색해서 데이터를 불러보세요</div>
      ) : (
        <>
          <Button onClick={onClickMonthlyBtn}>월 별</Button>
          <Button onClick={onClickDailyBtn}>일 별</Button>
        </>
      )}
      <EChartsStyle
        option={options}
        opts={{
          renderer: "svg",
          width: "auto",
          height: "300px",
        }}
      />
    </>
  );
};

export default StockChart;
