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
import Router from 'next/router';
import Cookies from 'universal-cookie';
import lodash from 'lodash';
import {
  MIND_OF_ISLANDS,
  HEART_OF_GIANTS,
  STAR_OF_ORPHEUSIS,
  GREAT_ARTS,
} from '../constant';
import Link from 'next/link';

interface ICollectionInformations {
  userID: string;
  title: string;
  category: string;
  isSuccess: boolean;
  link?: string;
  resource?: string;
  tip?: string;
}

interface IState {
  nickname: string;
  tabIndex: string;

  mindOfIslands: ICollectionInformations[];
  starOfOrpheus: ICollectionInformations[];
  heartOfGiants: ICollectionInformations[];
  greatArt: ICollectionInformations[];
}

class Home extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      nickname: '',
      tabIndex: '섬의 마음',

      mindOfIslands: [],
      starOfOrpheus: [],
      heartOfGiants: [],
      greatArt: [],
    };
  }

  public async componentDidMount() {
    const cookies = new Cookies();
    const userID = cookies.get('naesilHasil');

    const { data } = await axios.get(
      'http://localhost:4000/api/collectionInformations',
      {
        params: {
          userID,
        },
      },
    );

    if (
      data &&
      data.collectionInformations &&
      data.collectionInformations.length > 0
    ) {
      const collectionInformationsByGroup = lodash.groupBy(
        data.collectionInformations,
        'category',
      );

      const convertedMindOfIslands = [];
      for (const mindOfIsland of collectionInformationsByGroup['섬의 마음']) {
        convertedMindOfIslands.push(
          lodash.merge(
            mindOfIsland,
            MIND_OF_ISLANDS.find((ele) => ele.title === mindOfIsland.title),
          ),
        );
      }

      const convertedStarOfOrpheusis = [];
      for (const starOfOrpheus of collectionInformationsByGroup[
        '오르페우스의 별'
      ]) {
        convertedStarOfOrpheusis.push(
          lodash.merge(
            starOfOrpheus,
            STAR_OF_ORPHEUSIS.find((ele) => ele.title === starOfOrpheus.title),
          ),
        );
      }

      const convertedHeartOfGiants = [];
      for (const heartOfGiant of collectionInformationsByGroup['거인의 심장']) {
        convertedHeartOfGiants.push(
          lodash.merge(
            heartOfGiant,
            HEART_OF_GIANTS.find((ele) => ele.title === heartOfGiant.title),
          ),
        );
      }

      const convertedGreatArts = [];
      for (const greatArt of collectionInformationsByGroup['위대한 미술품']) {
        convertedGreatArts.push(
          lodash.merge(
            greatArt,
            GREAT_ARTS.find((ele) => ele.title === greatArt.title),
          ),
        );
      }

      this.setState({
        mindOfIslands: convertedMindOfIslands,
        heartOfGiants: convertedHeartOfGiants,
        starOfOrpheus: convertedStarOfOrpheusis,
        greatArt: convertedGreatArts,
      });
    }
  }

  public render() {
    const {
      nickname,
      tabIndex,
      mindOfIslands,
      starOfOrpheus,
      heartOfGiants,
      greatArt,
    } = this.state;

    return (
      <div
        style={{
          backgroundImage: 'url(/static/main_image.png)',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          // backgroundSize: 'cover',
        }}>
        <div
          style={{
            textAlign: 'center',
            paddingTop: '10%',
            paddingBottom: '10%',
          }}>
          <div className="login-sign-up-container">
            <div style={{ textAlign: 'right' }}>
              <Button color="primary" outline={true}>
                <Link href="/checkList">체크리스트</Link>
              </Button>
            </div>
            {mindOfIslands.length > 0 ? (
              <>
                <Nav
                  tabs
                  style={{
                    borderBottom: 'rgba(0, 0, 0, 0.6) solid',
                  }}>
                  <NavItem>
                    <NavLink
                      className={
                        tabIndex === '섬의 마음' ? 'active-tab-title' : ''
                      }
                      onClick={this.onChangeTabIndex('섬의 마음')}>
                      섬의 마음
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={
                        tabIndex === '오르페우스의 별' ? 'active-tab-title' : ''
                      }
                      onClick={this.onChangeTabIndex('오르페우스의 별')}>
                      오르페우스의 별
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={
                        tabIndex === '거인의 심장' ? 'active-tab-title' : ''
                      }
                      onClick={this.onChangeTabIndex('거인의 심장')}>
                      거인의 심장
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={
                        tabIndex === '위대한 미술품' ? 'active-tab-title' : ''
                      }
                      onClick={this.onChangeTabIndex('위대한 미술품')}>
                      위대한 미술품
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={tabIndex}>
                  <TabPane tabId="섬의 마음">
                    <Table>
                      <thead>
                        <tr>
                          <th>이름</th>
                          <th>요약</th>
                          <th>
                            소요 시간{' '}
                            <Button onClick={this.sortMindsOfIsland}>
                              정렬
                            </Button>
                          </th>
                          <th>링크</th>
                          <th>획득 여부</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mindOfIslands.map((ele) => (
                          <tr>
                            <td>{ele.title}</td>
                            <td>{ele.tip}</td>
                            <td>{ele.resource}</td>
                            <td>
                              {ele.link && <a href={ele.link}>공략 링크</a>}
                            </td>
                            <td>{ele.isSuccess ? 'O' : 'X'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </TabPane>

                  <TabPane tabId="오르페우스의 별">
                    <Table>
                      <thead>
                        <tr>
                          <th>이름</th>
                          <th>요약</th>
                          <th>소요 시간</th>
                          <th>링크</th>
                          <th>획득 여부</th>
                        </tr>
                      </thead>
                      <tbody>
                        {starOfOrpheus.map((ele) => (
                          <tr>
                            <td>{ele.title}</td>
                            <td>{ele.tip}</td>
                            <td>{ele.resource}</td>
                            <td>
                              {ele.link && <a href={ele.link}>공략 링크</a>}
                            </td>
                            <td>{ele.isSuccess ? 'O' : 'X'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </TabPane>
                  <TabPane tabId="거인의 심장">
                    <Table>
                      <thead>
                        <tr>
                          <th>이름</th>
                          <th>요약</th>
                          <th>소요 시간</th>
                          <th>링크</th>
                          <th>획득 여부</th>
                        </tr>
                      </thead>
                      <tbody>
                        {heartOfGiants.map((ele) => (
                          <tr>
                            <td>{ele.title}</td>
                            <td>{ele.tip}</td>
                            <td>{ele.resource}</td>
                            <td>
                              {ele.link && <a href={ele.link}>공략 링크</a>}
                            </td>
                            <td>{ele.isSuccess ? 'O' : 'X'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </TabPane>

                  <TabPane tabId="위대한 미술품">
                    <Table>
                      <thead>
                        <tr>
                          <th>이름</th>
                          <th>요약</th>
                          <th>소요 시간</th>
                          <th>링크</th>
                          <th>획득 여부</th>
                        </tr>
                      </thead>
                      <tbody>
                        {greatArt.map((ele) => (
                          <tr>
                            <td>{ele.title}</td>
                            <td>{ele.tip}</td>
                            <td>{ele.resource}</td>
                            <td>
                              {ele.link && <a href={ele.link}>공략 링크</a>}
                            </td>
                            <td>{ele.isSuccess ? 'O' : 'X'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </TabPane>
                </TabContent>
              </>
            ) : (
              <>
                <h1>내실 정보 가져오기</h1>

                <InputGroup className="default-input-group">
                  <Input
                    onChange={this.onChangeNickname}
                    value={nickname}
                    placeholder="캐릭터이름"
                  />
                  <Button onClick={this.onLoadInfo}>가져오기</Button>
                </InputGroup>
              </>
            )}
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
  private sortMindsOfIsland = () => {
    const sortedMindOFIslands = this.state.mindOfIslands.sort((mindA, mindB) =>
      mindA.resourecNumber > mindB.resourecNumber
        ? 1
        : mindA.resourecNumber < mindB.resourecNumber
        ? -1
        : 0,
    );

    this.setState({
      mindOfIslands: sortedMindOFIslands,
    });
  };

  private onChangeTabIndex = (tabIndex: string) => () => {
    this.setState({
      tabIndex,
    });
  };

  private onChangeNickname = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      nickname: e.currentTarget.value,
    });
  };

  private onLoadInfo = async () => {
    const cookies = new Cookies();
    const userID = cookies.get('naesilHasil');

    const { data } = await axios.post(
      'http://localhost:4000/api/loadCollectionInformations',
      {
        'Content-Type': 'application/json',
      },
      {
        params: {
          nickname: this.state.nickname,
          userID,
        },
      },
    );

    if (
      data &&
      data.collectionInformations &&
      data.collectionInformations.length > 0
    ) {
      const collectionInformationsByGroup = lodash.groupBy(
        data.collectionInformations,
        'category',
      );

      const convertedMindOfIslands = [];
      for (const mindOfIsland of collectionInformationsByGroup['섬의 마음']) {
        convertedMindOfIslands.push(
          lodash.merge(
            mindOfIsland,
            MIND_OF_ISLANDS.find((ele) => ele.title === mindOfIsland.title),
          ),
        );
      }

      const convertedStarOfOrpheusis = [];
      for (const starOfOrpheus of collectionInformationsByGroup[
        '오르페우스의 별'
      ]) {
        convertedStarOfOrpheusis.push(
          lodash.merge(
            starOfOrpheus,
            STAR_OF_ORPHEUSIS.find((ele) => ele.title === starOfOrpheus.title),
          ),
        );
      }

      const convertedHeartOfGiants = [];
      for (const heartOfGiant of collectionInformationsByGroup['거인의 심장']) {
        convertedHeartOfGiants.push(
          lodash.merge(
            heartOfGiant,
            HEART_OF_GIANTS.find((ele) => ele.title === heartOfGiant.title),
          ),
        );
      }

      const convertedGreatArts = [];
      for (const greatArt of collectionInformationsByGroup['위대한 미술품']) {
        convertedGreatArts.push(
          lodash.merge(
            greatArt,
            GREAT_ARTS.find((ele) => ele.title === greatArt.title),
          ),
        );
      }

      this.setState({
        mindOfIslands: convertedMindOfIslands,
        heartOfGiants: convertedHeartOfGiants,
        starOfOrpheus: convertedStarOfOrpheusis,
        greatArt: convertedGreatArts,
      });
    }
  };
}

export default Home;
