import React, { Component } from "react";
import Portal from "../components/portal";
import styled from "styled-components";
import withAuthentication from "../components/withAuthentication";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  redirect() {
    this.props.history.push("/Dash");
  }
  render() {
    const { user, loading } = this.props;

    return (
    !loading?  <div>
        {user ? (
          <Welcome redirect={this.redirect.bind(this)} />
        ) : (
          <Portal
            logo="https://image.flaticon.com/icons/svg/87/87746.svg"
            redirect={this.redirect.bind(this)}
          />
        )}
      </div>:
      <div/>
    );
  }
}

const Welcome = ({redirect}) => (
  <Container>
    <h1>Welcome back</h1>
    <Button onClick={()=>redirect()} >enter</Button>
  </Container>
);

const Button = styled.button`
      background: aquamarine;
    font-size: 1.3em;
    border-radius: 24px;
    transition:all 1.4s;
    &:hover{
      letter-spacing:.3em;
    }
`

const Container = styled.div`
  display: grid;
  justify-content: center;
`;

export default withAuthentication()(Home);
