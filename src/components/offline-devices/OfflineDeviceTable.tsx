import { OfflineDevice } from "@/types/offline-device";

type Props = {
  devices: OfflineDevice[];
};

export default function OfflineDeviceTable({
  devices,
}: Props) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-border
        bg-card
        shadow-sm
        overflow-hidden
      "
    >
      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead
            className="
              bg-muted/60
              border-b
              border-border
            "
          >
            <tr>
              <th className="text-left px-4 py-3 font-medium">
                Device
              </th>

              <th className="text-left px-4 py-3 font-medium">
                Department
              </th>

              <th className="text-left px-4 py-3 font-medium">
                Area
              </th>

              <th className="text-left px-4 py-3 font-medium">
                Last Transaction
              </th>

              <th className="text-center px-4 py-3 font-medium">
                Offline Days
              </th>

              <th className="text-center px-4 py-3 font-medium">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {devices.map(
              (device) => (
                <tr
                  key={
                    device.installedRowId
                  }
                  className="
                    border-b
                    border-border/50
                    hover:bg-muted/30
                    transition-colors
                  "
                >
                  {/* DEVICE */}
                  <td className="px-4 py-4 whitespace-nowrap font-medium">
                    {
                      device.assetDeviceName
                    }
                  </td>

                  {/* DEPARTMENT */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    {
                      device.departmentName
                    }
                  </td>

                  {/* AREA */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    {
                      device.installationArea
                    }
                  </td>

                  {/* LAST TX */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    {device.latestTransactionDate ? (
                      <>
                        {
                          device.latestTransactionDate
                        }{" "}
                        {
                          device.latestTransactionTime
                        }
                      </>
                    ) : (
                      <span className="text-muted-foreground">
                        Never
                        Reported
                      </span>
                    )}
                  </td>

                  {/* OFFLINE DAYS */}
                  <td className="px-4 py-4 text-center">
                    {device.offlineDays ??
                      "-"}
                  </td>

                  {/* STATUS */}
                  <td className="px-4 py-4 text-center">
                    <span
                      className="
                        inline-flex
                        items-center
                        rounded-full
                        bg-orange-100
                        text-orange-700
                        text-xs
                        font-semibold
                        px-3
                        py-1
                      "
                    >
                      Offline
                    </span>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}