import React from 'react';
import axios from 'axios';
import {
  Input,
  InputGroup,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Table,
} from 'reactstrap';
import Link from 'next/link';
import Router from 'next/router';
import Cookies from 'universal-cookie';
import lodash from 'lodash';
import {
  MIND_OF_ISLANDS,
  HEART_OF_GIANTS,
  STAR_OF_ORPHEUSIS,
  GREAT_ARTS,
} from '../constant';

interface ITodo {
  id: string;
  title: string;
  userID: string;
  isChecked: boolean;
  characterID: string;
}

interface ICharacter {
  id: string;
  userID: string;
  name: string;
  dailyTodos: ITodo[];
  weeklyTodos: ITodo[];
}

interface IState {
  characters: ICharacter[];
  name: string;
  tabIndex: string;
  innerTabIndex: string;
}

class Home extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = { characters: [], name: '', tabIndex: '', innerTabIndex: '' };
  }

  public async componentDidMount() {
    const cookies = new Cookies();
    const userID = cookies.get('naesilHasil');

    const { data } = await axios.get(
      'http://localhost:4000/api/characters',

      {
        params: {
          userID,
        },
      },
    );
    if (data) {
      this.setState({
        characters: data.characters,
      });
    }
  }

  public render() {
    const { name, characters, tabIndex, innerTabIndex } = this.state;

    return (
      <div
        style={{
          backgroundAttachment: 'fixed',
          backgroundImage: 'url(/static/main_image.png)',
        }}>
        <div
          style={{
            minHeight: '100vh',

            backgroundRepeat: 'no-repeat',
          }}>
          <div
            style={{
              textAlign: 'center',
              paddingTop: '10%',
              paddingBottom: '10%',
            }}>
            <div className="login-sign-up-container">
              <h1>체크리스트</h1>
              <div style={{ textAlign: 'right' }}>
                <InputGroup>
                  <Input valeu={name} onChange={this.onChangeName} />

                  <Button onClick={this.onAddCharacter}>캐릭터 추가</Button>
                </InputGroup>
              </div>
              <div>
                <Nav
                  tabs
                  style={{
                    borderBottom: 'rgba(0, 0, 0, 0.6) solid',
                  }}>
                  {characters.map((character) => (
                    <NavItem key={character.id}>
                      <NavLink
                        className={
                          tabIndex === character.name ? 'active-tab-title' : ''
                        }
                        onClick={this.onChangeTabIndex(character.name)}>
                        {' '}
                        {character.name}
                      </NavLink>
                    </NavItem>
                  ))}
                </Nav>
                <TabContent activeTab={innerTabIndex}>
                  {characters.map((character) => (
                    <>
                      {tabIndex === character.name && (
                        <>
                          <Nav
                            tabs
                            style={{
                              borderBottom: 'rgba(0, 0, 0, 0.6) solid',
                            }}>
                            <NavItem>
                              <NavLink
                                className={
                                  innerTabIndex === '일간 체크리스트'
                                    ? 'active-tab-title'
                                    : ''
                                }
                                onClick={this.onChangeInnerTabIndex(
                                  '일간 체크리스트',
                                )}>
                                {' '}
                                일간 체크리스트
                              </NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink
                                className={
                                  innerTabIndex === '주간 체크리스트'
                                    ? 'active-tab-title'
                                    : ''
                                }
                                onClick={this.onChangeInnerTabIndex(
                                  '주간 체크리스트',
                                )}>
                                {' '}
                                주간 체크리스트
                              </NavLink>
                            </NavItem>
                          </Nav>
                          <TabContent activeTab={innerTabIndex}>
                            <TabPane tabId="일간 체크리스트">
                              <Table>
                                <thead>
                                  <tr>
                                    <th>이름</th>

                                    <th>체크 여부</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {character.dailyTodos.map((ele) => (
                                    <tr>
                                      <td>{ele.title}</td>
                                      <td>
                                        {ele.isChecked ? (
                                          'O'
                                        ) : (
                                          <Button
                                            onClick={this.onCheckDailyTodo(
                                              character.id,
                                              ele.id,
                                            )}>
                                            체크하기
                                          </Button>
                                        )}{' '}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            </TabPane>
                            <TabPane tabId="주간 체크리스트">
                              <Table>
                                <thead>
                                  <tr>
                                    <th>이름</th>

                                    <th>체크 여부</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {character.weeklyTodos.map((ele) => (
                                    <tr>
                                      <td>{ele.title}</td>
                                      <td>{ele.isChecked ? 'O' : 'X'} </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            </TabPane>
                          </TabContent>
                        </>
                      )}
                    </>
                  ))}
                </TabContent>
              </div>
            </div>
          </div>
        </div>

        <style jsx={true}>
          {`
            :global(.default-input) {
              margin: 4px;
            }

            :global(.active-tab-title) {
              background-color: rgba(0, 0, 0, 0.6) !important;
              color: white;
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
              max-width: 80%;
              margin: auto;
              background-color: rgba(255, 255, 255, 0.7);
              padding: 32px;
              border-radius: 10px;
            }
          `}
        </style>
      </div>
    );
  }

  private onAddCharacter = async () => {
    const cookies = new Cookies();
    const userID = cookies.get('naesilHasil');

    const { data } = await axios.post(
      'http://localhost:4000/api/createCharacter',
      {
        'Content-Type': 'application/json',
      },
      {
        params: {
          userID,
          name: this.state.name,
        },
      },
    );
    if (data) {
      alert('캐릭터 추가 완료. ');
      location.reload();
    }
  };

  private onChangeName = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      name: e.currentTarget.value,
    });
  };

  private onChangeTabIndex = (tabIndex: string) => () => {
    this.setState({
      tabIndex,
    });
  };

  private onChangeInnerTabIndex = (tabIndex: string) => () => {
    this.setState({
      innerTabIndex: tabIndex,
    });
  };

  private onCheckDailyTodo = (
    characterID: string,
    dailyTodoID: string,
  ) => async () => {
    const { data } = await axios.post(
      'http://localhost:4000/api/checkDailyTodo',
      {
        'Content-Type': 'application/json',
      },
      {
        params: {
          id: dailyTodoID,
        },
      },
    );
    if (data) {
      const characterIndex = this.state.characters.findIndex(
        (character) => character.id === characterID,
      );

      this.setState({
        characters: this.state.characters.map((character) => {
          return character.id !== characterID
            ? character
            : {
                ...character,
                dailyTodos: this.state.characters[
                  characterIndex
                ].dailyTodos.map((dailyTodo) => {
                  return dailyTodo.id !== dailyTodoID
                    ? dailyTodo
                    : { ...dailyTodo, isChecked: true };
                }),
              };
        }),
      });
    }
  };
}

export default Home;
