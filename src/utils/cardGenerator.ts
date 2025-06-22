import { CardData, CardConfig } from '../types/cardTypes';
import { getRandomAssetName, loadAssetImage, loadBaseTemplate } from './assetLoader';

const CARD_CONFIG: CardConfig = {
  width: 456,
  height: 432,
  championSize: 160,
  rankSize: 180,
  itemSize: 40,
  colors: {
    text: '#E5CC8F',
    border: '#765F2F',
    background: '#0F1419'
  }
};

const RANK_TIERS = {
  'Iron': ['IV', 'III', 'II', 'I'],
  'Bronze': ['IV', 'III', 'II', 'I'],
  'Silver': ['IV', 'III', 'II', 'I'],
  'Gold': ['IV', 'III', 'II', 'I'],
  'Platinum': ['IV', 'III', 'II', 'I'],
  'Emerald': ['IV', 'III', 'II', 'I'],
  'Diamond': ['IV', 'III', 'II', 'I'],
  'Master': null,
  'Grandmaster': null,
  'Challenger': null
};

function formatLabel(name: string): string {
  return name.replace(/([a-z])([A-Z])/g, '$1 $2');
}

function generateRankLabel(rank: string): string {
  const rankLower = rank.toLowerCase();
  if (rankLower === 'unranked') return 'Unranked';

  const lpRanks = ['master', 'grandmaster', 'challenger'];
  if (lpRanks.includes(rankLower)) {
    const lpRanges = {
      master: [0, 500],
      grandmaster: [500, 1000],
      challenger: [1000, 2000]
    };
    const [min, max] = lpRanges[rankLower as keyof typeof lpRanges];
    const lp = Math.floor(Math.random() * (max - min + 1)) + min;
    return `${formatLabel(rank)} - ${lp} LP`;
  }

  const tiers = RANK_TIERS[rank as keyof typeof RANK_TIERS];
  if (tiers) {
    const division = tiers[Math.floor(Math.random() * tiers.length)];
    return `${formatLabel(rank)} ${division}`;
  }

  return formatLabel(rank);
}

function generateUniqueItems(count: number, excludeItem?: string): string[] {
  const selectedItems: string[] = [];
  const usedItems = new Set(excludeItem ? [excludeItem] : []);
  while (selectedItems.length < count) {
    const item = getRandomAssetName('items');
    if (!usedItems.has(item)) {
      selectedItems.push(item);
      usedItems.add(item);
    }
  }
  return selectedItems;
}

export function generateCardData(username: string): CardData {
  const champion = getRandomAssetName('champions');
  const rank = getRandomAssetName('ranks');
  const role = getRandomAssetName('roles');
  const boot = getRandomAssetName('boots');
  const items = generateUniqueItems(5, boot);
  const rankLabel = generateRankLabel(rank);

  return {
    username: username.replace('@', '').toUpperCase(),
    champion,
    rank,
    role,
    items,
    boot,
    rankLabel
  };
}

async function ensureFontLoaded(): Promise<void> {
  const font = new FontFace('LoLFont', 'url(/assets/fonts/Lol-Bold.ttf)');
  await font.load();
  document.fonts.add(font);
}

function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  color: string = CARD_CONFIG.colors.text,
  align: CanvasTextAlign = 'center',
  weight: string = 'bold'
) {
  ctx.fillStyle = color;
  ctx.font = `${weight} ${fontSize}px 'LoLFont', sans-serif`;
  ctx.textAlign = align;
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x, y);
}

