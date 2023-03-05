import React, {useState, useEffect} from "react";
import XLSX from "xlsx";
import axios from "axios";


const localApi = process.env.REACT_APP_NODE_ENV === 'prod' ? process.env.REACT_APP_SERVER_API : process.env.REACT_APP_LOCAL_API;

const converterBlockStyles = {border: '1px solid black', borderRadius: '5px', padding: '5px'};
const titleStyles = {margin: '0 0 10px 0'};
const inputStyles = {display: 'block'};
const convertBtnStyles = {margin: '10px 0'};

function ExcelToCSV() {

  const [products, setProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(`${localApi}/products`);
      return setProducts(res.data)
    };
    getProducts().then()
  }, []);

  useEffect(() => {
    const updateDatabase = async () => {
      return newProducts.length === 0 ? null : await axios.put(`${localApi}/products`, newProducts);
    };
    updateDatabase()
  }, [newProducts]);

  const ConvertToCSV = () => {
    const file = document.getElementById('file-selector').files[0];
    file.arrayBuffer().then((res) => {
      let data = new Uint8Array(res);
      let workbook = XLSX.read(data, {type: "array"});
      let first_sheet_name = workbook.SheetNames[0];
      let workSheet = workbook.Sheets[first_sheet_name];
      let jsonData = XLSX.utils.sheet_to_json(workSheet, {raw: true});
      let json = jsonData
          .map((obj) => {
            return obj.code === undefined ? obj : {
              ...obj,
              count: 1,
              available: 'В наличии',
              img: '',
              code: String(obj.code).padStart(11, '0'),
              class: '',
              category: '',
              subcategory: ''
            }
          })
          .map((el, idx, arr) => {
            if (el.product.search(/\S|$/) === 8 && el.code === undefined) {
              for (let i = idx; i < arr.length; i++) {
                arr[i].class = el.product
              }
            }
            if (el.product.search(/\S|$/) === 12 && el.code === undefined) {
              for (let i = idx; i < arr.length; i++) {
                if ((arr[i + 1].product.search(/\S|$/) === 8 || arr[i + 1].product.search(/\S|$/) === 12) && arr[i + 1].code === undefined) {
                  arr[i].category = el.product;
                  break
                } else {
                  arr[i].category = el.product
                }
              }
            }
            if (el.product.search(/\S|$/) === 16 && el.code === undefined) {
              for (let i = idx; i < arr.length; i++) {
                if ((arr[i + 1].product.search(/\S|$/) === 8 || arr[i + 1].product.search(/\S|$/) === 12 || arr[i + 1].product.search(/\S|$/) === 16) && arr[i + 1].code === undefined) {
                  arr[i].subcategory = el.product;
                  break
                } else {
                  arr[i].subcategory = el.product
                }
              }
            }
            return el
          })
          .map(obj => {
            return obj.class === undefined ? {...obj, class: String(obj.class)} : obj
          })
          .map(obj => {
            return obj.category === undefined ? {...obj, category: String(obj.category)} : obj
          })
          .map(obj => {
            return obj.subcategory === undefined ? {...obj, subcategory: String(obj.subcategory)} : obj
          })
          .map(obj => {
            return obj.class === "undefined" ? {...obj, class: ''} : obj
          })
          .map(obj => {
            return obj.category === "undefined" ? {...obj, category: ''} : obj
          })
          .map(obj => {
            return obj.subcategory === "undefined" ? {...obj, subcategory: ''} : obj
          })
          .map(obj => ({
            ...obj,
            class: obj.class.split('/').join(','),
            category: obj.category.split('/').join(','),
            subcategory: obj.subcategory.split('/').join(',')
          }))
          .filter((x) => {
            return x.code !== undefined
          })
          .map((it, index) => ({
            ...it,
            id: index + 1
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
                return {...arr[idx], img: products[i].img}
              }
            }
            return obj;
          })
          .map(el => ({
            ...el,
            price: el.price ?? 0
          }));
      // .concat(products)
      // .sort((a, b) => {
      //     return a.code > b.code ? 1 : -1
      // })
      // .map((el, idx, arr) => {
      //     if (idx !== arr.length - 1) {
      //         if (el.code === arr[idx + 1].code) {
      //             el.available = 'В наличии';
      //             arr[idx + 1].available = 'В наличии'
      //             return el
      //         }
      //     }
      //     el.available = 'Уточняйте наличие'
      //     return el
      // })
      // .filter((el, idx, arr) => {
      //     if (idx !== arr.length - 1) {
      //         if (el.code === arr[idx + 1].code) {
      //             return arr.splice(idx, 1)
      //         }
      //     }
      //     return el
      // })
      // .map(obj => {
      //     return obj.available === undefined ? {...obj, available: 'Нет в наличии'} : obj;
      // })
      // .map((it, index) => ({
      //     ...it,
      //     id: index + 1
      // }))
      // .map((it) => {
      //     if (it._id === undefined) {
      //         return it
      //     } else {
      //         delete it['_id'];
      //         return it
      //     }
      // });

      // let fileNameWithoutExtension = file.name.substring(0, file.name.lastIndexOf('.'));
      // let new_worksheet = XLSX.utils.json_to_sheet(json);
      // let new_workbook = XLSX.utils.book_new();
      // XLSX.utils.book_append_sheet(new_workbook, new_worksheet, "CSV_Sheet");
      // XLSX.writeFile(new_workbook, fileNameWithoutExtension + ".csv")

      setNewProducts(json);
    })
  };


  return (
      <div style={converterBlockStyles} className="Excel-CSV-Converter">
        <h6 style={titleStyles}>Выберите файл чтобы обновить список товаров</h6>
        <input style={inputStyles} type="file" id="file-selector"/>
        <button style={convertBtnStyles} onClick={ConvertToCSV}>Обновить</button>
      </div>
  );
}

export default ExcelToCSV;
