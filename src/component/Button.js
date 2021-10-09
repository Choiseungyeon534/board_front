import { Link } from "react-router-dom";
import styled from "styled-components";


export default function Button({ content,onClick }) {
  if(content==="회원가입하기") {
    return(
      <StyledButton onClick={onClick}>
            {content}
      </StyledButton>
    );
  } else {
    return(
      <StyledButton>
          <Link 
            to="/signup" 
            style={{
              textDecoration: 'none',
              textTransform: 'uppercase',
              color: 'white',
              letterSpacing: '0.2rem'
            }}>
            {content}
          </Link>
        </StyledButton>
    );
  }
}

const StyledButton = styled.button`
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  width: 65%;
  height: 3rem;
  border: none;
  color: white;
  border-radius: 2rem;
  cursor: pointer;
`;