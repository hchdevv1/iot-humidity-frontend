import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

import html2canvas from "html2canvas-pro";

import { TransactionRangeDevice } from "@/types/transaction-range";

type ExportPdfParams = {
  device: TransactionRangeDevice;

  chartElement: HTMLElement;

  rows: {
    date: string;

    time: string;

    temperature?: number;

    humidity?: number;
  }[];
};

export async function exportPdf({
  device,
  chartElement,
  rows,
}: ExportPdfParams) {
  /**
   * create pdf
   */
  const pdf = new jsPDF({
    orientation: "portrait",

    unit: "mm",

    format: "a4",
  });

  /**
   * chart cards
   */
  const chartCards =
    chartElement.querySelectorAll(
      ".pdf-chart-card"
    );

  /**
   * loop chart pages
   */
  for (
    let index = 0;
    index < chartCards.length;
    index++
  ) {
    const card =
      chartCards[
        index
      ] as HTMLElement;

    /**
     * add new page
     */
    if (index > 0) {
      pdf.addPage();
    }

    /**
     * title
     */
    pdf.setFontSize(18);

    pdf.text(
      "Temperature & Humidity Monitoring Report",
      14,
      18
    );

    /**
     * device info
     */
    pdf.setFontSize(11);

    pdf.text(
      `Device: ${device.assetDeviceName}`,
      14,
      30
    );

    pdf.text(
      `Department: ${device.departmentName}`  + `Area: ${device.installationArea}`,
      14,
      37
    );


    
    /**
     * clone chart
     */
    const clonedCard =
      card.cloneNode(
        true
      ) as HTMLElement;

    /**
     * safe styles
     */
    clonedCard
      .querySelectorAll("*")
      .forEach((el) => {
        const htmlEl =
          el as HTMLElement;

        htmlEl.style.color =
          "#000000";

        htmlEl.style.backgroundColor =
          "#ffffff";

        htmlEl.style.borderColor =
          "#e5e7eb";

        htmlEl.style.boxShadow =
          "none";

        htmlEl.style.filter =
          "none";

        htmlEl.style.backdropFilter =
          "none";
      });

    /**
     * temp wrapper
     */
    const tempWrapper =
      document.createElement(
        "div"
      );

    tempWrapper.style.position =
      "fixed";

    tempWrapper.style.left =
      "-99999px";

    tempWrapper.style.top = "0";

    tempWrapper.style.width =
      "1200px";

    tempWrapper.style.background =
      "#ffffff";

    tempWrapper.style.padding =
      "24px";

    tempWrapper.appendChild(
      clonedCard
    );

    document.body.appendChild(
      tempWrapper
    );

    /**
     * capture
     */
    const canvas =
      await html2canvas(
        clonedCard,
        {
          scale: 4,

          backgroundColor:
            "#ffffff",

          useCORS: true,
        }
      );

    /**
     * cleanup
     */
    document.body.removeChild(
      tempWrapper
    );

    /**
     * chart image
     */
    const chartImage =
      canvas.toDataURL(
        "image/png"
      );

    /**
     * image size
     */
    const imgWidth = 180;

    const imgHeight =
      (canvas.height *
        imgWidth) /
      canvas.width;

    /**
     * add image
     */
    pdf.addImage(
      chartImage,
      "PNG",
      14,
      80,
      imgWidth,
      imgHeight
    );
  }

  /**
   * raw table page
   */
  pdf.addPage();

  /**
   * title
   */
  pdf.setFontSize(18);

  pdf.text(
    "Raw Transaction Data",
    14,
    18
  );

  /**
   * device
   */
  pdf.setFontSize(11);

  pdf.text(
    `Device: ${device.assetDeviceName}`,
    14,
    30
  );

  pdf.text(
    `Department: ${device.departmentName}`,
    14,
    37
  );

  /**
   * raw table
   */
  autoTable(pdf, {
    startY: 50,

    head: [
      [
        "Date",
        "Time",
        "Temperature",
        "Humidity",
      ],
    ],

    body: rows.map((row) => [
      row.date,

      row.time,

      row.temperature !==
      undefined
        ? `${row.temperature}°C`
        : "-",

      row.humidity !==
      undefined
        ? `${row.humidity}%`
        : "-",
    ]),

    styles: {
      fontSize: 8,
    },

    headStyles: {
      fillColor: [14, 165, 233],
    },

    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
  });

  /**
   * save
   */
  pdf.save(
    `${device.assetDeviceName}-${Date.now()}.pdf`
  );
}