export interface AssetManifest {
  champions: string[];
  ranks: string[];
  roles: string[];
  items: string[];
  boots: string[];
}


export const ASSET_MANIFEST: AssetManifest = {
  champions: [
    "Aatrox",
    "Ahri",
    "Akali",
    "Akshan",
    "Alistar",
    "Ambessa",
    "Amumu",
    "Anivia",
    "Annie",
    "Aphelios",
    "Ashe",
    "AurelionSol",
    "Aurora",
    "Azir",
    "Bard",
    "Belveth",
    "Blitzcrank",
    "Brand",
    "Braum",
    "Briar",
    "Caitlyn",
    "Camille",
    "Cassiopeia",
    "Chogath",
    "Corki",
    "Darius",
    "Diana",
    "Draven",
    "DrMundo",
    "Ekko",
    "Elise",
    "Evelynn",
    "Ezreal",
    "Fiddlesticks",
    "Fiora",
    "Fizz",
    "Galio",
    "Gangplank",
    "Garen",
    "Gnar",
    "Gragas",
    "Graves",
    "Gwen",
    "Hecarim",
    "Heimerdinger",
    "Hwei",
    "Illaoi",
    "Irelia",
    "Ivern",
    "Janna",
    "JarvanIV",
    "Jax",
    "Jayce",
    "Jhin",
    "Jinx",
    "Kaisa",
    "Kalista",
    "Karma",
    "Karthus",
    "Kassadin",
    "Katarina",
    "Kayle",
    "Kayn",
    "Kennen",
    "Khazix",
    "Kindred",
    "Kled",
    "KogMaw",
    "KSante",
    "Leblanc",
    "LeeSin",
    "Leona",
    "Lillia",
    "Lissandra",
    "Lucian",
    "Lulu",
    "Lux",
    "Malphite",
    "Malzahar",
    "Maokai",
    "MasterYi",
    "Mel",
    "Milio",
    "MissFortune",
    "Mordekaiser",
    "Morgana",
    "Naafiri",
    "Nami",
    "Nasus",
    "Nautilus",
    "Neeko",
    "Nidalee",
    "Nilah",
    "Nocturne",
    "Nunu",
    "Olaf",
    "Orianna",
    "Ornn",
    "Pantheon",
    "Poppy",
    "Pyke",
    "Qiyana",
    "Quinn",
    "Rakan",
    "Rammus",
    "RekSai",
    "Rell",
    "Renata",
    "Renekton",
    "Rengar",
    "Riven",
    "Rumble",
    "Ryze",
    "Samira",
    "Sejuani",
    "Senna",
    "Seraphine",
    "Sett",
    "Shaco",
    "Shen",
    "Shyvana",
    "Singed",
    "Sion",
    "Sivir",
    "Skarner",
    "Smolder",
    "Sona",
    "Soraka",
    "Swain",
    "Sylas",
    "Syndra",
    "TahmKench",
    "Taliyah",
    "Talon",
    "Taric",
    "Teemo",
    "Thresh",
    "Tristana",
    "Trundle",
    "Tryndamere",
    "TwistedFate",
    "Twitch",
    "Udyr",
    "Urgot",
    "Varus",
    "Vayne",
    "Veigar",
    "Velkoz",
    "Vex",
    "Vi",
    "Viego",
    "Viktor",
    "Vladimir",
    "Volibear",
    "Warwick",
    "Wukong",
    "Xayah",
    "Xerath",
    "XinZhao",
    "Yasuo",
    "Yone",
    "Yorick",
    "Yuumi",
    "Zac",
    "Zed",
    "Zeri",
    "Ziggs",
    "Zilean",
    "Zoe",
    "Zyra"
  ],
  ranks: [
    'Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Emerald', 'Diamond', 'Master', 'Grandmaster', 'Challenger', 'Unranked'
  ],
  roles: [
    'Top', 'Jungle', 'Middle', 'Bottom', 'Support'
  ],
  items: [
    "1054", "1055", "1056", "2065", "2138", "2139", "2140", "2501", "2502", "2503", "2504",
    "3002", "3003", "3004", "3011", "3026", "3031", "3032", "3033", "3036", "3040", "3041", "3042", "3046",
    "3050", "3053", "3065", "3068", "3071", "3072", "3073", "3074", "3075", "3078", "3083", "3084", "3085",
    "3087", "3089", "3091", "3094", "3100", "3102", "3107", "3109", "3110", "3115", "3116", "3117", "3118",
    "3119", "3121", "3124", "3135", "3137", "3139", "3142", "3143", "3152", "3153", "3156", "3157", "3161",
    "3165", "3172", "3179", "3181", "3190", "3222", "3302", "3504", "3508", "3742", "3748", "3814", "3865",
    "3869", "3871", "3877", "4005", "4401", "4628", "4629", "4633", "4635", "4636", "4637", "4641", "4643",
    "4645", "4646", "6333", "6609", "6610", "6616", "6617", "6620", "6621", "6631", "6653", "6655", "6657",
    "6662", "6664", "6665", "6672", "6673", "6675", "6676", "6692", "6693", "6694", "6695", "6696", "6697",
    "6698", "6699", "6701", "8001", "8020"
  ],
  boots: [
    "3009",
    "3020",
    "3047",
    "3111",
    "3117",
    "3158"
  ]
};

export function getRandomAssetName(category: keyof AssetManifest): string {
  const assets = ASSET_MANIFEST[category];
  return assets[Math.floor(Math.random() * assets.length)];
}

export function loadAssetImage(category: string, name: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => {
      console.warn(`Failed to load ${category}/${name}.png`);
      reject(new Error(`Failed to load ${category}/${name}.png`));
    };
    img.src = `/assets/icons/${category}/${name}.png`;
  });
}

export function loadBaseTemplate(): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => {
      console.error('Failed to load base template from /assets/templates/base_template.png');
      reject(new Error('Failed to load base template'));
    };
    img.src = '/assets/templates/base_template.png';
  });
}