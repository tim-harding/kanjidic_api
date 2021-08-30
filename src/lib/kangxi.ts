import { isInt } from "./uint"

/**
 * A Kangxi radical.
 */
export const enum Kangxi {
	One = 1,
	Line,
	Dot,
	Slash,
	Second,
	Hook,
	Two,
	Lid,
	Man,
	Son,
	Enter,
	Eight,
	Wide,
	ClothCover,
	Ice,
	Table,
	Receptacle,
	Knife,
	Power,
	Wrap,
	Spoon,
	Box,
	Hiding,
	Ten,
	Divination,
	Seal,
	Cliff,
	Private,
	Again,
	Mouth,
	Enclosure,
	Earth,
	Scholar,
	Go,
	GoSlowly,
	Evening,
	Big,
	Woman,
	Child,
	Roof,
	Inch,
	Small,
	Lame,
	Corpse,
	Sprout,
	Mountain,
	River,
	Work,
	Oneself,
	Turban,
	Dry,
	ShortThread,
	DottedCliff,
	LongStride,
	Arch,
	Shoot,
	Bow,
	Snout,
	Bristle,
	Step,
	Heart,
	Halberd,
	Door,
	Hand,
	Branch,
	Rap,
	Script,
	Dipper,
	Axe,
	Square,
	Not,
	Sun,
	Say,
	Moon,
	Tree,
	Lack,
	Stop,
	Death,
	Weapon,
	DoNot,
	Compare,
	Fur,
	Clan,
	Steam,
	Water,
	Fire,
	Claw,
	Father,
	Trigrams,
	SplitWood,
	Slice,
	Fang,
	Cow,
	Dog,
	Profound,
	Jade,
	Melon,
	Tile,
	Sweet,
	Life,
	Use,
	Field,
	BoltOfCloth,
	Sickness,
	Footsteps,
	White,
	Skin,
	Dish,
	Eye,
	Spear,
	Arrow,
	Stone,
	Spirit,
	Track,
	Grain,
	Cave,
	Stand,
	Bamboo,
	Rice,
	Silk,
	Jar,
	Net,
	Sheep,
	Feather,
	Old,
	And,
	Plow,
	Ear,
	Brush,
	Meat,
	Minister,
	OnesSelf,
	Arrive,
	Mortar,
	Tongue,
	Oppose,
	Boat,
	Stopping,
	Color,
	Grass,
	Tiger,
	Insect,
	Blood,
	WalkEnclosure,
	Clothes,
	Cover,
	See,
	Horn,
	Speech,
	Valley,
	Bean,
	Pig,
	Badger,
	Shell,
	Red,
	Run,
	Foot,
	Body,
	Cart,
	Bitter,
	Morning,
	Walk,
	City,
	Wine,
	Distinguish,
	Village,
	Gold,
	Long,
	Gate,
	Mound,
	Slave,
	ShortTailedBird,
	Rain,
	Blue,
	Wrong,
	Face,
	Leather,
	TannedLeather,
	Leek,
	Sound,
	Leaf,
	Wind,
	Fly,
	Eat,
	Head,
	Fragrant,
	Horse,
	Bone,
	Tall,
	Hair,
	Fight,
	SacrificialWine,
	Cauldron,
	Ghost,
	Fish,
	Bird,
	Salt,
	Deer,
	Wheat,
	Hemp,
	Yellow,
	Millet,
	Black,
	Embroidery,
	Frog,
	Tripod,
	Drum,
	Rat,
	Nose,
	Even,
	Tooth,
	Dragon,
	Turtle,
	Flute,
}

/**
 * Gets a character that represents the radical
 * @param kangxi The Kangxi radical
 * @returns The character
 */
export function kangxiSymbol(kangxi: Kangxi): string {
	return SYMBOL_MAPPING[kangxi as number] as string
}

export function kangxiName(kangxi: Kangxi): string {
	return NAME_MAPPING[kangxi as number] as string
}

export function isKangxi(value: unknown): value is Kangxi {
	return isInt(value) &&
		value >= Kangxi.One &&
		value <= Kangxi.Flute
}

