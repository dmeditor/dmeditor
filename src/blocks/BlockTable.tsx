import { GridOn } from "@mui/icons-material";
import {
  BorderBottom,
  Delete,
  DeleteSweep,
  BorderAll,
  BorderClearOutlined,
  BorderHorizontalOutlined,
  BorderLeft,
  BorderRight,
  BorderTop,
} from "@mui/icons-material";
import { useState } from "react";
import { RenderMainProps, RenderSettingProps } from "../blocktype";
import { BlockData, BlockLayoutData } from "../types";
import { Ranger } from "../utils/Ranger";
import "./BlockTable.css";
import { BlockProperty } from "../BlockProperty";
import React from "react";
import { Block } from "../Block";
import { ToolDefinition } from "../ToolDefinition";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@mui/material";
import { PickColor } from "../utils/PickColor";

const changeColor = (name: string, value: string) => {
  document.documentElement.style.setProperty(name, value);
};

type add = "top" | "right" | "bottom" | "left";
type deleteType = "col" | "row";

type bordersType = "none" | "rowBorder" | "border";
interface rowType {
  key: string;
  context: string;
  // align: "right" | "left" | "center";
  // style?: any;
  // height: string | number;
}
interface colType {
  row: rowType[];
  key: string;
  // style?: any;
  // width?: string | number;
}

