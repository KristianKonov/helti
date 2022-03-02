import React from 'react'
import foodImg from './../../images/icons/info/food.svg'
import healthImg from './../../images/icons/info/health.svg'
import healthcareImg from './../../images/icons/info/healthcare.svg'

const LandingInfo = () => {
    const infoboxes = [
        {
            image: `${healthImg}`,
            title: 'Здравословни навици',
            description: 'Използвай нашето приложение редовно и изгради здравословни навици, с който да постигаш целите си.'
        },
        {
            image: `${foodImg}`,
            title: 'Здравословно хранене',
            description: 'Генерирай здравословен хранителен режим използвайки нашият feature Generate-A-Meal'
        },
        {
            image: `${healthcareImg}`,
            title: 'Редовен контакт с треньор',
            description: 'Нашето приложение предлага като възможност треньор да следи вашият прогрес и начин на хранене'
        }
    ]
    return (
    <div className="landing-info">
        {
            infoboxes.map(info => {
                return(
                    <div key={`div/${info.title}`} className="landing-infobox">
                        <img className="landing-info-image" alt={info.title} src={`${info.image}`} />
                        <h3 className='landing-info-title'>{info.title}</h3>
                        <p className='landing-info-desc'>{info.description}</p>
                    </div>
                )
            })
        }
    </div>
    )
}

export default LandingInfo