export async function generateCardImage(cardData: CardData): Promise<string> {
  console.log('[DEBUG] CardData:', cardData);
  await ensureFontLoaded();

  const canvas = document.createElement('canvas');
  canvas.width = CARD_CONFIG.width;
  canvas.height = CARD_CONFIG.height;
  const ctx = canvas.getContext('2d')!;
  ctx.imageSmoothingEnabled = true;

  try {
    const baseTemplate = await loadBaseTemplate();
    ctx.drawImage(baseTemplate, 0, 0, CARD_CONFIG.width, CARD_CONFIG.height);

    // Username
    drawText(ctx, cardData.username, CARD_CONFIG.width / 2, 66, 30);

    // Champion
    const champX = 52;
    const champY = 100;
    const champSize = CARD_CONFIG.championSize;

    try {
      const championImg = await loadAssetImage('champions', cardData.champion);
      ctx.drawImage(championImg, champX, champY, champSize, champSize);
      ctx.strokeStyle = CARD_CONFIG.colors.border;
      ctx.lineWidth = 3;
      ctx.strokeRect(champX, champY, champSize, champSize);
    } catch {
      ctx.fillStyle = '#3c3c41';
      ctx.fillRect(champX, champY, champSize, champSize);
      ctx.strokeRect(champX, champY, champSize, champSize);
      drawText(ctx, cardData.champion.charAt(0), champX + champSize / 2, champY + champSize / 2, 48);
    }

    drawText(ctx, formatLabel(cardData.champion), champX + champSize / 2, champY + champSize + 18, 20);

    // Role
    const roleSize = 28;
    const roleX = champX + (champSize - roleSize) / 2;
    const roleY = champY + champSize + 40;

    try {
      const roleImg = await loadAssetImage('roles', cardData.role);
      ctx.drawImage(roleImg, roleX, roleY, roleSize, roleSize);
    } catch {
      ctx.fillStyle = '#1e2328';
      ctx.fillRect(roleX, roleY, roleSize, roleSize);
      ctx.strokeRect(roleX, roleY, roleSize, roleSize);
      drawText(ctx, cardData.role.charAt(0), roleX + roleSize / 2, roleY + roleSize / 2, 16);
    }

    // Rank
    const rankSize = CARD_CONFIG.rankSize;
    const rankX = CARD_CONFIG.width - rankSize - 42;
    const rankY = champY;

    try {
      const rankImg = await loadAssetImage('ranks', cardData.rank);
      ctx.drawImage(rankImg, rankX, rankY, rankSize, rankSize);
    } catch {
      ctx.fillStyle = '#444';
      ctx.fillRect(rankX, rankY, rankSize, rankSize);
      drawText(ctx, cardData.rank.charAt(0), rankX + rankSize / 2, rankY + rankSize / 2, 36, '#FFFFFF');
    }

    drawText(ctx, cardData.rankLabel, rankX + rankSize / 2, rankY + rankSize + 20, 16);

    // Items
    const itemSize = CARD_CONFIG.itemSize;
    const spacing = 10;
    const totalWidth = 6 * itemSize + 5 * spacing;
    const itemsStartX = (CARD_CONFIG.width - totalWidth) / 2;
    const itemsY = CARD_CONFIG.height - itemSize - 44;

    const itemImages = [cardData.boot, ...cardData.items];
    const itemSources = ['boots', ...Array(5).fill('items')];

    for (let i = 0; i < itemImages.length; i++) {
      const itemX = itemsStartX + i * (itemSize + spacing);
      const category = itemSources[i];
      const assetName = itemImages[i];

      try {
        const itemImg = await loadAssetImage(category, assetName);
        ctx.drawImage(itemImg, itemX, itemsY, itemSize, itemSize);
      } catch {
        ctx.fillStyle = '#222';
        ctx.fillRect(itemX, itemsY, itemSize, itemSize);
        drawText(ctx, assetName.charAt(0), itemX + itemSize / 2, itemsY + itemSize / 2, 20);
      }

      ctx.strokeStyle = CARD_CONFIG.colors.border;
      ctx.lineWidth = 2;
      ctx.strokeRect(itemX, itemsY, itemSize, itemSize);
    }

  } catch (error) {
    console.error('Error generating card:', error);
    ctx.fillStyle = CARD_CONFIG.colors.background;
    ctx.fillRect(0, 0, CARD_CONFIG.width, CARD_CONFIG.height);
    drawText(ctx, 'Card Generation Error', CARD_CONFIG.width / 2, CARD_CONFIG.height / 2, 24, '#FF0000');
  }

  return canvas.toDataURL('image/png', 0.9);
}
