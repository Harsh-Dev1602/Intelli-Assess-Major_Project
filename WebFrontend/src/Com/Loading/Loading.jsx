import styled from 'styled-components';

function Loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <StyledWrapper>
        <div className="liquid-loader">
          <div className="loading-text">
            Loading<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span>
          </div>
          <div className="loader-track">
            <div className="liquid-fill" />
          </div>
        </div>
      </StyledWrapper>
    </div>
  )
}

const StyledWrapper = styled.div`
  .liquid-loader {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    padding: 20px;
  }

  .loader-track {
    position: relative;
    width: 200px;
    height: 20px;
    background: linear-gradient(to right, #1e2939, #4f39f6, #51a2ff);
    border-radius: 16px;
    overflow: hidden;
    box-shadow:
      inset 0 2px 4px rgba(0, 0, 0, 0.6),
      0 1px 3px rgba(255, 255, 255, 0.1);
  }

  .liquid-fill {
    position: absolute;
    top: 2px;
    left: 2px;
    height: calc(100% - 4px);
    background: white;
    border-radius: 14px;
    animation:
      fillProgress 4s ease-out infinite,
      colorShift 3s linear infinite;
    box-shadow:
      0 0 12px rgba(124, 58, 237, 0.4),
      inset 0 1px 2px rgba(255, 255, 255, 0.2);
  }

  .loading-text {
    color: black;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 1px;
    animation: textGlow 1s ease-in-out infinite;
  }

  .dot {
    margin-left: 3px;
    animation: blink 1.5s infinite;
  }
  .dot:nth-of-type(1) {
    animation-delay: 0s;
  }
  .dot:nth-of-type(2) {
    animation-delay: 0.3s;
  }
  .dot:nth-of-type(3) {
    animation-delay: 0.6s;
  }

  @keyframes fillProgress {
    0% {
      width: 4px;
    }
    25% {
      width: 25%;
    }
    50% {
      width: 50%;
    }
    75% {
      width: 75%;
    }
    100% {
      width: calc(100% - 4px);
    }
  }

  @keyframes colorShift {
    0% {
      filter: hue-rotate(0deg) brightness(1);
    }
    33% {
      filter: hue-rotate(120deg) brightness(1.1);
    }
    66% {
      filter: hue-rotate(240deg) brightness(0.9);
    }
    100% {
      filter: hue-rotate(360deg) brightness(1);
    }
  }

  @keyframes textGlow {
    0%,
    100% {
      opacity: 0.7;
      text-shadow: 0 0 8px rgba(139, 92, 246, 0.3);
    }
    50% {
      opacity: 1;
      text-shadow: 0 0 16px rgba(139, 92, 246, 0.6);
    }
  }

  @keyframes blink {
    0%,
    50% {
      opacity: 1;
    }
    51%,
    100% {
      opacity: 0;
    }
  }`;


export default Loading

