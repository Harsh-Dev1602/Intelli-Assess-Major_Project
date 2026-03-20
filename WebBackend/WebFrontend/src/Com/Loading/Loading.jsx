import React from 'react';
import styled from 'styled-components';

function Loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#f8f9fa]">
      <StyledWrapper>
        <div className="liquid-loader">
          <div className="loading-text">
            intelli<span className="text-orange-500">assess.</span>
          </div>
          <div className="loader-track">
            <div className="liquid-fill" />
          </div>
          <p className="status-text">Preparing your examination environment...</p>
        </div>
      </StyledWrapper>
    </div>
  );
}

const StyledWrapper = styled.div`
  .liquid-loader {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  .loading-text {
    color: #002347;
    font-size: 24px;
    font-weight: 900;
    letter-spacing: 2px;
    font-family: 'Poppins', sans-serif;
  }

  .loader-track {
    position: relative;
    width: 280px;
    height: 12px;
    background: #e9ecef;
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid #dee2e6;
  }

  .liquid-fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: linear-gradient(90deg, #ff8a00, #fec107);
    border-radius: 20px;
    box-shadow: 0 0 15px rgba(255, 138, 0, 0.4);
    animation: fillProgress 2.5s ease-in-out infinite;
  }

  .status-text {
    color: #6c757d;
    font-size: 13px;
    font-weight: 500;
    margin-top: 5px;
  }

  @keyframes fillProgress {
    0% {
      width: 0%;
      left: -10%;
    }
    50% {
      width: 60%;
      left: 20%;
    }
    100% {
      width: 100%;
      left: 110%;
    }
  }
`;

export default Loading;