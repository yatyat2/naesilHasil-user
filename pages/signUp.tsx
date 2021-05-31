import React, { useEffect, FormEvent } from 'react';
import axios from 'axios';
import { Input, InputGroup, Label, Button } from 'reactstrap';
import Image from 'next/image';
import Router from 'next/router';

interface IState {
  email: string;
  password: string;
  passwordForCheck: string;
}

class SignUp extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordForCheck: '',
    };
  }

  public render() {
    const { email, password, passwordForCheck } = this.state;

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
            <h4 style={{ color: 'white' }}>회원가입 </h4>
            <InputGroup className="default-input-group">
              <Input
                onChange={this.onChangeEmail}
                value={email}
                className="default-input"
                placeholder="아이디"
              />
              <Button color="success">중복 확인</Button>
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
            <InputGroup className="default-input-group">
              <Input
                onChange={this.onChangePasswordForCheck}
                value={passwordForCheck}
                type="password"
                className="default-input"
                placeholder="비밀번호 확인"
              />
            </InputGroup>
            {password && password !== passwordForCheck && (
              <div className="password-notice">
                <span style={{ color: 'red' }}>*</span>비밀번호가 일치하지
                않습니다. <span style={{ color: 'red' }}>*</span>
              </div>
            )}

            <div>
              <Button
                onClick={this.onSignUp}
                color="secondary"
                className="default-button">
                회원가입 완료
              </Button>
            </div>
          </div>
        </div>

        <style jsx={true}>
          {`
            :globla(.default-input-group) {
              width: 300px;
              margin: 6px auto 6px auto;
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

            .password-notice {
                color: white;
                text-align: left;
                display: block;
                width: 300px;
                margin: 6px auto 6px auto;
            } 
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

  private onChangePasswordForCheck = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      passwordForCheck: e.currentTarget.value,
    });
  };

  private onSignUp = async () => {
    const { data } = await axios.post(
      'http://localhost:4000/api/signUp',
      {
        'Content-Type': 'application/json',
      },
      {
        params: {
          email: this.state.email,
          password: this.state.password,
        },
      },
    );

    if (data) {
      alert('회원가입이 완료되었습니다. 로그인을 진행해 주세요.');
      Router.push('/');
    }
  };
}

export default SignUp;
