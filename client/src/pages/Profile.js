import React, { useEffect } from 'react'
import './Profile.scss'

const Profile = () => {
    const achievements = [
        { title: '“Chick”', description: 'Complete registration', lock_avatar: '/images/achievements/chick.svg', active_avatar: '/images/achievements/chick_active.svg',limit: 100 },
        { title: '“Newbie”', description: 'Fill up your nest with 100 BirdCoins', lock_avatar: '/images/achievements/newbie.svg', active_avatar: '/images/achievements/newbie_active.svg', limit: 200  },
        { title: '“Gold miner”', description: 'Fill up your nest with 1000 BirdCoins', lock_avatar: '/images/achievements/gold-miner.svg', active_avatar: '/images/achievements/gold-miner_active.svg', limit: 500  },
        { title: '“Expert”', description: 'Finish BQuiz with 10 right answers', lock_avatar: '/images/achievements/expert.svg', active_avatar: '/images/achievements/expert_active.svg', limit: 1000  },
        { title: '“Gamer”', description: 'Win BFlyer 10 times in a row', lock_avatar: '/images/achievements/gamer.svg', active_avatar: '/images/achievements/gamer_active.svg', limit: 3000  },
    ]

    const activeAvatar = false;

    const url = `https://deriv-birds.herokuapp.com/api/history/profiledata`;
    const [profileData, setprofileData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const fetchData = async () => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            setprofileData(json.message);
            setLoading(false);
            console.log(json.message)
        } catch (error) {
            console.log("error", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return (
        <span>Loading</span>
    );
    return (
        <div className='profile'>
            <div className='container'>
                <h1>Profile Info</h1>

                <div className='wrapper'>
                    <div className='wrapper__avatar-col'>
                        <div className='profile__avatar'></div>
                    </div>

                    <div className='wrapper__profile-col'>
                        <div className='input_wrapper'>
                            <div>
                                <label htmlFor="name">Name</label>
                                <input
                                    placeholder="name"
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={profileData[0]._id}
                                />
                            </div>

                            {/* <div>
                                <label htmlFor="lastName">Last name</label>
                                <input
                                    placeholder="last name"
                                    id="lastName"
                                    type="text"
                                    name="lastName"
                                />
                            </div> */}
                        </div>

                        <div className='dashboard'>
                            <div>
                                <span className='dashboard__percent'>{(profileData[0].score * 100)/1000}%</span>
                                <span className='dashboard__text'>Trading Skill</span>
                            </div>
                            {((profileData[0].score * 100) / 1000) > 50 ? <span className='dashboard__text'>Ready to Trade</span> : <span className='dashboard__text'>Not ready to Trade</span>}
                            
                        </div>

                        <h2>Achievements</h2>
                        <div className='achievements'>
                            {achievements.map(({ title, description, active_avatar, lock_avatar,limit }) => (
                                <div key={title}>
                                    <img src={profileData[0].score >= limit ? active_avatar : lock_avatar} alt={title} />
                                    <div className='achievements__text-wrapper'>
                                        <span>{title}</span>
                                        <p>{description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile