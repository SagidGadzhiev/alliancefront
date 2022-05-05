import React, { useState, useEffect } from 'react';
import XLSX from 'xlsx';
import axios from 'axios';

function ExcelCsVconverter() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get('https://allianceplusserver.herokuapp.com/products');
      return setProducts(res.data);
    };

    getProducts().then();
  }, []);

  const ConvertToCSV = () => {
    const file = document.getElementById('file-selector').files[0];

    file.arrayBuffer().then((res) => {
      const data = new Uint8Array(res);
      const workbook = XLSX.read(data, { type: 'array' });
      const first_sheet_name = workbook.SheetNames[0];
      const workSheet = workbook.Sheets[first_sheet_name];
      const jsonData = XLSX.utils.sheet_to_json(workSheet, { raw: true });
      const json = jsonData
        .map((obj) => (obj.code === undefined ? obj : {
          ...obj,
          count: 1,
          available: 'В наличии',
          img: '',
          code: String(obj.code).padStart(11, '0'),
          class: '',
          category: '',
          subcategory: '',
        }))

        .map((el, idx, arr) => {
          if (el.product.search(/\S|$/) === 8 && el.code === undefined) {
            for (let i = idx; i < arr.length; i++) {
              arr[i].class = el.product;
            }
          }
          if (el.product.search(/\S|$/) === 12 && el.code === undefined) {
            for (let i = idx; i < arr.length; i++) {
              if ((arr[i + 1].product.search(/\S|$/) === 8 || arr[i + 1].product.search(/\S|$/) === 12) && arr[i + 1].code === undefined) {
                arr[i].category = el.product;
                break;
              } else {
                arr[i].category = el.product;
              }
            }
          }
          if (el.product.search(/\S|$/) === 16 && el.code === undefined) {
            for (let i = idx; i < arr.length; i++) {
              if ((arr[i + 1].product.search(/\S|$/) === 8 || arr[i + 1].product.search(/\S|$/) === 12 || arr[i + 1].product.search(/\S|$/) === 16) && arr[i + 1].code === undefined) {
                arr[i].subcategory = el.product;
                break;
              } else {
                arr[i].subcategory = el.product;
              }
            }
          }

          return el;
        })

        .map((obj) => (obj.class === undefined ? { ...obj, class: String(obj.class) } : obj))
        .map((obj) => (obj.category === undefined ? { ...obj, category: String(obj.category) } : obj))
        .map((obj) => (obj.subcategory === undefined ? { ...obj, subcategory: String(obj.subcategory) } : obj))
        .map((obj) => (obj.class === 'undefined' ? { ...obj, class: '' } : obj))
        .map((obj) => (obj.category === 'undefined' ? { ...obj, category: '' } : obj))
        .map((obj) => (obj.subcategory === 'undefined' ? { ...obj, subcategory: '' } : obj))
        .map((obj) => ({
          ...obj,
          class: obj.class.split('/').join(','),
          category: obj.category.split('/').join(','),
          subcategory: obj.subcategory.split('/').join(','),
        }))
        .filter((x) => x.code !== undefined)
        .map((it, index) => ({
          ...it,
          id: index + 1,
        }))
        .map((obj) => ({
          ...obj,
          product: obj.product.replace(/\s+/g, ' ').trim(),
          class: obj.class.replace(/[.]/g, '').replace(/\s+/g, ' ').trim(),
          category: obj.category.replace(/[.]/g, '').replace(/\s+/g, ' ').trim(),
          subcategory: obj.subcategory.replace(/[.]/g, '').replace(/\s+/g, ' ').trim(),
        }))
        .map((obj, idx, arr) => {
          for (let i = 0; i < products.length; i++) {
            if (arr[idx].code === products[i].code) {
              return { ...arr[idx], img: products[i].img };
            }
          }
          return obj;
        });
      const fileNameWithoutExtension = file.name.substring(0, file.name.lastIndexOf('.'));
      const new_worksheet = XLSX.utils.json_to_sheet(json);
      const new_workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(new_workbook, new_worksheet, 'CSV_Sheet');
      XLSX.writeFile(new_workbook, `${fileNameWithoutExtension}.csv`);
    });
  };

  return (
    <div className='excel-converter'>
      <input type='file' id='file-selector' />
      <button onClick={ConvertToCSV}>Convert</button>
    </div>
  );
}

export default ExcelCsVconverter;
