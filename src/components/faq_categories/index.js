import React from 'react'

// Icons
import PersonIcon from '@mui/icons-material/Person';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

const FaqCategories = () => {
    const categories = [
        {
            'id': 1,
            'name': 'Регистрация',
            'category': 'account',
            'icon': <PersonIcon />
        },
        {
            'id': 2,
            'name': 'Генериране на режим',
            'category': 'food',
            'icon': <RestaurantMenuIcon />
        },
        {
            'id': 3,
            'name': 'Акаунт',
            'category': 'account',
            'icon': <PersonIcon />
        }
    ]
    return(
        <div>
            <div className="faq-categories">
                    {
                        categories.map((item, index) => {
                            return(
                                <div key={index} className="faq-category">
                                    {item.icon}
                                    <h4 className="faq-category-name">{item.name}</h4>
                                </div>
                            )
                        })
                    }
            </div>
        </div>
    )
}

export default FaqCategories