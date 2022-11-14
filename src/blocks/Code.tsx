import { CodeOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { BlockProperty } from "../BlockProperty";
import { ToolDefinition, ToolRenderProps } from "../ToolDefinition";
import { css } from "@emotion/css";
export const Code = (props: ToolRenderProps) => {
  const [content, SetContent] = useState(() => {
    return props.data.content;
  });
  const changer = (e: React.FocusEvent<HTMLElement>) => {
    SetContent(e.target.innerText);
  };
  useEffect(() => {
    if (!props.active) {
      props.onChange({
        content,
        type: "code",
      });
    }
  });
  return (
    <>
      <BlockProperty title={"Code"} active={props.active}></BlockProperty>
      <code
        className={css({
          padding: "0.5em 0.8em",
          margin: 0,
          fontSize: "85%",
          backgroundColor: "rgba(175, 184, 193, .1)",
          width: "100%",
          display: "block",
          whiteSpace:"pre-line",
          boxSizing: "border-box",
          color: "#333333",
        })}
        suppressContentEditableWarning
        contentEditable={props.active}
        onBlur={(e) => {
          changer(e);
        }}
      >
        {content}
      </code>
    </>
  );
};
export const toolCode: ToolDefinition = {
  type: "code",
  menu: {
    text: "Code",
    category: "basic",
    icon: <CodeOutlined />,
  },
  initData: { type: "code", content: "this is a Code" },
  view: (props:{data:any})=><Code data={props.data} active={false} onChange={()=>{}} />,
  render: (props: ToolRenderProps) => <Code {...props} />,
};
