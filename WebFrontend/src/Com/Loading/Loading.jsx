import styled from 'styled-components';

function Loading() {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <StyledWrapper>
                <div className="loader">
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                </div>
            </StyledWrapper>
        </div>
    )
}

const StyledWrapper = styled.div`
  .loader {
    display: flex;
  }

  .loader .dot {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: white;
    animation: jump 0.8s ease-in-out infinite alternate;
  }

  @keyframes jump {
    25% {
      background: #ccc;
      transform: translateY(1rem) translateX(-0rem) scale(0.7);
    }
    50% {
      opacity: 0;
      transform: translateY(3rem) translateX(-2rem) scale(0.7);
    }
    100% {
      background: #ccc;
      transform: translateY(-4rem) translateX(0rem) scale(0.2);
    }
  }

  .loader .dot:nth-child(1) {
    animation-delay: 0.1s;
  }

  .loader .dot:nth-child(2) {
    animation-delay: 0.2s;
  }

  .loader .dot:nth-child(3) {
    animation-delay: 0.3s;
  }

  .loader .dot:nth-child(4) {
    animation-delay: 0.4s;
  }

  .loader .dot:nth-child(5) {
    animation-delay: 0.5s;
  }`;

export default Loading

