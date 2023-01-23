import React from "react";
import styled from "styled-components";

const SearchFormStyle = styled.div`
  display: inline-block;
  cursor: pointer;
  padding: 2px;
  background-color: #fff;
  transition: all 0.3s ease-in-out;
  border: ${({ theme }) => theme.border.DEFAULT};
  box-sizing: border-box;

  &:focus-within {
    box-shadow: 0 0 0.5rem 0.1rem #00000060;
  }
`;

const InputStyle = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  font-weight: 600;
  color: #000;
`;

const DropDownMenu = styled.ul`
  position: absolute;
  width: 200px;
  background-color: #fff;
  box-shadow: 0 0 0.5rem 0.1rem #00000020;
  padding: 10px 0;
  border-radius: 10px;
  list-style: none;
  z-index: 100;
  min-height: 10px;
  max-height: 100px;
  overflow-y: scroll;
`;

const DropDownMenuItem = styled.li`
  text-align: center;
  padding: 10px 0;
  border-bottom: 1px solid #dee2e6;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f1f3f5;
    cursor: pointer;
  }
`;

const SearchForm = ({
  onChangeInput,
  children,
  searchResultList = [],
  ...rest
}) => {
  return (
    <>
      <SearchFormStyle>
        <InputStyle onChange={onChangeInput} {...rest} />
        {searchResultList.length > 0 ? (
          <DropDownMenu>
            {searchResultList.map((item, index) => {
              return (
                <DropDownMenuItem key={index} onClick={item.onClick}>
                  {item.name}
                </DropDownMenuItem>
              );
            })}
          </DropDownMenu>
        ) : (
          <DropDownMenu>
            <DropDownMenuItem>검색 결과가 없습니다.</DropDownMenuItem>
          </DropDownMenu>
        )}
      </SearchFormStyle>
    </>
  );
};

export default SearchForm;
