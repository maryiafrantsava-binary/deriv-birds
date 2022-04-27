import React from 'react'
import './Profile.scss'

const Profile = () => {
    const achievements = [
        { title: '“Chick”', description: 'Complete registration', lock_avatar: '/images/achievements/chick.svg', active_avatar: '/images/achievements/chick_active.svg' },
        { title: '“Newbie”', description: 'Fill up your nest with 100 BirdCoins', lock_avatar: '/images/achievements/newbie.svg', active_avatar: '/images/achievements/newbie_active.svg' },
        { title: '“Gold miner”', description: 'Fill up your nest with 1000 BirdCoins', lock_avatar: '/images/achievements/gold-miner.svg', active_avatar: '/images/achievements/gold-miner_active.svg' },
        { title: '“Expert”', description: 'Finish BQuiz with 10 right answers', lock_avatar: '/images/achievements/expert.svg', active_avatar: '/images/achievements/expert_active.svg' },
        { title: '“Gamer”', description: 'Win BFlyer 10 times in a row', lock_avatar: '/images/achievements/gamer.svg', active_avatar: '/images/achievements/gamer_active.svg' },
    ]

    const activeAvatar = false;

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
                                />
                            </div>

                            <div>
                                <label htmlFor="lastName">Last name</label>
                                <input
                                    placeholder="last name"
                                    id="lastName"
                                    type="text"
                                    name="lastName"
                                />
                            </div>
                        </div>

                        <div className='dashboard'>
                            <div>
                                <span className='dashboard__percent'>64%</span>
                                <span className='dashboard__text'>Trading Skill</span>
                            </div>

                            <span className='dashboard__text'>Ready to Trade</span>
                        </div>

                        <h2>Achievements</h2>
                        <div className='achievements'>
                            {achievements.map(({ title, description, active_avatar, lock_avatar }) => (
                                <div key={title}>
                                    <img src={activeAvatar ? active_avatar : lock_avatar} alt={title} />
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