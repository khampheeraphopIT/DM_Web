export class WeatherService {
  static apiWeatherKey = "77b66e88815ead140b47301470f23127";
  static weatherBaseUrl = "https://api.openweathermap.org/data/2.5/weather";
  static geoBaseUrl = "https://api.openweathermap.org/geo/1.0/reverse";

  static englishToThai: Record<string, string> = {
    Bangkok: "กรุงเทพมหานคร",
    "Krung Thep Maha Nakhon": "กรุงเทพมหานคร",
    Krabi: "กระบี่",
    Kanchanaburi: "กาญจนบุรี",
    Kalasin: "กาฬสินธุ์",
    "Kamphaeng Phet": "กำแพงเพชร",
    "Khon Kaen": "ขอนแก่น",
    Chanthaburi: "จันทบุรี",
    Chachoengsao: "ฉะเชิงเทรา",
    Chonburi: "ชลบุรี",
    "Chai Nat": "ชัยนาท",
    Chaiyaphum: "ชัยภูมิ",
    Chumphon: "ชุมพร",
    Trang: "ตรัง",
    Trat: "ตราด",
    Tak: "ตาก",
    "Nakhon Nayok": "นครนายก",
    "Nakhon Pathom": "นครปฐม",
    "Nakhon Phanom": "นครพนม",
    "Nakhon Ratchasima": "นครราชสีมา",
    "Nakhon Si Thammarat": "นครศรีธรรมราช",
    "Nakhon Sawan": "นครสวรรค์",
    Nonthaburi: "นนทบุรี",
    Narathiwat: "นราธิวาส",
    Nan: "น่าน",
    "Bueng Kan": "บึงกาฬ",
    Buriram: "บุรีรัมย์",
    "Pathum Thani": "ปทุมธานี",
    "Prachuap Khiri Khan": "ประจวบคีรีขันธ์",
    Prachinburi: "ปราจีนบุรี",
    Pattani: "ปัตตานี",
    "Phra Nakhon Si Ayutthaya": "พระนครศรีอยุธยา",
    Phayao: "พะเยา",
    Phangnga: "พังงา",
    Phatthalung: "พัทลุง",
    Phichit: "พิจิตร",
    Phitsanulok: "พิษณุโลก",
    Phuket: "ภูเก็ต",
    "Maha Sarakham": "มหาสารคาม",
    Mukdahan: "มุกดาหาร",
    Yala: "ยะลา",
    Yasothon: "ยโสธร",
    Ranong: "ระนอง",
    Rayong: "ระยอง",
    Ratchaburi: "ราชบุรี",
    "Roi Et": "ร้อยเอ็ด",
    Lopburi: "ลพบุรี",
    Lampang: "ลำปาง",
    Lamphun: "ลำพูน",
    Sisaket: "ศรีสะเกษ",
    "Sakon Nakhon": "สกลนคร",
    Songkhla: "สงขลา",
    Satun: "สตูล",
    "Samut Prakan": "สมุทรปราการ",
    "Samut Songkhram": "สมุทรสงคราม",
    "Samut Sakhon": "สมุทรสาคร",
    Saraburi: "สระบุรี",
    "Sa Kaeo": "สระแก้ว",
    "Sing Buri": "สิงห์บุรี",
    "Suphan Buri": "สุพรรณบุรี",
    "Surat Thani": "สุราษฎร์ธานี",
    Surin: "สุรินทร์",
    Sukhothai: "สุโขทัย",
    "Nong Khai": "หนองคาย",
    "Nong Bua Lamphu": "หนองบัวลำภู",
    "Amnat Charoen": "อำนาจเจริญ",
    "Udon Thani": "อุดรธานี",
    Uttaradit: "อุตรดิตถ์",
    "Uthai Thani": "อุทัยธานี",
    "Ubon Ratchathani": "อุบลราชธานี",
    "Ang Thong": "อ่างทอง",
    "Chiang Rai": "เชียงราย",
    "Chiang Mai": "เชียงใหม่",
    Phetchaburi: "เพชรบุรี",
    Phetchabun: "เพชรบูรณ์",
    Loei: "เลย",
    Phrae: "แพร่",
    "Mae Hong Son": "แม่ฮ่องสอน",
  };

  static async getWeatherAndProvince(
    lat: number,
    lon: number
  ): Promise<Record<string, string> | null> {
    try {
      const rawProvince = await this._getProvinceFromCoords(lat, lon);
      if (!rawProvince) return null;

      const thaiProvince = this.englishToThai[rawProvince];
      if (!thaiProvince) {
        console.debug(`ไม่พบจังหวัดใน map: ${rawProvince}`);
        return null;
      }

      console.log(`จังหวัด: ${rawProvince} → ${thaiProvince}`);

      const weatherUrl = `${this.weatherBaseUrl}?lat=${lat}&lon=${lon}&appid=${this.apiWeatherKey}&units=metric&lang=th`;
      const response = await fetch(weatherUrl);
      if (!response.ok) {
        console.debug(`Weather API error: ${response.status}`);
        return null;
      }

      const data = await response.json();

      return {
        province: thaiProvince,
        temperature: data.main.temp.toString(),
        humidity: data.main.humidity.toString(),
        rainfall: (data.rain?.["1h"] ?? 0.0).toString(),
      };
    } catch (e) {
      console.debug(`Error: ${e}`);
      return null;
    }
  }

  private static async _getProvinceFromCoords(
    lat: number,
    lon: number
  ): Promise<string | null> {
    const url = `${this.geoBaseUrl}?lat=${lat}&lon=${lon}&limit=1&appid=${this.apiWeatherKey}`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          const state = data[0].state || data[0].name;
          if (state) {
            console.log(`Raw state: ${state}`);
            return this._cleanProvinceName(state);
          }
        }
      }
    } catch (e) {
      console.debug(`Geocoding Error: ${e}`);
    }
    return null;
  }

  private static _cleanProvinceName(name: string): string {
    return name
      .replace(/ Province/g, "")
      .replace(/ จ./g, "")
      .replace(/จังหวัด/g, "")
      .trim();
  }
}
