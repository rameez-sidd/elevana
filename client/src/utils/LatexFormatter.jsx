const latexToText = (str) => {
  return str
    .replace(/\\\(/g, '(')       // Replace \( with (
    .replace(/\\\)/g, ')')       // Replace \) with )
    .replace(/\\boxed\{([^}]*)\}/g, '$1') // Replace \boxed{14} with 14
    .replace(/\\times/g, '×')    // Replace \times with ×
    // .replace(/\*\*(.*?)\*\*/g, '$1'); // Replace **text** with text
}
export default latexToText