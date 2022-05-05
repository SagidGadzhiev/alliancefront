import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function OrderedList() {
  const ordered = useSelector((s) => s.storeItems.ordered);

  return (
    <div className='orderedList'>
      {
                ordered.map((i, idx) => (
                  <div key={idx} className='orderedBlock'>
                    <img
                      className='orderedBlock__img'
                      src={i.shopping[0].img.length === 0 ? 'https://enter.kg/images/yandex.png' : i.shopping[0].img}
                      alt=''
                    />
                    <div>
                      <Link className='orderedBlock__date' to={`/order/${i.orderNum}`}>
                        Заказ
                        на
                        <span>{i.orderDate}</span>
                      </Link>
                      <Link
                        style={{
                          display: 'block',
                          marginTop: '10px',
                        }}
                        className='orderedBlock__date'
                        to={`/order/${i.orderNum}`}
                      >
                        Номер заказа -
                        {' '}
                        <span>{i.orderNum}</span>
                      </Link>
                    </div>
                  </div>
                ))
            }
    </div>
  );
}

export default OrderedList;
