import React, {useState} from 'react';
import ProdCardCategs from "../components/productCardComps/prodCardCategs/prodCardCategs";

const ContactsPage = () => {

    // eslint-disable-next-line no-unused-vars
    const [currentPage, setCurrentPage] = useState(1);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='contactsPage'>
            <div className="container" style={{display: "flex"}}>
                <ProdCardCategs paginate={paginate}/>
                <div className='contactsPage__description'>
                    <h2 className='contactsPage__description__title'>График работы:</h2>
                    <ul className='contactsPage__description__list'>
                        <li className='contactsPage__description__list__text'>Понедельник - Пятница: 09:00 - 18:00
                            (12:00 - 12:30 - технический перерыв)
                        </li>
                        <li className='contactsPage__description__list__text'>Суббота: 09:00 - 17:00 (12:00 - 12:30 -
                            технический перерыв)
                        </li>
                        <li className='contactsPage__description__list__text'>Воскресенье: выходной</li>
                    </ul>
                    <h2 className='contactsPage__description__title'>Покупателям и клиентам:</h2>
                    <ul className='contactsPage__description__list'>
                        <li className='contactsPage__description__list__text'>0(995) 66-74-66 - WhatsApp Мегаком</li>
                        <li className='contactsPage__description__list__text'>0(505) 66-74-66 - WhatsApp О!</li>
                        <li className='contactsPage__description__list__text'>Email: allianceplus.kg@gmail.com</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ContactsPage;