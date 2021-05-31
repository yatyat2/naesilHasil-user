import React from 'react';
import axios from 'axios';
import { Input, InputGroup, Label, Button } from 'reactstrap';
import Link from 'next/link';
import Router from 'next/router';
import Cookies from 'universal-cookie';

interface IState {
  email: string;
  password: string;
}

class Index extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    const cookies = new Cookies();
    const hasCookie = cookies.get('naesilHasil');
    if (hasCookie) {
      Router.push('home');
    }
  }

  public render() {
    const { email, password } = this.state;

    return (
      <div
        style={{
          backgroundImage: 'url(/static/main_image.png)',
          height: '100vh',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}>
        <div
          style={{
            textAlign: 'center',
            paddingTop: '10%',
          }}>
          <div className="login-sign-up-container">
            <h1 style={{ color: 'white' }}>내실 하실?</h1>
            <div
              style={{
                textAlign: 'center',
              }}>
              <InputGroup className="default-input-group">
                <Input
                  onChange={this.onChangeEmail}
                  value={email}
                  className="default-input"
                  placeholder="아이디"
                />
              </InputGroup>
              <InputGroup className="default-input-group">
                <Input
                  onChange={this.onChangePassword}
                  value={password}
                  type="password"
                  className="default-input"
                  placeholder="비밀번호"
                />
              </InputGroup>
            </div>
            <div style={{ marginTop: '16px' }}>
              <div>
                <Button
                  onClick={this.onLogin}
                  color="success"
                  className="default-button">
                  로그인
                </Button>
              </div>
              <div>
                <Link href="/signUp">
                  <Button color="primary" className="default-button">
                    회원가입
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <style jsx={true}>
          {`
            :global(.default-input) {
              margin: 4px;
            }

            :globla(.default-input-group) {
              width: 300px;
              margin: auto;
            }

            :globla(.default-button) {
              width: 300px;
              margin: 4px;
            }

            :global(.login-sign-up-container) {
              max-width: 500px;
              margin: auto;
              background-color: rgba(0, 0, 0, 0.3);
              padding: 32px;
              border-radius: 10px;
            }
          `}
        </style>
      </div>
    );
  }
  private onChangeEmail = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      email: e.currentTarget.value,
    });
  };

  private onChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      password: e.currentTarget.value,
    });
  };

  private onLogin = async () => {
    const { data } = await axios.get('http://localhost:4000/api/login', {
      params: {
        email: this.state.email,
        password: this.state.password,
      },
    });

    if (data && data.user) {
      const cookies = new Cookies();
      cookies.set('naesilHasil', data.user.id, {
        maxAge: 1000 * 30 * 100,
      });

      Router.push('/home');
      console.log(data.user);
    }
  };
}

export default Index;
