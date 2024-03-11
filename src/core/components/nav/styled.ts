import styled from "@emotion/styled";

// nav styles
export default styled.div((props) => {
  return {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    height: "60px",
    // backgroundColor: props.theme.primary.main,
    // color: props.theme.primary.contrastText,
  };
})
