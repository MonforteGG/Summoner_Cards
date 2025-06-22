export interface CardData {
  username: string;
  champion: string;
  rank: string;
  role: string;
  items: string[];
  boot: string;
  rankLabel: string;
}

export interface CardConfig {
  width: number;
  height: number;
  championSize: number;
  rankSize: number;
  itemSize: number;
  colors: {
    text: string;
    border: string;
    background: string;
  };
}