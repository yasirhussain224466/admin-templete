import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  .LoginButton {
    background-color: ${({ theme }) => theme.colors.skyBlue};
    border-radius: 3px;
  }
  .LoginButton:hover {
    color: white;
    background-color: ${({ theme }) => theme.colors.skyBlue};
  }
  .content {
    background-color: ${({ theme }) => theme.colors.white};
    padding: 70px 40px 100px 40px;
    box-shadow: -2px 29px 48px -2px rgba(0, 0, 0, 0.55);
    -webkit-box-shadow: -2px 29px 48px -2px rgba(0, 0, 0, 0.55);
    -moz-box-shadow: -2px 29px 48px -2px rgba(0, 0, 0, 0.55);
    border-radius: 6px;
    width: 35ch;
    min-height: 50px;
    position: relative;

    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      padding: 70px 40px 100px 40px;

      width: 80%;
      padding: 20px;
      /* height: 60vh; */
    }
  }
  .MuiChip-label {
    font-family: Poppins-Light;
  }
  .MuiChip-outlined {
    display: flex;
    font-family: Poppins-Regular;
    font-size: ${({ theme }) => theme.fontSizes.small};
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.gray2};
    border: none;
    border-radius: 10px;
    justify-content: space-between;
    padding: 0 5px;
    width: 182px;
    margin: auto;
    margin-bottom: 1.5rem;
  }
  .MuiChip-deleteIcon {
    width: 15px;
  }
  .MuiChip-deletable.MuiChip-outlinedPrimary:focus {
    background-color: ${({ theme }) => theme.colors.gray2};
  }
  .MuiChip-deleteIconOutlinedColorPrimary {
    color: ${({ theme }) => theme.colors.white};
  }
  .title {
    font-size: ${({ theme }) => theme.fontSizes.large};
    margin-bottom: 25px;
    text-align: center;
    font-family: Poppins-Medium;
  }

  .with-back {
    position: absolute;
    top: 15px;
    left: 15px;
    .back {
      width: 15px;
      height: 15px;
    }
  }
  .text-helper {
    letter-spacing: 0.1px;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    margin: 30px;
    justify-content: center;
    a {
      color: ${({ theme }) => theme.colors.skyBlue};
    }
  }
`;
