import { cloneDeep, get, isEmpty, set } from 'lodash';
import { useLayoutEffect, useRef, useState } from 'react';
import { buildArray, rebuildTable } from '../utils';

interface ITable {
  rowIndex: number;
  colIndex: number;
  color: string;
}

const Home = () => {
  const [blockLimit, setBlockLimit] = useState<number>(10);
  const [table, setTable] = useState<any>();
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const [mouseUp, setMouseUp] = useState<boolean>(true);
  const [bgColor, setBgColor] = useState<string>('bg-white');
  const [mouseDownIndex, setMouseDownIndex] = useState<string>('');
  const [mouseUpIndex, setMouseUpIndex] = useState<string>('');

  useLayoutEffect(() => {
    setTable(buildArray(blockLimit));
  }, []);

  useLayoutEffect(() => {
    if (mouseDownIndex === mouseUpIndex) { return; }
    if (!mouseDownIndex || !mouseUpIndex) { return; }
    const updatedTable = rebuildTable(mouseDownIndex, mouseUpIndex, table, bgColor);
    setTable(updatedTable);
  }, [mouseUpIndex]);

  const updataTableHandler = ({ rowIndex, colIndex, color }: ITable) => {
    const updatedTable = cloneDeep(table);
    let updatedColor = color;
    if (!color) {
      const currentColor = get(updatedTable, `[${rowIndex}].cols[${colIndex}].color`, '');
      updatedColor = `${currentColor === 'bg-white' ? 'bg-[#FF0000]' : 'bg-white'}`;
      setBgColor(updatedColor);
    }
    set(updatedTable, `[${rowIndex}].cols[${colIndex}].color`, updatedColor);
    setTable(updatedTable);
  }


  const renderBlocks = () => {
    const arr: any = table;
    return !isEmpty(arr) && (
      arr.map((row: any, rowIndex: number)=> (
        <div className="flex" key={row.rowId}>
          {row.cols.map((col: any, colIndex: number) => (
            <div
              className={`border border-red flex flex-col p-6 ${col.color}`}
              key={`${row.rowId}-${col.colId}`}
              data-name={`${row.rowId}-${col.colId}`}
              onMouseDown={(e) => {
                setMouseDownIndex(`${rowIndex}-${colIndex}`);
                setMouseDown(true);
                setMouseUp(false);
                e.preventDefault();
                updataTableHandler({ rowIndex, colIndex, color: '' });
              }}
              onMouseUp={(e) => {
                setMouseDown(false);
                setMouseUp(true);
                e.preventDefault();
                updataTableHandler({ rowIndex, colIndex, color: bgColor });
                setMouseUpIndex(`${rowIndex}-${colIndex}`);
              }}
              /*
              -- code for changing color onmousehover, but currently getting a conflict with mouseup event --
              
              onMouseOver={(e) => {
                e.preventDefault();
                if (mouseDown && !mouseUp) {
                  const updatedTable = cloneDeep(table);
                  set(updatedTable, `[${rowIndex}].cols[${colIndex}].color`, `${col.color === 'bg-white' ? 'bg-[#FF0000]' : 'bg-white'}`);
                  setTable(updatedTable);
                }
              }}
              */
            >
            </div>
          ))}
        </div>
      ))
    );
  }

  return (
    <div className="flex justify-center mt-10">
      <div className="border">
        {renderBlocks()}
      </div>
    </div>
  );
}

export default Home;