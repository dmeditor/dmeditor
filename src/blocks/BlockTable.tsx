import { GridOn } from "@mui/icons-material";
import { css } from "@emotion/css";
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
import { useEffect, useState } from "react";
import { RenderMainProps, RenderSettingProps } from "../blocktype";
import { BlockData, BlockLayoutData } from "../types";
import { Ranger } from "../utils/Ranger";
import "./BlockTable.css";
import { BlockProperty } from "../BlockProperty";
import React from "react";
import { ToolDefinition, ToolRenderProps } from "../ToolDefinition";
import { PickColor } from "../utils/PickColor";
import { PropertyButton, PropertyGroup, PropertyItem } from "../utils/Property";

type add = "top" | "right" | "bottom" | "left";
type deleteType = "col" | "row";

type bordersType = "none" | "rowBorder" | "border";

interface styelProp {
  [propName: string]: any;
}
export const Table = (props: ToolRenderProps) => {
  console.log(props);
  const [content, SetContent] = useState<string[][]>(() => {
    return props?.data?.content;
  });
  const [padding, setPadding] = useState(() => {
    let padding: number = 0;
    if (props?.data?.settings?.padding) {
      if (typeof props?.data?.settings?.padding === "number") {
        padding = props?.data?.settings?.padding;
      } else if (typeof props?.data?.settings?.padding === "string") {
        padding = parseInt(props?.data?.settings?.padding);
      }
    }
    return padding;
  });
  const [color, setColor] = useState({
    borderColor: props?.data?.settings?.borderColor || "#cccccc",
    headerColor: props?.data?.settings?.headerColor || "",
    oddColor: props?.data?.settings?.oddColor || "",
  });

  const [border, setBorderProp] = useState<bordersType>(() => {
    return props?.data?.settings?.border || "rowBorder";
  });

  const [type, changeType] = useState(() => {
    return { i: -1, j: -1 };
  });
  const clicks = (i: number, j: number) => {
    changeType({ i, j });
  };

  useEffect(() => {
    if (props.active) {
      props?.onChange({
        content,
        settings: { ...color, padding, border },
        type: "table",
      });
    }
  });

  const setAlign = (v: add) => {
    switch (v) {
      case "top":
        content.splice(
          type.i,
          0,
          content[0].map(() => "newTop")
        );
        type.i++;
        changeType({
          ...type,
        });
        break;
      case "left":
        content.forEach((item) => {
          item.splice(type.j, 0, "newleft");
        });
        type.j++;
        changeType({
          ...type,
        });
        break;
      case "right":
        content.forEach((item) => {
          item.splice(type.j + 1, 0, "newright");
        });
        break;
      case "bottom":
        content.splice(
          type.i + 1,
          0,
          content[0].map(() => "newbottom")
        );
        break;
    }
    SetContent([...content]);
  };
  const del = (v: deleteType) => {
    let array = [...content];
    switch (v) {
      case "col":
        content.forEach((item) => {
          item.splice(type.j, 1);
        });
        if (type.j === array[0].length - 1) {
          changeType({
            i: type.i,
            j: array[0].length - 1,
          });
        }
        break;
      case "row":
        content.splice(type.i, 1);
        if (type.i === array.length - 1) {
          changeType({
            i: content.length - 1,
            j: type.j,
          });
        }
        break;
    }
    SetContent([...content]);
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
  const tableContainer = () => {
    let style: styelProp = {};
    if (border === "border") {
      style.borderLeft = `1px solid ${color.borderColor}`;
      style.borderTop = `1px solid ${color.borderColor}`;
    }
    if (border === "rowBorder") {
      style.borderTop = `1px solid ${color.borderColor}`;
    }
    return style;
  };
  const tdStyle = () => {
    let style: styelProp = {
      paddingTop: padding + "px",
      paddingBottom: padding + "px"
    };
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
    SetContent((v) => {
      if (value > v.length) {
        let length = v[0].length;
        let arrData = new Array(value - v.length).fill("new").map((item) => {
          let array = [];
          for (let index = 0; index < length; index++) {
            array.push("new");
          }
          return array;
        });
        v = v.concat(arrData);
      } else {
        v.splice(value);
        if (type.i + 1 > value) {
          type.i = v.length - 1;
          changeType({ ...type });
        }
      }
      return [...v];
    });
  };
  const updateColumn = (value: number) => {
    SetContent((v) => {
      if (value > v[0]?.length) {
        v.forEach((item) => {
          item.push("new");
        });
      } else {
        v.forEach((item) => {
          item.splice(value);
        });
        if (type.j + 1 > value) {
          type.j = v[0].length - 1;
          changeType({ ...type });
        }
      }
      return [...v];
    });
  };
  const updatePadding = (num: number) => {
    setPadding(num);
  };
  const change = (
    e: React.FocusEvent<HTMLDivElement>,
    i: number,
    j: number
  ) => {
    content[i][j] = e.target.innerText;
    SetContent([...content]);
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
              disabled={type.i === -1 && type.j === -1}
              color="success"
              onClick={() => setAlign("bottom")}
            >
              <BorderBottom></BorderBottom>
            </PropertyButton>
            <PropertyButton
              title="Insert on top"
              disabled={type.i === -1 && type.j === -1}
              color="success"
              onClick={() => setAlign("top")}
            >
              <BorderTop />
            </PropertyButton>
            <PropertyButton
              title="Delete row"
              disabled={type.i === -1 && type.j === -1}
              color="warning"
              onClick={() => del("row")}
            >
              <Delete></Delete>
            </PropertyButton>
          </PropertyItem>
          <PropertyItem label="Column">
            <PropertyButton
              title="Insert on right"
              disabled={type.i === -1 && type.j === -1}
              color="success"
              onClick={() => setAlign("right")}
            >
              <BorderRight></BorderRight>
            </PropertyButton>
            <PropertyButton
              title="Insert on left"
              disabled={type.i === -1 && type.j === -1}
              color="success"
              onClick={() => setAlign("left")}
            >
              <BorderLeft></BorderLeft>
            </PropertyButton>
            <PropertyButton
              title="Delete column"
              disabled={type.i === -1 && type.j === -1}
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
            max={40}
            step={1}
            onChange={(num: number) => {
              updatePadding(num);
            }}
          />
        </PropertyItem>
        <PropertyItem label="Rows">
          {content.length <= 10 && (
            <Ranger
              defaultValue={content.length}
              min={1}
              max={10}
              step={1}
              onChange={(num: number) => {
                updateRow(num);
              }}
            />
          )}
        </PropertyItem>
        <PropertyItem label="Columns">
          {content[0].length <= 10 && (
            <Ranger
              defaultValue={content[0].length}
              min={1}
              max={10}
              step={1}
              onChange={(num: number) => {
                updateColumn(num);
              }}
            />
          )}
        </PropertyItem>
      </BlockProperty>
      <div className="bani">
        <div>
          <table
            width={"100%"}
            border={0}
            cellSpacing="0"
            cellPadding="0"
            className="bani-table"
            suppressContentEditableWarning
            contentEditable={props.active}
            style={tableContainer()}
          >
            <tbody>
              {content.map((item, i) => {
                return (
                  <tr
                    key={i}
                    style={{
                      backgroundColor: i === 0 ? color.headerColor : "",
                    }}
                    className={css({
                      "&:nth-child(odd)": {
                        backgroundColor: color.oddColor,
                      },
                    })}
                  >
                    {item.map((data, j) => (
                      <td
                        key={j}
                        onClick={() => clicks(i, j)}
                        className={`table__cell ${
                          i === type.i && j === type.j && props.active
                            ? "tdActive"
                            : ""
                        }`}
                        onBlur={(e) => {
                          change(e, i, j);
                        }}
                        style={tdStyle()}
                      >
                       {data}
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
  initData: {
    type: "table",
    content: [
      ["new", "new", "new", "new"],
      ["new", "new", "new", "new"],
    ],
    settings:{padding: 6}
  },
  render: (props: ToolRenderProps) => <Table {...props} />,
};
