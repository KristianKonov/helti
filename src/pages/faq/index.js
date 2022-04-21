import React from 'react'
import './faq.sass'
import FaqCategories from '../../components/faq_categories';
import { Helmet } from 'react-helmet-async';
    
const FaqPage = () => {

    return(
        <div className="faq-page-wrapper">
            <Helmet>
                <title>Често задавни въпроси | Helti</title>
            </Helmet>
            <div className="container">
            <h2 className="page-title">Често задавни въпроси:</h2>
            <FaqCategories />
            </div>
        </div>
    )

}

export default FaqPage