export const Table = (props: any) => {
  const [content, SetContent] = useState<colType[]>(() => {
    return (
      props?.data?.content || [
        {
          key: uuidv4(),
          row: [
            { key: uuidv4(), context: "new" },
            { key: uuidv4(), context: "new" },
            { key: uuidv4(), context: "new" },
            { key: uuidv4(), context: "new" },
          ],
        },
        {
          key: uuidv4(),
          row: [
            { key: uuidv4(), context: "new" },
            { key: uuidv4(), context: "new" },
            { key: uuidv4(), context: "new" },
            { key: uuidv4(), context: "new" },
          ],
        },
      ]
    );
  });
  const [type, changeType] = useState(() => {
    return { ikey: "", jkey: "", i: -1, j: -1 };
  });
  const clicks = (ikey: string, jkey: string, i: number, j: number) => {
      changeType({ ikey, jkey, i, j });
  };
  const [headerStyle, setHeaderStyle] = useState(() => {
    return {};
  });
  const [color, setColor] = useState({
    borderColor: "#cccccc",
    headerColor: '',
    oddColor:''
  });
  const [border, setBorderProp] = useState<bordersType>("rowBorder");
  const setAlign = (v: add) => {
    let _arr = [...content];
    let dataRow: colType = {
      key: uuidv4(),
      row: _arr[0].row.map((item) => ({
        key: uuidv4(),
        context: "newRol",
      })),
    };
    let dataCol: rowType = {
      key: uuidv4(),
      context: "newCol",
    };
    switch (v) {
      case "top":
        if (type.i === 0) {
          _arr.unshift(dataRow);
        } else {
          _arr.splice(type.i, 0, dataRow);
        }
        changeType((num) => {
          const i = num.i + 1;
          return {
            ...num,
            i,
          };
        });
        break;
      case "left":
        _arr.forEach((item) => {
          item.row.splice(type.j, 0, dataCol);
        });
        changeType((num) => {
          return {
            ...num,
            j: num.j++,
          };
        });
        break;
      case "right":
        _arr.forEach((item) => {
          item.row.splice(type.j + 1, 0, dataCol);
        });
        break;
      case "bottom":
        _arr.splice(type.i + 1, 0, dataRow);
        break;
    }
    SetContent(_arr);
  };
  const del = (v: deleteType) => {
    let _arr = [...content];
    switch (v) {
      case "col":
        _arr.forEach((item) => {
          item.row.splice(type.j, 1);
        });
        break;
      case "row":
        _arr.splice(type.i, 1);
        break;
    }
    SetContent(_arr);
    setTimeout(() => {
      changeType({ ikey: "", jkey: "", i: -1, j: -1 });
    });
  };
  const setBorder = (value: bordersType) => {
    setBorderProp(value);
  };
  const changeBorderColor = (color: string) => {
    changeColor("--border-color", color);
    setColor(value => {
      value.borderColor = color
      return {...value}
    })
  };
  const changeHeaderColor = (color: string) => {
    setHeaderStyle({
      backgroundColor: color,
    });
    setColor((value) => {
      value.headerColor = color;
      return { ...value };
    });
  };
  const changeOddColor = (color: string) => {
    changeColor("--odd-color", color);
     setColor((value) => {
       value.oddColor = color;
       return { ...value };
     });
  };
  const setStyle = (i: number) => {
    if (i === 0) {
      return headerStyle;
    }
    return {};
  };
  const updateRow = (value: number) => {
    let dataRow: colType = {
      key: uuidv4(),
      row: content[0].row.map((item) => ({
        key: uuidv4(),
        context: "newRol",
      })),
    };
    SetContent((v) => {
      if (value > v.length) {
        let arrData = new Array(value - v.length).fill(dataRow);
        v = v.concat(arrData);
      } else {
        if (type.i + 1 > value) {
          changeType({ ikey: "", jkey: "", i: -1, j: -1 });
        }
        v.splice(value);
      }
      return [...v];
    });
  };
  const updateColumn = (value: number) => {
    let dataCol: rowType = {
      key: uuidv4(),
      context: "newCol",
    };
    SetContent((v) => {
      if (value > v[0]?.row.length) {
        v.forEach((item) => {
          item.row.push(dataCol);
        });
      } else {
        if (type.j + 1 > value) {
          changeType({ ikey: "", jkey: "", i: -1, j: -1 });
        }
        v.forEach((item) => {
          item.row.splice(value);
        });
      }
      return [...v];
    });
  };
  return (
    <div style={{ ...props.data.layout }}>
      <BlockProperty title={"Table"} active={props.active}>
        <div style={{ width: "100%" }}>
          <div>
            <label>Rows</label>
            <div>
              <Ranger
                defaultValue={content.length}
                min={1}
                max={10}
                step={1}
                onChange={(num: number) => {
                  updateRow(num);
                }}
              />
            </div>
          </div>
          <div>
            <label>Columns</label>
            <div>
              <Ranger
                defaultValue={content[0].row.length}
                min={1}
                max={5}
                step={1}
                onChange={(num: number) => {
                  updateColumn(num);
                }}
              />
            </div>
          </div>
          <div>
            <label>Cell padding</label>
            <div>
              <Ranger
                defaultValue={3}
                min={1}
                max={5}
                step={1}
                onChange={() => {}}
              />
            </div>
          </div>
          <div>
            <label>Border</label>
            <div>
              <Button
                onClick={() => {
                  setBorder("none");
                }}
              >
                <BorderClearOutlined
                  color={border === "none" ? "success" : "inherit"}
                ></BorderClearOutlined>
              </Button>
              <Button
                onClick={() => {
                  setBorder("rowBorder");
                }}
              >
                <BorderHorizontalOutlined
                  color={border === "rowBorder" ? "success" : "inherit"}
                ></BorderHorizontalOutlined>
              </Button>
              <Button
                onClick={() => {
                  setBorder("border");
                }}
              >
                <BorderAll
                  color={border === "border" ? "success" : "inherit"}
                ></BorderAll>
              </Button>
            </div>
          </div>
          <div>
            <label>Border color</label>
            <div>
              <PickColor
                color={color?.borderColor}
                onChange={changeBorderColor}
              ></PickColor>
            </div>
          </div>
          <div>
            <label>Row</label>
            <div>
              <Button
                disabled={!(type.ikey && type.jkey)}
                color="success"
                onClick={() => setAlign("top")}
              >
                <BorderTop />
              </Button>
              <Button
                disabled={!(type.ikey && type.jkey)}
                color="success"
                onClick={() => setAlign("bottom")}
              >
                <BorderBottom></BorderBottom>
              </Button>
              <Button
                disabled={!(type.ikey && type.jkey)}
                color="warning"
                onClick={() => del("row")}
              >
                <Delete></Delete>
              </Button>              
            </div>
          </div>
          <div>
            {" "}
            <label>Column</label>
            <div>                        
            <Button
                disabled={!(type.ikey && type.jkey)}
                color="success"
                onClick={() => setAlign("right")}
              >
                <BorderRight></BorderRight>
              </Button>
              <Button
                disabled={!(type.ikey && type.jkey)}
                color="success"
                onClick={() => setAlign("left")}
              >
                <BorderLeft></BorderLeft>
              </Button>    
              <Button
                disabled={!(type.ikey && type.jkey)}
                color="warning"
                onClick={() => del("col")}
              >
                <DeleteSweep></DeleteSweep>
              </Button>
            </div>
          </div>
          <div>
            <label>Header background</label>
            <div>
              <PickColor
                color={color?.headerColor}
                onChange={changeHeaderColor}
              ></PickColor>
            </div>
          </div>
          <div>
            <label>Row(odd) background</label>
            <div>
              <PickColor
                color={color?.oddColor}
                onChange={changeOddColor}
              ></PickColor>
            </div>
          </div>
        </div>
      </BlockProperty>
      <div className={border === "border" ? "table-container" : ""}>
        <table
          width={"100%"}
          border={0}
          cellSpacing="0"
          cellPadding="0"
          className="table"
          suppressContentEditableWarning
          contentEditable={props.active}
        >
          <tbody>
            {content.map((row, i) => {
              return (
                <tr key={row.key} style={setStyle(i)}>
                  {row.row.map((col, j) => (
                    <td
                      key={col.key}
                      onClick={() => clicks(row.key, col.key, i, j)}
                      className={`table__cell ${border} ${
                        row.key + col.key === type.ikey + type.jkey &&
                        props.active
                          ? "tdActive"
                          : ""
                      }`}
                    >
                      <div className={`cell`}>{col.context}</div>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const toolTable: ToolDefinition = {
  type: "table",
  menu: { text: "Table", category: "basic", icon: <GridOn /> },
  initData: { type: "table", content: null },
  def: (props: { data: any; active: boolean, onSave:(data:any)=>void }) => <Table {...props} />,
};
