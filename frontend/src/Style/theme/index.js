const palette = Object.freeze({
  BLUE: "#395ad9", // default color
  BRIGHT_BLUE: "#8BA1F9", // mouse over color
  LIGHT_GRAY: "#EEEEEE", // Background Color
  WHITE: "#FFFFFF", // Background Color
  BACK_BACKGROUND: "#eef1f8", // Background Color
});
const expiration = Object.freeze({
  RED: "#FF0000",
  ORANGE: "#FFA500",
  TEAL: "#01BFDD",
});

const fontSize = Object.freeze({
  SMALL: "12px",
  MEDIUM: "14px",
  LARGE: "16px",
});

const radius = Object.freeze({
  DEFAULT: "16px",
});

const border = Object.freeze({
  DEFAULT: "2px solid #eef1f8",
  RADIUS: "16px",
});

const theme = {
  palette,
  expiration,
  fontSize,
  radius,
  border,
};

export default theme;
