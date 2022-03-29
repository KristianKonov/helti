import React, { useState } from 'react'
import './search_db.sass'

const SearchOurDatabase = () => {
    const [ search, setSearch ] = useState('')
    return(
        <div className="container">
            <div className="search-database">
                <h3>Над 2000 храни в базата ни</h3>
                <p>
                    <span>Какво съдържа храната ти?</span>
                    Научи за калориите и макросите на
                    храната, която ядеш (протеин, въглехидрати и мазнини)
                </p>
                <input maxLength='40' placeholder="Въведете хранителен продукт.." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
        </div>
    )
}

export default SearchOurDatabase