import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Flex from "../Components/common/Flex";
import Box from "../Style/Box";

const SubMenuStyle = styled.div`
  display: flex;
  padding: 0 20px;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 10px;

  p {
    font-size: 14px;
    color: #adb5bd;
    cursor: pointer;
    margin: 0 20px 0 0;
    padding: 10px 0;
    transition: 0.1s;
    border-bottom: 1px solid ${({ theme }) => theme.border.DEFAULT};
  }

  p:hover {
    color: #495057;
    border-bottom: 2px solid ${({ theme }) => theme.palette.BLUE};
  }

  p.active {
    color: #495057;
    border-bottom: 2px solid ${({ theme }) => theme.palette.BLUE};
  }
`;

const SubTitle = styled.span`
  color: #adb5bd;
  font-size: 14px;
  margin: 0;
`;

const Content = styled.span`
  color: ${({ theme }) => theme.palette.BLUE};
  font-size: 16px;
  font-weight: 600;
  &.red {
    color: ${({ theme }) => theme.expiration.RED};
  }
`;

const PortfolioNameInput = styled.input`
  color: ${({ theme }) => theme.palette.BLUE};
  font-size: 16px;
  font-weight: 600;
  border: none;
  outline: none;
  padding-left: 0;
`;

const DetailWrapper = styled(Flex)`
  width: 50%;
`;

const PieChart = styled.div`
  width: 100%;
  height: 150px;
  border-radius: 100%;

  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.palette.BLUE} 0%,
    ${({ theme }) => theme.palette.BLUE} 50%
  );

  border-radius: 50%;
  background: conic-gradient(
    ${({ theme }) => theme.palette.BRIGHT_BLUE} 0%,
    120deg,
    ${({ theme }) => theme.palette.BLUE} 50deg
  ); /* 차트 비율 설정 */
  position: relative;

  &:hover {
    cursor: pointer;
    // after의 사이즈 줄이기
    &::after {
      width: 60%;
      height: 60%;
      transition: 0.5s;
    }

    // background conic-gradient에 text넣기
    background: conic-gradient(
        ${({ theme }) => theme.palette.BRIGHT_BLUE} 0%,
        120deg,
        ${({ theme }) => theme.palette.BLUE} 50deg
      )
      ${({ theme }) => theme.palette.BLUE};
  }

  &::after {
    content: "6,080,000 원";
    position: absolute;
    transition: 0.5s;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 70%;
    height: 70%;
    background: #fff;
    border-radius: 100%;
    text-align: center;
    color: #adb5bd;
    font-size: 14px;
  }
`;

const LeftBlueBar = styled.div`
  display: flex;
  align-items: center;
  border-left: ${({ theme }) => theme.palette.BLUE} 4px solid;
  padding-left: 3px;
  height: 100%;
  margin-left: 20px;
`;

const LeftBrightBlueBar = styled.div`
  display: flex;
  align-items: center;
  border-left: ${({ theme }) => theme.palette.BRIGHT_BLUE} 4px solid;
  padding-left: 3px;
  height: 100%;
  margin-left: 20px;
`;

const Interested = () => {
  const { me } = useSelector((state) => state.user);
  const [portfolioTitle, setPortfolioTitle] = useState({
    title: "내 우아한 포트폴리오",
    isChangeMode: false,
  });

  return (
    <div>
      <SubMenuStyle>
        <p>관심종목</p>
        <p className="active">포트폴리오</p>
        <p>실험실</p>
        <p>커뮤니티</p>
        <p>채팅</p>
      </SubMenuStyle>

      <Box>
        <Flex>
          <DetailWrapper direction="column">
            <SubTitle>{me?.email ? me.email : "로그인 해주세요"}</SubTitle>
            <PortfolioNameInput
              value={portfolioTitle.title}
              onChange={(e) =>
                setPortfolioTitle({ ...portfolioTitle, title: e.target.value })
              }
              maxLength="10"
            ></PortfolioNameInput>
          </DetailWrapper>
          <DetailWrapper direction="column">
            <SubTitle>총 자산</SubTitle>
            <Content>&#8361; 6,080,000</Content>
          </DetailWrapper>
        </Flex>
        <br />
        <Flex>
          <DetailWrapper direction="column">
            <SubTitle>VaR ?</SubTitle>
            <Content className="red">- &#8361; 1,094,400</Content>
          </DetailWrapper>
          <DetailWrapper direction="column">
            <SubTitle>Sharp Ratio</SubTitle>
            <Content>1.3</Content>
          </DetailWrapper>
        </Flex>
      </Box>
      <Box>
        <Flex>
          <DetailWrapper direction="column">
            <Content>자산 구성</Content>
            <br></br>
            <PieChart></PieChart>
          </DetailWrapper>

          <DetailWrapper direction="column">
            <br />
            <br />
            <br />
            <br />

            <LeftBlueBar>
              <SubTitle>삼성전자 63%</SubTitle>
            </LeftBlueBar>
            <br />
            <LeftBrightBlueBar>
              <SubTitle>SK 하이닉스 37%</SubTitle>
            </LeftBrightBlueBar>
          </DetailWrapper>
        </Flex>
      </Box>
      <Box>
        <Content>종목 분석</Content>
        <Flex>
          <DetailWrapper direction="column">
            <Content>종목 명</Content>
            <SubTitle>삼성전자</SubTitle>
            <SubTitle>SK 하이닉스</SubTitle>
          </DetailWrapper>
          <DetailWrapper direction="column">
            <Content>VaR</Content>
          </DetailWrapper>
          <DetailWrapper direction="column">
            <Content>한계 VaR</Content>
            <SubTitle>152,300</SubTitle>
            <SubTitle>180,060</SubTitle>
          </DetailWrapper>
          <DetailWrapper direction="column">
            <Content>공헌 VaR</Content>
            <SubTitle>185,400</SubTitle>
            <SubTitle>208,050</SubTitle>
          </DetailWrapper>
        </Flex>
      </Box>
      <Box>
        <Flex direction="column" justify="center">
          <SubTitle>내 포트폴리오의 Sharp Ratio - 1.3</SubTitle>
          <Content>✅ 구성 가능한 최적 Sharp Ratio - 1.7</Content>
        </Flex>
      </Box>
    </div>
  );
};

export default Interested;
