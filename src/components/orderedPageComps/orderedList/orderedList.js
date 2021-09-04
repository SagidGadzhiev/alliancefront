import React from 'react';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const OrderedList = () => {

    const ordered = useSelector(s => s.storeItems.ordered)

    return (
        <div className='orderedList'>
            {
                ordered.map((i, idx) => (
                    <div key={idx} className='orderedBlock'>
                        <img className='orderedBlock__img'
                             src={i.shopping[0].img.length === 0 ? 'https://enter.kg/images/yandex.png' : i.shopping[0].img}
                             alt="pic"/>
                        <Link className='orderedBlock__date' to={`/order/${i.orderDate}`}>Заказ на <span>{i.orderDate}</span></Link>
                    </div>
                ))
            }
        </div>
    );
};

export default OrderedList;