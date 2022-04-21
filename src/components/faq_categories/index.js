import React, {useState, useRef} from 'react'

// Icons
import PersonIcon from '@mui/icons-material/Person';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';


import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));
  
const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
backgroundColor:
    theme.palette.mode === 'dark'
    ? 'rgba(255, 255, 255, .05)'
    : 'rgba(0, 0, 0, .03)',
flexDirection: 'row-reverse',
'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
},
'& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
},
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
padding: theme.spacing(2),
borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const FaqCategories = () => {
    const classNameRef = useRef('faq-category')
    const [filterCategory, setFilterCategory] = useState(null)
    const categories = [
        {
            'id': 1,
            'name': 'Регистрация',
            'category': 'registration',
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

    const questions = [
        {
            'id': 1,
            'body': 'Кода правим',
            'answer': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor  sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
            'category': 'account'
        },
        {
            'id': 2,
            'body': 'Кода правим',
            'answer': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor  sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
            'category': 'account'
        },
        {
            'id': 3,
            'body': 'Кода правим',
            'answer': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor  sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
            'category': 'account'
        },
        {
            'id': 4,
            'body': 'Food',
            'answer': 'When I popped.',
            'category': 'food'
        },
        {
            'id': 5,
            'body': 'Food',
            'answer': 'Off. white.',
            'category': 'food'
        }
    ]

    return(
        <div>
            <div className="faq-categories">
                    {
                        categories.map((item, index) => {
                            console.log(filterCategory)
                            return(
                                <div ref={classNameRef} key={index} onClick={() => setFilterCategory(item.category)} className='faq-category'>
                                    {item.icon}
                                    <h4 className="faq-category-name">{item.name}</h4>
                                </div>
                            )
                        })
                    }
            </div>
            <div>
                {
                    questions.filter(category => filterCategory !== null ? category.category === filterCategory : category.category).map((item, index) => {
                        return(
                            <Accordion key={index}>
                                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                                <Typography>{item.body}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <Typography>
                                    {item.answer}
                                </Typography>
                                </AccordionDetails>
                            </Accordion>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default FaqCategories