const SYMBOL_MAPPING = [
	"", // Dummy entry
	"一",
	"丨",
	"丶",
	"丿",
	"乙",
	"亅",
	"二",
	"亠",
	"人",
	"儿",
	"入",
	"八",
	"冂",
	"冖",
	"冫",
	"几",
	"凵",
	"刀",
	"力",
	"勹",
	"匕",
	"匚",
	"匸",
	"十",
	"卜",
	"卩",
	"厂",
	"厶",
	"又",
	"口",
	"囗",
	"土",
	"士",
	"夂",
	"夊",
	"夕",
	"大",
	"女",
	"子",
	"宀",
	"寸",
	"小",
	"尢",
	"尸",
	"屮",
	"山",
	"巛",
	"工",
	"己",
	"巾",
	"干",
	"幺",
	"广",
	"廴",
	"廾",
	"弋",
	"弓",
	"彐",
	"彡",
	"彳",
	"心",
	"戈",
	"戶",
	"手",
	"支",
	"攴",
	"文",
	"斗",
	"斤",
	"方",
	"无",
	"日",
	"曰",
	"月",
	"木",
	"欠",
	"止",
	"歹",
	"殳",
	"毋",
	"比",
	"毛",
	"氏",
	"气",
	"水",
	"火",
	"爪",
	"父",
	"爻",
	"爿",
	"片",
	"牙",
	"牛",
	"犬",
	"玄",
	"玉",
	"瓜",
	"瓦",
	"甘",
	"生",
	"用",
	"田",
	"疋",
	"疒",
	"癶",
	"白",
	"皮",
	"皿",
	"目",
	"矛",
	"矢",
	"石",
	"示",
	"禸",
	"禾",
	"穴",
	"立",
	"竹",
	"米",
	"糸",
	"缶",
	"网",
	"羊",
	"羽",
	"老",
	"而",
	"耒",
	"耳",
	"聿",
	"肉",
	"臣",
	"自",
	"至",
	"臼",
	"舌",
	"舛",
	"舟",
	"艮",
	"色",
	"艸",
	"虍",
	"虫",
	"血",
	"行",
	"衣",
	"襾",
	"見",
	"角",
	"言",
	"谷",
	"豆",
	"豕",
	"豸",
	"貝",
	"赤",
	"走",
	"足",
	"身",
	"車",
	"辛",
	"辰",
	"辵",
	"邑",
	"酉",
	"釆",
	"里",
	"金",
	"長",
	"門",
	"阜",
	"隶",
	"隹",
	"雨",
	"靑",
	"非",
	"面",
	"革",
	"韋",
	"韭",
	"音",
	"頁",
	"風",
	"飛",
	"食",
	"首",
	"香",
	"馬",
	"骨",
	"高",
	"髟",
	"鬥",
	"鬯",
	"鬲",
	"鬼",
	"魚",
	"鳥",
	"鹵",
	"鹿",
	"麥",
	"麻",
	"黃",
	"黍",
	"黑",
	"黹",
	"黽",
	"鼎",
	"鼓",
	"鼠",
	"鼻",
	"齊",
	"齒",
	"龍",
	"龜",
	"龠",
]

const NAME_MAPPING = [
	"", // Dummy entry
	"One",
	"Line",
	"Dot",
	"Slash",
	"Second",
	"Hook",
	"Two",
	"Lid",
	"Man",
	"Son",
	"Enter",
	"Eight",
	"Wide",
	"Cloth Cover",
	"Ice",
	"Table",
	"Receptacle",
	"Knife",
	"Power",
	"Wrap",
	"Spoon",
	"Box",
	"Hiding",
	"Ten",
	"Divination",
	"Seal",
	"Cliff",
	"Private",
	"Again",
	"Mouth",
	"Enclosure",
	"Earth",
	"Scholar",
	"Go",
	"Go Slowly",
	"Evening",
	"Big",
	"Woman",
	"Child",
	"Roof",
	"Inch",
	"Small",
	"Lame",
	"Corpse",
	"Sprout",
	"Mountain",
	"River",
	"Work",
	"Oneself",
	"Turban",
	"Dry",
	"Short Thread",
	"Dotted Cliff",
	"Long Stride",
	"Arch",
	"Shoot",
	"Bow",
	"Snout",
	"Bristle",
	"Step",
	"Heart",
	"Halberd",
	"Door",
	"Hand",
	"Branch",
	"Rap",
	"Script",
	"Dipper",
	"Axe",
	"Square",
	"Not",
	"Sun",
	"Say",
	"Moon",
	"Tree",
	"Lack",
	"Stop",
	"Death",
	"Weapon",
	"Do Not",
	"Compare",
	"Fur",
	"Clan",
	"Steam",
	"Water",
	"Fire",
	"Claw",
	"Father",
	"Trigrams",
	"Split Wood",
	"Slice",
	"Fang",
	"Cow",
	"Dog",
	"Profound",
	"Jade",
	"Melon",
	"Tile",
	"Sweet",
	"Life",
	"Use",
	"Field",
	"Bolt Of Cloth",
	"Sickness",
	"Footsteps",
	"White",
	"Skin",
	"Dish",
	"Eye",
	"Spear",
	"Arrow",
	"Stone",
	"Spirit",
	"Track",
	"Grain",
	"Cave",
	"Stand",
	"Bamboo",
	"Rice",
	"Silk",
	"Jar",
	"Net",
	"Sheep",
	"Feather",
	"Old",
	"And",
	"Plow",
	"Ear",
	"Brush",
	"Meat",
	"Minister",
	"Ones Self",
	"Arrive",
	"Mortar",
	"Tongue",
	"Oppose",
	"Boat",
	"Stopping",
	"Color",
	"Grass",
	"Tiger",
	"Insect",
	"Blood",
	"Walk Enclosure",
	"Clothes",
	"Cover",
	"See",
	"Horn",
	"Speech",
	"Valley",
	"Bean",
	"Pig",
	"Badger",
	"Shell",
	"Red",
	"Run",
	"Foot",
	"Body",
	"Cart",
	"Bitter",
	"Morning",
	"Walk",
	"City",
	"Wine",
	"Distinguish",
	"Village",
	"Gold",
	"Long",
	"Gate",
	"Mound",
	"Slave",
	"Short Tailed Bird",
	"Rain",
	"Blue",
	"Wrong",
	"Face",
	"Leather",
	"Tanned Leather",
	"Leek",
	"Sound",
	"Leaf",
	"Wind",
	"Fly",
	"Eat",
	"Head",
	"Fragrant",
	"Horse",
	"Bone",
	"Tall",
	"Hair",
	"Fight",
	"Sacrificial Wine",
	"Cauldron",
	"Ghost",
	"Fish",
	"Bird",
	"Salt",
	"Deer",
	"Wheat",
	"Hemp",
	"Yellow",
	"Millet",
	"Black",
	"Embroidery",
	"Frog",
	"Tripod",
	"Drum",
	"Rat",
	"Nose",
	"Even",
	"Tooth",
	"Dragon",
	"Turtle",
	"Flute",
]