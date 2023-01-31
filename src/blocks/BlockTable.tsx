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
import { Ranger } from "../utils/Ranger";
import {tableCss} from "./BlockTable.css";
import { BlockProperty } from "../BlockProperty";
import React from "react";
import { ToolDefinition, ToolRenderProps } from "../ToolDefinition";
import { PickColor } from "../utils/PickColor";
import { PropertyButton, PropertyGroup, PropertyItem } from "../utils/Property";
import { CommonSettings } from "../CommonSettings";
import { Util } from '../utils/Util';


type add = "top" | "right" | "bottom" | "left";
type deleteType = "col" | "row";

type bordersType = "none" | "rowBorder" | "border";

interface styelProp {
  [propName: string]: any;
}
export const Table = (props: ToolRenderProps) => {
  const {
    padding: Padding,
    borderColor,
    headerColor,
    oddColor,
    border:Border,
  } = props.data.settings;
  const [content, SetContent] = useState<string[][]>(() => {
    return props?.data?.data;
  });
  const [padding, setPadding] = useState(() => {
    return Padding;
  });
  const [color, setColor] = useState({
    borderColor,
    headerColor: headerColor || "",
    oddColor: oddColor || "",
  });
  const [commonSettings, setCommonSettings] = useState(props.data.common);
  const [isChange, setIsChange] = useState(false);
  const [border, setBorderProp] = useState<bordersType>(() => {
    return Border
  });

  const [type, changeType] = useState(() => {
    return { i: -1, j: -1 };
  });
  const clicks = (i: number, j: number) => {
    changeType({ i, j });
  };

  useEffect(() => {
      props.onChange({
        ...props.data,
        data:content,
        settings: { ...color, padding, border },
        common: commonSettings,
        type: "table",
      });
  },[props.active,commonSettings,isChange]);

  const setAlign = (v: add) => {
    switch (v) {
      case "top":
        content.splice(
          type.i,
          0,
          content[0].map(() => "")
        );
        type.i++;
        changeType({
          ...type,
        });
        break;
      case "left":
        content.forEach((item) => {
          item.splice(type.j, 0, "");
        });
        type.j++;
        changeType({
          ...type,
        });
        break;
      case "right":
        content.forEach((item) => {
          item.splice(type.j + 1, 0, "");
        });
        break;
      case "bottom":
        content.splice(
          type.i + 1,
          0,
          content[0].map(() => "")
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
    setIsChange(!isChange)
  };
  const changeHeaderColor = (color: string) => {
    setColor((value) => {
      value.headerColor = color;
      return { ...value };
    });
    setIsChange(!isChange)
  };
  const changeOddColor = (color: string) => {
    setColor((value) => {
      value.oddColor = color;
      return { ...value };
    });
    setIsChange(!isChange)
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
            array.push("");
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
    setIsChange(!isChange)
  };
  const updateColumn = (value: number) => {
    SetContent((v) => {
      if (value > v[0]?.length) {
        v.forEach((item) => {
          item.push("");
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
    setIsChange(!isChange)
  };
  const updatePadding = (num: number) => {
    setPadding(num);
    setIsChange(!isChange)
  };
  const change = (
    e: React.FocusEvent<HTMLDivElement>,
    i: number,
    j: number
  ) => {    
    content[i][j] = e.target.innerText;
    SetContent(content);
    setIsChange(!isChange)
  };
  return (
    <div className={tableCss()}>
      {props.active&&<BlockProperty  blocktype="table" inBlock={props.inBlock}>
        <PropertyGroup header="Border">
          <PropertyItem label="Border">
            <PropertyButton
              title="No border"
              selected={border === "none"}
              onClick={() => {
                setIsChange(!isChange)
                setBorder("none");
              }}
            >
              <BorderClearOutlined></BorderClearOutlined>
            </PropertyButton>
            <PropertyButton
              title="Row border"
              selected={border === "rowBorder"}
              onClick={() => {
                setIsChange(!isChange)
                setBorder("rowBorder");
              }}
            >
              <BorderHorizontalOutlined></BorderHorizontalOutlined>
            </PropertyButton>
            <PropertyButton
              title="Cell border"
              selected={border === "border"}
              onClick={() => {
                setIsChange(!isChange)
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
              onClick={() => {setAlign("bottom"); setIsChange(!isChange)} }
            >
              <BorderBottom></BorderBottom>
            </PropertyButton>
            <PropertyButton
              title="Insert on top"
              disabled={type.i === -1 && type.j === -1}
              color="success"
              onClick={() => {setAlign("top"); setIsChange(!isChange)}}
            >
              <BorderTop />
            </PropertyButton>
            <PropertyButton
              title="Delete row"
              disabled={type.i === -1 && type.j === -1}
              color="warning"
              onClick={() => {del("row"); setIsChange(!isChange)}}
            >
              <Delete></Delete>
            </PropertyButton>
          </PropertyItem>
          <PropertyItem label="Column">
            <PropertyButton
              title="Insert on right"
              disabled={type.i === -1 && type.j === -1}
              color="success"
              onClick={() => {setAlign("right"); setIsChange(!isChange)}}
            >
              <BorderRight></BorderRight>
            </PropertyButton>
            <PropertyButton
              title="Insert on left"
              disabled={type.i === -1 && type.j === -1}
              color="success"
              onClick={() => {setAlign("left"); setIsChange(!isChange)}}
            >
              <BorderLeft></BorderLeft>
            </PropertyButton>
            <PropertyButton
              title="Delete column"
              disabled={type.i === -1 && type.j === -1}
              color="warning"
              onClick={() => {del("col"); setIsChange(!isChange)}}
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
              value={content.length}
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
              value={content[0].length}
              min={1}
              max={10}
              step={1}
              onChange={(num: number) => {
                updateColumn(num);
              }}
            />
          )}
        </PropertyItem>
        {Util.renderCustomProperty(props.data)}
        <div><CommonSettings commonSettings={commonSettings} onChange={(settings)=>setCommonSettings(settings)} /></div>
      </BlockProperty>}
      <div className="bani">
        <div style={commonSettings}>
          <table
            cellSpacing="0"
            cellPadding="0"
            className="bani-table"
            style={{...tableContainer(), width:(commonSettings?commonSettings.width:"initial")}}
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
                       <div suppressContentEditableWarning
            contentEditable={props.active}>{data}</div>
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
  name: "Table", 
  menu: {category: "basic", icon: <GridOn /> },
  initData: ()=>{  
    return {
      type: "table",
      data: [
        ["", "", "", ""],
        ["", "", "", ""],
      ],
      common:{width: '100%'},
      settings: { padding: 6, borderColor: "#cccccc", border: "rowBorder" },
    }
  },
  view: (props:{data:any})=><Table data={props.data} inBlock={false} active={false} onChange={()=>{}} />,
  render: (props: ToolRenderProps) => <Table {...props} />,
};
