export function dateTimeTH(timestamp: string | undefined): string {
  if (!timestamp) return "ไม่มีข้อมูล";

  try {
    // 1. บังคับให้เป็น UTC
    const utcTimestamp = timestamp.endsWith("Z") ? timestamp : `${timestamp}Z`;
    const utcDate = new Date(utcTimestamp); // อยู่ใน UTC

    // 2. ดึงค่าตาม UTC
    const year = utcDate.getUTCFullYear();
    const month = utcDate.getUTCMonth() + 1; // เดือน 0-11
    const day = utcDate.getUTCDate();
    const hours = utcDate.getUTCHours() + 7; // เพิ่ม 7 ชม.
    const minutes = utcDate.getUTCMinutes();

    // จัดการ carry over (ถ้าเกิน 24 ชม.)
    const thHours = hours % 24;
    const carryDays = Math.floor(hours / 24);

    const thDay = day + carryDays;
    const thMonth = month;
    const thYear = year;

    // Format: DD/MM/YYYY HH:mm น.
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${pad(thDay)}/${pad(thMonth)}/${thYear} ${pad(thHours)}:${pad(
      minutes
    )} น.`;
  } catch (e) {
    console.error("Error parsing date:", e);
    return timestamp || "";
  }
}
