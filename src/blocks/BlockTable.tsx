import { GridOn } from "@mui/icons-material";
import {css} from '@emotion/css'
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
import { PropertyButton, PropertyGroup, PropertyItem } from "../utils/Property";


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
interface styelProp {
  [propName: string]: any;
}

export const Table = (props: any) => {
  console.log(props);
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
  const [padding, setPadding] = useState(0);
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
    headerColor: "",
    oddColor: "",
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
      let ikey: string, jkey: string, i: number, j: number;
      i = type.i > _arr.length - 1 ? _arr.length - 1 : type.i;
      j = type.j > _arr[0].row.length - 1 ? _arr[0].row.length - 1 : type.j;
      ikey = _arr[i].key;
      jkey = _arr[i].row[j].key;
      changeType((value) => ({ ...value, ikey, jkey }));
    });
  };
  const setBorder = (value: bordersType) => {
    setBorderProp(value);
  };
  const changeBorderColor = (color: string) => {
    setColor((value) => {
      value.borderColor = color;
      return { ...value };
    });
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
  const tableContainer = () => {
    let style: styelProp = {};
    if (border === "border") {
      style.borderLeft = `1px solid ${color.borderColor}`;
      style.borderTop = `1px solid ${color.borderColor}`;
    }
    if (border === 'rowBorder') {
      style.borderTop = `1px solid ${color.borderColor}`;
    }
    return style;
  };
  const tdStyle = () => {
    let style: styelProp = {};
    if (border === "border") {
      style.borderRight = `1px solid ${color.borderColor}`;
      style.borderBottom = `1px solid ${color.borderColor}`;
    } else if (border === "none") {
      style.borderRight = "none";
      style.borderBottom = "none";
    }
    if (border === "rowBorder") {
      style.borderBottom = `1px solid ${color.borderColor}`;
    }
    return style;
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
  const updatePadding = (num: number) => {
    setPadding(num);
  };
  return (
    <div style={{ ...props.data.layout }}>
      <BlockProperty title={"Table"} active={props.active}>
        <PropertyGroup header="Border">
          <PropertyItem label="Border">
            <PropertyButton
              title="No border"
              selected={border === "none"}
              onClick={() => {
                setBorder("none");
              }}
            >
              <BorderClearOutlined></BorderClearOutlined>
            </PropertyButton>
            <PropertyButton
              title="Row border"
              selected={border === "rowBorder"}
              onClick={() => {
                setBorder("rowBorder");
              }}
            >
              <BorderHorizontalOutlined></BorderHorizontalOutlined>
            </PropertyButton>
            <PropertyButton
              title="Cell border"
              selected={border === "border"}
              onClick={() => {
                setBorder("border");
              }}
            >
              <BorderAll></BorderAll>
            </PropertyButton>
          </PropertyItem>
          <PropertyItem label="Border color" autoWidth>
            <PickColor
              color={color?.borderColor}
              onChange={changeBorderColor}
            ></PickColor>
          </PropertyItem>
        </PropertyGroup>
        <PropertyGroup header="Cells">
          <PropertyItem label="Row">
            <PropertyButton
              title="Insert on bottom"
              disabled={!(type.ikey && type.jkey)}
              color="success"
              onClick={() => setAlign("bottom")}
            >
              <BorderBottom></BorderBottom>
            </PropertyButton>
            <PropertyButton
              title="Insert on top"
              disabled={!(type.ikey && type.jkey)}
              color="success"
              onClick={() => setAlign("top")}
            >
              <BorderTop />
            </PropertyButton>
            <PropertyButton
              title="Delete row"
              disabled={!(type.ikey && type.jkey)}
              color="warning"
              onClick={() => del("row")}
            >
              <Delete></Delete>
            </PropertyButton>
          </PropertyItem>
          <PropertyItem label="Column">
            <PropertyButton
              title="Insert on right"
              disabled={!(type.ikey && type.jkey)}
              color="success"
              onClick={() => setAlign("right")}
            >
              <BorderRight></BorderRight>
            </PropertyButton>
            <PropertyButton
              title="Insert on left"
              disabled={!(type.ikey && type.jkey)}
              color="success"
              onClick={() => setAlign("left")}
            >
              <BorderLeft></BorderLeft>
            </PropertyButton>
            <PropertyButton
              title="Delete column"
              disabled={!(type.ikey && type.jkey)}
              color="warning"
              onClick={() => del("col")}
            >
              <DeleteSweep></DeleteSweep>
            </PropertyButton>
          </PropertyItem>
        </PropertyGroup>
        <PropertyGroup header="Background">
          <PropertyItem label="Header background" autoWidth>
            <PickColor
              color={color?.headerColor}
              onChange={changeHeaderColor}
            ></PickColor>
          </PropertyItem>
          <PropertyItem label="Odd row background" autoWidth>
            <PickColor
              color={color?.oddColor}
              onChange={changeOddColor}
            ></PickColor>
          </PropertyItem>
        </PropertyGroup>
        <PropertyItem label="Padding">
          <Ranger
            defaultValue={padding}
            min={1}
            max={15}
            step={1}
            onChange={(num: number) => {
              updatePadding(num);
            }}
          />
        </PropertyItem>
        <PropertyItem label="Rows">
          <Ranger
            defaultValue={content.length}
            min={1}
            max={10}
            step={1}
            onChange={(num: number) => {
              updateRow(num);
            }}
          />
        </PropertyItem>
        <PropertyItem label="Columns">
          <Ranger
            defaultValue={content[0].row.length}
            min={1}
            max={10}
            step={1}
            onChange={(num: number) => {
              updateColumn(num);
            }}
          />
        </PropertyItem>
      </BlockProperty>
      <div className="bani">
        <div style={{ padding: padding + "px" }}>
          <table
            width={"100%"}
            border={0}
            cellSpacing="0"
            cellPadding="0"
            className="bani-table"
            style={tableContainer()}
            suppressContentEditableWarning
            contentEditable={props.active}
          >
            <tbody>
              {content.map((row, i) => {
                return (
                  <tr
                    key={row.key}
                    style={setStyle(i)}
                    className={css({
                      "&:nth-child(odd)": {
                          backgroundColor: color.oddColor
                      },
                    })}
                  >
                    {row.row.map((col, j) => (
                      <td
                        key={col.key}
                        onClick={() => clicks(row.key, col.key, i, j)}
                        className={`table__cell ${
                          row.key + col.key === type.ikey + type.jkey &&
                          props.active
                            ? "tdActive"
                            : ""
                        }`}
                        style={tdStyle()}
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
    </div>
  );
};

export const toolTable: ToolDefinition = {
  type: "table",
  menu: { text: "Table", category: "basic", icon: <GridOn /> },
  initData: { type: "table", content: {} },
  def: (props: { data: any; active: boolean; onSave: (data: any) => void }) => (
    <Table {...props} />
  ),
};
