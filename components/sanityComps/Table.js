import React from 'react';
import styles from '../../styles/Table.module.scss';

const TableRow = ({data}) => {
  //console.log(data);
  const table_data = data.map((d,i) => {
    // add the click for link
const data = d.includes('http') ?  <a className={styles.tableLink} href={`${d}`} rel="noopener noreferrer" target="_blank"> [click for link] </a> : d ;
      return <td className={styles.td} key={i}>{data}</td>
  })
  return (
       <tr>
         {table_data}
       </tr>
  ) 
} 

const Table = ({sanityData}) => { 
   // console.log(sanityData.one[0].statics[0].tableDetails.rows.length -1);

   const tableHeader = sanityData.tableDetails.rows[0].cells.map((d,i) => {
       return <th className={styles.th} key={i}>{d}</th>
   });
  
let tableDataArray = [];

for (let i = 1; i < sanityData.tableDetails.rows.length; i++) {
    tableDataArray.push(<TableRow key={i} data={sanityData.tableDetails.rows[i].cells}/>)
} 

    return ( 
      <div className={styles.tableContainer}>
      <p className={styles.staticTitle}></p>
    <table className={styles.table}> 
    <thead>
      <tr>
        {tableHeader}
      </tr>
      </thead>
      <tbody>
      {tableDataArray}
      </tbody>
   </table>
   </div>
     );
}
 
export default Table;