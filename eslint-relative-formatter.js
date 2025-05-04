/**
 * Custom ESLint formatter that uses Next.js style with relative paths
 */
const path = require("path");

module.exports = function (results) {
  const cwd = process.cwd();
  let output = "";
  let errorCount = 0;
  let warningCount = 0;

  // Process each file with errors/warnings
  results.forEach((result) => {
    if (result.messages.length === 0) return;

    // Get relative path
    const relativePath = path.relative(cwd, result.filePath);

    // Add file header
    output += "\n./" + relativePath + "\n";

    // Add all messages for this file
    result.messages.forEach((message) => {
      if (message.severity === 2) errorCount++;
      else warningCount++;

      const type = message.severity === 2 ? "error" : "warning";

      output += `  ${message.line}:${message.column}  ${type}  ${
        message.message
      }  ${message.ruleId || ""}\n`;
    });
  });

  // Add summary if there were any issues
  if (errorCount > 0 || warningCount > 0) {
    output += "\n";
    const summary = [];
    if (errorCount > 0) {
      summary.push(`✖ ${errorCount} ${errorCount === 1 ? "error" : "errors"}`);
    }
    if (warningCount > 0) {
      summary.push(
        `${warningCount} ${warningCount === 1 ? "warning" : "warnings"}`
      );
    }
    output += summary.join(", ") + "\n";
  } else {
    output = "✔ No ESLint warnings or errors\n";
  }

  return output;
};
