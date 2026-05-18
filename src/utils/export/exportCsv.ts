export function exportCsv<
  T extends Record<
    string,
    unknown
  >,
>(
  rows: T[],
  filename: string
) {
  if (!rows.length) {
    return;
  }

  /**
   * headers
   */
  const headers =
    Object.keys(rows[0]);

  /**
   * csv content
   */
  const csvContent = [
    headers.join(","),

    ...rows.map((row) =>
      headers
        .map((header) => {
          const value =
            row[
              header
            ]?.toString() ?? "";

          return `"${value.replace(
            /"/g,
            '""'
          )}"`;
        })
        .join(",")
    ),
  ].join("\n");

  /**
   * blob
   */
  const blob = new Blob(
    [csvContent],
    {
      type: "text/csv;charset=utf-8;",
    }
  );

  /**
   * download
   */
  const link =
    document.createElement("a");

  const url =
    URL.createObjectURL(blob);

  link.href = url;

  link.setAttribute(
    "download",
    filename
  );

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}