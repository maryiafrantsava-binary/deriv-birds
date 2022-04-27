import React, { useEffect } from "react";
import './index.scss'
import classNames from "classnames";

const Leaderboard = () => {
  //const BASE_URL = process.env.BASE_URL;
  const url = `https://deriv-birds.herokuapp.com/api/history/getleaderboard`;
  const [leaderBoard, setLeaderBoard] = React.useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setLeaderBoard(json.message)
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="leaderboard">
      <div className="text-center"><h2>Leaderboard Page</h2></div>
      <div className="leaderboard__list">
        <div className="leaderboard__list-header">
          <div className="leaderboard__list-header-player"><p>Player</p></div>
          <div className="leaderboard__list-header-empty"></div>
          <div className="leaderboard__list-header-coin"><p>BirdCoins <img src='/images/bird-coin-image.svg' /></p></div>
          <div className="leaderboard__list-header-skills"><p>Trading Skills (%)</p></div>
          <div className="leaderboard__list-header-achievements" ><p>Achievements</p></div>
        </div>

        {
          leaderBoard.map((item, key) => {
            const is_active = false; // for future use...
            const name = item._id;
            const coins = item.score;
            const skills = 70;

            console.log(item, 'item');
            return (
              <div className={classNames('leaderboard__list-item active', { active: is_active })} key={key}>
                <div className="leaderboard__list-item-avatar">
                  <div className="avatar-wrapper">
                    <img src="https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg" alt="avatar" />
                  </div>
                </div>
                <div className="leaderboard__list-item-label"><p>{name}</p></div>
                <div className="leaderboard__list-item-coins"><p>{coins}</p></div>
                <div className="leaderboard__list-item-skills"><p>{skills}</p></div>
                <div className="leaderboard__list-item-achievements">
                  <Achievements score={item.score} />
                </div>
              </div>
            )
          })
        }
      </div>
    </section>
  )
}

export default Leaderboard;

const Achievements = ({ score }) => {
  const achs = [
    {
      src_active: '/images/achievements/chick_active.svg',
      src: '/images/achievements/chick.svg',
      label: 'chick',
      limit: 100,
    },
    {
      src_active: '/images/achievements/newbie_active.svg',
      src: '/images/achievements/newbie.svg',
      label: 'newbie',
      limit: 200,
    },
    {
      src_active: '/images/achievements/gold-miner_active.svg',
      src: '/images/achievements/gold-miner.svg',
      label: 'gold-miner',
      limit: 500,
    },
    {
      src_active: '/images/achievements/expert_active.svg',
      src: '/images/achievements/expert.svg',
      label: 'expert',
      limit: 1000,
    },
    {
      src_active: '/images/achievements/gamer_active.svg',
      src: '/images/achievements/gamer.svg',
      label: 'gamer',
      limit: 3000,
    }
  ]
  return <div className="achievements">
    {achs.map((item, key) => {
      const src = score >= item.limit ? item.src_active : item.src;
      return <div className="achievements__item" key={key}>
        <img src={src} alt={item.label} />
      </div>
    })}
  </div>
}